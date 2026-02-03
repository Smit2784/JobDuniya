import React, { useCallback, useEffect, useState } from "react";
import useAPI from "../../Hooks/USER/useAPI";
import ViewJob from "./viewJob";
import JobCard from "./JobCard";
import Cookies from "js-cookie";
import css from "../../Style/searchSection.module.css";

const SearchSection = () => {
    const [jobType, setJobType] = useState("Remote");
    const [location, setLocation] = useState("");
    const [jobs, setJobs] = useState([]);
    const [viewJob, setViewJob] = useState("");
    const [visible, setVisible] = useState(false);
    const [keyword, setKeyword] = useState("");
    const [length, setLength] = useState(0);
    const [originalJobs, setOriginalJobs] = useState([]);
    const [user, setUser] = useState();
    const [savedJobIds, setSavedJobIds] = useState(new Set());
    const [appliedJobIds, setAppliedJobIds] = useState(new Set());
    const api = useAPI();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await api.getREQUEST("fetchAll/jobs/0/0");
                console.log("SearchSection Data:", data);
                if (Array.isArray(data)) {
                    setOriginalJobs(data);

                    // Filter initially
                    const initialFiltered = data.filter(
                        (job) => job.JobType === "Remote",
                    );
                    setJobs(initialFiltered);
                    setLength(initialFiltered.length);
                } else {
                    console.error("Data is not an array:", data);
                }
            } catch (error) {
                console.error("Error fetching jobs:", error);
            }
        };

        const fetchUser = async () => {
            const id = Cookies.get("id");
            if (id) {
                const userData = await api.getREQUEST(`profile/${id}`);
                setUser(userData);

                try {
                    const savedData = await api.getREQUEST(`ListJob/${id}`);
                    const appliedData = await api.getREQUEST(
                        `fetchAppliedJobs/${id}`,
                    );

                    if (Array.isArray(savedData)) {
                        const ids = savedData
                            .filter((item) => item && item.jobId)
                            .map((item) => item.jobId._id);
                        setSavedJobIds(new Set(ids));
                    }

                    if (Array.isArray(appliedData)) {
                        const ids = appliedData
                            .filter((item) => item && item.jobId)
                            .map((item) => item.jobId._id);
                        setAppliedJobIds(new Set(ids));
                    }
                } catch (error) {
                    console.error("Error fetching user status:", error);
                }
            }
        };

        fetchData();
        fetchUser();
    }, []); // Removed api dependency to avoid infinite loop

    const onCardClick = (id) => {
        setViewJob((prev) => (prev === id ? "" : id));
    };

    const HandleSearch = useCallback(async () => {
        try {
            const items = await api.getREQUEST(
                `search?keyword=${keyword}&location=${location}&tbl=jobs`,
            );
            console.log("Search Results:", items);
            if (Array.isArray(items)) {
                setJobs(items);
                setOriginalJobs(items);
                setLength(items.length);
                setJobType("");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }, [keyword, location]); // Removed api dependency

    const applyFilters = (type, sortValue) => {
        let filtered = [...originalJobs];

        // 1. Filter by Job Type (skip if "All" is selected)
        if (type && type !== "All") {
            filtered = filtered.filter((job) => job.JobType === type);
        }

        // 2. Filter/Sort by Dropdown
        if (sortValue === "City") {
            const city =
                user &&
                user[0] &&
                user[0].location &&
                user[0].location[0] &&
                user[0].location[0].city;
            if (city) {
                filtered = filtered.filter(
                    (job) =>
                        job.company &&
                        job.company.Address &&
                        job.company.Address[0] &&
                        job.company.Address[0].city === city,
                );
            }
        } else if (sortValue === "Date") {
            // Sort by latest (assuming JobPostedTime is ISO string)
            filtered.sort(
                (a, b) => new Date(b.JobPostedTime) - new Date(a.JobPostedTime),
            );
        }

        setJobs(filtered);
        setLength(filtered.length);
    };

    const filterJobs = (type) => {
        setJobType(type);
        // Default sort to 'All' (no sort/extra filter) when switching tabs
        applyFilters(type, "All");
    };

    const handleSort = (value) => {
        // Apply sort on TOP of current jobType
        applyFilters(jobType, value);
    };

    const perFormSave = async (jobId) => {
        const userId = Cookies.get("id");
        await api.postREQUEST("savedJob", JSON.stringify({ userId, jobId }));
    };

    return (
        <div className={css.searchContainer}>
            <div className="container">
                <div className={css.searchCard}>
                    <div className="row">
                        <div className="col-md-10">
                            <div className={css.inputsRow}>
                                <div className={css.inputGroup}>
                                    <input
                                        type="text"
                                        className={css.searchInput}
                                        placeholder="Job title, Keyword, or Company"
                                        onChange={(e) =>
                                            setKeyword(e.target.value)
                                        }
                                        value={keyword}
                                    />
                                </div>
                                <div className={css.inputGroup}>
                                    <input
                                        list="location"
                                        className={css.searchInput}
                                        placeholder="City, State, or Zipcode"
                                        onChange={(e) =>
                                            setLocation(e.target.value)
                                        }
                                        value={location}
                                    />
                                    <datalist id="location">
                                        {/* Populate if location data available */}
                                    </datalist>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-2 d-flex align-items-center mt-3 mt-md-0">
                            <button
                                className={css.searchButton}
                                onClick={HandleSearch}
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>

                <div className={css.resultsHeader}>
                    <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
                        <h1 className={`${css.resultCount} mb-0`}>
                            {length} Jobs Found
                        </h1>
                        {/* <div className={css.controlsBox}>
                            <div className={css.filterWrapper}>
                                <select
                                    className={css.filterSelect}
                                    onChange={(e) => handleSort(e.target.value)}
                                    defaultValue="All"
                                >
                                    <option value="All">All Jobs</option>
                                    <option value="Date">Latest First</option>
                                    <option value="City">Near You</option>
                                </select>
                            </div>
                        </div> */}
                    </div>

                    <div className={css.tabsContainer}>
                        <button
                            className={`${css.tabItem} ${jobType === "All" ? css.activeTab : ""}`}
                            onClick={() => filterJobs("All")}
                        >
                            All
                        </button>
                        <button
                            className={`${css.tabItem} ${jobType === "Remote" ? css.activeTab : ""}`}
                            onClick={() => filterJobs("Remote")}
                        >
                            Remote
                        </button>
                        <button
                            className={`${css.tabItem} ${jobType === "FullTime" ? css.activeTab : ""}`}
                            onClick={() => filterJobs("FullTime")}
                        >
                            Full Time
                        </button>
                        <button
                            className={`${css.tabItem} ${jobType === "PartTime" ? css.activeTab : ""}`}
                            onClick={() => filterJobs("PartTime")}
                        >
                            Part Time
                        </button>
                    </div>
                </div>

                <div className={css.jobsList}>
                    {jobs &&
                        jobs.map((e) => (
                            <div key={e._id}>
                                <JobCard
                                    onCardClick={onCardClick}
                                    setVisible={setVisible}
                                    visible={visible}
                                    viewJob={viewJob}
                                    jobtype={e.JobType}
                                    id={e._id}
                                    hidden={true}
                                    perFormSave={perFormSave}
                                    location={`${e.company?.Address && e.company?.Address[0]?.city} , ${e.company?.Address && e.company?.Address[0].state}`}
                                    postedtime={
                                        e.JobPostedTime
                                            ? e.JobPostedTime.split("T")[0]
                                            : "N/A"
                                    }
                                    salary={e.Salary}
                                    title={e.Title}
                                    companyLogo={e.company && e.company.Logo}
                                    isSaved={savedJobIds.has(e._id)}
                                    isApplied={appliedJobIds.has(e._id)}
                                />
                                {viewJob === e._id && (
                                    <div className="viewjobList">
                                        <ViewJob
                                            setViewJob={setViewJob}
                                            viewJob={viewJob}
                                            visible={visible}
                                            data={e}
                                        />
                                    </div>
                                )}
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default SearchSection;

// import React, { useCallback, useEffect, useState } from "react";
// import SearchFilterTabs from "../Tabs/SearchFilterTabs";
// import useAPI from "../../Hooks/USER/useAPI";
// const SearchSection = () => {
//     const [keyword, setKeyWord] = useState("");
//     const [location, setLocation] = useState("");
//     const [jobs, setJobs] = useState([]);
//     const api = useAPI();
//     const HandleSearch = async () => {
//         try {
//             const items = await api.getREQUEST(search?keyword=${keyword}&location=${location}&tbl=jobs,);
//             setJobs(items && items);
//         } catch (error) {
//             console.error('Error fetching data:', error);
//         }
//     }
//     useEffect(() => {
//         HandleSearch();
//     }, [])

//     return (
//         <>
//             <div className='center'>
//                 <div class="container border card p-5">
//                     <div class="row">
//                         <div class="col-md-10 ">
//                             <div class="row g-2 mb-2">
//                                 <div class="col-md-6">
//                                     <input type="text" class="form-control-default " placeholder="Job title , Keyword , Company" onChange={(e) => setKeyWord(e.target.value)} />
//                                 </div>
//                                 <div class="col-md-6">
//                                     <input list='location' className='form-control-default' placeholder='State , City ,zipcode' onChange={(e) => setLocation(e.target.value)} />
//                                     <datalist id="location">
//                                         {/* {jobs.map((e) => {
//                                             return <option className='opt' value="Safari"}</option>
//                                         })} */}
//                                     </datalist>
//                                 </div>
//                             </div>
//                         </div>
//                         <div class="col-md-2 d-flex justify-content-between  align-items-center ">
//                             <button
//                                 class="btn bgbtn w-100"
//                                 onClick={() => {
//                                     HandleSearch();
//                                 }}
//                             >
//                                 Search
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="container" style={{overflow:"scroll" , height:"50vh"}}>
//                     <h1 className="mt-4 text-center mb-4 fs-3 text-info ">Job Listing</h1>
//                     <hr className="mb-4" />
//                     <div className="tab-class text-center">
//                         <ul className="nav nav-pills d-inline-flex justify-content-center border-bottom mb-5">
//                             <li className="nav-item">
//                                 <a className="d-flex align-items-center text-start mx-3 ms-0 pb-3 active" data-bs-toggle="pill" href="#tab-1">
//                                     <h6 className="mt-n1 mb-0" onClick={() => {
//                                         setKeyWord("remote")
//                                     }}>Remote</h6>
//                                 </a>
//                             </li>
//                             <li className="nav-item">
//                                 <a className="d-flex align-items-center text-start mx-3 pb-3" data-bs-toggle="pill" href="#tab-2">
//                                     <h6 className="mt-n1 mb-0" onClick={() => setKeyWord("fulltime")}>Full Time</h6>
//                                 </a>
//                             </li>
//                             <li className="nav-item">
//                                 <a className="d-flex align-items-center text-start mx-3 me-0 pb-3" data-bs-toggle="pill" href="#tab-3">
//                                     <h6 className="mt-n1 mb-0" onClick={() => setKeyWord("parttime")}>Part Time</h6>
//                                 </a>
//                             </li>
//                         </ul>
//                         <div className="tab-content">
//                             {jobs.map((e) => {
//                                 return <SearchFilterTabs
//                                     title={e.Title}

//                                 />
//                             })
//                             }
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default SearchSection;

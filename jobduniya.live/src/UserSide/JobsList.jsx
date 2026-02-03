import React, { useEffect, useMemo, useState } from "react";
import ViewJob from "../componants/Common/viewJob";
// import "../Style/jobview.css";
import css from "./Style/jobsList.module.css";
import JobCard from "../componants/Common/JobCard";
import useAPI from "../Hooks/USER/useAPI";
import Apply from "../componants/Profile/Apply";
import Cookies from "js-cookie";
import JobsNotFound from "../assets/JobsNotFound.json";
import Lottie from "lottie-react";
const JobsList = () => {
    const [jobs, setJobs] = useState([]);
    const [viewJob, setViewJob] = useState("");
    const [visible, setVisible] = useState(false);
    const [keyword, setKeyword] = useState("");
    const [user, setUser] = useState();
    const [length, setLength] = useState("");
    const [originalJobs, setOriginalJobs] = useState([]);
    const [selectedOption, setSelectedOption] = useState("");

    const [savedJobIds, setSavedJobIds] = useState(new Set());
    const [appliedJobIds, setAppliedJobIds] = useState(new Set());

    const api = useAPI();

    const call = async () => {
        const data = await api.getREQUEST("fetchAll/jobs/0/0");
        setJobs(data);
        setOriginalJobs(data);
        setLength(data.length);
    };

    const fetchUserStatus = async () => {
        const id = Cookies.get("id");
        if (!id) return;

        try {
            const savedData = await api.getREQUEST(`ListJob/${id}`);
            const appliedData = await api.getREQUEST(`fetchAppliedJobs/${id}`);

            if (Array.isArray(savedData)) {
                // Ensure item and item.jobId exist before accessing _id
                const ids = savedData
                    .filter((item) => item && item.jobId)
                    .map((item) => item.jobId._id);
                setSavedJobIds(new Set(ids));
            }

            if (Array.isArray(appliedData)) {
                // Ensure item and item.jobId exist before accessing _id
                const ids = appliedData
                    .filter((item) => item && item.jobId)
                    .map((item) => item.jobId._id);
                setAppliedJobIds(new Set(ids));
            }
        } catch (error) {
            console.error("Error fetching user status:", error);
        }
    };

    const User = async () => {
        const id = Cookies.get("id");
        const data = await api.getREQUEST(`profile/${id}`);
        setUser(data);
    };

    const search = async (keyword) => {
        try {
            const items = await api.getREQUEST(`jobs?title=${keyword}`);
            setJobs(items && items);
            setOriginalJobs(items);
            setLength(items.length);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    let filteredJobs = [...originalJobs];
    const handleSearch = (value) => {
        const city = user && user[0].location && user[0].location[0].city;
        if (value == "All") {
            setJobs(filteredJobs);
        }
        if (value == "City") {
            filteredJobs = filteredJobs.filter(
                (job) =>
                    job.company &&
                    job.company.Address &&
                    job.company.Address[0].city === city,
            );
            setJobs(filteredJobs);
            setLength(filteredJobs.length);
        }
        if (value == "Date") {
            const currentDate = Date.now();
            console.log(currentDate);
            filteredJobs = filteredJobs.filter(
                (job) => new Date(job.JobPostedTime).getTime() === currentDate,
            );
            setJobs(filteredJobs);
            setLength(filteredJobs.length);
        }
    };

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            search(keyword);
        }, 1000);

        return () => clearTimeout(timeoutId);
    }, [keyword]);

    useEffect(() => {
        call();
        User();
        fetchUserStatus();
    }, []);

    const onCardClick = (id) => {
        setViewJob((prev) => {
            if (prev === id) {
                return "";
            } else {
                return id;
            }
        });
    };

    const perFormSave = async (jobId) => {
        const userId = Cookies.get("id");
        const response = await api.postREQUEST(
            "savedJob",
            JSON.stringify({ userId, jobId }),
        );
        if (response) {
            setSavedJobIds((prev) => new Set(prev).add(jobId));
        }
    };

    return (
        <div className={css.container}>
            <div className={css.headerSection}>
                <div className={css.titleBox}>
                    <h1 className={css.title}>Find your Future...</h1>
                    <span className={css.resultCount}>
                        {length} Jobs Available
                    </span>
                </div>

                <div className={css.controlsBox}>
                    <div className={css.searchWrapper}>
                        <input
                            type="text"
                            className={css.searchInput}
                            placeholder="Search by job title, skill..."
                            onChange={(e) => setKeyword(e.target.value)}
                        />
                    </div>
                    {/* <div className={css.filterWrapper}>
                        <select
                            className={css.filterSelect}
                            onChange={(e) => {
                                handleSearch(e.target.value);
                            }}
                            defaultValue="All"
                        >
                            <option value="All">All Jobs</option>
                            <option value="Date">Latest First</option>
                            <option value="Skills">Matched Skills</option>
                            <option value="City">Near You</option>
                        </select>
                    </div> */}
                </div>
            </div>

            <div className={css.jobListContainer}>
                {jobs.length > 0 ? (
                    jobs.map((e) => (
                        <React.Fragment key={e._id}>
                            <JobCard
                                onCardClick={onCardClick}
                                setVisible={setVisible}
                                visible={visible}
                                viewJob={viewJob}
                                jobtype={e.JobType}
                                id={e._id}
                                hidden={true}
                                perFormSave={perFormSave}
                                location={`${e.company?.Address?.[0]?.city}, ${e.company?.Address?.[0]?.state}`}
                                postedtime={e.JobPostedTime.split("T")[0]}
                                salary={e.Salary}
                                title={e.Title}
                                companyLogo={e.company?.Logo}
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
                        </React.Fragment>
                    ))
                ) : (
                    <div className={css.emptyState}>
                        <Lottie
                            animationData={JobsNotFound}
                            loop={true}
                            style={{ height: "300px", width: "300px" }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default JobsList;

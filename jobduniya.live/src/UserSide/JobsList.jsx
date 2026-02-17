import React, { useEffect, useMemo, useState } from "react";
import ViewJob from "../componants/Common/viewJob";
// import "../Style/jobview.css";
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
        <div className="w-full max-w-7xl mx-auto mt-20 mb-10 px-6 min-h-[80vh]">
            <div className="mb-8 flex flex-wrap gap-6 justify-between items-end flex-col md:flex-row md:items-end">
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-bold text-slate-900 leading-tight m-0">
                        Find your Future...
                    </h1>
                    <span className="text-base text-slate-500 font-medium">
                        {length} Jobs Available
                    </span>
                </div>

                <div className="flex-1 max-w-[600px] flex gap-4 flex-wrap w-full md:w-auto">
                    <div className="flex-[2] min-w-[200px] w-full md:w-auto">
                        <input
                            type="text"
                            className="w-full px-5 py-3 rounded-xl border border-slate-300 bg-slate-50 text-base h-12 outline-none transition-all duration-200 text-slate-800 focus:border-blue-500 focus:bg-white focus:shadow-[0_0_0_4px_rgba(59,130,246,0.1)]"
                            placeholder="Search by job title, skill..."
                            onChange={(e) => setKeyword(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-4 w-full max-w-[1000px] mx-auto">
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
                    <div className="flex justify-center items-center min-h-[400px] bg-slate-50 rounded-3xl">
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

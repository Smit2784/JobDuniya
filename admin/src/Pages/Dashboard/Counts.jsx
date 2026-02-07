import React, { useEffect, useState, useCallback } from "react";

import useAPI from "../../Hooks/useAPI";

const Counts = () => {
    const api = useAPI();
    const [job, setJob] = useState(0);
    const [application, setApplication] = useState(0);
    const [connection, setConnection] = useState(0);
    const id = localStorage.getItem("id");

    // Move fetch logic inside useEffect to prevent infinite loop
    useEffect(() => {
        let isMounted = true;
        const fetchCounts = async () => {
            if (!id) return;
            try {
                const appData = await api.getREQUEST(`applied-users/${id}`);
                const connData = await api.getREQUEST(`getConnections/${id}`);
                const jobsData = await api.getREQUEST(`FetchCompanyJobs/${id}`);

                if (isMounted) {
                    setApplication(appData?.length || 0);
                    setConnection(connData?.length || 0);
                    setJob(jobsData?.length || 0);
                }
            } catch (error) {
                console.error("Error fetching counts:", error);
            }
        };

        fetchCounts();

        return () => {
            isMounted = false;
        };
    }, []); // Empty dependency array ensures this runs ONLY once on mount

    return (
        <div className="w-[95%] max-w-[1400px] grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-6 mt-6">
            <div
                className={`bg-white rounded-2xl p-6 shadow-[0_4px_12px_rgba(0,0,0,0.03)] border border-[#f1f5f9] flex flex-col justify-center transition-transform duration-200 hover:-translate-y-[3px] hover:shadow-[0_8px_20px_rgba(0,0,0,0.06)] border-l-4 border-l-[#3b82f6]`}
            >
                <div className="flex items-center gap-3 text-base text-[#64748b] font-medium mb-2">
                    <i
                        className="fa-solid fa-envelope-open-text text-[1.25rem]"
                        style={{ color: "#3b82f6" }}
                    ></i>
                    Applications
                </div>
                <div className="text-[2.25rem] font-extrabold text-[#1e293b]">
                    {application}
                </div>
            </div>
            <div
                className={`bg-white rounded-2xl p-6 shadow-[0_4px_12px_rgba(0,0,0,0.03)] border border-[#f1f5f9] flex flex-col justify-center transition-transform duration-200 hover:-translate-y-[3px] hover:shadow-[0_8px_20px_rgba(0,0,0,0.06)] border-l-4 border-l-[#f97316]`}
            >
                <div className="flex items-center gap-3 text-base text-[#64748b] font-medium mb-2">
                    <i
                        className="fa-solid fa-users text-[1.25rem]"
                        style={{ color: "#f97316" }}
                    ></i>
                    Connections
                </div>
                <div className="text-[2.25rem] font-extrabold text-[#1e293b]">
                    {connection}
                </div>
            </div>
            <div
                className={`bg-white rounded-2xl p-6 shadow-[0_4px_12px_rgba(0,0,0,0.03)] border border-[#f1f5f9] flex flex-col justify-center transition-transform duration-200 hover:-translate-y-[3px] hover:shadow-[0_8px_20px_rgba(0,0,0,0.06)] border-l-4 border-l-[#22c55e]`}
            >
                <div className="flex items-center gap-3 text-base text-[#64748b] font-medium mb-2">
                    <i
                        className="fa fa-briefcase text-[1.25rem]"
                        style={{ color: "#22c55e" }}
                    ></i>
                    Jobs
                </div>
                <div className="text-[2.25rem] font-extrabold text-[#1e293b]">
                    {job}
                </div>
            </div>
            {/* <div className={`bg-white rounded-2xl p-6 shadow-[0_4px_12px_rgba(0,0,0,0.03)] border border-[#f1f5f9] flex flex-col justify-center transition-transform duration-200 hover:-translate-y-[3px] hover:shadow-[0_8px_20px_rgba(0,0,0,0.06)] border-l-4 border-l-[#a855f7]`}>
                <div className="flex items-center gap-3 text-base text-[#64748b] font-medium mb-2">
                    <i
                        className="fa-solid fa-comment text-[1.25rem]"
                        style={{ color: "#a855f7" }}
                    ></i>
                    Feedbacks
                </div>
                <div className="text-[2.25rem] font-extrabold text-[#1e293b]">0</div>
            </div> */}
        </div>
    );
};

export default Counts;

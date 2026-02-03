import React, { useEffect, useState, useCallback } from "react";
import css from "./dashboard.module.css";
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
        <div className={css.countsGrid}>
            <div className={`${css.countCard} ${css.cardBlue}`}>
                <div className={css.countHeader}>
                    <i
                        className="fa-solid fa-envelope-open-text"
                        style={{ color: "#3b82f6" }}
                    ></i>
                    Applications
                </div>
                <div className={css.countValue}>{application}</div>
            </div>
            <div className={`${css.countCard} ${css.cardOrange}`}>
                <div className={css.countHeader}>
                    <i
                        className="fa-solid fa-users"
                        style={{ color: "#f97316" }}
                    ></i>
                    Connections
                </div>
                <div className={css.countValue}>{connection}</div>
            </div>
            <div className={`${css.countCard} ${css.cardGreen}`}>
                <div className={css.countHeader}>
                    <i
                        className="fa fa-briefcase"
                        style={{ color: "#22c55e" }}
                    ></i>
                    Jobs
                </div>
                <div className={css.countValue}>{job}</div>
            </div>
            {/* <div className={`${css.countCard} ${css.cardPurple}`}>
                <div className={css.countHeader}>
                    <i
                        className="fa-solid fa-comment"
                        style={{ color: "#a855f7" }}
                    ></i>
                    Feedbacks
                </div>
                <div className={css.countValue}>0</div>
            </div> */}
        </div>
    );
};

export default Counts;

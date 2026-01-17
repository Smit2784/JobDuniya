import React, { useEffect, useState, useCallback } from "react";
import css from "./style.module.css";
import useAPI from "../../Hooks/useAPI";
const Counts = () => {
    const api = useAPI();
    const [job, setJob] = useState(0);
    const [application, setApplication] = useState(0);
    const [connection, setConnection] = useState(0);
    const id = localStorage.getItem("id");
    const fetch = useCallback(async () => {
        const application = await api.getREQUEST(`applied-users/${id}`)
        setApplication(application?.length);
        const data = await api.getREQUEST(`getConnections/${id}`);
        setConnection(data?.length || 0);
        const jobs = await api.getREQUEST(`FetchCompanyJobs/${id}`)
        setJob(jobs?.length)
    });
    useEffect(() => {
        fetch();
    }, []);
    return (
        <div className={css.CountContainer}>
            <div className={css.countCard}>
                <div className={css.countHeader}>
                    <i class="fa-solid fa-envelope-open-text"></i>
                    <span className={css.title}> Applications</span>
                </div>
                <div className={css.countNumber}>
                    <span className={css.num}> {application}</span>
                </div>
            </div>
            <div className={css.countCard}>
                <div className={css.countHeader}>
                    <i class="fa-solid fa-users"></i>
                    <span className={css.title}> Connections</span>
                </div>
                <div className={css.countNumber}>
                    <span className={css.num}> {connection}</span>
                    {/* <span className={css.num}> 0</span> */}
                </div>
            </div>
            <div className={css.countCard}>
                <div className={css.countHeader}>
                    <i className="fa fa-briefcase"></i>
                    <span className={css.title}> Jobs</span>
                </div>
                <div className={css.countNumber}>
                    <span className={css.num}> {job}</span>
                    {/* <span className={css.num}> 0</span> */}

                </div>
            </div>
            <div className={css.countCard}>
                <div className={css.countHeader}>
                    <i class="fa-solid fa-comment"></i>
                    <span className={css.title}> Feedbacks</span>
                </div>
                <div className={css.countNumber}>
                    <span className={css.num}>0</span>
                </div>
            </div>
        </div>
    );
};

export default Counts;
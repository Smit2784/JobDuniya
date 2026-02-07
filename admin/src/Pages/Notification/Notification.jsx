import React, { useContext, useState, useCallback, useEffect } from "react";
import Tab from "../../Shared/Tab";

import Navbar from "../../Shared/Navbar";
import { GlobalState } from "../../main";
import useAPI from "../../Hooks/useAPI";

const Notification = () => {
    const [currentState, setCurrentState] = useContext(GlobalState);
    const [users, setUsers] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [countLength, setCountLength] = useState(jobs.length + users.length);
    const api = useAPI();

    // Update countLength whenever jobs or users change
    useEffect(() => {
        setCountLength((jobs?.length || 0) + (users?.length || 0));
    }, [jobs, users]);

    // Helper to get dismissed IDs from localStorage
    const getDismissedIds = () => {
        const stored = localStorage.getItem("dismissedNotifications");
        return stored ? JSON.parse(stored) : [];
    };

    const removeJob = (index, id) => {
        // Optimistic UI update
        const updatedJobs = [...jobs];
        updatedJobs.splice(index, 1);
        setJobs(updatedJobs);

        // Persist to localStorage
        const dismissed = getDismissedIds();
        if (id && !dismissed.includes(id)) {
            dismissed.push(id);
            localStorage.setItem(
                "dismissedNotifications",
                JSON.stringify(dismissed),
            );
        }
    };

    const removeUser = (index, id) => {
        // Optimistic UI update
        const updatedUsers = [...users];
        updatedUsers.splice(index, 1);
        setUsers(updatedUsers);

        // Persist to localStorage
        const dismissed = getDismissedIds();
        if (id && !dismissed.includes(id)) {
            dismissed.push(id);
            localStorage.setItem(
                "dismissedNotifications",
                JSON.stringify(dismissed),
            );
        }
    };

    console.log(jobs);

    const cid = localStorage.getItem("id");
    const fetchJobs = useCallback(async () => {
        const data = await api.getREQUEST(`applied-users/${cid}`);
        if (data && Array.isArray(data)) {
            const dismissed = getDismissedIds();
            // Filter out any jobs whose _id is in the dismissed list
            const filtered = data.filter(
                (item) => !dismissed.includes(item._id),
            );
            setJobs(filtered);
        }
    });

    const fetchUsers = useCallback(async () => {
        const data = await api.getREQUEST(`getConnections/${cid}`);
        if (data && Array.isArray(data)) {
            const dismissed = getDismissedIds();
            // Filter out any users whose _id is in the dismissed list
            const filtered = data.filter(
                (item) => !dismissed.includes(item._id),
            );
            setUsers(filtered);
        }
    });

    useEffect(() => {
        fetchJobs();
        fetchUsers();
    }, []);
    return (
        <>
            <div className="flex flex-col min-h-screen bg-[#f8fafc] w-[calc(100%-280px)] ml-[280px] transition-[margin,width] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] box-border max-[991px]:ml-0 max-[991px]:w-full">
                <Navbar left={`Hello 👋 ${currentState.HRDetail.Name}!`} />
                <div className="py-6 px-8 max-md:p-4">
                    <Tab
                        tabName={"Notifications"}
                        action={
                            <>
                                <span className="fs-5 fw-bold text-primary">
                                    {countLength}
                                </span>
                            </>
                        }
                    ></Tab>

                    {!jobs && !users && (
                        <div className="alert alert-secondary text-center mt-4">
                            No notifications found
                        </div>
                    )}

                    <div className="mt-4">
                        {Array.isArray(jobs) &&
                            jobs?.map((e, index) => {
                                return (
                                    <div
                                        key={e._id || index}
                                        className={`d-flex justify-content-between align-items-center border-none shadow-[0_2px_4px_rgba(0,0,0,0.05)] rounded-xl p-[1rem_1.5rem] mb-4 bg-white border-l-4 text-[#334155] transition-transform duration-200 ease hover:translate-x-1 border-[#10b981]`}
                                    >
                                        <span className="fw-medium">
                                            <i className="fa-solid fa-briefcase text-success me-2"></i>
                                            <strong>
                                                {e?.userId?.firstName}{" "}
                                                {e?.userId?.lastName}
                                            </strong>{" "}
                                            has applied for the{" "}
                                            <strong>{e?.jobId?.Title}</strong>{" "}
                                            position.
                                        </span>
                                        <span
                                            onClick={() =>
                                                removeJob(index, e._id)
                                            }
                                            className="w-8 h-8 flex items-center justify-center rounded-full transition-colors duration-200 text-[#94a3b8] hover:bg-[#fee2e2] hover:text-[#ef4444]"
                                            role="button"
                                            title="Dismiss"
                                        >
                                            <i className="fa fa-close"></i>
                                        </span>
                                    </div>
                                );
                            })}
                        {Array.isArray(users) &&
                            users?.map((e, index) => {
                                return (
                                    <div
                                        key={e._id || index}
                                        className={`d-flex justify-content-between align-items-center border-none shadow-[0_2px_4px_rgba(0,0,0,0.05)] rounded-xl p-[1rem_1.5rem] mb-4 bg-white border-l-4 text-[#334155] transition-transform duration-200 ease hover:translate-x-1 border-[#3b82f6]`}
                                    >
                                        <span className="fw-medium">
                                            <i className="fa-solid fa-user-plus text-primary me-2"></i>
                                            You've gained a new connection:{" "}
                                            <strong>
                                                {e?.firstName} {e?.lastName}
                                            </strong>
                                        </span>
                                        <span
                                            onClick={() =>
                                                removeUser(index, e._id)
                                            }
                                            className="w-8 h-8 flex items-center justify-center rounded-full transition-colors duration-200 text-[#94a3b8] hover:bg-[#fee2e2] hover:text-[#ef4444]"
                                            role="button"
                                            title="Dismiss"
                                        >
                                            <i className="fa fa-close"></i>
                                        </span>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Notification;

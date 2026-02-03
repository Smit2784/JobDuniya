import React, { useCallback, useContext, useEffect, useState } from "react";
import Tab from "../../Shared/Tab";
import css from "../Dashboard/dashboard.module.css";
import "../Connections/style.css";
import { ActiveModal } from "../../main";
import useAPI from "../../Hooks/useAPI";
import { RefreshState } from "../../App";
import { GlobalState } from "../../main";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const Applications = () => {
    const [items, setItems] = useState([]);
    const [currentState, setCurrentState] = useContext(GlobalState);
    const [isRefreshing, setIsRefreshing] = useContext(RefreshState);
    const api = useAPI();
    const [activeModalState, setActiveModalState] = useContext(ActiveModal);
    // defined inside useEffect to avoid dependency issues with unstable 'api' object
    useEffect(() => {
        let isMounted = true;
        const fetchApplications = async () => {
            const cid = localStorage.getItem("id");
            if (!cid) return;

            // api.getREQUEST updates internal state, triggering re-renders.
            // We must ensure this runs only once.
            const data = await api.getREQUEST(`applied-users/${cid}`);

            if (isMounted) {
                if (Array.isArray(data)) {
                    setItems(data);
                } else if (data) {
                    setItems([]);
                }
            }
        };
        fetchApplications();
        return () => {
            isMounted = false;
        };
    }, []); // LEAVE EMPTY: api dependency causes infinite loop due to internal state updates

    const handleDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const result = await api.deleteREQUEST(
                        "delete",
                        "jobapplications",
                        {
                            _id: id,
                        },
                    );

                    // useAPI returns the JSON body or an error object.
                    // It does NOT return a Response object with .ok property.
                    if (
                        result &&
                        !result.message
                            ?.toString()
                            .toLowerCase()
                            .includes("error")
                    ) {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your Application has been deleted.",
                            icon: "success",
                        });
                        // Update UI locally to avoid refetching issues
                        setItems((prev) =>
                            prev.filter((item) => item._id !== id),
                        );
                    } else {
                        // Fallback error handling if the API returns an error object
                        toast.error(
                            result.message || "Failed to delete application",
                        );
                    }
                } catch (error) {
                    console.error("Error deleting application:", error);
                    toast.error("An unexpected error occurred");
                }
            }
        });
    };

    return (
        <div className={css.applicationsSection}>
            <div className={css.tableHeader}>
                <div className={css.sectionTitle}>
                    <i className="fa-solid fa-list-ul"></i>
                    Recent Applications
                </div>
                <div className={css.badgeCount}>{items.length} Total</div>
            </div>

            <div className={css.tableContainer}>
                <table className={css.modernTable}>
                    <thead>
                        <tr>
                            <th>Applicant</th>
                            <th>Contact</th>
                            <th>Position</th>
                            <th>Resume</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    {isRefreshing && (
                        <tbody>
                            <tr>
                                <td colSpan={5} className="text-center p-3">
                                    <div
                                        className="spinner-border text-primary"
                                        role="status"
                                    >
                                        <span className="visually-hidden">
                                            Loading...
                                        </span>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    )}

                    <tbody>
                        {items.length > 0 ? (
                            items.map((e) => (
                                <tr key={e._id}>
                                    <td>
                                        <div className={css.userCell}>
                                            <img
                                                src={`${e?.userId?.profileImage}`}
                                                alt="User"
                                                onError={(e) => {
                                                    e.target.onerror = null; // Prevent infinite loop
                                                    e.target.src =
                                                        "https://w7.pngwing.com/pngs/695/655/png-transparent-head-the-dummy-avatar-man-tie-jacket-user.png";
                                                }}
                                                className={css.avatar}
                                            />
                                            <div className={css.userInfo}>
                                                <h6>
                                                    {e?.userId?.firstName}{" "}
                                                    {e?.userId?.lastName}
                                                </h6>
                                                <p>{e?.userId?.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span className="text-muted small">
                                            {e?.userId?.email}
                                        </span>
                                    </td>
                                    <td>
                                        <span className="badge bg-light text-dark border">
                                            {e?.jobId?.Title || "N/A"}
                                        </span>
                                    </td>
                                    <td>
                                        <a
                                            href={e?.cv}
                                            download={true}
                                            target="_blank"
                                            rel="noreferrer"
                                            className={css.btnDownload}
                                        >
                                            <i className="fa-solid fa-file-pdf"></i>
                                        </a>
                                    </td>
                                    <td>
                                        <div className={css.actionGroup}>
                                            <button
                                                type="button"
                                                className={`${css.iconBtn} ${css.btnView}`}
                                                title="View Profile"
                                                onClick={() => {
                                                    if (e?.userId) {
                                                        setActiveModalState(
                                                            "profileViewOfConnections",
                                                        );
                                                        localStorage.setItem(
                                                            "connectionId",
                                                            JSON.stringify(
                                                                e?.userId,
                                                            ),
                                                        );
                                                    } else {
                                                        toast.error(
                                                            "User profile not found",
                                                        );
                                                    }
                                                }}
                                            >
                                                <i className="fa-solid fa-user"></i>
                                            </button>

                                            <button
                                                type="button"
                                                className={`${css.iconBtn} ${css.btnEmail}`}
                                                title="Send Email"
                                                onClick={() => {
                                                    localStorage.setItem(
                                                        "mailTo",
                                                        e?.email,
                                                    );
                                                    localStorage.setItem(
                                                        "mailFrom",
                                                        currentState?.Email,
                                                    );
                                                    setActiveModalState(
                                                        "sendmail",
                                                    );
                                                }}
                                            >
                                                <i className="fa-regular fa-envelope"></i>
                                            </button>

                                            <button
                                                type="button"
                                                className={`${css.iconBtn} ${css.btnDelete}`}
                                                title="Delete"
                                                onClick={() =>
                                                    handleDelete(e?._id)
                                                }
                                            >
                                                <i className="fa-solid fa-trash"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="text-center p-5">
                                    <div className="text-muted d-flex flex-column align-items-center">
                                        <i className="fa-regular fa-folder-open fs-2 mb-2"></i>
                                        <span>No Applications Found</span>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Applications;

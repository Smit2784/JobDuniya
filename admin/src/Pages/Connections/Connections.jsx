import React, { useContext, useEffect, useState } from "react";
import Tab from "../../Shared/Tab";
import css from "../Dashboard/dashboard.module.css";
import useAPI from "../../Hooks/useAPI";
import { ActiveModal } from "../../main";
import { GlobalState } from "../../main";
import Navbar from "../../Shared/Navbar";
import { toast } from "react-toastify";

const Connections = () => {
    const api = useAPI();
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeModalState, setActiveModalState] = useContext(ActiveModal);
    const [currentState, setCurrentState] = useContext(GlobalState);
    const id = localStorage.getItem("id");

    // Fix: Moved fetch logic inside useEffect with empty dependency array to prevent infinite loop
    useEffect(() => {
        let isMounted = true;
        const fetchConnections = async () => {
            if (!id) return;
            try {
                const data = await api.getREQUEST(`getConnections/${id}`);
                if (isMounted) {
                    if (Array.isArray(data)) {
                        setItems(data);
                    } else {
                        setItems([]);
                    }
                    setIsLoading(false);
                }
            } catch (error) {
                console.error("Error fetching connections:", error);
                if (isMounted) setIsLoading(false);
            }
        };

        fetchConnections();

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <div className={css.dashboardContainer}>
            <Navbar
                left={`Hello 👋 ${currentState?.HRDetail?.Name || "User"}!`}
            />
            <Tab tabName={`Connections`} />

            <div
                className={css.applicationsSection}
                style={{ marginTop: "20px" }}
            >
                <div className={css.tableHeader}>
                    <div className={css.sectionTitle}>
                        <i className="fa-solid fa-users"></i>
                        My Connections
                    </div>
                    <div className={css.badgeCount}>{items.length} Total</div>
                </div>

                <div className={css.tableContainer}>
                    <table className={css.modernTable}>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Location</th>
                                <th>Profession</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <tr>
                                    <td colSpan={4} className="text-center p-4">
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
                            ) : items.length > 0 ? (
                                items.map((e) => (
                                    <tr key={e._id || Math.random()}>
                                        <td>
                                            <div className={css.userCell}>
                                                <img
                                                    src={`${e.profileImage}`}
                                                    alt=""
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src =
                                                            "https://w7.pngwing.com/pngs/695/655/png-transparent-head-the-dummy-avatar-man-tie-jacket-user.png";
                                                    }}
                                                    className={css.avatar}
                                                />
                                                <div className={css.userInfo}>
                                                    <h6>
                                                        {e.firstName}{" "}
                                                        {e.lastName}
                                                    </h6>
                                                    <p>{e.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="text-muted">
                                                {e.location &&
                                                e?.location[0]?.city
                                                    ? `${e.location[0].city}, ${e.location[0].state}`
                                                    : "N/A"}
                                            </span>
                                        </td>
                                        <td>
                                            <span className="badge bg-light text-dark border">
                                                {e.profession || "N/A"}
                                            </span>
                                        </td>
                                        <td>
                                            <div className={css.actionGroup}>
                                                <button
                                                    type="button"
                                                    className={`${css.iconBtn} ${css.btnView}`}
                                                    title="View Profile"
                                                    onClick={() => {
                                                        setActiveModalState(
                                                            "profileViewOfConnections",
                                                        );
                                                        localStorage.setItem(
                                                            "connectionId",
                                                            JSON.stringify(e),
                                                        );
                                                    }}
                                                >
                                                    <i className="fa-solid fa-user"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="text-center p-5">
                                        <div className="text-muted d-flex flex-column align-items-center">
                                            <i className="fa-regular fa-face-frown fs-2 mb-2 text-danger"></i>
                                            <span>No Connections Found!</span>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Connections;

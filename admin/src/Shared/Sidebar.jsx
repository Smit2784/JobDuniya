import React, { useContext } from "react";
import { RenderPage } from "../Pages/Dashboard/Root";
import { RenderScreen } from "../App";
import css from "./sidebar.module.css";
import logo from "../Images/logoFooter.png";

const Sidebar = () => {
    const [page, setPage] = useContext(RenderPage);
    const [screen, setScreen] = useContext(RenderScreen);

    return (
        <div className={css.sidebar}>
            <div className={css.containerSIDE}>
                <div className={css.links}>
                    <div className={css.linksMenuLogo}>
                        <img src={logo} className={css.logoImage} alt="Logo" />
                    </div>

                    <div
                        onClick={() => setPage("dashboard")}
                        className={`${css.linksMenus} ${page === "dashboard" ? css.activeLink : ""}`}
                    >
                        <i className="fa fa-dashboard"></i>
                        <span className={css.linkTitle}>Dashboard</span>
                        <i className="fa-solid fa-angle-right"></i>
                    </div>

                    <div
                        onClick={() => setPage("Connections")}
                        className={`${css.linksMenus} ${page === "Connections" ? css.activeLink : ""}`}
                    >
                        <i className="fa fa-users"></i>
                        <span className={css.linkTitle}>Connections</span>
                        <i className="fa-solid fa-angle-right"></i>
                    </div>

                    <div
                        onClick={() => setPage("profile")}
                        className={`${css.linksMenus} ${page === "profile" ? css.activeLink : ""}`}
                    >
                        <i className="fa fa-user"></i>
                        <span className={css.linkTitle}>Profile</span>
                        <i className="fa-solid fa-angle-right"></i>
                    </div>

                    <div
                        onClick={() => setPage("jobs")}
                        className={`${css.linksMenus} ${page === "jobs" ? css.activeLink : ""}`}
                    >
                        <i className="fa fa-briefcase"></i>
                        <span className={css.linkTitle}>My Jobs</span>
                        <i className="fa-solid fa-angle-right"></i>
                    </div>

                    <div
                        onClick={() => setPage("notifications")}
                        className={`${css.linksMenus} ${page === "notifications" ? css.activeLink : ""}`}
                    >
                        <i className="fa fa-bell"></i>
                        <span className={css.linkTitle}>Notifications</span>
                        <i className="fa-solid fa-angle-right"></i>
                    </div>
                </div>

                <div className={css.logoutSection}>
                    <div
                        className={css.linksMenusLast}
                        onClick={() => {
                            localStorage.clear();
                            setScreen("signin");
                        }}
                    >
                        <i className="fa-solid fa-right-from-bracket"></i>
                        <span className={css.linkTitleLogOut}>Log out</span>
                        <i
                            className="fa-solid fa-angle-left"
                            style={{ opacity: 0 }}
                        ></i>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;

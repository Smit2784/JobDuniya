import React, { useContext, useEffect } from "react";
import { RenderPage } from "../Pages/Dashboard/Root";
import { RenderScreen } from "../App";
import css from "../Shared/shared.module.css"
import logo from "../Images/logoFooter.png";
import icon from "../Images/white-icon.png";

const Sidebar = () => {
    const [page, setPage] = useContext(RenderPage);
    const [screen, setScreen] = useContext(RenderScreen);

    return (
        <>
            <div class="sidebar">
                <div className="containerSIDE">

                    <div className="links">
                        <div className="links--menu--logo">
                            <img src={logo} className="img-fluid lg" style={{width:"100%"}} alt="" />
                        </div>
                        <div
                            onClick={() => {
                                setPage("dashboard");
                            }}
                            className={`links--menus ${page === `dashboard` ? "activeLink" : ""
                                }`}
                        >
                            <i className="fa fa-dashboard"></i>
                            <span className="linkTitle">Dashboard</span>
                            <i class="fa-solid fa-angle-right"></i>
                        </div>
                        <div
                            onClick={() => setPage("Connections")}
                            className={`links--menus   ${page === `Connections` ? "activeLink" : ""
                                }`}
                        >
                            <i className="fa fa-users"></i>
                            <span className="linkTitle">Connections</span>
                            <i class="fa-solid fa-angle-right"></i>
                        </div>
                        <div
                            onClick={() => setPage("profile")}
                            className={`links--menus  ${page === `profile` ? "activeLink" : ""
                                } `}
                        >
                            <i className="fa fa-user"></i>
                            <span className="linkTitle">Profile</span>
                            <i class="fa-solid fa-angle-right"></i>
                        </div>
                        <div
                            onClick={() => setPage("jobs")}
                            className={`links--menus  ${page === `jobs` ? "activeLink" : ""
                                }`}
                        >
                            <i className="fa fa-briefcase"></i>
                            <span className="linkTitle">My Jobs</span>
                            <i class="fa-solid fa-angle-right"></i>
                        </div>
                        <div
                            onClick={() => setPage("notifications")}
                            className={`links--menus  ${page === `notifications` ? "activeLink" : ""
                                } `}
                        >
                            <i className="fa fa-bell"></i>
                            <span className="linkTitle">Notifications</span>
                            <i class="fa-solid fa-angle-right"></i>
                        </div>
                    </div>
                    <div>
                        <div
                            className={`links--menusLast   ${page === `users` ? "activeLink" : ""
                                }`}
                            onClick={() => {
                                localStorage.clear();
                                setScreen("signin");
                            }}

                        >
                            <i
                                class="fa-solid fa-outdent"
                                style={{ color: "red" }}
                            ></i>
                            <span
                                className="linkTitleLogOut"

                            >
                                Log out
                            </span>
                            <i class="fa-solid fa-angle-left"></i>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;

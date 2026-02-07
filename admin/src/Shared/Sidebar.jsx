import React, { useContext } from "react";
import { RenderPage } from "../Pages/Dashboard/Root";
import { RenderScreen } from "../App";
import logo from "../Images/logoFooter.png";

const Sidebar = () => {
    const [page, setPage] = useContext(RenderPage);
    const [screen, setScreen] = useContext(RenderScreen);

    const linkClass =
        "group flex items-center py-[0.8rem] px-[1.2rem] rounded-lg cursor-pointer font-medium font-['Inter',_sans-serif] transition-all duration-200 no-underline relative overflow-hidden max-[900px]:justify-center max-[900px]:w-[50px] max-[900px]:h-[50px] max-[900px]:p-0 max-[900px]:rounded-xl";
    const activeLinkClass = "bg-[#e0f2fe] text-[#0284c7] font-semibold";
    const inactiveLinkClass =
        "text-[#64748b] hover:bg-[#f1f5f9] hover:text-[#23a6f0]";
    const iconClass =
        "text-[1.2rem] w-[30px] text-center mr-[10px] max-[900px]:m-0 max-[900px]:text-[1.4rem]";
    const arrowClass =
        "fa-solid fa-angle-right text-[0.8rem] opacity-0 transition-all duration-200 ease-in-out group-hover:opacity-100 group-hover:translate-x-[3px] max-[900px]:hidden";

    return (
        <div className="w-[280px] h-screen bg-white shadow-[4px_0_10px_rgba(0,0,0,0.05)] fixed top-0 left-0 z-[1001] flex flex-col justify-between transition-all duration-300 border-r border-[#edf2f7] max-[900px]:w-[80px] max-[900px]:p-0 max-[900px]:items-center">
            <div className="flex flex-col h-full py-6 px-4 max-[900px]:p-2 max-[900px]:w-full max-[900px]:items-center">
                <div className="flex flex-col gap-2 grow">
                    <div className="mb-10 px-4 text-center max-[900px]:p-0 max-[900px]:mb-8">
                        <img
                            src={logo}
                            className="max-w-[140px] h-auto object-contain max-[900px]:w-[40px]"
                            alt="Logo"
                        />
                    </div>

                    <div
                        onClick={() => setPage("dashboard")}
                        className={`${linkClass} ${page === "dashboard" ? activeLinkClass : inactiveLinkClass}`}
                    >
                        <i
                            className={`fa fa-dashboard ${iconClass} ${page === "dashboard" ? "text-[#0284c7]" : ""}`}
                        ></i>
                        <span className="grow text-[0.95rem] max-[900px]:hidden">
                            Dashboard
                        </span>
                        <i className={arrowClass}></i>
                    </div>

                    <div
                        onClick={() => setPage("Connections")}
                        className={`${linkClass} ${page === "Connections" ? activeLinkClass : inactiveLinkClass}`}
                    >
                        <i
                            className={`fa fa-users ${iconClass} ${page === "Connections" ? "text-[#0284c7]" : ""}`}
                        ></i>
                        <span className="grow text-[0.95rem] max-[900px]:hidden">
                            Connections
                        </span>
                        <i className={arrowClass}></i>
                    </div>

                    <div
                        onClick={() => setPage("profile")}
                        className={`${linkClass} ${page === "profile" ? activeLinkClass : inactiveLinkClass}`}
                    >
                        <i
                            className={`fa fa-user ${iconClass} ${page === "profile" ? "text-[#0284c7]" : ""}`}
                        ></i>
                        <span className="grow text-[0.95rem] max-[900px]:hidden">
                            Profile
                        </span>
                        <i className={arrowClass}></i>
                    </div>

                    <div
                        onClick={() => setPage("jobs")}
                        className={`${linkClass} ${page === "jobs" ? activeLinkClass : inactiveLinkClass}`}
                    >
                        <i
                            className={`fa fa-briefcase ${iconClass} ${page === "jobs" ? "text-[#0284c7]" : ""}`}
                        ></i>
                        <span className="grow text-[0.95rem] max-[900px]:hidden">
                            My Jobs
                        </span>
                        <i className={arrowClass}></i>
                    </div>

                    <div
                        onClick={() => setPage("notifications")}
                        className={`${linkClass} ${page === "notifications" ? activeLinkClass : inactiveLinkClass}`}
                    >
                        <i
                            className={`fa fa-bell ${iconClass} ${page === "notifications" ? "text-[#0284c7]" : ""}`}
                        ></i>
                        <span className="grow text-[0.95rem] max-[900px]:hidden">
                            Notifications
                        </span>
                        <i className={arrowClass}></i>
                    </div>
                </div>

                <div className="mt-auto border-t border-[#f1f5f9] pt-4">
                    <div
                        className="flex items-center py-[0.8rem] px-[1.2rem] rounded-lg cursor-pointer text-[#ef4444] font-semibold font-['Inter',_sans-serif] transition-all duration-200 hover:bg-[#fef2f2] max-[900px]:justify-center max-[900px]:w-[50px] max-[900px]:h-[50px] max-[900px]:p-0 max-[900px]:rounded-xl"
                        onClick={() => {
                            localStorage.clear();
                            setScreen("signin");
                        }}
                    >
                        <i className="fa-solid fa-right-from-bracket text-[1.2rem] w-[30px] text-center mr-[10px] text-[#ef4444] max-[900px]:m-0 max-[900px]:text-[1.4rem]"></i>
                        <span className="grow text-[0.95rem] max-[900px]:hidden">
                            Log out
                        </span>
                        <i className="fa-solid fa-angle-left text-[0.8rem] opacity-0"></i>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;

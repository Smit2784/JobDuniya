import React, { useCallback, useContext, useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "animate.css";
import { ActiveModal } from "../..";
import img from "../../logo/2.png";
import { act } from "react-dom/test-utils";
import Notifications from "./Notifications";
import GlobalModel from "../../Global/GlobalModel";
const Header = () => {
    const navigate = useNavigate();
    const [activeModalState, setActiveModalState] = useContext(ActiveModal);
    const [active, setActive] = useState(false);
    const [visible, setVisible] = useState(false);

    const performLogOut = () => {
        const ok = window.confirm("Are you sure?");
        if (ok) {
            Cookies.remove("token");
            navigate("/loginascompany");
        } else {
            navigate(window.location.pathname);
        }
    };

    const navLinkClass =
        "font-[Inter] text-[0.95rem] font-medium text-slate-700 px-2 py-2 rounded-md transition-all duration-200 no-underline bg-transparent border-none cursor-pointer flex items-center gap-2 hover:text-blue-600 hover:bg-slate-40";
    const navLinkActiveClass =
        "font-[Inter] text-[0.95rem] font-medium px-2 py-2 rounded-md transition-all duration-200 no-underline bg-blue-600/10 border-none cursor-pointer flex items-center gap-2 text-blue-600 font-semibold";
    const navLinkBoxClass =
        "h-full flex items-center relative mx-1";

    return (
        <>
            <div className="w-full h-[70px] fixed top-0 left-0 bg-white/85 backdrop-blur-md border-b border-black/5 z-1000 flex items-center shadow-sm transition-all duration-300">
                <div className="w-full max-w-[1280px] mx-auto px-6 h-full flex justify-between items-center">
                    <div className="flex gap-0.5 items-center justify-center">
                        <img
                            src={img}
                            alt="Logo"
                            className="w-[170px] md:w-[400px] mr-2.5 mix-blend-darken"
                        />
                    </div>
                    <div className="hidden md:flex justify-start gap-2.5 w-full items-center ml-2.5">
                        <div
                            className={
                                window.location.pathname === `/`
                                    ? navLinkActiveClass
                                    : navLinkBoxClass
                            }
                        >
                            <Link className={navLinkClass} to={"/"}>
                                Home
                            </Link>
                        </div>
                        <div
                            className={
                                window.location.pathname === `/network`
                                    ? navLinkActiveClass
                                    : navLinkBoxClass
                            }
                        >
                            <Link className={navLinkClass} to={"/network"}>
                                My Network
                            </Link>
                        </div>
                        <div
                            className={
                                window.location.pathname === `/jobs`
                                    ? navLinkActiveClass
                                    : navLinkBoxClass
                            }
                        >
                            <Link className={navLinkClass} to={"/jobs"}>
                                Jobs
                            </Link>
                        </div>
                    </div>
                    <div className="w-full hidden lg:flex justify-end items-center">
                        <div className="min-h-0 flex justify-start gap-2 items-center">
                            <div
                                className={
                                    window.location.pathname === `/search`
                                        ? navLinkActiveClass
                                        : navLinkBoxClass
                                }
                            >
                                <Link className={navLinkClass} to={"/search"}>
                                    <i class="fa-solid fa-search"></i>
                                </Link>
                            </div>
                            <div
                                className={
                                    window.location.pathname === `/saved`
                                        ? navLinkActiveClass
                                        : navLinkBoxClass
                                }
                            >
                                <Link
                                    className={`${navLinkClass} `}
                                    to={"/saved"}
                                >
                                    <i class="fa-solid fa-bookmark"></i>
                                </Link>
                            </div>
                            {/* <div className={`${navLinkBoxClass}`}>
                                <button className={navLinkClass} onClick={()=>setActiveModalState("notifications")}>
                                    <i class="fa-solid fa-bell"></i>
                                </button>
                            </div> */}
                            <div
                                className={
                                    window.location.pathname === `/profile`
                                        ? navLinkActiveClass
                                        : navLinkBoxClass
                                }
                            >
                                <Link
                                    className={`${navLinkClass} `}
                                    to={"/profile"}
                                >
                                    <i class="fa-solid fa-user"></i>
                                </Link>
                            </div>
                            <div className="h-6 w-px bg-slate-200 mx-2"></div>
                            <div className={`${navLinkBoxClass}`}>
                                <Link
                                    className="whitespace-nowrap tracking-wide text-lg text-[#343434] font-thin transition-colors duration-200 p-2.5 hover:text-black"
                                    to={"http://localhost:5173/"}
                                    target="_blank"
                                >
                                    Employers/Post job
                                </Link>
                            </div>
                        </div>
                    </div>
                    {
                        <div className="w-full flex justify-end items-center lg:hidden">
                            <div className="justify-end flex gap-2 items-center">
                                <div
                                    className={
                                        window.location.pathname ===
                                        `/notificaitons`
                                            ? navLinkActiveClass
                                            : navLinkBoxClass
                                    }
                                >
                                    <button className={navLinkClass}>
                                        <i class="fa-solid fa-bell"></i>
                                    </button>
                                </div>
                                <div
                                    className={
                                        window.location.pathname == `/profile`
                                            ? navLinkActiveClass
                                            : navLinkBoxClass
                                    }
                                >
                                    <Link
                                        className={navLinkClass}
                                        to={"/profile"}
                                    >
                                        <i class="fa-solid fa-user"></i>
                                    </Link>
                                </div>
                                <div className="h-6 w-px bg-slate-200 mx-2"></div>
                                <div className="h-full flex items-center relative mx-1">
                                    <div
                                        className="h-full flex items-center relative mx-1 cursor-pointer"
                                        onClick={() => {
                                            setActive(!active);
                                        }}
                                    >
                                        <span className="whitespace-nowrap tracking-wide text-lg w-fit p-2.5 text-[#343434] text-left font-thin transition-colors duration-200">
                                            {active ? (
                                                <i class="fa-solid fa-xmark"></i>
                                            ) : (
                                                <i class="fa-solid fa-bars"></i>
                                            )}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
            {active && (
                <div className="flex justify-evenly items-center fixed bottom-0 left-0 w-full z-1000 h-[100px] bg-white/85 backdrop-blur-md animate__animated animate__slideInUp animate__faster lg:hidden">
                    <div
                        className={
                            window.location.pathname == `/`
                                ? navLinkActiveClass
                                : navLinkBoxClass
                        }
                    >
                        <Link className={navLinkClass} to={"/"}>
                            <i class="fa-solid fa-home"></i>
                        </Link>
                    </div>
                    <div
                        className={
                            window.location.pathname == `/jobs`
                                ? navLinkActiveClass
                                : navLinkBoxClass
                        }
                    >
                        <Link className={navLinkClass} to={"/jobs"}>
                            <i class="fa-solid fa-briefcase"></i>
                        </Link>
                    </div>
                    <div
                        className={
                            window.location.pathname == `/saved`
                                ? navLinkActiveClass
                                : navLinkBoxClass
                        }
                    >
                        <Link className={navLinkClass} to={"/saved"}>
                            <i class="fa-solid fa-bookmark"></i>
                        </Link>
                    </div>
                    <div
                        className={
                            window.location.pathname == `/profile`
                                ? navLinkActiveClass
                                : navLinkBoxClass
                        }
                    >
                        <Link className={navLinkClass} to={"/network"}>
                            <i class="fa-solid fa-users"></i>
                        </Link>
                    </div>
                    <div
                        className={
                            window.location.pathname == `/search`
                                ? navLinkActiveClass
                                : navLinkBoxClass
                        }
                    >
                        <Link className={navLinkClass} to={"/search"}>
                            <i class="fa-solid fa-search"></i>
                        </Link>
                    </div>
                </div>
            )}
        </>
    );
};

export default Header;

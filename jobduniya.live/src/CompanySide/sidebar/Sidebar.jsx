import React, { useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
const Sidebar = () => {
    const naviget = useNavigate();
    useEffect(() => {
        const token = Cookies.get("token");
        if (!token) {
            naviget("/companylogin");
        }
    });
    return (
        <>
            <main className="flex w-full">
                <header>
                    <nav
                        id="sidebarMenu"
                        style={{ marginTop: "80px" }}
                        className="hidden lg:block bg-white h-full fixed left-0 top-0 overflow-y-auto w-60 shadow-xl z-10 transition-transform -translate-x-full lg:translate-x-0"
                    >
                        <div className="sticky top-0">
                            <div className="flex flex-col mx-3 bg-[#23a5f0c5] hover:bg-[#23A6F0] text-[#FAFAFA] rounded-sm mt-4">
                                <Link
                                    to={"/companyprofile"}
                                    className="whitespace-nowrap block px-4 py-2 border-b border-white/10 text-white hover:text-white"
                                >
                                    <i className="fa fa-tachometer-alt me-3 text-white"></i>
                                    <span className="text-white">
                                        Main dashboard
                                    </span>
                                </Link>
                                <Link
                                    to={"/joblisting"}
                                    className="whitespace-nowrap block px-4 py-2 border-b border-white/10 text-white hover:text-white"
                                >
                                    <i class="fa-solid fa-briefcase me-3 text-white"></i>
                                    <span className="text-white">
                                        Job Listings
                                    </span>
                                </Link>
                                {/* <Link to={"/"} className='className="text-nowrap  list-group-item  py-2"'>
                                    <i className='fa fa-plus text-light me-3 '></i><span className='text-light'>Post a job</span>
                                </Link> */}
                            </div>
                        </div>
                    </nav>
                    <Navbar />
                </header>
                <Outlet />
            </main>
        </>
    );
};

export default Sidebar;

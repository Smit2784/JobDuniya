import React, { useContext } from "react";
import { ToggleEdit } from "../Common/profile";
import { ActiveModal } from "../..";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
// import css from "../../Style/profile.module.css";

const SensetiveInfo = ({ personalAddress, langauge, lnc, ln }) => {
    const [activeModalState, setActiveModalState] = useContext(ActiveModal);
    const [isEditProfile, setIsEditProfile] = useContext(ToggleEdit);
    const navigate = useNavigate();

    const performLogOut = () => {
        const ok = window.confirm("Are you sure?");
        if (ok) {
            Cookies.remove("token");
            navigate("/loginasuser");
        } else {
            navigate(window.location.pathname);
        }
    };

    return (
        <div className="p-8">
            <div className="flex justify-around items-center mb-8 pb-8 border-b border-slate-100/80 gap-4 flex-wrap">
                <div
                    className="cursor-pointer group flex flex-row items-center gap-4"
                    onClick={() => setActiveModalState("Followers")}
                >
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-100 transition-all duration-300 group-hover:shadow-[0_4px_12px_rgb(59,130,246,0.2)] shrink-0">
                        <i className="fa-solid fa-users text-blue-500 text-xl transition-colors duration-300"></i>
                    </div>
                    <div className="flex flex-col text-left">
                        <span className="block text-2xl font-black text-slate-800 tracking-tight group-hover:text-blue-600 transition-colors">
                            0
                        </span>
                        <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider mt-0.5">
                            Followers
                        </span>
                    </div>
                </div>
                <div
                    className="cursor-pointer group flex flex-row items-center gap-4"
                    onClick={() => setActiveModalState("Followings")}
                >
                    <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center group-hover:scale-110 group-hover:bg-indigo-100 transition-all duration-300 group-hover:shadow-[0_4px_12px_rgb(99,102,241,0.2)] shrink-0">
                        <i className="fa-solid fa-user-plus text-indigo-500 text-xl transition-colors duration-300"></i>
                    </div>
                    <div className="flex flex-col text-left">
                        <span className="block text-2xl font-black text-slate-800 tracking-tight group-hover:text-indigo-600 transition-colors">
                            {ln || 0}
                        </span>
                        <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider mt-0.5">
                            Following
                        </span>
                    </div>
                </div>
                <div
                    className="cursor-pointer group flex flex-row items-center gap-4"
                    onClick={() => setActiveModalState("connections")}
                >
                    <div className="w-14 h-14 rounded-2xl bg-purple-50 flex items-center justify-center group-hover:scale-110 group-hover:bg-purple-100 transition-all duration-300 group-hover:shadow-[0_4px_12px_rgb(168,85,247,0.2)] shrink-0">
                        <i className="fa-solid fa-link text-purple-500 text-xl transition-colors duration-300"></i>
                    </div>
                    <div className="flex flex-col text-left">
                        <span className="block text-2xl font-black text-slate-800 tracking-tight group-hover:text-purple-600 transition-colors">
                            {lnc || 0}
                        </span>
                        <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider mt-0.5">
                            Connections
                        </span>
                    </div>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button
                    type="button"
                    className="w-full sm:flex-1 bg-linear-to-r from-blue-500 to-indigo-600 text-white border-0 py-3.5 px-4 rounded-xl! font-bold text-sm cursor-pointer transition-all hover:scale-[1.02] hover:shadow-[0_8px_20px_rgb(59,130,246,0.3)] relative overflow-hidden group flex items-center justify-center gap-2"
                    onClick={() => setIsEditProfile(true)}
                >
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
                    <i className="fa-solid fa-pen-to-square relative z-10"></i> 
                    <span className="relative z-10">Edit Profile</span>
                </button>

                <div className="w-full sm:flex-1 relative group">
                    <label
                        htmlFor="fileReader"
                        className="w-full h-full flex items-center justify-center gap-2 m-0 bg-white text-slate-700 border-2 border-slate-200 py-3.5 px-4 rounded-xl! font-bold text-sm cursor-pointer transition-all hover:border-indigo-400 hover:text-indigo-600 hover:shadow-md"
                    >
                        <i className="fa-solid fa-file-arrow-up text-lg"></i>
                        <span>Upload Resume</span>
                    </label>
                    <input type="file" id="fileReader" className="hidden" />
                </div>

                <button
                    type="button"
                    className="w-full sm:flex-1 bg-red-50/50 text-red-600 border border-red-200/50 py-3.5 px-4 rounded-xl! font-bold text-sm cursor-pointer transition-all hover:bg-red-500 hover:text-white hover:border-red-500 hover:shadow-[0_8px_20px_rgb(239,68,68,0.3)] flex items-center justify-center gap-2"
                    onClick={() => performLogOut()}
                >
                    <i className="fa-solid fa-right-from-bracket"></i> Log out
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-slate-50/50 rounded-2xl p-6 border border-slate-100">
                <div>
                    <span className="text-xs font-black uppercase text-slate-400 tracking-wider mb-3 flex items-center">
                        <i className="fa-solid fa-map-location-dot me-2 text-blue-400 text-base"></i>{" "}
                        Address
                    </span>
                    <p className="text-[0.95rem] font-medium text-slate-700 leading-relaxed pl-6">
                        {personalAddress || "No address added"}
                    </p>
                </div>

                <div>
                    <span className="text-xs font-black uppercase text-slate-400 tracking-wider mb-4 flex items-center">
                        <i className="fa-solid fa-language me-2 text-indigo-400 text-base"></i>{" "}
                        Languages
                    </span>
                    <div className="flex flex-wrap gap-2.5 pl-6">
                        {langauge?.map((e, i) => (
                            <span
                                key={i}
                                className="bg-white text-slate-700 px-4 py-1.5 rounded-lg text-sm font-bold border border-slate-200 shadow-sm hover:border-indigo-300 hover:text-indigo-600 hover:-translate-y-0.5 transition-all cursor-default"
                            >
                                {e}
                            </span>
                        ))}
                        {(!langauge || langauge.length === 0) && (
                            <span className="text-sm font-medium text-slate-500 italic">
                                No languages added
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SensetiveInfo;

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
        <div className="p-6">
            <div className="flex justify-around items-center mb-6 pb-6 border-b border-slate-100">
                <div
                    className="text-center cursor-pointer transition-transform duration-200 hover:-translate-y-0.5"
                    onClick={() => setActiveModalState("Followers")}
                >
                    <span className="block text-xl font-bold text-slate-900">
                        0
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                        Followers
                    </span>
                </div>
                <div
                    className="text-center cursor-pointer transition-transform duration-200 hover:-translate-y-0.5"
                    onClick={() => setActiveModalState("Followings")}
                >
                    <span className="block text-xl font-bold text-slate-900">
                        {ln || 0}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                        Following
                    </span>
                </div>
                <div
                    className="text-center cursor-pointer transition-transform duration-200 hover:-translate-y-0.5"
                    onClick={() => setActiveModalState("connections")}
                >
                    <span className="block text-xl font-bold text-slate-900">
                        {lnc || 0}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                        Connections
                    </span>
                </div>
            </div>

            <div className="flex flex-row gap-3">
                <button
                    type="button"
                    className="w-full bg-blue-500 text-white border border-blue-600 p-2.5 rounded-lg font-semibold text-sm cursor-pointer transition-colors hover:bg-blue-600 shadow-sm"
                    onClick={() => setIsEditProfile(true)}
                >
                    <i className="fa-solid fa-pen-to-square me-2"></i> Edit
                    Profile
                </button>

                <label
                    htmlFor="fileReader"
                    className="w-full bg-white text-slate-600 border border-slate-300 p-2.5 rounded-lg font-semibold text-sm cursor-pointer transition-colors hover:bg-gray-400 text-center block shadow-sm"
                >
                    <i className="fa-solid fa-upload me-2"></i> Upload Resume
                </label>
                <input type="file" id="fileReader" hidden />

                <button
                    type="button"
                    className="w-full bg-red-50 text-red-600 border border-red-200 p-2.5 rounded-lg font-semibold text-sm cursor-pointer transition-colors hover:bg-red-100 hover:border-red-300"
                    onClick={() => performLogOut()}
                >
                    <i className="fa-solid fa-right-from-bracket me-2"></i> Log
                    out
                </button>
            </div>

            <div className="mt-8 flex flex-col md:flex-row gap-6 justify-center">
                <div className="mt-0">
                    <span className="text-sm font-bold text-slate-700 mb-2 block">
                        <i className="fa-solid fa-house me-2 text-slate-400"></i>{" "}
                        Address
                    </span>
                    <p className="text-[0.9rem] text-slate-600">
                        {personalAddress || "No address added"}
                    </p>
                </div>

                <div className="mt-0">
                    <span className="text-sm font-bold text-slate-700 mb-2 block">
                        <i className="fa-solid fa-language me-2 text-slate-400"></i>{" "}
                        Languages Known
                    </span>
                    <div className="flex flex-wrap gap-2">
                        {langauge?.map((e, i) => (
                            <span
                                key={i}
                                className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-medium border border-slate-200"
                            >
                                {e}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SensetiveInfo;

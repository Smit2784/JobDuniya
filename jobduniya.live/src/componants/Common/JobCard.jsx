import React, { useContext, useEffect, useState } from "react";
import GlobalModel from "../../Global/GlobalModel";
import { ActiveModal } from "../..";

const JobCard = ({
    perFormSave,
    onCardClick,
    id,
    title,
    jobtype,
    location,
    salary,
    postedtime,
    hidden,
    companyLogo,
    perFormUnSave,
    savedId,
    isSaved,
    isApplied,
}) => {
    const [activeModalState, setActiveModalState] = useContext(ActiveModal);

    return (
        <div className="w-full bg-white rounded-2xl p-6 border border-slate-200 transition-all duration-300 flex flex-col sm:flex-row justify-between gap-6 relative overflow-hidden cursor-pointer hover:-translate-y-1 hover:shadow-lg hover:border-slate-400">
            <div className="flex gap-5 flex-1" onClick={() => onCardClick(id)}>
                <div className="w-20 h-20 shrink-0 rounded-xl border border-slate-100 p-2 flex items-center justify-center bg-white">
                    <img
                        className="w-full h-full object-contain rounded-lg"
                        src={companyLogo}
                        onError={(e) =>
                            (e.target.src =
                                "https://st2.depositphotos.com/1065578/7533/i/450/depositphotos_75333451-stock-photo-abstract-geometric-company-logo.jpg")
                        }
                        alt="Company Logo"
                    />
                </div>
                <div className="flex flex-col justify-center gap-2">
                    <h2 className="text-xl font-bold text-slate-900 m-0 leading-tight">
                        {title}
                    </h2>
                    <div className="flex flex-wrap gap-4 items-center">
                        <div className="flex items-center gap-1.5 text-sm text-slate-500 font-medium">
                            <i className="fa fa-location-dot text-slate-400 text-base"></i>
                            <span>{location}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-sm text-slate-500 font-medium">
                            <i className="fa-regular fa-clock text-slate-400 text-base"></i>
                            <span>{jobtype}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-sm text-slate-500 font-medium">
                            <i className="fa-solid fa-indian-rupee-sign text-slate-400 text-base"></i>
                            <span>{salary}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-row sm:flex-col justify-between items-end min-w-[140px] pt-4 mt-4 border-t border-dashed border-slate-200 sm:pt-0 sm:mt-0 sm:border-0">
                <div className="flex gap-3">
                    {hidden ? (
                        <>
                            <button
                                className={`border-none rounded-full font-semibold text-sm cursor-pointer transition-all duration-200 inline-flex items-center justify-center px-6 py-2 ${isApplied ? "bg-[#cccccc] cursor-not-allowed text-white" : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md"}`}
                                disabled={isApplied}
                                onClick={(e) => {
                                    if (isApplied) return;
                                    e.stopPropagation();
                                    localStorage.setItem("appliedID", id);
                                    setActiveModalState("ApplyForm");
                                }}
                            >
                                {isApplied ? "Applied" : "Apply Now"}
                            </button>
                            <button
                                className={`border rounded-full font-semibold text-sm cursor-pointer transition-all duration-200 inline-flex items-center justify-center px-6 py-2 ${isSaved ? "bg-slate-100 text-slate-500 border-slate-200 cursor-default" : "bg-white text-blue-600 border-blue-600 hover:bg-blue-50"}`}
                                disabled={isSaved}
                                onClick={(e) => {
                                    if (isSaved) return;
                                    e.stopPropagation();
                                    perFormSave(id);
                                }}
                            >
                                {isSaved ? "Saved" : "Save"}
                            </button>
                        </>
                    ) : (
                        <button
                            className="w-9 h-9 bg-slate-100 text-slate-500 p-0 hover:bg-red-100 hover:text-red-500 border-none rounded-full font-semibold text-sm cursor-pointer transition-all duration-200 inline-flex items-center justify-center"
                            onClick={(e) => {
                                e.stopPropagation();
                                perFormUnSave(savedId);
                            }}
                        >
                            <i className="fa fa-close"></i>
                        </button>
                    )}
                </div>
                <span className="text-xs text-slate-400 mt-auto">
                    Posted on {postedtime}
                </span>
            </div>
        </div>
    );
};

export default JobCard;

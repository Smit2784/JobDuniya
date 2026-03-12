import React from "react";
// import css from "../../Style/profile.module.css";

const Experience = ({
    userType,
    jobTitle,
    companyName,
    startDateWork,
    endDateWork,
    responsibilities,
    achievements,
}) => {
    return (
        <div className="flex flex-col md:flex-row gap-6 relative pb-8 group">
            {/* Timeline Line */}
            <div className="hidden md:flex flex-col items-center w-[50px] shrink-0 absolute left-0 top-0 bottom-0">
                <div className="w-12 h-12 bg-white border-2 border-indigo-100 text-indigo-500 rounded-full flex items-center justify-center text-lg z-10 shadow-[0_4px_12px_rgb(99,102,241,0.15)] group-hover:border-indigo-300 group-hover:shadow-[0_4px_20px_rgb(99,102,241,0.4)] transition-all duration-300">
                    <i className="fa-solid fa-briefcase group-hover:scale-110 group-hover:text-indigo-600 transition-transform duration-300"></i>
                </div>
                <div className="w-0.5 bg-linear-to-b from-indigo-100 to-transparent grow mt-2 group-last:hidden"></div>
            </div>
            
            <div className="grow md:ml-[70px] bg-white rounded-2xl p-6 border border-slate-100 shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:border-indigo-100 group-hover:translate-x-1">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-2">
                    <div>
                        <h4 className="text-xl font-extrabold text-slate-800 group-hover:text-indigo-600 transition-colors">
                            {jobTitle || "Job Role"}
                        </h4>
                        <div className="text-[1rem] font-bold text-slate-600 mt-1 flex items-center gap-2">
                            <i className="fa-regular fa-building text-indigo-400"></i>
                            {companyName || "Company Name"}
                        </div>
                    </div>
                    {/* {userType && (
                        <div className="shrink-0 bg-indigo-50 text-indigo-700 text-xs font-bold px-3 py-1 rounded border border-indigo-100 uppercase tracking-wider self-start">
                            {userType}
                        </div>
                    )} */}
                </div>

                {(startDateWork || endDateWork) && (
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-md mb-4 uppercase tracking-wider">
                        <i className="fa-regular fa-calendar text-slate-400"></i>
                        {startDateWork?.split("T")[0]} - {endDateWork?.split("T")[0] || "Present"}
                    </span>
                )}

                {(responsibilities?.length > 0 || achievements?.length > 0) && (
                    <div className="mt-2 text-slate-600 text-[0.95rem] leading-relaxed">
                        {responsibilities && responsibilities.length > 0 && (
                            <div className="mb-4">
                                <strong className="text-sm font-bold text-slate-700 block mb-2 uppercase tracking-wider items-center gap-2">
                                    <i className="fa-solid fa-list-check text-slate-400"></i> Responsibilities
                                </strong>
                                <ul className="list-none space-y-2">
                                    {responsibilities.map((e, i) => (
                                        <li key={i} className="flex items-start gap-2 font-medium">
                                            <div className="w-1.5 h-1.5 rounded bg-indigo-400 mt-2 shrink-0"></div>
                                            {e}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {achievements && achievements.length > 0 && (
                            <div className="bg-linear-to-r from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-100/50">
                                <strong className="text-sm font-bold text-amber-800 mb-2 uppercase tracking-wider flex items-center gap-2">
                                    <i className="fa-solid fa-trophy text-amber-500"></i> Key Achievements
                                </strong>
                                <ul className="list-none space-y-2">
                                    {achievements.map((e, i) => (
                                        <li key={i} className="flex items-start gap-2 text-amber-900 font-medium text-sm">
                                            <i className="fa-solid fa-star text-amber-400 mt-0.5 text-[10px]"></i>
                                            {e}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Experience;

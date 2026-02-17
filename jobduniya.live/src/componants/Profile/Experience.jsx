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
        <div className="flex flex-col md:flex-row gap-6 relative pb-6 border-b border-slate-100 last:border-0 last:pb-0">
            <div className="hidden md:flex flex-col items-center w-[50px] shrink-0">
                <div className="w-10 h-10 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center text-lg z-10">
                    <i className="fa-solid fa-briefcase"></i>
                </div>
                <div className="flex-grow w-0.5 bg-slate-100 mt-2 min-h-[20px]"></div>
            </div>
            <div className="flex-grow">
                <h4 className="text-lg font-bold text-slate-900 mb-1">
                    {jobTitle || "Job Role"}
                </h4>
                <div className="text-[0.95rem] font-semibold text-slate-700 mb-1 flex items-center gap-2">
                    <i className="fa-regular fa-building text-slate-400"></i>
                    {companyName || "Company Name"}
                </div>

                {(startDateWork || endDateWork) && (
                    <span className="inline-block text-xs text-slate-500 bg-slate-100 px-3 py-1 rounded-full mb-3">
                        {startDateWork} - {endDateWork || "Present"}
                    </span>
                )}

                {userType && (
                    <div
                        style={{
                            fontSize: "0.9rem",
                            color: "#666",
                            marginBottom: "0.5rem",
                        }}
                    >
                        <strong>Type:</strong> {userType}
                    </div>
                )}

                {(responsibilities?.length > 0 || achievements?.length > 0) && (
                    <div className="mt-2 pl-5 text-slate-600 text-sm leading-relaxed">
                        {responsibilities && responsibilities.length > 0 && (
                            <div className="mb-2">
                                <strong className="text-slate-700 block mb-1">
                                    Responsibilities:
                                </strong>
                                <ul className="list-disc pl-4 space-y-1">
                                    {responsibilities.map((e, i) => (
                                        <li key={i}>{e}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {achievements && achievements.length > 0 && (
                            <div>
                                <strong className="text-slate-700 block mb-1">
                                    Achievements:
                                </strong>
                                <ul className="list-disc pl-4 space-y-1">
                                    {achievements.map((e, i) => (
                                        <li key={i}>{e}</li>
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

import React from "react";
// import css from "../../Style/profile.module.css";

const Education = ({
    univercity,
    school,
    institutionName,
    degreeLevel,
    startDateSchool,
    endDateSchool,
    gpa,
    certifications,
}) => {
    return (
        <div className="flex flex-col md:flex-row gap-6 relative pb-8 group">
            {/* Timeline Line */}
            <div className="hidden md:flex flex-col items-center w-[50px] shrink-0 absolute left-0 top-0 bottom-0">
                <div className="w-12 h-12 bg-white border-2 border-blue-100 text-blue-500 rounded-full flex items-center justify-center text-lg z-10 shadow-[0_4px_12px_rgb(59,130,246,0.15)] group-hover:border-blue-300 group-hover:shadow-[0_4px_20px_rgb(59,130,246,0.4)] transition-all duration-300">
                    <i className="fa-solid fa-graduation-cap group-hover:scale-110 group-hover:text-blue-600 transition-transform duration-300"></i>
                </div>
                <div className="w-0.5 bg-linear-to-b from-blue-100 to-transparent grow mt-2 group-last:hidden"></div>
            </div>
            
            <div className="grow md:ml-[70px] bg-white rounded-2xl p-6 border border-slate-100 shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:border-blue-100 group-hover:translate-x-1">
                <h4 className="text-xl font-extrabold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">
                    {institutionName ||
                        school ||
                        univercity ||
                        "Institution Name"}
                </h4>

                {degreeLevel && (
                    <div className="text-[0.95rem] font-bold text-slate-600 mb-3 flex items-center gap-2">
                        <i className="fa-solid fa-certificate text-blue-400"></i>
                        {degreeLevel.join(", ")}
                    </div>
                )}

                {(startDateSchool || endDateSchool) && (
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-md mb-4 uppercase tracking-wider">
                        <i className="fa-regular fa-calendar text-slate-400"></i>
                        {startDateSchool?.split("T")[0]} - {endDateSchool?.split("T")[0] || "Present"}
                    </span>
                )}

                <div
                    className="pl-0 md:pl-0 text-slate-600 text-[0.95rem] leading-relaxed"
                >
                    {gpa && (
                        <div className="mb-3 font-medium bg-green-50 text-green-700 px-3 py-1.5 rounded-lg inline-block border border-green-100">
                            <strong>GPA:</strong> {gpa}
                        </div>
                    )}

                    {certifications && certifications.length > 0 && (
                        <div className="mt-2 bg-slate-50 rounded-xl p-4 border border-slate-100">
                            <strong className="text-sm font-bold text-slate-700 block mb-2 uppercase tracking-wider items-center gap-2">
                                <i className="fa-solid fa-award text-amber-500"></i> Certifications
                            </strong>
                            <ul className="list-none space-y-2">
                                {certifications.map((e, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm font-medium">
                                        <i className="fa-solid fa-check text-green-500 mt-1 text-[10px]"></i>
                                        {e}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Education;

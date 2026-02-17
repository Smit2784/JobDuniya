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
        <div className="flex flex-col md:flex-row gap-6 relative pb-6 border-b border-slate-100 last:border-0 last:pb-0">
            <div className="hidden md:flex flex-col items-center w-[50px] shrink-0">
                <div className="w-10 h-10 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center text-lg z-10">
                    <i className="fa-solid fa-graduation-cap"></i>
                </div>
                <div className="flex-grow w-0.5 bg-slate-100 mt-2 min-h-[20px]"></div>
            </div>
            <div className="flex-grow">
                <h4 className="text-lg font-bold text-slate-900 mb-1">
                    {institutionName ||
                        school ||
                        univercity ||
                        "Institution Name"}
                </h4>

                {degreeLevel && (
                    <div className="text-[0.95rem] font-semibold text-slate-700 mb-1 flex items-center gap-2">
                        <i className="fa-solid fa-certificate text-slate-400"></i>
                        {degreeLevel.join(", ")}
                    </div>
                )}

                {(startDateSchool || endDateSchool) && (
                    <span className="inline-block text-xs text-slate-500 bg-slate-100 px-3 py-1 rounded-full mb-3">
                        {startDateSchool} - {endDateSchool || "Present"}
                    </span>
                )}

                <div
                    className="mt-2 pl-0 md:pl-0 text-slate-600 text-sm leading-relaxed"
                    style={{ marginTop: "0.5rem" }}
                >
                    {gpa && (
                        <div className="mb-2 font-medium">
                            <strong className="text-slate-700">GPA:</strong>{" "}
                            {gpa}
                        </div>
                    )}

                    {certifications && certifications.length > 0 && (
                        <div>
                            <strong className="text-slate-700 block mb-1">
                                Certifications:
                            </strong>
                            <ul className="list-disc pl-4 space-y-1">
                                {certifications.map((e, i) => (
                                    <li key={i}>{e}</li>
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

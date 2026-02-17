import React from "react";
// import "../../Style/profile.css"

const DataContainer = ({
    university,
    school,
    institution_name,
    degreelevel,
    SDOS,
    EDOS,
    GPA,
    certificates,
    onlinecourses,
}) => {
    return (
        <>
            <div className="p-2.5 flex gap-2.5 flex-wrap rounded-xl">
                <div className="flex-1 min-w-min p-2.5 flex flex-col whitespace-normal bg-white rounded-xl shadow-sm border border-slate-100">
                    <p className="font-semibold text-blue-500 mb-1">
                        University
                    </p>
                    <p className="text-slate-700">{university}</p>
                </div>
                <div className="flex-1 min-w-min p-2.5 flex flex-col whitespace-normal bg-white rounded-xl shadow-sm border border-slate-100">
                    <p className="font-semibold text-blue-500 mb-1">School</p>
                    <p className="text-slate-700">{school}</p>
                </div>
                <div className="flex-1 min-w-min p-2.5 flex flex-col whitespace-normal bg-white rounded-xl shadow-sm border border-slate-100">
                    <p className="font-semibold text-blue-500 mb-1">
                        Institution Name
                    </p>
                    <p className="text-slate-700">{institution_name}</p>
                </div>
                <div className="flex-1 min-w-min p-2.5 flex flex-col whitespace-normal bg-white rounded-xl shadow-sm border border-slate-100">
                    <p className="font-semibold text-blue-500 mb-1">
                        Degree Level{" "}
                    </p>
                    <p className="text-slate-700">{degreelevel}</p>
                </div>
                <div className="flex-1 min-w-min p-2.5 flex flex-col whitespace-normal bg-white rounded-xl shadow-sm border border-slate-100">
                    <p className="font-semibold text-blue-500 mb-1">
                        Start Date of School{" "}
                    </p>
                    <p className="text-slate-700">{SDOS}</p>
                </div>
                <div className="flex-1 min-w-min p-2.5 flex flex-col whitespace-normal bg-white rounded-xl shadow-sm border border-slate-100">
                    <p className="font-semibold text-blue-500 mb-1">
                        End Date of School{" "}
                    </p>
                    <p className="text-slate-700">{EDOS}</p>
                </div>
                <div className="flex-1 min-w-min p-2.5 flex flex-col whitespace-normal bg-white rounded-xl shadow-sm border border-slate-100">
                    <p className="font-semibold text-blue-500 mb-1">GPA</p>
                    <p className="text-slate-700">{GPA}</p>
                </div>
                <div className="flex-1 min-w-min p-2.5 flex flex-col whitespace-normal bg-white rounded-xl shadow-sm border border-slate-100">
                    <p className="font-semibold text-blue-500 mb-1">
                        Certifications{" "}
                    </p>
                    <p className="text-slate-700">{certificates}</p>
                </div>
                <div className="flex-1 min-w-min p-2.5 flex flex-col whitespace-normal bg-white rounded-xl shadow-sm border border-slate-100">
                    <p className="font-semibold text-blue-500 mb-1">
                        Online Courses
                    </p>
                    <p className="text-slate-700">{onlinecourses}</p>
                </div>
            </div>
        </>
    );
};

export default DataContainer;

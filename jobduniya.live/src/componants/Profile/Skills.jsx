import React from "react";
// import css from "../../Style/profile.module.css";

const Skills = ({ data }) => {
    return (
        <div className="p-6">
            <div className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <i className="fa-solid fa-code text-blue-500"></i> Skills
            </div>
            <div className="flex flex-wrap gap-2">
                {data?.map((skill, index) => (
                    <span
                        key={index}
                        className="bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 hover:bg-blue-500 hover:text-white cursor-default border border-blue-100"
                    >
                        {skill}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default Skills;

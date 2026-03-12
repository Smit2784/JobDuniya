import React from "react";
// import css from "../../Style/profile.module.css";

const BasicInfo = ({
    firstName,
    lastName,
    profession,
    city,
    state,
    description,
    profileImage,
}) => {
    return (
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 overflow-hidden mb-6 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 relative group">
            <div className="absolute inset-0 bg-linear-to-br from-blue-50/40 to-purple-50/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="flex flex-col items-center p-8 text-center relative z-10">
                <div className="relative mb-6">
                    <div className="absolute inset-0 bg-linear-to-tr from-blue-500 to-purple-500 rounded-full blur-md opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                    <img
                        src={profileImage}
                        alt="avatar"
                        className="relative w-[140px] h-[140px] rounded-full object-cover border-4 border-white shadow-lg z-10 transition-transform duration-300 group-hover:scale-105"
                        onError={(e) =>
                            (e.target.src =
                                "https://avatar.iran.liara.run/public/boy?username=Ash")
                        }
                    />
                </div>
                <h5 className="text-3xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-slate-900 to-slate-700 mb-1.5 tracking-tight">
                    {firstName} {lastName}
                </h5>
                <p className="text-sm text-blue-600 font-bold tracking-wide uppercase mb-4 py-1.5 px-5 bg-blue-50/80 rounded-full inline-block border border-blue-100/50 shadow-sm">
                    {profession}
                </p>
                <div className="text-sm font-semibold text-slate-500 mb-5 flex items-center justify-center gap-2 bg-slate-50/80 py-2 px-5 rounded-2xl border border-slate-100 shadow-sm">
                    <i className="fa-solid fa-location-dot text-blue-400"></i>
                    {state}, {city}
                </div>
                <p className="text-[0.95rem] text-slate-600 leading-relaxed max-w-md mx-auto font-medium">
                    {description}
                </p>
            </div>
        </div>
    );
};

export default BasicInfo;

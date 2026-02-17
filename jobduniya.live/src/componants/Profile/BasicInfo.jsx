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
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-6">
            <div className="flex flex-col items-center p-8 text-center">
                <img
                    src={profileImage}
                    alt="avatar"
                    className="w-[140px] h-[140px] rounded-full object-cover mb-6 border-4 border-white shadow-lg"
                    onError={(e) =>
                        (e.target.src =
                            "https://avatar.iran.liara.run/public/boy?username=Ash")
                    }
                />
                <h5 className="text-2xl font-bold text-slate-900 mb-1">
                    {firstName} {lastName}
                </h5>
                <p className="text-base text-blue-500 font-medium mb-2">
                    {profession}
                </p>
                <div className="text-sm text-slate-500 mb-4 flex items-center justify-center gap-1.5">
                    <i className="fa-solid fa-location-dot text-slate-400"></i>
                    {state}, {city}
                </div>
                <p className="text-[0.95rem] text-slate-600 leading-relaxed mt-2">
                    {description}
                </p>
            </div>
        </div>
    );
};

export default BasicInfo;

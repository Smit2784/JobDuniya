import React from "react";
// import css from "../../Style/profile.module.css";

const Peoples = ({
    profileImage,
    firstName,
    lastName,
    profession,
    city,
    state,
}) => {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden text-center p-4 hover:shadow-md transition-shadow">
            <img
                src={
                    profileImage ||
                    "https://jobduniya.com/assets/img/icon/usersjs.png"
                }
                className="w-[80px] h-[80px] rounded-full object-cover mb-3 mx-auto border-2 border-slate-100"
                alt={`${firstName} ${lastName}`}
            />

            <h5 className="text-lg font-bold text-slate-800 mb-1">
                {firstName} {lastName}
            </h5>
            <div className="text-sm font-medium text-blue-500 mb-2">
                {profession || "N/A"}
            </div>

            <div className="text-xs text-slate-500 mb-4 flex items-center justify-center gap-1">
                <i className="fa-solid fa-location-dot text-slate-400"></i>
                {city}, {state}
            </div>

            <button className="w-full py-2 px-4 rounded-full text-sm font-semibold text-white bg-blue-500 hover:bg-blue-600 transition-colors flex items-center justify-center gap-2">
                <i className="fa-solid fa-user-plus"></i> Connect
            </button>
        </div>
    );
};

export default Peoples;

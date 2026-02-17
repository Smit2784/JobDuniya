import React from "react";
// import "../../Style/jobview.css";
// import css from "../Style/listUsers.module.css";

const Card = ({
    profileImage,
    firstName,
    lastName,
    following_id,
    _id,
    handleFollowButton,
    handleUnFollowButton,
    no,
    yes,
    univercity,
    pofession,
    disableFollowingBtn,
}) => {
    // Determine button state
    const isFollowing = following_id?.includes(_id);

    return (
        <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-md transition-shadow duration-300 flex flex-col items-center pb-6">
            <div className="h-24 w-full bg-gradient-to-r from-blue-400 to-blue-600 mb-[-40px]"></div>
            <div className="relative z-10 w-20 h-20 rounded-full border-4 border-white shadow-md overflow-hidden bg-white mb-3">
                <img
                    src={profileImage}
                    className="w-full h-full object-cover"
                    alt={`${firstName} ${lastName}`}
                    onError={(e) =>
                        (e.target.src =
                            "https://isobarscience-1bfd8.kxcdn.com/wp-content/uploads/2020/09/default-profile-picture1.jpg")
                    }
                />
            </div>
            <div className="text-center px-4 mb-4 flex-grow flex flex-col items-center">
                <h3 className="text-lg font-bold text-slate-800 mb-1">
                    {firstName} {lastName}
                </h3>
                <p className="text-sm font-medium text-blue-500 mb-1">
                    {pofession || "N/A"}
                </p>
                <p className="text-xs text-slate-500 line-clamp-1">
                    {univercity || "Univercity N/A"}
                </p>
            </div>

            <div className="w-full px-6 mt-auto">
                {isFollowing ? (
                    <button
                        className="w-full py-2 px-4 rounded-full text-sm font-semibold text-slate-500 bg-slate-100 hover:bg-slate-200 transition-colors duration-200 border border-slate-200"
                        onClick={() =>
                            !disableFollowingBtn && handleUnFollowButton(_id)
                        }
                        disabled={disableFollowingBtn}
                        style={
                            disableFollowingBtn
                                ? { cursor: "not-allowed", opacity: 0.7 }
                                : {}
                        }
                    >
                        {no || "Unfollow"}
                    </button>
                ) : (
                    <button
                        className="w-full py-2 px-4 rounded-full text-sm font-semibold text-white bg-blue-500 hover:bg-blue-600 shadow-sm hover:shadow transition-all duration-200"
                        onClick={() => handleFollowButton(_id)}
                    >
                        {yes || "Follow"}
                    </button>
                )}
            </div>
        </div>
    );
};

export default Card;

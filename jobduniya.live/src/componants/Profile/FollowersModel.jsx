import React, { useEffect, useState, useCallback } from "react";
import Modal from "../../render-model/Modal";
// import css from "../../Style/follow.module.css";
import useAPI from "../../Hooks/USER/useAPI";
import Cookies from "js-cookie";

const Body = ({ onClose }) => {
    const api = useAPI();
    const [followers, setFollowers] = useState([]);
    const [followingIds, setFollowingIds] = useState([]);
    const id = Cookies.get("id");

    useEffect(() => {
        const fetchData = async () => {
            // Fetch Followers
            const followersData = await api.getREQUEST(`getFollowers/${id}`);
            if (
                followersData &&
                followersData[0] &&
                Array.isArray(followersData[0].targetId)
            ) {
                setFollowers(followersData[0].targetId);
            }

            // Fetch Followings to know status
            const followingsData = await api.getREQUEST(`getFollowings/${id}`);
            if (
                followingsData &&
                followingsData[0] &&
                Array.isArray(followingsData[0].targetId)
            ) {
                const ids = followingsData[0].targetId.map((u) => u._id);
                setFollowingIds(ids);
            }
        };
        fetchData();
    }, [id]);

    const handleFollow = async (targetId) => {
        await api.patchREQUEST(
            `updateDetails`,
            "userFollow",
            { userId: id },
            { targetId: [targetId] },
        );
        setFollowingIds((prev) => [...prev, targetId]);
    };

    const handleUnfollow = async (targetId) => {
        await api.patchREQUEST(
            `api/userfollow/${id}/remove/${targetId}`,
            "userFollow",
        );
        setFollowingIds((prev) => prev.filter((fid) => fid !== targetId));
    };

    return (
        <div className="bg-white rounded-lg w-[95%] md:w-[60%] lg:w-[30%] h-[500px] overflow-hidden flex flex-col mx-auto shadow-2xl">
            <div className="flex justify-between items-center p-4 border-b border-slate-100 bg-white sticky top-0 z-10">
                <div>
                    <span className="text-lg font-bold text-slate-800 uppercase tracking-wide">
                        Followers
                    </span>
                </div>
                <div>
                    <span
                        onClick={onClose}
                        className="cursor-pointer text-slate-400 hover:text-slate-600 transition-colors p-1"
                    >
                        <i className="fa fa-close text-xl"></i>
                    </span>
                </div>
            </div>

            <div className="p-4 overflow-y-auto custom-scrollbar grow">
                <div className="mb-4">
                    <input
                        type="text"
                        className="w-full outline-none border border-slate-200 rounded-full px-4 py-2 text-sm text-slate-600 focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all placeholder:text-slate-400"
                        placeholder="Search followers..."
                    />
                </div>

                <div className="flex flex-col gap-3">
                    {Array.isArray(followers) &&
                        followers.map((e) => {
                            const isFollowing = followingIds.includes(e._id);
                            return (
                                <div
                                    className="flex items-center p-3 bg-white border border-slate-100 rounded-xl hover:shadow-md transition-all duration-200 group"
                                    key={e._id}
                                >
                                    <div className="shrink-0 mr-4">
                                        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm">
                                            <img
                                                onError={(ev) =>
                                                    (ev.target.src =
                                                        "https://isobarscience-1bfd8.kxcdn.com/wp-content/uploads/2020/09/default-profile-picture1.jpg")
                                                }
                                                src={e.profileImage}
                                                className="w-full h-full object-cover"
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                    <div className="grow min-w-0 mr-3">
                                        <h6 className="text-sm font-bold text-slate-900 truncate mb-0.5">
                                            {e.firstName} {e.lastName}
                                        </h6>
                                        <p className="text-xs text-slate-500 truncate">
                                            {e.profession || "User"}
                                        </p>
                                    </div>
                                    <div className="shrink-0">
                                        {isFollowing ? (
                                            <button
                                                className="px-4 py-1.5 text-xs font-semibold text-slate-500 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors"
                                                onClick={() =>
                                                    handleUnfollow(e._id)
                                                }
                                            >
                                                Unfollow
                                            </button>
                                        ) : (
                                            <button
                                                className="px-4 py-1.5 text-xs font-semibold text-white bg-blue-500 rounded-full hover:bg-blue-600 shadow-sm hover:shadow transition-all"
                                                onClick={() =>
                                                    handleFollow(e._id)
                                                }
                                            >
                                                Follow
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    {followers.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-10 text-slate-400">
                            <i className="fa-solid fa-user-group text-4xl mb-3 opacity-20"></i>
                            <p className="text-sm font-medium">
                                No followers yet
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const FollowersModel = ({ onClose }) => {
    return <Modal body={<Body onClose={onClose} />} />;
};

export default FollowersModel;

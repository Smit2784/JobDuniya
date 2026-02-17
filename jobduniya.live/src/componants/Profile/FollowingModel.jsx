import React, { useEffect, useState } from "react";
import Modal from "../../render-model/Modal";
// import css from "../../Style/follow.module.css";
import useAPI from "../../Hooks/USER/useAPI";
import Cookies from "js-cookie";

const Body = ({ onClose }) => {
    const api = useAPI();
    const [users, setUsers] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    useEffect(() => {
        const apiCall = async () => {
            const id = Cookies.get("id");
            const users = await api.getREQUEST(`getFollowings/${id}`);
            setUsers(users[0].targetId);
        };
        apiCall();
    }, []);

    return (
        <>
            <div className="bg-white rounded-lg w-[95%] md:w-[60%] lg:w-[30%] h-[500px] overflow-hidden flex flex-col mx-auto shadow-2xl">
                <div className="flex justify-between items-center p-4 border-b border-slate-100 bg-white sticky top-0 z-10">
                    <div>
                        <span className="text-lg font-bold text-slate-800 uppercase tracking-wide">
                            Following
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

                <div className="p-4 overflow-y-auto custom-scrollbar flex-grow">
                    <div className="mb-4">
                        <input
                            type="text"
                            className="w-full outline-none border border-slate-200 rounded-full px-4 py-2 text-sm text-slate-600 focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all placeholder:text-slate-400"
                            placeholder="Search following..."
                        />
                    </div>

                    <div className="flex flex-col gap-3">
                        {Array.isArray(users) &&
                            users?.map((e) => {
                                return (
                                    <div
                                        className="flex items-center p-3 bg-white border border-slate-100 rounded-xl hover:shadow-md transition-all duration-200 group"
                                        key={e._id}
                                    >
                                        <div className="flex-shrink-0 mr-4">
                                            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm">
                                                <img
                                                    src={e.profileImage}
                                                    className="w-full h-full object-cover"
                                                    onError={(e) =>
                                                        (e.target.src =
                                                            "https://isobarscience-1bfd8.kxcdn.com/wp-content/uploads/2020/09/default-profile-picture1.jpg")
                                                    }
                                                    alt=""
                                                />
                                            </div>
                                        </div>
                                        <div className="flex-grow min-w-0 mr-3">
                                            <h6 className="text-sm font-bold text-slate-900 truncate mb-0.5">
                                                {e.firstName} {e.lastName}
                                            </h6>
                                            <p className="text-xs text-slate-500 truncate">
                                                {e.profession || "User"}
                                            </p>
                                        </div>
                                        <div className="flex-shrink-0">
                                            <button
                                                className="px-4 py-1.5 text-xs font-semibold text-slate-500 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors"
                                                onClick={() => {
                                                    const handleUnFollowButton =
                                                        async () => {
                                                            const id =
                                                                Cookies.get(
                                                                    "id",
                                                                );
                                                            const res =
                                                                await api.patchREQUEST(
                                                                    `api/userfollow/${id}/remove/${e._id}`,
                                                                    "userFollow",
                                                                );
                                                            if (res) {
                                                                setUsers(
                                                                    (prev) =>
                                                                        prev.filter(
                                                                            (
                                                                                user,
                                                                            ) =>
                                                                                user._id !==
                                                                                e._id,
                                                                        ),
                                                                );
                                                            }
                                                        };
                                                    handleUnFollowButton();
                                                }}
                                            >
                                                Unfollow
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        {(!users || users.length === 0) && (
                            <div className="flex flex-col items-center justify-center py-10 text-slate-400">
                                <i className="fa-solid fa-user-plus text-4xl mb-3 opacity-20"></i>
                                <p className="text-sm font-medium">
                                    Not following anyone yet
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

const FollowingModel = ({ onClose }) => {
    return (
        <>
            <Modal body={<Body onClose={onClose} />} />
        </>
    );
};

export default FollowingModel;

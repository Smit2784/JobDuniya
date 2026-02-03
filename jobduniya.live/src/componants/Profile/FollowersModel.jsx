import React, { useEffect, useState, useCallback } from "react";
import Modal from "../../render-model/Modal";
import css from "../../Style/follow.module.css";
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
        <div className={css.container}>
            <div className={css.header}>
                <div>
                    <span className="text-text-center text-body fw-bold">
                        Followers
                    </span>
                </div>
                <div>
                    <span onClick={onClose} className="hand">
                        <i className="fa fa-close fs-5"></i>
                    </span>
                </div>
            </div>
            <div className={css.searchBox}>
                <input
                    type="text"
                    className={`${css.formControl} mb-3 w-100`}
                    placeholder="search..."
                />
            </div>
            <div className="d-flex flex-column gap-3">
                {Array.isArray(followers) &&
                    followers.map((e) => {
                        const isFollowing = followingIds.includes(e._id);
                        return (
                            <div className={css.body} key={e._id}>
                                <div className={css.profile}>
                                    <div className={css.imgDiv}>
                                        <img
                                            onError={(ev) =>
                                                (ev.target.src =
                                                    "https://isobarscience-1bfd8.kxcdn.com/wp-content/uploads/2020/09/default-profile-picture1.jpg")
                                            }
                                            src={e.profileImage}
                                            className={css.img}
                                            alt=""
                                        />
                                    </div>
                                </div>
                                <div className={css.discription}>
                                    <span className="fs-6">
                                        {e.firstName} {e.lastName}
                                    </span>
                                    {isFollowing ? (
                                        <button
                                            className="btn bgbtn"
                                            onClick={() =>
                                                handleUnfollow(e._id)
                                            }
                                        >
                                            Unfollow
                                        </button>
                                    ) : (
                                        <button
                                            className="btn bgbtn"
                                            onClick={() => handleFollow(e._id)}
                                        >
                                            Follow
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                {followers.length === 0 && (
                    <p className="text-center text-muted">No followers yet.</p>
                )}
            </div>
        </div>
    );
};

const FollowersModel = ({ onClose }) => {
    return <Modal body={<Body onClose={onClose} />} />;
};

export default FollowersModel;

import React, { useEffect } from "react";
// import "../../Style/jobview.css";
import css from "../Style/listUsers.module.css";

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
        <div className={css.profileCard}>
            <div className={css.coverBg}></div>
            <div className={css.profileContent}>
                <div className={css.profileImageWrapper}>
                    <img
                        src={profileImage}
                        className={css.profileImg}
                        alt={`${firstName} ${lastName}`}
                        onError={(e) =>
                            (e.target.src =
                                "https://isobarscience-1bfd8.kxcdn.com/wp-content/uploads/2020/09/default-profile-picture1.jpg")
                        }
                    />
                </div>
                <div className={css.userInfo}>
                    <h3 className={css.userName}>
                        {firstName} {lastName}
                    </h3>
                    <p className={css.userProfession}>{pofession || "N/A"}</p>
                    <p className={css.userUniversity}>
                        {univercity || "Univercity N/A"}
                    </p>
                </div>

                <div className={css.actionArea}>
                    {isFollowing ? (
                        <button
                            className={css.unfollowBtn}
                            onClick={() =>
                                !disableFollowingBtn &&
                                handleUnFollowButton(_id)
                            }
                            disabled={disableFollowingBtn}
                            style={
                                disableFollowingBtn
                                    ? { cursor: "not-allowed", opacity: 0.7 }
                                    : {}
                            }
                        >
                            {no}
                        </button>
                    ) : (
                        <button
                            className={css.followBtn}
                            onClick={() => handleFollowButton(_id)}
                        >
                            {yes}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Card;

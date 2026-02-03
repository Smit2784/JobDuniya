import React from "react";
import css from "../../Style/profile.module.css";

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
        <div className={css.card}>
            <div className={css.profileCardBody}>
                <img
                    src={profileImage}
                    alt="avatar"
                    className={css.profileAvatar}
                    onError={(e) =>
                        (e.target.src =
                            "https://avatar.iran.liara.run/public/boy?username=Ash")
                    }
                />
                <h5 className={css.profileName}>
                    {firstName} {lastName}
                </h5>
                <p className={css.profileProfession}>{profession}</p>
                <div className={css.profileLocation}>
                    <i className="fa-solid fa-location-dot"></i>
                    {state}, {city}
                </div>
                <p className={css.profileDescription}>{description}</p>
            </div>
        </div>
    );
};

export default BasicInfo;

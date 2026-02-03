import React from "react";
import css from "../../Style/profile.module.css";

const Peoples = ({
    profileImage,
    firstName,
    lastName,
    profession,
    city,
    state,
}) => {
    return (
        <div className={css.userCard}>
            <img
                src={
                    profileImage ||
                    "https://jobduniya.com/assets/img/icon/usersjs.png"
                }
                className={css.userAvatar}
                alt={`${firstName} ${lastName}`}
            />

            <h5 className={css.userName}>
                {firstName} {lastName}
            </h5>
            <div className={css.userProfession}>{profession || "N/A"}</div>

            <div className={css.userLocation}>
                <i className="fa-solid fa-location-dot"></i>
                {city}, {state}
            </div>

            <button className={css.connectBtn}>
                <i className="fa-solid fa-user-plus me-2"></i> Connect
            </button>
        </div>
    );
};

export default Peoples;

import React, { useContext } from "react";
import { ToggleEdit } from "../Common/profile";
import { ActiveModal } from "../..";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import css from "../../Style/profile.module.css";

const SensetiveInfo = ({ personalAddress, langauge, lnc, ln }) => {
    const [activeModalState, setActiveModalState] = useContext(ActiveModal);
    const [isEditProfile, setIsEditProfile] = useContext(ToggleEdit);
    const navigate = useNavigate();

    const performLogOut = () => {
        const ok = window.confirm("Are you sure?");
        if (ok) {
            Cookies.remove("token");
            navigate("/loginasuser");
        } else {
            navigate(window.location.pathname);
        }
    };

    return (
        <div className={css.actionCardBody}>
            <div className={css.statsRow}>
                <div
                    className={css.statItem}
                    onClick={() => setActiveModalState("Followers")}
                >
                    <span className={css.statValue}>0</span>
                    <span className={css.statLabel}>Followers</span>
                </div>
                <div
                    className={css.statItem}
                    onClick={() => setActiveModalState("Followings")}
                >
                    <span className={css.statValue}>{ln || 0}</span>
                    <span className={css.statLabel}>Following</span>
                </div>
                <div
                    className={css.statItem}
                    onClick={() => setActiveModalState("connections")}
                >
                    <span className={css.statValue}>{lnc || 0}</span>
                    <span className={css.statLabel}>Connections</span>
                </div>
            </div>

            <div className={css.actionButtons}>
                <button
                    type="button"
                    className={css.btnPrimary}
                    onClick={() => setIsEditProfile(true)}
                >
                    <i className="fa-solid fa-pen-to-square me-2"></i> Edit
                    Profile
                </button>

                <label htmlFor="fileReader" className={css.btnSecondary}>
                    <i className="fa-solid fa-upload me-2"></i> Upload Resume
                </label>
                <input type="file" id="fileReader" hidden />

                <button
                    type="button"
                    className={css.btnDanger}
                    onClick={() => performLogOut()}
                >
                    <i className="fa-solid fa-right-from-bracket me-2"></i> Log
                    out
                </button>
            </div>

            <div className="mt-4" style={{ display: "flex", flexDirection: "row", gap: "10rem" , alignItems: "center" , justifyContent: "center" }}>
                <div className={css.infoSection}>
                    <span className={css.infoTitle}>
                        <i className="fa-solid fa-house me-2"></i> Address
                    </span>
                    <p style={{ color: "#666", fontSize: "0.9rem" }}>
                        {personalAddress || "No address added"}
                    </p>
                </div>

                <div className={css.infoSection}>
                    <span className={css.infoTitle}>
                        <i className="fa-solid fa-language me-2"></i> Languages
                        Known
                    </span>
                    <div className={css.skillsList}>
                        {langauge?.map((e, i) => (
                            <span
                                key={i}
                                className={css.skillBadge}
                                style={{ background: "#f8f9fa", color: "#666" }}
                            >
                                {e}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SensetiveInfo;

import React from "react";
import css from "../../Style/profile.module.css";

const Experience = ({
    userType,
    jobTitle,
    companyName,
    startDateWork,
    endDateWork,
    responsibilities,
    achievements,
}) => {
    return (
        <div className={css.timelineItem}>
            <div className={css.timelineIconBox}>
                <div className={css.timelineIcon}>
                    <i className="fa-solid fa-briefcase"></i>
                </div>
                <div className={css.timelineLine}></div>
            </div>
            <div className={css.timelineContent}>
                <h4 className={css.roleTitle}>{jobTitle || "Job Role"}</h4>
                <div className={css.institutionName}>
                    <i className="fa-regular fa-building"></i>
                    {companyName || "Company Name"}
                </div>

                {(startDateWork || endDateWork) && (
                    <span className={css.durationBadge}>
                        {startDateWork} - {endDateWork || "Present"}
                    </span>
                )}

                {userType && (
                    <div
                        style={{
                            fontSize: "0.9rem",
                            color: "#666",
                            marginBottom: "0.5rem",
                        }}
                    >
                        <strong>Type:</strong> {userType}
                    </div>
                )}

                {(responsibilities?.length > 0 || achievements?.length > 0) && (
                    <div className={css.detailsList}>
                        {responsibilities && responsibilities.length > 0 && (
                            <div className="mb-2">
                                <strong>Responsibilities:</strong>
                                <ul>
                                    {responsibilities.map((e, i) => (
                                        <li key={i}>{e}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {achievements && achievements.length > 0 && (
                            <div>
                                <strong>Achievements:</strong>
                                <ul>
                                    {achievements.map((e, i) => (
                                        <li key={i}>{e}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Experience;

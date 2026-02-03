import React from "react";
import css from "../../Style/profile.module.css";

const Education = ({
    univercity,
    school,
    institutionName,
    degreeLevel,
    startDateSchool,
    endDateSchool,
    gpa,
    certifications,
}) => {
    return (
        <div className={css.timelineItem}>
            <div className={css.timelineIconBox}>
                <div className={css.timelineIcon}>
                    <i className="fa-solid fa-graduation-cap"></i>
                </div>
                <div className={css.timelineLine}></div>
            </div>
            <div className={css.timelineContent}>
                <h4 className={css.roleTitle}>
                    {institutionName ||
                        school ||
                        univercity ||
                        "Institution Name"}
                </h4>

                {degreeLevel && (
                    <div className={css.institutionName}>
                        <i className="fa-solid fa-certificate"></i>
                        {degreeLevel.join(", ")}
                    </div>
                )}

                {(startDateSchool || endDateSchool) && (
                    <span className={css.durationBadge}>
                        {startDateSchool} - {endDateSchool || "Present"}
                    </span>
                )}

                <div
                    className={css.detailsList}
                    style={{ marginTop: "0.5rem" }}
                >
                    {gpa && (
                        <div className="mb-2">
                            <strong>GPA:</strong> {gpa}
                        </div>
                    )}

                    {certifications && certifications.length > 0 && (
                        <div>
                            <strong>Certifications:</strong>
                            <ul>
                                {certifications.map((e, i) => (
                                    <li key={i}>{e}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Education;

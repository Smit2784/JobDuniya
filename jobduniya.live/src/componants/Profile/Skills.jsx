import React from "react";
import css from "../../Style/profile.module.css";

const Skills = ({ data }) => {
    return (
        <div className={css.skillsContainer}>
            <div className={css.skillsHeader}>
                <i className="fa-solid fa-code"></i> Skills
            </div>
            <div className={css.skillsList}>
                {data?.map((skill, index) => (
                    <span key={index} className={css.skillBadge}>
                        {skill}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default Skills;

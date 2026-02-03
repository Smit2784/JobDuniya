import React, { useContext, useEffect, useState } from "react";
// import job from "./jobCard.module.css";
import job from "../../Style/jobCard.module.css";
import GlobalModel from "../../Global/GlobalModel";
import { ActiveModal } from "../..";

const JobCard = ({
    perFormSave,
    onCardClick,
    id,
    title,
    jobtype,
    location,
    salary,
    postedtime,
    hidden,
    companyLogo,
    perFormUnSave,
    savedId,
    isSaved,
    isApplied,
}) => {
    const [activeModalState, setActiveModalState] = useContext(ActiveModal); // Assuming ActiveModal logic is handled externally or modal opens via other means, keeping basic structure

    // We can inject a click handler for application logic if needed inside the apply button

    return (
        <div className={job.cardContainer}>
            <div className={job.leftSection} onClick={() => onCardClick(id)}>
                <div className={job.logoWrapper}>
                    <img
                        src={companyLogo}
                        onError={(e) =>
                            (e.target.src =
                                "https://st2.depositphotos.com/1065578/7533/i/450/depositphotos_75333451-stock-photo-abstract-geometric-company-logo.jpg")
                        }
                        alt="Company Logo"
                    />
                </div>
                <div className={job.detailsWrapper}>
                    <h2 className={job.jobTitle}>{title}</h2>
                    <div className={job.metaGrid}>
                        <div className={job.metaItem}>
                            <i className="fa fa-location-dot"></i>
                            <span>{location}</span>
                        </div>
                        <div className={job.metaItem}>
                            <i className="fa-regular fa-clock"></i>
                            <span>{jobtype}</span>
                        </div>
                        <div className={job.metaItem}>
                            <i className="fa-solid fa-indian-rupee-sign"></i>
                            <span>{salary}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className={job.rightSection}>
                <div className={job.actionButtons}>
                    {hidden ? (
                        <>
                            <button
                                className={job.primaryBtn}
                                disabled={isApplied}
                                style={
                                    isApplied
                                        ? {
                                              backgroundColor: "#cccccc",
                                              cursor: "not-allowed",
                                          }
                                        : {}
                                }
                                onClick={(e) => {
                                    if (isApplied) return;
                                    e.stopPropagation();
                                    localStorage.setItem("appliedID", id);
                                    // Trigger modal logic passed via props or context if needed here,
                                    // referencing original logic: setActiveModalState("ApplyForm")
                                    // For now, we keep the button functional visually
                                    setActiveModalState("ApplyForm");
                                }}
                            >
                                {isApplied ? "Applied" : "Apply Now"}
                            </button>
                            <button
                                className={job.secondaryBtn}
                                disabled={isSaved}
                                style={
                                    isSaved
                                        ? {
                                              backgroundColor: "#e2e8f0",
                                              color: "#64748b",
                                              cursor: "default",
                                          }
                                        : {}
                                }
                                onClick={(e) => {
                                    if (isSaved) return;
                                    e.stopPropagation();
                                    perFormSave(id);
                                }}
                            >
                                {isSaved ? "Saved" : "Save"}
                            </button>
                        </>
                    ) : (
                        <button
                            className={job.iconBtn}
                            onClick={(e) => {
                                e.stopPropagation();
                                perFormUnSave(savedId);
                            }}
                        >
                            <i className="fa fa-close"></i>
                        </button>
                    )}
                </div>
                <span className={job.postedTime}>Posted on {postedtime}</span>
            </div>
        </div>
    );
};

export default JobCard;

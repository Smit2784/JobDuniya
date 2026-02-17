import React from "react";
import moment from "moment/moment";
import css from "../../Style/jobview.module.css";
const ViewJob = ({
    setViewJob,
    viewJob,
    visible,
    setVisible,
    data,
    isFollowed,
    onFollow,
    onUnFollow,
}) => {
    return (
        <div className={css.modalContainer}>
            <div className={css.header}>
                <h1 className={css.jobTitle}>{data.Title}</h1>
                <div className={css.closeBtn} onClick={() => setViewJob("")}>
                    <i className="fa fa-close"></i>
                </div>
            </div>

            <div className={css.contentBody}>
                {/* Top Meta Section */}
                <div className={css.metaSection}>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h3 className="fs-5 text-muted m-0">
                            {data?.company?.Industry}
                        </h3>
                    </div>

                    <ul className={css.tagList}>
                        <li className={css.tagItem}>
                            <i className="fa fa-building"></i>
                            {data.company.Name}
                        </li>
                        <li className={css.tagItem}>
                            <i className="fa fa-map-marker-alt"></i>
                            {data.company.Address[0].personalAddress ||
                                data.company.Address[0].state}
                        </li>
                        <li className={css.tagItem}>
                            <i className="fa fa-clock"></i>
                            {moment(data.JobPostedTime).fromNow()}
                        </li>
                        <li className={css.tagItem}>
                            <i className="fa fa-briefcase"></i>
                            {data.JobType}
                        </li>
                    </ul>
                </div>

                <hr style={{ borderColor: "#f1f5f9" }} />

                {/* Job Details */}
                <div className={css.descriptionBox}>
                    <h2 className={css.sectionTitle}>About the job</h2>

                    <p>
                        <strong>Position:</strong> {data.Position}
                    </p>
                    <p>
                        <strong>Experience:</strong> {data.Experience}
                    </p>

                    <h3 className="fs-6 fw-bold mt-4">Overview</h3>
                    <ul>
                        {data?.Overview?.length > 0 ? (
                            data.Overview.map((e, index) => (
                                <li key={index}>{e}</li>
                            ))
                        ) : (
                            <li>No overview provided.</li>
                        )}
                    </ul>

                    <h3 className="fs-6 fw-bold mt-4">Key Responsibilities</h3>
                    <ul>
                        {data?.Responsiblities?.length > 0 ? (
                            data.Responsiblities.map((e, index) => (
                                <li key={index}>{e}</li>
                            ))
                        ) : (
                            <li>No responsibilities listed.</li>
                        )}
                    </ul>

                    <h3 className="fs-6 fw-bold mt-4">Qualifications</h3>
                    <ul>
                        {data?.Qualificaion?.length > 0 ? (
                            data.Qualificaion.map((e, index) => (
                                <li key={index}>{e}</li>
                            ))
                        ) : (
                            <li>No specific qualifications listed.</li>
                        )}
                    </ul>
                </div>

                {/* Company Section */}
                <div className={css.companySection}>
                    <div className={css.companyHeader}>
                        <img
                            src={data?.company?.Logo}
                            className={css.companyLogo}
                            alt="Company Logo"
                            onError={(e) =>
                                (e.target.src =
                                    "https://kodilan.com/img/empty-company-logo.8437254b.png")
                            }
                        />
                        <div className={css.companyInfo}>
                            <h4>{data?.company?.Name || "Company Name"}</h4>
                            <p>
                                {data?.company?.TagLine ||
                                    "Building the future..."}
                            </p>
                        </div>
                        {isFollowed ? (
                            <button
                                className={css.followBtn}
                                style={{
                                    backgroundColor: "#e2e8f0",
                                    color: "#1e293b",
                                }}
                                onClick={() => onUnFollow(data.company._id)}
                            >
                                <i className="bx bx-check"></i> Following
                            </button>
                        ) : (
                            <button
                                className={css.followBtn}
                                onClick={() => onFollow(data.company._id)}
                            >
                                <i className="bx bx-plus"></i> Follow
                            </button>
                        )}
                    </div>

                    {data?.company?.OwnerDetail && (
                        <div className="mt-3">
                            <p className="text-muted m-0">
                                <small>
                                    Owner: {data.company.OwnerDetail.Name}
                                </small>
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ViewJob;

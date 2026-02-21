import React from "react";
import moment from "moment/moment";

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
        <div className="bg-white rounded-2xl shadow-2xl max-h-[85vh] overflow-y-auto p-0 max-w-[900px] mx-auto border border-slate-200">
            <div className="sticky top-0 bg-white p-6 border-b border-slate-100 flex justify-between items-center z-10 sm:p-4">
                <h1 className="text-2xl font-bold text-slate-900 m-0">
                    {data.Title}
                </h1>
                <div
                    className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center cursor-pointer transition-all duration-200 text-slate-500 text-lg hover:bg-red-100 hover:text-red-500"
                    onClick={() => setViewJob("")}
                >
                    <i className="fa fa-close"></i>
                </div>
            </div>

            <div className="p-8 sm:p-5">
                {/* Top Meta Section */}
                <div>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h3 className="fs-5 text-muted m-0">
                            {data?.company?.Industry}
                        </h3>
                    </div>

                    <ul className="flex flex-wrap gap-3 list-none p-0 mb-6">
                        <li className="flex items-center gap-2 text-slate-600 bg-slate-50 px-4 py-1.5 rounded-lg text-sm font-medium [&_i]:text-blue-500">
                            <i className="fa fa-building"></i>
                            {data.company.Name}
                        </li>
                        <li className="flex items-center gap-2 text-slate-600 bg-slate-50 px-4 py-1.5 rounded-lg text-sm font-medium [&_i]:text-blue-500">
                            <i className="fa fa-map-marker-alt"></i>
                            {data.company.Address[0].personalAddress ||
                                data.company.Address[0].state}
                        </li>
                        <li className="flex items-center gap-2 text-slate-600 bg-slate-50 px-4 py-1.5 rounded-lg text-sm font-medium [&_i]:text-blue-500">
                            <i className="fa fa-clock"></i>
                            {moment(data.JobPostedTime).fromNow()}
                        </li>
                        <li className="flex items-center gap-2 text-slate-600 bg-slate-50 px-4 py-1.5 rounded-lg text-sm font-medium [&_i]:text-blue-500">
                            <i className="fa fa-briefcase"></i>
                            {data.JobType}
                        </li>
                    </ul>
                </div>

                <hr style={{ borderColor: "#f1f5f9" }} />

                {/* Job Details */}
                <div className="text-slate-700 leading-relaxed text-base [&_ul]:pl-5 [&_ul]:my-4 [&_li]:mb-2">
                    <h2 className="text-xl font-semibold text-slate-800 mb-4 mt-8 first:mt-0">
                        About the job
                    </h2>

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
                <div className="bg-slate-50 p-6 rounded-2xl mt-10 flex flex-col gap-4 sm:flex-col sm:items-start">
                    <div className="flex items-center gap-4 sm:flex-col sm:items-start">
                        <img
                            src={data?.company?.Logo}
                            className="w-16 h-16 rounded-xl bg-white p-1 object-contain border border-slate-200"
                            alt="Company Logo"
                            onError={(e) =>
                                (e.target.src =
                                    "https://kodilan.com/img/empty-company-logo.8437254b.png")
                            }
                        />
                        <div>
                            <h4 className="m-0 text-[1.1rem] font-bold text-slate-900">
                                {data?.company?.Name || "Company Name"}
                            </h4>
                            <p className="m-0 mt-1 text-slate-500 text-sm">
                                {data?.company?.TagLine ||
                                    "Building the future..."}
                            </p>
                        </div>
                        {isFollowed ? (
                            <button
                                className="bg-white border border-blue-500 text-blue-500 px-6 py-2 rounded-full font-semibold cursor-pointer ml-auto transition-all duration-200 hover:bg-blue-50 sm:ml-0 sm:w-full sm:text-center"
                                style={{
                                    backgroundColor: "#e2e8f0",
                                    color: "#1e293b",
                                    borderColor: "#cbd5e1",
                                }}
                                onClick={() => onUnFollow(data.company._id)}
                            >
                                <i className="bx bx-check"></i> Following
                            </button>
                        ) : (
                            <button
                                className="bg-white border border-blue-500 text-blue-500 px-6 py-2 rounded-full font-semibold cursor-pointer ml-auto transition-all duration-200 hover:bg-blue-50 sm:ml-0 sm:w-full sm:text-center"
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

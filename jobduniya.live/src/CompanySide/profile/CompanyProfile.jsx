import React, { useState } from "react";
// import css from "../Styles/css.module.css";

function UserProfileCard() {
    return (
        <div className="bg-white rounded-2xl mb-6 shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 text-center">
                <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                    alt="avatar"
                    className="rounded-full w-36 h-36 mx-auto mb-4 object-cover border-4 border-slate-50"
                />
                <h5 className="text-xl font-bold text-slate-800 mb-2">
                    John Smith
                </h5>
                <p className="text-slate-500 mb-1">Full Stack Developer</p>
                <p className="text-slate-400 mb-6 text-sm">
                    Bay Area, San Francisco, CA
                </p>
                <div className="flex justify-center gap-3 mb-2">
                    <button
                        type="button"
                        className="px-6 py-2 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition-colors"
                    >
                        Follow
                    </button>
                    <button
                        type="button"
                        className="px-6 py-2 bg-white text-blue-600 border border-blue-600 font-medium rounded-full hover:bg-blue-50 transition-colors"
                    >
                        Message
                    </button>
                </div>
            </div>
        </div>
    );
}

function ContactInfo() {
    return (
        <div className="bg-white rounded-2xl mb-6 lg:mb-0 shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-0">
                <ul className="list-none m-0 p-0">
                    <li className="flex justify-between items-center p-4 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
                        <i className="fas fa-globe fa-lg text-amber-400"></i>
                        <p className="mb-0 text-slate-600 font-medium">
                            https://mdbootstrap.com
                        </p>
                    </li>
                    {/* Add more list items for other contact info */}
                </ul>
            </div>
        </div>
    );
}

function ProjectStatusCard() {
    return (
        <div className="bg-white rounded-2xl mb-6 md:mb-0 shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6">
                <p className="mb-6 text-slate-800 font-semibold text-lg flex items-center gap-2">
                    <span className="text-blue-500 italic font-normal">
                        assignment
                    </span>{" "}
                    Project Status
                </p>
                <p className="mb-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Web Design
                </p>
                <div className="w-full bg-slate-100 rounded-full h-2 mb-4">
                    <div className="bg-blue-500 h-2 rounded-full w-[80%]"></div>
                </div>
                {/* Add more progress bars for other project statuses */}
            </div>
        </div>
    );
}

function UserInfoCard() {
    return (
        <div className="bg-white rounded-2xl mb-6 shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-[1fr_3fr] gap-4 mb-4">
                    <div className="text-slate-500 font-medium">Full Name</div>
                    <div className="text-slate-800 font-semibold">
                        Johnatan Smith
                    </div>
                </div>
                <hr className="border-slate-100 my-4" />
                <div className="grid grid-cols-1 sm:grid-cols-[1fr_3fr] gap-4">
                    <div className="text-slate-500 font-medium">Email</div>
                    <div className="text-slate-800 font-semibold">
                        example@example.com
                    </div>
                </div>
                {/* Add more rows for other user information */}
            </div>
        </div>
    );
}

function UserProfile() {
    return (
        <section className="w-full overflow-y-auto h-screen pt-20 bg-slate-50">
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 transition-transform hover:-translate-y-1">
                        <div className="flex justify-between items-center">
                            <div className="w-16 h-16 rounded-full bg-cyan-50 flex items-center justify-center">
                                <i className="fas fa-pencil-alt text-cyan-500 text-3xl"></i>
                            </div>
                            <div className="text-right">
                                <h3 className="text-3xl font-bold text-slate-800 mb-1">
                                    278
                                </h3>
                                <p className="text-slate-500 font-medium m-0">
                                    Jobs
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 transition-transform hover:-translate-y-1">
                        <div className="flex justify-between items-center">
                            <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center">
                                <i className="far fa-comment-alt text-amber-500 text-3xl"></i>
                            </div>
                            <div className="text-right">
                                <h3 className="text-3xl font-bold text-slate-800 mb-1">
                                    156
                                </h3>
                                <p className="text-slate-500 font-medium m-0">
                                    New Applications
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 transition-transform hover:-translate-y-1">
                        <div className="flex justify-between items-center">
                            <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center">
                                <i className="far fa-comment-alt text-emerald-500 text-3xl"></i>
                            </div>
                            <div className="text-right">
                                <h3 className="text-3xl font-bold text-slate-800 mb-1">
                                    156
                                </h3>
                                <p className="text-slate-500 font-medium m-0">
                                    Feedbacks
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1">
                        <UserProfileCard />
                        <ContactInfo />
                    </div>
                    <div className="lg:col-span-1">
                        <ProjectStatusCard />
                    </div>
                    <div className="lg:col-span-1">
                        <UserInfoCard />
                    </div>
                    {/* Add more components for other sections */}
                </div>
            </div>
        </section>
    );
}

const CompanyProfile = () => {
    const [profile, setProfile] = useState([]);

    return (
        <>
            <UserProfile />
        </>
    );
};

export default CompanyProfile;

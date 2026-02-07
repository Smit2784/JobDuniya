import react, { useCallback, useContext, useState } from "react";
import Modal from "../../render-model/Modal";
import { GlobalState } from "../../main";

const Body = ({ onClose, style, hidden, setValue }) => {
    const [currentState, setCurrentState] = useContext(GlobalState);
    const [hide, setHide] = useState([]);
    let user = null;
    try {
        const storedUser = localStorage.getItem("connectionId");
        if (storedUser && storedUser !== "undefined") {
            user = JSON.parse(storedUser);
        }
    } catch (error) {
        console.error("Failed to parse user data:", error);
    }

    if (!user) {
        return <div className="p-3 text-center">User data not available</div>;
    }

    const schemaKeysPersonalDetail = [
        "langauges",
        "lastName",
        "email",
        "firstName",
        "cv",
        "skills",
        "profession",
        "description",
    ];
    const filteredData1 = Object.entries(user).filter(([key, _]) =>
        schemaKeysPersonalDetail.includes(key),
    );
    const schemaKeysEducation = [
        "univercity",
        "school",
        "institutionName",
        "degreeLevel",
        "startDateSchool",
        "endDateSchool",
        "gpa",
        "certifications",
    ];
    const filteredData2 = Object.entries(
        user?.education.length != 0 && user.education[0],
    ).filter(([key, _]) => schemaKeysEducation.includes(key));

    const schemaKeysExperience = [
        "userType",
        "jobTitle",
        "companyName",
        "startDateWork",
        "endDateWork",
        "responsibilities",
        "achievements",
        "certifications",
    ];

    const filteredData3 = Object.entries(
        user?.experience.length != 0 && user?.experience[0],
    ).filter(([key, _]) => schemaKeysExperience.includes(key));

    const schemaKeysAddress = ["state", "city", "pinCode", "personalAddress"];

    const filteredData4 = Object.entries(
        user?.location.length != 0 && user.location[0],
    ).filter(([key, _]) => schemaKeysAddress.includes(key));
    const handleHide = (key) => {
        setValue((prev) => {
            if (hide.includes(key)) {
                return hide.filter((e) => e !== key);
            } else {
                return [...prev, key];
            }
        });
        setHide((prev) => {
            if (hide.includes(key)) {
                return hide.filter((e) => e !== key);
            } else {
                return [...prev, key];
            }
        });
    };

    const sections = [
        {
            key: "PersonalDetails",
            title: "Personal Details",
            data: filteredData1,
            icon: "fa-user",
        },
        {
            key: "EducationDetails",
            title: "Education Details",
            data: filteredData2,
            icon: "fa-graduation-cap",
        },
        {
            key: "ExperienceDetails",
            title: "Experience Details",
            data: user.experience[0].isFresher === false ? filteredData3 : null,
            icon: "fa-briefcase",
        },
        {
            key: "LocationDetails",
            title: "Location Details",
            data: filteredData4,
            icon: "fa-location-dot",
        },
    ];

    return (
        <div className="w-[57%] max-w-[1200px] h-[85vh] bg-[#f8fafc] rounded-3xl overflow-hidden relative shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] font-['Outfit'] flex flex-col border border-[#e2e8f0]">
            {/* 1. Glassmorphism Header */}
            <div className="h-[180px] bg-gradient-to-br from-[#0284c7] to-[#23a6f0] relative p-8 flex items-end border-b border-[#e2e8f0]">
                {!hidden && (
                    <button
                        className="absolute top-6 right-6 bg-white/20 border border-white/30 w-10 h-10 rounded-full text-white text-[1.1rem] cursor-pointer transition-all duration-200 flex items-center justify-center backdrop-blur-sm hover:bg-white/30 hover:rotate-90"
                        onClick={onClose}
                        title="Close"
                    >
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                )}

                {/* 2. Floating Profile Card */}
                <div className="bg-white p-6 rounded-2xl flex items-center gap-6 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)] -mb-14 w-auto min-w-[320px] border border-[#e2e8f0] max-[900px]:w-full max-[900px]:flex-col max-[900px]:text-center max-[900px]:-mb-16">
                    <img
                        src={user.profileImage}
                        onError={(e) =>
                            (e.target.src =
                                "https://w7.pngwing.com/pngs/695/655/png-transparent-head-the-dummy-avatar-man-tie-jacket-user.png")
                        }
                        alt="Profile"
                        className="w-20 h-20 rounded-xl object-cover border-2 border-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]"
                    />
                    <div className="flex flex-col">
                        <h2 className="m-0 text-2xl font-bold text-[#0f172a]">
                            {user?.firstName} {user?.lastName}
                        </h2>
                        <p className="m-1 0 0 text-[#64748b] font-medium text-[0.95rem]">
                            {user.email}
                        </p>
                    </div>
                </div>
            </div>

            {/* 3. Dashboard Grid Content */}
            <div className="flex-1 overflow-y-auto px-8 pt-20 pb-8 grid grid-cols-12 auto-rows-min gap-6 scrollbar-thin scrollbar-thumb-[#cbd5e1] scrollbar-track-transparent">
                {/* Personal Details Card */}
                <div
                    className={`bg-white rounded-2xl p-6 shadow-[0_1px_3px_0_rgba(0,0,0,0.05)] border border-[#e2e8f0] transition-shadow duration-200 flex flex-col hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.05)] hover:border-[#cbd5e1] col-span-12 w-full`}
                >
                    <div className="text-[0.8rem] uppercase tracking-wider text-[#0284c7] font-bold mb-5 flex items-center gap-3">
                        <i className="fa-regular fa-user bg-[#e0f2fe] text-[#0284c7] p-2 rounded-lg text-[0.9rem]"></i>{" "}
                        Personal Details
                    </div>
                    <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-5">
                        {filteredData1.map(([key, value]) => (
                            <div
                                key={key}
                                className="flex flex-col gap-[0.35rem]"
                            >
                                <span className="text-xs text-[#64748b] font-semibold uppercase">
                                    {key === "cv" ? "Resume" : key}
                                </span>
                                <span className="text-[0.95rem] text-[#0f172a] font-medium leading-relaxed">
                                    {key === "cv" ? (
                                        <a
                                            href={value}
                                            target="_blank"
                                            className="inline-flex items-center gap-2 px-4 py-2 bg-[#eff6ff] text-[#0284c7] border border-[#bae6fd] rounded-md no-underline font-semibold text-[0.9rem] transition-all duration-200 hover:bg-[#e0f2fe] hover:border-[#7dd3fc]"
                                        >
                                            <i className="fa-regular fa-eye"></i>{" "}
                                            View Resume
                                        </a>
                                    ) : value && value.length > 0 ? (
                                        Array.isArray(value) ? (
                                            value.join(", ")
                                        ) : (
                                            value
                                        )
                                    ) : (
                                        "-"
                                    )}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Experience Card */}
                {user.experience[0].isFresher === false && (
                    <div
                        className={`bg-white rounded-2xl p-6 shadow-[0_1px_3px_0_rgba(0,0,0,0.05)] border border-[#e2e8f0] transition-shadow duration-200 flex flex-col hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.05)] hover:border-[#cbd5e1] col-span-7 w-full max-[900px]:col-span-12`}
                    >
                        <div className="text-[0.8rem] uppercase tracking-wider text-[#0284c7] font-bold mb-5 flex items-center gap-3">
                            <i className="fa-solid fa-briefcase bg-[#e0f2fe] text-[#0284c7] p-2 rounded-lg text-[0.9rem]"></i>{" "}
                            Experience
                        </div>
                        <div className="flex flex-wrap gap-3">
                            {filteredData3.map(([key, value]) => (
                                <div
                                    key={key}
                                    className="p-4 bg-white border border-[#f1f5f9] rounded-[10px] border-l-[3px] border-l-[#0ea5e9] transition-colors duration-200 hover:border-l-[#0284c7]"
                                >
                                    <div className="flex flex-col gap-[0.35rem]">
                                        <span className="text-xs text-[#64748b] font-semibold uppercase">
                                            {key}
                                        </span>
                                        <span className="text-[0.95rem] text-[#0f172a] font-medium leading-relaxed">
                                            {value && value.length > 0
                                                ? Array.isArray(value)
                                                    ? value.join(", ")
                                                    : value
                                                : "-"}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Education Card */}
                <div
                    className={`bg-white rounded-2xl p-6 shadow-[0_1px_3px_0_rgba(0,0,0,0.05)] border border-[#e2e8f0] transition-shadow duration-200 flex flex-col hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.05)] hover:border-[#cbd5e1] col-span-5 w-full max-[900px]:col-span-12`}
                >
                    <div className="text-[0.8rem] uppercase tracking-wider text-[#0284c7] font-bold mb-5 flex items-center gap-3">
                        <i className="fa-solid fa-graduation-cap bg-[#e0f2fe] text-[#0284c7] p-2 rounded-lg text-[0.9rem]"></i>{" "}
                        Education
                    </div>
                    <div className="flex flex-wrap gap-3">
                        {filteredData2.map(([key, value]) => (
                            <div
                                key={key}
                                className="p-4 bg-white border border-[#f1f5f9] rounded-[10px] border-l-[3px] border-l-[#0ea5e9] transition-colors duration-200 hover:border-l-[#0284c7]"
                            >
                                <div className="flex flex-col gap-[0.35rem]">
                                    <span className="text-xs text-[#64748b] font-semibold uppercase">
                                        {key}
                                    </span>
                                    <span className="text-[0.95rem] text-[#0f172a] font-medium leading-relaxed">
                                        {value && value.length > 0
                                            ? Array.isArray(value)
                                                ? value.join(", ")
                                                : value
                                            : "-"}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Location Card */}
                <div
                    className={`bg-white rounded-2xl p-6 shadow-[0_1px_3px_0_rgba(0,0,0,0.05)] border border-[#e2e8f0] transition-shadow duration-200 flex flex-col hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.05)] hover:border-[#cbd5e1] col-span-12 w-full`}
                >
                    <div className="text-[0.8rem] uppercase tracking-wider text-[#0284c7] font-bold mb-5 flex items-center gap-3">
                        <i className="fa-solid fa-location-dot bg-[#e0f2fe] text-[#0284c7] p-2 rounded-lg text-[0.9rem]"></i>{" "}
                        Location
                    </div>
                    <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-5">
                        {filteredData4.map(([key, value]) => (
                            <div
                                key={key}
                                className="flex flex-col gap-[0.35rem]"
                            >
                                <span className="text-xs text-[#64748b] font-semibold uppercase">
                                    {key}
                                </span>
                                <span className="text-[0.95rem] text-[#0f172a] font-medium leading-relaxed">
                                    {value && value.length > 0
                                        ? Array.isArray(value)
                                            ? value.join(", ")
                                            : value
                                        : "-"}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const ConnectionProfileView = ({ onClose }) => {
    const [tmp, setTmp] = useState([]);
    return (
        <Modal body={<Body onClose={onClose} style="" setValue={setTmp} />} />
    );
};

export default ConnectionProfileView;
export { Body };

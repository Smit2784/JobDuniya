import css from "./connection_v3.module.css";
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
        <div className={css.profileContainer}>
            {/* 1. Glassmorphism Header */}
            <div className={css.header}>
                {!hidden && (
                    <button
                        className={css.closeButton}
                        onClick={onClose}
                        title="Close"
                    >
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                )}

                {/* 2. Floating Profile Card */}
                <div className={css.profileCard}>
                    <img
                        src={user.profileImage}
                        onError={(e) =>
                            (e.target.src =
                                "https://w7.pngwing.com/pngs/695/655/png-transparent-head-the-dummy-avatar-man-tie-jacket-user.png")
                        }
                        alt="Profile"
                        className={css.avatar}
                    />
                    <div className={css.nameInfo}>
                        <h2>
                            {user?.firstName} {user?.lastName}
                        </h2>
                        <p>{user.email}</p>
                    </div>
                </div>
            </div>

            {/* 3. Dashboard Grid Content */}
            <div className={css.contentArea}>
                {/* Personal Details Card */}
                <div className={`${css.card} ${css.cardPersonal}`}>
                    <div className={css.sectionTitle}>
                        <i className="fa-regular fa-user"></i> Personal Details
                    </div>
                    <div className={css.dataGrid}>
                        {filteredData1.map(([key, value]) => (
                            <div key={key} className={css.dataItem}>
                                <span className={css.label}>
                                    {key === "cv" ? "Resume" : key}
                                </span>
                                <span className={css.value}>
                                    {key === "cv" ? (
                                        <a
                                            href={value}
                                            target="_blank"
                                            className={css.linkBtn}
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
                    <div className={`${css.card} ${css.cardExperience}`}>
                        <div className={css.sectionTitle}>
                            <i className="fa-solid fa-briefcase"></i> Experience
                        </div>
                        <div className={css.listContainer}>
                            {filteredData3.map(([key, value]) => (
                                <div key={key} className={css.listItem}>
                                    <div className={css.dataItem}>
                                        <span className={css.label}>{key}</span>
                                        <span className={css.value}>
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
                <div className={`${css.card} ${css.cardEducation}`}>
                    <div className={css.sectionTitle}>
                        <i className="fa-solid fa-graduation-cap"></i> Education
                    </div>
                    <div className={css.listContainer}>
                        {filteredData2.map(([key, value]) => (
                            <div key={key} className={css.listItem}>
                                <div className={css.dataItem}>
                                    <span className={css.label}>{key}</span>
                                    <span className={css.value}>
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
                <div className={`${css.card} ${css.cardLocation}`}>
                    <div className={css.sectionTitle}>
                        <i className="fa-solid fa-location-dot"></i> Location
                    </div>
                    <div className={css.dataGrid}>
                        {filteredData4.map(([key, value]) => (
                            <div key={key} className={css.dataItem}>
                                <span className={css.label}>{key}</span>
                                <span className={css.value}>
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
        <Modal
            body={
                <Body
                    onClose={onClose}
                    style={css.modalBodyTable}
                    setValue={setTmp}
                />
            }
        />
    );
};

export default ConnectionProfileView;
export { Body };

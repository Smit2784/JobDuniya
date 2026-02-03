import Modal from "../render-model/Modal";
import css from "./profile.module.css";
import { GlobalState } from "../main";
import react, { useContext, useState } from "react";

const Body = ({ onClose, style, hidden, setValue, filteredData }) => {
    const [currentState, setCurrentState] = useContext(GlobalState);
    const [hide, setHide] = useState([]);
    const [data1, setData1] = useState(filteredData[0]);
    const [data2, setData2] = useState(filteredData[1]);
    const [data3, setData3] = useState(filteredData[2]);
    const [data4, setData4] = useState(filteredData[3]);

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
            data: data1,
            icon: "fa-user",
        },
        {
            key: "LocationDetails",
            title: "Location Details",
            data: data2,
            icon: "fa-location-dot",
        },
        {
            key: "HRDetails",
            title: "HR Details",
            data: data3,
            icon: "fa-briefcase",
        },
        {
            key: "OwnerDetails",
            title: "Owner Details",
            data: data4,
            icon: "fa-crown",
        },
    ];

    return (
        <div className={css.profileModal}>
            {/* Header Section */}
            <div className={css.profileHeader}>
                {!hidden && (
                    <button className={css.closeButton} onClick={onClose}>
                        <i className="fa fa-times"></i>
                    </button>
                )}
                <div className={css.profileInfo}>
                    <img
                        src={currentState.Logo}
                        onError={(e) =>
                            (e.target.src =
                                "https://i.pinimg.com/originals/ec/d9/c2/ecd9c2e8ed0dbbc96ac472a965e4afda.jpg")
                        }
                        alt="Profile"
                        className={css.profileImage}
                    />
                    <div className={css.profileDetails}>
                        <h2 className={css.profileName}>
                            {currentState?.Name}
                        </h2>
                        <p className={css.profileEmail}>{currentState.Email}</p>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className={css.profileContent}>
                {sections.map((section) => (
                    <div key={section.key} className={css.section}>
                        <div
                            className={css.sectionHeader}
                            onClick={() => handleHide(section.key)}
                        >
                            <h3 className={css.sectionTitle}>
                                <i className={`fa ${section.icon}`}></i>
                                {section.title}
                            </h3>
                            <i
                                className={`fa-solid fa-chevron-right ${css.sectionIcon} ${
                                    hide.includes(section.key)
                                        ? css.sectionIconExpanded
                                        : ""
                                }`}
                            ></i>
                        </div>
                        <div
                            className={`${css.sectionBody} ${
                                hide.includes(section.key)
                                    ? css.sectionBodyExpanded
                                    : ""
                            }`}
                        >
                            {section.data.map(([key, value]) => (
                                <div key={key} className={css.dataRow}>
                                    <div className={css.dataLabel}>
                                        {key.toLocaleUpperCase()}
                                    </div>
                                    <div className={css.dataValue}>
                                        {value && value.length > 0
                                            ? Array.isArray(value)
                                                ? value.join(", ")
                                                : value
                                            : "-"}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const ProfileView = ({ onClose }) => {
    const [tmp, setTmp] = useState([]);
    return <Modal body={<Body onClose={onClose} setValue={setTmp} />} />;
};

export default ProfileView;
export { Body };

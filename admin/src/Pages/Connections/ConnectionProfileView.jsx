import css from "../../Styles/modal.module.css";
import react, { useCallback, useContext, useState } from "react";
import Modal from "../../render-model/Modal";
import { GlobalState } from '../../main'

const Body = ({ onClose, style, hidden, setValue }) => {
    const [currentState, setCurrentState] = useContext(GlobalState);
    const [hide, setHide] = useState([]);
    const user = JSON.parse(localStorage.getItem("connectionId")); // user data
    console.log(user);
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
        schemaKeysPersonalDetail.includes(key)
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
    const filteredData2 = Object.entries(user?.education.length != 0 && user.education[0]).filter(([key, _]) =>
        schemaKeysEducation.includes(key)
    );

    const schemaKeysExperience = [
        'userType',
        'jobTitle',
        'companyName',
        'startDateWork',
        'endDateWork',
        'responsibilities',
        'achievements',
        "certifications",
    ];
    
    const filteredData3 = Object.entries( user?.experience.length != 0 && user?.experience[0]).filter(([key, _]) =>
        schemaKeysExperience.includes(key)  
    );

    const schemaKeysAddress = [
        'state' ,
        'city',
        'pinCode',
        'personalAddress'
    ];

    const filteredData4 = Object.entries(user?.location.length != 0 && user.location[0]).filter(([key, _]) =>
        schemaKeysAddress.includes(key)
    );
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

    return (
        <>
            <div className={style}>
                <div className={css.TableContainerConnection}>
                    <table className="table  table-hover bg-white table-borderless  table-responsive-md  align-middle mb-0 ">
                        <thead className="">
                            <tr>
                                <th>
                                    <div class="d-flex align-items-center">
                                        <img
                                            src={user.profileImage}
                                            onError={(e) =>
                                            (e.target.src =
                                                "https://w7.pngwing.com/pngs/695/655/png-transparent-head-the-dummy-avatar-man-tie-jacket-user.png")
                                            }
                                            alt=""
                                            style={{
                                                width: "80px",
                                                height: "80px",
                                            }}
                                            class="rounded-circle"
                                        />
                                        <div class="ms-3">
                                            <p class="fw-bold fs-5 mb-1">
                                                {user?.firstName}
                                            </p>
                                            <p class="text-muted mb-0">
                                                {user.email}
                                            </p>
                                        </div>
                                    </div>
                                </th>
                                {!hidden && (
                                    <th className="text-end d-flex flex-column  justify-content-start">
                                        {!hidden && (
                                            <i
                                                className="fa fa-close hand"
                                                onClick={onClose}
                                            ></i>
                                        )}
                                    </th>
                                )}
                            </tr>
                        </thead>
                        <thead className="hand table-info ">
                            <tr
                                className=""
                                onClick={() => handleHide("PersonalDetails")}
                            >
                                <th>
                                    <b>Personal Details</b>
                                </th>
                                <th className="text-end ">
                                    {!hide.includes("PersonalDetails") ? (
                                        <i class="fa-solid fa-caret-right"></i>
                                    ) : (
                                        <i class="fa-solid fa-caret-down"></i>
                                    )}
                                </th>
                            </tr>
                        </thead>
                        <tbody
                            className="table-active table-bordered border-1 border-light"
                            style={
                                !hide.includes("PersonalDetails")
                                    ? {
                                        display: "none",
                                    }
                                    : {}
                            }
                        >
                            {filteredData1.map(([key, value]) => (
                                <tr key={key}>
                                    {key === "cv" ? (
                                        <>
                                            <td>RESUME</td>
                                            <td className="text-end fs-5 ">
                                                <a
                                                    href={value}
                                                    className=""
                                                    target="_blank"
                                                >
                                                    <i className="fa fa-eye"></i>{" "}
                                                </a>
                                            </td>
                                        </>
                                    ) : (
                                        <>
                                            <td>{key.toLocaleUpperCase()}</td>
                                            <td className="text-end">
                                                {Array.isArray(value)
                                                    ? value.join(", ")
                                                    : value}
                                            </td>
                                        </>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                        <thead className="table-info hand ">
                            <tr onClick={() => handleHide("EducationDetails")}>
                                <th>
                                    <b>Education Details</b>
                                </th>
                                <th className="text-end ">
                                    {!hide.includes("EducationDetails") ? (
                                        <i class="fa-solid fa-caret-right"></i>
                                    ) : (
                                        <i class="fa-solid fa-caret-down"></i>
                                    )}
                                </th>
                            </tr>
                        </thead>
                        <tbody
                            className="table-active"
                            style={
                                !hide.includes("EducationDetails")
                                    ? {
                                        display: "none",
                                    }
                                    : {}
                            }
                        >
                            {filteredData2.map(([key, value]) => (
                                <>
                                    <tr key={key}>
                                        <td>{key.toLocaleUpperCase()}</td>
                                        <td className="text-end">
                                            {value.length > 0?Array.isArray(value)
                                                ? value.join(", ")
                                                : value : "-"}
                                        </td>
                                    </tr>
                                </>
                            ))}
                        </tbody>
                        <thead className="table-info hand">
                            <tr onClick={() => handleHide("ExperienceDetails")}>
                                <th>
                                    <b>Exprience Details</b>
                                </th>
                                <th className="text-end ">
                                    {!hide.includes("ExperienceDetails") ? (
                                        <i class="fa-solid fa-caret-right"></i>
                                    ) : (
                                        <i class="fa-solid fa-caret-down"></i>
                                    )}
                                </th>
                            </tr>
                        </thead>
                        <tbody
                            className="table-active"
                            style={
                                !hide.includes("ExperienceDetails")
                                    ? {
                                        display: "none",
                                    }
                                    : {}
                            }
                        >
                            
                            {filteredData3.map(([key, value]) => (
                                <>
                                    <tr key={key}>
                                        <td>{key.toLocaleUpperCase()}</td>
                                        <td className="text-end">
                                            {value.length > 0?Array.isArray(value)
                                                ? value.join(", ")
                                                : value : "-"}
                                        </td>
                                    </tr>
                                </>
                            ))}
                        </tbody>
                        <thead className="table-info hand">
                            <tr onClick={() => handleHide("LocationDetails")}>
                                <th>
                                    <b>Location Details</b>
                                </th>
                                <th className="text-end ">
                                    {!hide.includes("LocationDetails") ? (
                                        <i class="fa-solid fa-caret-right"></i>
                                    ) : (
                                        <i class="fa-solid fa-caret-down"></i>
                                    )}
                                </th>
                            </tr>
                        </thead>
                        <tbody
                            className="table-active"
                            style={
                                !hide.includes("LocationDetails")
                                    ? {
                                        display: "none",
                                    }
                                    : {}
                            }
                        >
                            {filteredData4.map(([key, value]) => (
                                <>
                                    <tr key={key}>
                                        <td>{key.toLocaleUpperCase()}</td>
                                        <td className="text-end">
                                            {value.length > 0?Array.isArray(value)
                                                ? value.join(", ")
                                                : value : "-"}
                                        </td>
                                    </tr>
                                </>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
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

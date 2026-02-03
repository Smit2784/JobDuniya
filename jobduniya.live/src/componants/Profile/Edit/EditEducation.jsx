import { useState, useCallback, useEffect } from "react";
import useAPI from "../../../Hooks/USER/useAPI";
import Cookies from "js-cookie";
import useFirestorage from "../../../Hooks/OTHER/useFirestorage";
import css from "../../../Style/profile_modal.module.css";

const EditEducation = () => {
    const api = useAPI();
    const [institutionName, setInstitutionName] = useState("");
    const [degreeLevels, setDegreeLevel] = useState([]);
    const [startDateSchool, setStartDateSchool] = useState("");
    const [endDateSchool, setEndDateSchool] = useState("");
    const [gpa, setGpa] = useState("");
    const [certificat, setCertifications] = useState([]);
    const [univercity, setUnivercity] = useState("");
    const [school, setSchool] = useState("");

    const handleSubmit = useCallback(async () => {
        const id = Cookies.get("id");
        const degreeLevel = degreeLevels.split(",");
        const certifications = certificat.split(",");
        const data = await api.patchREQUEST("updateDetails", "users", id, {
            education: [
                {
                    univercity,
                    school,
                    degreeLevel,
                    startDateSchool,
                    endDateSchool,
                    institutionName,
                    gpa,
                    certifications,
                },
            ],
        });
    }, [
        institutionName,
        degreeLevels,
        startDateSchool,
        endDateSchool,
        gpa,
        certificat,
        univercity,
        school,
    ]);

    return (
        <div className="w-100">
            <div className="row mb-3">
                <div className="col-md-6">
                    <div className={css.formGroup}>
                        <label className={css.label}>University</label>
                        <input
                            type="text"
                            className={css.input}
                            placeholder="University Name"
                            required
                            name="univercity"
                            onChange={(e) => setUnivercity(e.target.value)}
                        />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className={css.formGroup}>
                        <label className={css.label}>School</label>
                        <input
                            type="text"
                            className={css.input}
                            placeholder="School Name"
                            required
                            name="school"
                            onChange={(e) => setSchool(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className={css.formGroup}>
                <label className={css.label}>Degree Level</label>
                <input
                    type="text"
                    placeholder="Comma separated (e.g. Bachelors, Masters)"
                    className={css.input}
                    name="degreeLevel"
                    onChange={(e) => setDegreeLevel(e.target.value)}
                />
            </div>

            <div className="row mb-3">
                <div className="col-md-6">
                    <div className={css.formGroup}>
                        <label className={css.label}>Start Date</label>
                        <input
                            type="date"
                            className={css.input}
                            name="startDateSchool"
                            onChange={(e) => setStartDateSchool(e.target.value)}
                        />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className={css.formGroup}>
                        <label className={css.label}>End Date</label>
                        <input
                            type="date"
                            className={css.input}
                            name="endDateSchool"
                            onChange={(e) => setEndDateSchool(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className={css.formGroup}>
                <label className={css.label}>Institution Name</label>
                <input
                    type="text"
                    placeholder="Institution Name"
                    className={css.input}
                    name="institutionName"
                    onChange={(e) => setInstitutionName(e.target.value)}
                />
            </div>

            <div className={css.formGroup}>
                <label className={css.label}>GPA</label>
                <input
                    type="text"
                    placeholder="GPA"
                    className={css.input}
                    name="gpa"
                    onChange={(e) => setGpa(e.target.value)}
                />
            </div>

            <div className={css.formGroup}>
                <label className={css.label}>Certifications</label>
                <input
                    type="text"
                    placeholder="Comma separated certifications"
                    className={css.input}
                    name="certifications"
                    onChange={(e) => setCertifications(e.target.value)}
                />
            </div>

            <button
                className={`${css.saveBtn}`}
                onClick={() => handleSubmit()}
            >
                Save Education
            </button>
        </div>
    );
};

export default EditEducation;

import { useState, useCallback } from "react";
import useAPI from "../../../Hooks/USER/useAPI";
import Cookies from "js-cookie";
import css from "../../../Style/profile_modal.module.css";

function EditExperience() {
    const [jobTitle, setJobTitle] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [userType, setUserType] = useState("");
    const [startDateWork, setStartDateWork] = useState("");
    const [endDateWork, setEndDateWork] = useState("");
    const [responsibilitie, setResponsibilities] = useState([]);
    const [achievement, setAchievements] = useState([]);
    const [input, setInput] = useState([]);

    const api = useAPI();

    const handleEnterResponsibilitesEvent = (e) => {
        if (e.key == "Enter") {
            setResponsibilities([...responsibilitie, input]);
            e.target.value = "";
        }
    };

    const handleEnterAchievementEvent = (e) => {
        if (e.key == "Enter") {
            setAchievements([...achievement, input]);
            e.target.value = "";
        }
    };

    const handleSubmit = useCallback(async () => {
        const id = Cookies.get("id");
        const responsibilities = responsibilitie?.split(",");
        const achievements = achievement.length > 0 && achievement?.split(",");
        const data = await api.patchREQUEST("updateDetails", "users", id, {
            experience: [
                {
                    jobTitle,
                    companyName,
                    userType,
                    startDateWork,
                    endDateWork,
                    responsibilities,
                    achievements,
                },
            ],
        });
    }, [
        jobTitle,
        companyName,
        userType,
        startDateWork,
        endDateWork,
        responsibilitie,
        achievement,
    ]);

    return (
        <div className="w-100">
            <div className="row mb-3">
                <div className="col-md-6">
                    <div className={css.formGroup}>
                        <label className={css.label}>Job Title</label>
                        <input
                            type="text"
                            className={css.input}
                            placeholder="Job Title"
                            required
                            name="jobTitle"
                            onChange={(e) => setJobTitle(e.target.value)}
                        />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className={css.formGroup}>
                        <label className={css.label}>Company Name</label>
                        <input
                            type="text"
                            className={css.input}
                            placeholder="Company Name"
                            required
                            name="companyName"
                            onChange={(e) => setCompanyName(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className={css.formGroup}>
                <label className={css.label}>User Type</label>
                <input
                    type="text"
                    className={css.input}
                    placeholder="User Type"
                    required
                    name="userType"
                    onChange={(e) => setUserType(e.target.value)}
                />
            </div>

            <div className="row mb-3">
                <div className="col-md-6">
                    <div className={css.formGroup}>
                        <label className={css.label}>Start Date</label>
                        <input
                            type="date"
                            className={css.input}
                            name="startDateWork"
                            onChange={(e) => setStartDateWork(e.target.value)}
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
                            onChange={(e) => setEndDateWork(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className={css.formGroup}>
                <label className={css.label}>Responsibilities</label>
                <input
                    type="text"
                    placeholder="Comma separated responsibilities"
                    className={css.input}
                    name="responsibilitie"
                    onChange={(e) => setResponsibilities(e.target.value)}
                    onKeyUp={(e) => handleEnterResponsibilitesEvent(e)}
                />
            </div>

            <div className={css.formGroup}>
                <label className={css.label}>Achievements</label>
                <input
                    type="text"
                    placeholder="Comma separated achievements"
                    className={css.input}
                    name="achievements"
                    onChange={(e) => setAchievements(e.target.value)}
                    onKeyUp={(e) => handleEnterAchievementEvent(e)}
                />
            </div>

            <button
                className={`${css.saveBtn}`}
                onClick={() => handleSubmit()}
            >
                Save Experience
            </button>
        </div>
    );
}

export default EditExperience;

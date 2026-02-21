import { useState, useCallback } from "react";
import useAPI from "../../../Hooks/USER/useAPI";
import Cookies from "js-cookie";
// import css from "../../../Style/profile_modal.module.css";

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
        <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-3">
                <div>
                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Job Title
                        </label>
                        <input
                            type="text"
                            className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-[0.95rem] text-slate-800 transition-all duration-200 shadow-sm focus:outline-none focus:border-blue-500 focus:shadow-[0_0_0_4px_rgba(59,130,246,0.1)] hover:border-slate-300"
                            placeholder="Job Title"
                            required
                            name="jobTitle"
                            onChange={(e) => setJobTitle(e.target.value)}
                        />
                    </div>
                </div>
                <div>
                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Company Name
                        </label>
                        <input
                            type="text"
                            className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-[0.95rem] text-slate-800 transition-all duration-200 shadow-sm focus:outline-none focus:border-blue-500 focus:shadow-[0_0_0_4px_rgba(59,130,246,0.1)] hover:border-slate-300"
                            placeholder="Company Name"
                            required
                            name="companyName"
                            onChange={(e) => setCompanyName(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                    User Type
                </label>
                <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-[0.95rem] text-slate-800 transition-all duration-200 shadow-sm focus:outline-none focus:border-blue-500 focus:shadow-[0_0_0_4px_rgba(59,130,246,0.1)] hover:border-slate-300"
                    placeholder="User Type"
                    required
                    name="userType"
                    onChange={(e) => setUserType(e.target.value)}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-3">
                <div>
                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Start Date
                        </label>
                        <input
                            type="date"
                            className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-[0.95rem] text-slate-800 transition-all duration-200 shadow-sm focus:outline-none focus:border-blue-500 focus:shadow-[0_0_0_4px_rgba(59,130,246,0.1)] hover:border-slate-300"
                            name="startDateWork"
                            onChange={(e) => setStartDateWork(e.target.value)}
                        />
                    </div>
                </div>
                <div>
                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            End Date
                        </label>
                        <input
                            type="date"
                            className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-[0.95rem] text-slate-800 transition-all duration-200 shadow-sm focus:outline-none focus:border-blue-500 focus:shadow-[0_0_0_4px_rgba(59,130,246,0.1)] hover:border-slate-300"
                            name="endDateSchool"
                            onChange={(e) => setEndDateWork(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Responsibilities
                </label>
                <input
                    type="text"
                    placeholder="Comma separated responsibilities"
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-[0.95rem] text-slate-800 transition-all duration-200 shadow-sm focus:outline-none focus:border-blue-500 focus:shadow-[0_0_0_4px_rgba(59,130,246,0.1)] hover:border-slate-300"
                    name="responsibilitie"
                    onChange={(e) => setResponsibilities(e.target.value)}
                    onKeyUp={(e) => handleEnterResponsibilitesEvent(e)}
                />
            </div>

            <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Achievements
                </label>
                <input
                    type="text"
                    placeholder="Comma separated achievements"
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-[0.95rem] text-slate-800 transition-all duration-200 shadow-sm focus:outline-none focus:border-blue-500 focus:shadow-[0_0_0_4px_rgba(59,130,246,0.1)] hover:border-slate-300"
                    name="achievements"
                    onChange={(e) => setAchievements(e.target.value)}
                    onKeyUp={(e) => handleEnterAchievementEvent(e)}
                />
            </div>

            <button
                className="bg-linear-to-br from-blue-600 to-blue-700 text-white font-semibold px-8 py-3 rounded-lg border-none shadow-lg shadow-blue-500/20 transition-all duration-200 w-full mt-4 text-base hover:-translate-y-px hover:shadow-xl hover:brightness-110 cursor-pointer"
                onClick={() => handleSubmit()}
            >
                Save Experience
            </button>
        </div>
    );
}

export default EditExperience;

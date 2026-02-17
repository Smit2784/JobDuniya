import { useState, useCallback, useEffect } from "react";
import useAPI from "../../../Hooks/USER/useAPI";
import Cookies from "js-cookie";
import useFirestorage from "../../../Hooks/OTHER/useFirestorage";
// import css from "../../../Style/profile_modal.module.css";

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
                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            University
                        </label>
                        <input
                            type="text"
                            className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-[0.95rem] text-slate-800 transition-all duration-200 shadow-sm focus:outline-none focus:border-blue-500 focus:shadow-[0_0_0_4px_rgba(59,130,246,0.1)] hover:border-slate-300"
                            placeholder="University Name"
                            required
                            name="univercity"
                            onChange={(e) => setUnivercity(e.target.value)}
                        />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            School
                        </label>
                        <input
                            type="text"
                            className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-[0.95rem] text-slate-800 transition-all duration-200 shadow-sm focus:outline-none focus:border-blue-500 focus:shadow-[0_0_0_4px_rgba(59,130,246,0.1)] hover:border-slate-300"
                            placeholder="School Name"
                            required
                            name="school"
                            onChange={(e) => setSchool(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Degree Level
                </label>
                <input
                    type="text"
                    placeholder="Comma separated (e.g. Bachelors, Masters)"
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-[0.95rem] text-slate-800 transition-all duration-200 shadow-sm focus:outline-none focus:border-blue-500 focus:shadow-[0_0_0_4px_rgba(59,130,246,0.1)] hover:border-slate-300"
                    name="degreeLevel"
                    onChange={(e) => setDegreeLevel(e.target.value)}
                />
            </div>

            <div className="row mb-3">
                <div className="col-md-6">
                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Start Date
                        </label>
                        <input
                            type="date"
                            className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-[0.95rem] text-slate-800 transition-all duration-200 shadow-sm focus:outline-none focus:border-blue-500 focus:shadow-[0_0_0_4px_rgba(59,130,246,0.1)] hover:border-slate-300"
                            name="startDateSchool"
                            onChange={(e) => setStartDateSchool(e.target.value)}
                        />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            End Date
                        </label>
                        <input
                            type="date"
                            className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-[0.95rem] text-slate-800 transition-all duration-200 shadow-sm focus:outline-none focus:border-blue-500 focus:shadow-[0_0_0_4px_rgba(59,130,246,0.1)] hover:border-slate-300"
                            name="endDateSchool"
                            onChange={(e) => setEndDateSchool(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Institution Name
                </label>
                <input
                    type="text"
                    placeholder="Institution Name"
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-[0.95rem] text-slate-800 transition-all duration-200 shadow-sm focus:outline-none focus:border-blue-500 focus:shadow-[0_0_0_4px_rgba(59,130,246,0.1)] hover:border-slate-300"
                    name="institutionName"
                    onChange={(e) => setInstitutionName(e.target.value)}
                />
            </div>

            <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                    GPA
                </label>
                <input
                    type="text"
                    placeholder="GPA"
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-[0.95rem] text-slate-800 transition-all duration-200 shadow-sm focus:outline-none focus:border-blue-500 focus:shadow-[0_0_0_4px_rgba(59,130,246,0.1)] hover:border-slate-300"
                    name="gpa"
                    onChange={(e) => setGpa(e.target.value)}
                />
            </div>

            <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Certifications
                </label>
                <input
                    type="text"
                    placeholder="Comma separated certifications"
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-[0.95rem] text-slate-800 transition-all duration-200 shadow-sm focus:outline-none focus:border-blue-500 focus:shadow-[0_0_0_4px_rgba(59,130,246,0.1)] hover:border-slate-300"
                    name="certifications"
                    onChange={(e) => setCertifications(e.target.value)}
                />
            </div>

            <button
                className="bg-gradient-to-br from-blue-600 to-blue-700 text-white font-semibold px-8 py-3 rounded-lg border-none shadow-lg shadow-blue-500/20 transition-all duration-200 w-full mt-4 text-base hover:-translate-y-px hover:shadow-xl hover:brightness-110 cursor-pointer"
                onClick={() => handleSubmit()}
            >
                Save Education
            </button>
        </div>
    );
};

export default EditEducation;

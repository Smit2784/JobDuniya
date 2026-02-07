import React, { useState, useEffect, useContext } from "react";
import Modal from "../../render-model/Modal";

import useAPI from "../../Hooks/useAPI";
import { toast } from "react-toastify";
import { ActiveModal } from "../../main";
const Body = ({ onClose }) => {
    const api = useAPI();
    let [activerModalState, setActiveModalState] = useContext(ActiveModal);
    const id = localStorage.getItem("id");
    const [jobData, setJobData] = useState({
        company: id,
        Title: "",
        Position: "",
        Description: [],
        Experience: [],
        JobType: "",
        Salary: "",
        Responsiblities: [],
        Overview: [],
        Qualificaion: [],
        Benifits: [],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setJobData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleArrayChange = (e) => {
        const { name, value } = e.target;
        setJobData((prevState) => ({
            ...prevState,
            [name]: value.split(",").map((item) => item.trim()),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(jobData);
        try {
            const response = await api.postREQUEST(
                "addJob",
                JSON.stringify(jobData),
            );
            if (response && !response.errors) {
                // Basic check, adjust based on actual API error structure
                toast.success("Job Posted Successfully");
                setActiveModalState("");
            } else {
                // Assuming api.postREQUEST handles errors or returns them
                toast.error("Failed to post job");
            }
        } catch (err) {
            console.error(err);
            toast.error("An error occurred");
        }
    };

    return (
        <div className="w-[800px] max-w-[95vw] bg-white rounded-3xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] font-['Outfit',-apple-system,BlinkMacSystemFont,'Segoe_UI',sans-serif] flex flex-col overflow-hidden max-h-[90vh] border border-[#e2e8f0] max-md:w-full max-md:max-w-[100vw] max-md:h-screen max-md:rounded-none">
            <div className="bg-gradient-to-br from-[#0284c7] to-[#23a6f0] py-6 px-8 text-white flex justify-between items-center border-b border-white/10">
                <h2 className="m-0 text-2xl font-bold flex items-center gap-3">
                    <i className="fa-solid fa-briefcase"></i> Post a New Job
                </h2>
                <button
                    className="bg-white/20 border border-white/30 w-9 h-9 rounded-full cursor-pointer flex items-center justify-center transition-all duration-200 text-white text-base backdrop-blur-sm hover:bg-white/30 hover:rotate-90"
                    onClick={onClose}
                >
                    <i className="fa-solid fa-xmark"></i>
                </button>
            </div>

            <div className="p-8 bg-[#f8fafc] overflow-y-auto scrollbar-thin scrollbar-thumb-[#cbd5e1] scrollbar-track-transparent scrollbar-thumb-rounded-lg border-2 border-[#f8fafc]">
                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-2 gap-6 max-md:grid-cols-1"
                >
                    {/* Row 1 */}
                    <div className="flex flex-col gap-2">
                        <label
                            className="text-[0.85rem] text-[#475569] font-semibold uppercase tracking-[0.5px]"
                            htmlFor="title"
                        >
                            Job Title
                        </label>
                        <input
                            type="text"
                            className="w-full py-3 px-4 border border-[#e2e8f0] rounded-[10px] text-[0.95rem] text-[#0f172a] transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] font-inherit bg-white focus:outline-none focus:border-[#3b82f6] focus:shadow-[0_0_0_4px_rgba(59,130,246,0.1)] hover:border-[#cbd5e1]"
                            id="title"
                            required
                            name="Title"
                            placeholder="e.g. Senior React Developer"
                            value={jobData.Title}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label
                            className="text-[0.85rem] text-[#475569] font-semibold uppercase tracking-[0.5px]"
                            htmlFor="position"
                        >
                            Position
                        </label>
                        <input
                            type="text"
                            className="w-full py-3 px-4 border border-[#e2e8f0] rounded-[10px] text-[0.95rem] text-[#0f172a] transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] font-inherit bg-white focus:outline-none focus:border-[#3b82f6] focus:shadow-[0_0_0_4px_rgba(59,130,246,0.1)] hover:border-[#cbd5e1]"
                            id="position"
                            name="Position"
                            placeholder="e.g. Frontend Engineer"
                            value={jobData.Position}
                            required
                            onChange={handleChange}
                        />
                    </div>

                    {/* Row 2 */}
                    <div className="flex flex-col gap-2">
                        <label
                            className="text-[0.85rem] text-[#475569] font-semibold uppercase tracking-[0.5px]"
                            htmlFor="jobType"
                        >
                            Job Type
                        </label>
                        <select
                            className="w-full py-3 px-4 border border-[#e2e8f0] rounded-[10px] text-[0.95rem] text-[#0f172a] transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] font-inherit bg-white focus:outline-none focus:border-[#3b82f6] focus:shadow-[0_0_0_4px_rgba(59,130,246,0.1)] hover:border-[#cbd5e1] appearance-none bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%2024%2024%27%20fill=%27none%27%20stroke=%27%2364748b%27%20stroke-width=%272%27%20stroke-linecap=%27round%27%20stroke-linejoin=%27round%27%3E%3Cpolyline%20points=%276%209%2012%2015%2018%209%27%3E%3C/polyline%3E%3C/svg%3E')] bg-no-repeat bg-[right_1rem_center] bg-[length:1rem] pr-10"
                            id="jobType"
                            name="JobType"
                            value={jobData.JobType}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Type</option>
                            <option value="FullTime">Full Time</option>
                            <option value="PartTime">Part Time</option>
                            <option value="Remote">Remote</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label
                            className="text-[0.85rem] text-[#475569] font-semibold uppercase tracking-[0.5px]"
                            htmlFor="salary"
                        >
                            Salary Range
                        </label>
                        <input
                            type="text"
                            className="w-full py-3 px-4 border border-[#e2e8f0] rounded-[10px] text-[0.95rem] text-[#0f172a] transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] font-inherit bg-white focus:outline-none focus:border-[#3b82f6] focus:shadow-[0_0_0_4px_rgba(59,130,246,0.1)] hover:border-[#cbd5e1]"
                            id="salary"
                            name="Salary"
                            placeholder="e.g. $80k - $120k / year"
                            value={jobData.Salary}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Full Width Sections */}
                    <div className="flex flex-col gap-2 col-span-2 max-md:col-auto">
                        <label
                            className="text-[0.85rem] text-[#475569] font-semibold uppercase tracking-[0.5px]"
                            htmlFor="description"
                        >
                            Description{" "}
                            <span className="text-xs text-[#94a3b8] normal-case font-normal ml-2">
                                (comma-separated for bullet points)
                            </span>
                        </label>
                        <textarea
                            className="w-full py-3 px-4 border border-[#e2e8f0] rounded-[10px] text-[0.95rem] text-[#0f172a] transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] font-inherit bg-white focus:outline-none focus:border-[#3b82f6] focus:shadow-[0_0_0_4px_rgba(59,130,246,0.1)] hover:border-[#cbd5e1]"
                            id="description"
                            name="Description"
                            rows="3"
                            value={jobData.Description}
                            required
                            onChange={handleArrayChange}
                        ></textarea>
                    </div>

                    <div className="flex flex-col gap-2 col-span-2 max-md:col-auto">
                        <label
                            className="text-[0.85rem] text-[#475569] font-semibold uppercase tracking-[0.5px]"
                            htmlFor="overview"
                        >
                            Overview{" "}
                            <span className="text-xs text-[#94a3b8] normal-case font-normal ml-2">
                                (comma-separated)
                            </span>
                        </label>
                        <textarea
                            className="w-full py-3 px-4 border border-[#e2e8f0] rounded-[10px] text-[0.95rem] text-[#0f172a] transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] font-inherit bg-white focus:outline-none focus:border-[#3b82f6] focus:shadow-[0_0_0_4px_rgba(59,130,246,0.1)] hover:border-[#cbd5e1]"
                            id="overview"
                            name="Overview"
                            rows="2"
                            value={jobData.Overview}
                            onChange={handleArrayChange}
                        ></textarea>
                    </div>

                    <div className="flex flex-col gap-2 col-span-2 max-md:col-auto">
                        <label
                            className="text-[0.85rem] text-[#475569] font-semibold uppercase tracking-[0.5px]"
                            htmlFor="responsiblities"
                        >
                            Responsibilities{" "}
                            <span className="text-xs text-[#94a3b8] normal-case font-normal ml-2">
                                (comma-separated)
                            </span>
                        </label>
                        <textarea
                            className="w-full py-3 px-4 border border-[#e2e8f0] rounded-[10px] text-[0.95rem] text-[#0f172a] transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] font-inherit bg-white focus:outline-none focus:border-[#3b82f6] focus:shadow-[0_0_0_4px_rgba(59,130,246,0.1)] hover:border-[#cbd5e1]"
                            id="responsiblities"
                            name="Responsiblities" // retaining original typo key for API
                            rows="3"
                            required
                            value={jobData.Responsiblities}
                            onChange={handleArrayChange}
                        ></textarea>
                    </div>

                    <div className="flex flex-col gap-2 col-span-2 max-md:col-auto">
                        <label
                            className="text-[0.85rem] text-[#475569] font-semibold uppercase tracking-[0.5px]"
                            htmlFor="experience"
                        >
                            Requirements / Experience{" "}
                            <span className="text-xs text-[#94a3b8] normal-case font-normal ml-2">
                                (comma-separated)
                            </span>
                        </label>
                        <textarea
                            className="w-full py-3 px-4 border border-[#e2e8f0] rounded-[10px] text-[0.95rem] text-[#0f172a] transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] font-inherit bg-white focus:outline-none focus:border-[#3b82f6] focus:shadow-[0_0_0_4px_rgba(59,130,246,0.1)] hover:border-[#cbd5e1]"
                            required
                            id="experience"
                            name="Experience"
                            rows="2"
                            value={jobData.Experience}
                            onChange={handleArrayChange}
                        ></textarea>
                    </div>

                    <div className="flex flex-col gap-2 col-span-2 max-md:col-auto">
                        <label
                            className="text-[0.85rem] text-[#475569] font-semibold uppercase tracking-[0.5px]"
                            htmlFor="qualificaion"
                        >
                            Qualifications{" "}
                            <span className="text-xs text-[#94a3b8] normal-case font-normal ml-2">
                                (comma-separated)
                            </span>
                        </label>
                        <input
                            type="text"
                            className="w-full py-3 px-4 border border-[#e2e8f0] rounded-[10px] text-[0.95rem] text-[#0f172a] transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] font-inherit bg-white focus:outline-none focus:border-[#3b82f6] focus:shadow-[0_0_0_4px_rgba(59,130,246,0.1)] hover:border-[#cbd5e1]"
                            id="qualificaion"
                            name="Qualificaion" // retaining typo key
                            value={jobData.Qualificaion}
                            onChange={handleArrayChange}
                        />
                    </div>

                    <div className="flex flex-col gap-2 col-span-2 max-md:col-auto">
                        <label
                            className="text-[0.85rem] text-[#475569] font-semibold uppercase tracking-[0.5px]"
                            htmlFor="benifits"
                        >
                            Benefits{" "}
                            <span className="text-xs text-[#94a3b8] normal-case font-normal ml-2">
                                (comma-separated)
                            </span>
                        </label>
                        <input
                            type="text"
                            className="w-full py-3 px-4 border border-[#e2e8f0] rounded-[10px] text-[0.95rem] text-[#0f172a] transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] font-inherit bg-white focus:outline-none focus:border-[#3b82f6] focus:shadow-[0_0_0_4px_rgba(59,130,246,0.1)] hover:border-[#cbd5e1]"
                            id="benifits"
                            name="Benifits" // retaining typo key
                            value={jobData.Benifits}
                            onChange={handleArrayChange}
                        />
                    </div>

                    <div className="flex justify-end gap-4 mt-8 pt-8 border-t border-[#e2e8f0] col-span-2 max-md:col-auto">
                        <button
                            type="button"
                            onClick={onClose}
                            className="py-3 px-7 rounded-[10px] font-semibold text-[0.95rem] cursor-pointer transition-all duration-200 ease-linear border flex items-center gap-2 bg-white text-[#64748b] border-[#e2e8f0] hover:bg-[#f8fafc] hover:text-[#475569] hover:border-[#cbd5e1]"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="py-3 px-7 rounded-[10px] font-semibold text-[0.95rem] cursor-pointer transition-all duration-200 ease-linear border-none flex items-center gap-2 bg-gradient-to-br from-[#0284c7] to-[#23a6f0] text-white shadow-[0_4px_6px_-1px_rgba(2,132,199,0.2)] hover:bg-gradient-to-br hover:from-[#0369a1] hover:to-[#0ea5e9] hover:-translate-y-[1px] hover:shadow-[0_10px_15px_-3px_rgba(2,132,199,0.3)]"
                        >
                            <i className="fa-solid fa-paper-plane"></i> Publish
                            Job
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const PostAjob = ({ onClose }) => {
    return (
        <>
            <Modal body={<Body onClose={onClose} />} />
        </>
    );
};
export default PostAjob;

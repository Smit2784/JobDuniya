import React, { useState, useEffect, useContext } from "react";
import Modal from "../../render-model/Modal";
import css from "./post_job.module.css";
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
        const response = api.postREQUEST("addJob", JSON.stringify(jobData));
        if (response) {
            toast.success("Job Posted Successfully");
            setActiveModalState("");
        } else {
            toast.error(api.error);
        }
    };

    return (
        <div className={css.postJobModal}>
            <div className={css.header}>
                <h2 className={css.title}>
                    <i className="fa-solid fa-briefcase"></i> Post a New Job
                </h2>
                <button className={css.closeButton} onClick={onClose}>
                    <i className="fa-solid fa-xmark"></i>
                </button>
            </div>

            <div className={css.body}>
                <form onSubmit={handleSubmit} className={css.formGrid}>
                    {/* Row 1 */}
                    <div className={css.formGroup}>
                        <label className={css.label} htmlFor="title">
                            Job Title
                        </label>
                        <input
                            type="text"
                            className={css.input}
                            id="title"
                            required
                            name="Title"
                            placeholder="e.g. Senior React Developer"
                            value={jobData.Title}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={css.formGroup}>
                        <label className={css.label} htmlFor="position">
                            Position
                        </label>
                        <input
                            type="text"
                            className={css.input}
                            id="position"
                            name="Position"
                            placeholder="e.g. Frontend Engineer"
                            value={jobData.Position}
                            required
                            onChange={handleChange}
                        />
                    </div>

                    {/* Row 2 */}
                    <div className={css.formGroup}>
                        <label className={css.label} htmlFor="jobType">
                            Job Type
                        </label>
                        <select
                            className={css.select}
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
                    <div className={css.formGroup}>
                        <label className={css.label} htmlFor="salary">
                            Salary Range
                        </label>
                        <input
                            type="text"
                            className={css.input}
                            id="salary"
                            name="Salary"
                            placeholder="e.g. $80k - $120k / year"
                            value={jobData.Salary}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Full Width Sections */}
                    <div className={`${css.formGroup} ${css.fullWidth}`}>
                        <label className={css.label} htmlFor="description">
                            Description{" "}
                            <span>(comma-separated for bullet points)</span>
                        </label>
                        <textarea
                            className={css.textarea}
                            id="description"
                            name="Description"
                            rows="3"
                            value={jobData.Description}
                            required
                            onChange={handleArrayChange}
                        ></textarea>
                    </div>

                    <div className={`${css.formGroup} ${css.fullWidth}`}>
                        <label className={css.label} htmlFor="overview">
                            Overview <span>(comma-separated)</span>
                        </label>
                        <textarea
                            className={css.textarea}
                            id="overview"
                            name="Overview"
                            rows="2"
                            value={jobData.Overview}
                            onChange={handleArrayChange}
                        ></textarea>
                    </div>

                    <div className={`${css.formGroup} ${css.fullWidth}`}>
                        <label className={css.label} htmlFor="responsiblities">
                            Responsibilities <span>(comma-separated)</span>
                        </label>
                        <textarea
                            className={css.textarea}
                            id="responsiblities"
                            name="Responsiblities" // retaining original typo key for API
                            rows="3"
                            required
                            value={jobData.Responsiblities}
                            onChange={handleArrayChange}
                        ></textarea>
                    </div>

                    <div className={`${css.formGroup} ${css.fullWidth}`}>
                        <label className={css.label} htmlFor="experience">
                            Requirements / Experience{" "}
                            <span>(comma-separated)</span>
                        </label>
                        <textarea
                            className={css.textarea}
                            required
                            id="experience"
                            name="Experience"
                            rows="2"
                            value={jobData.Experience}
                            onChange={handleArrayChange}
                        ></textarea>
                    </div>

                    <div className={`${css.formGroup} ${css.fullWidth}`}>
                        <label className={css.label} htmlFor="qualificaion">
                            Qualifications <span>(comma-separated)</span>
                        </label>
                        <input
                            type="text"
                            className={css.input}
                            id="qualificaion"
                            name="Qualificaion" // retaining typo key
                            value={jobData.Qualificaion}
                            onChange={handleArrayChange}
                        />
                    </div>

                    <div className={`${css.formGroup} ${css.fullWidth}`}>
                        <label className={css.label} htmlFor="benifits">
                            Benefits <span>(comma-separated)</span>
                        </label>
                        <input
                            type="text"
                            className={css.input}
                            id="benifits"
                            name="Benifits" // retaining typo key
                            value={jobData.Benifits}
                            onChange={handleArrayChange}
                        />
                    </div>

                    <div className={css.footer}>
                        <button
                            type="button"
                            onClick={onClose}
                            className={`${css.btn} ${css.btnCancel}`}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className={`${css.btn} ${css.btnPublish}`}
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

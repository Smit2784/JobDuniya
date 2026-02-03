import React, { useState } from "react";
import Modal from "../render-model/Modal";
import css from "./sendmail.module.css";
import { toast } from "react-toastify";
import useAPI from "../Hooks/useAPI";

const Body = ({ onClose }) => {
    const api = useAPI();
    const from = localStorage.getItem("mailFrom");
    const to = localStorage.getItem("mailTo");
    const senderEmail = localStorage.getItem("mailFrom");

    const [formData, setFormData] = useState({
        sender: from,
        recipient: to,
        subject: "",
        message: "",
        from: senderEmail,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await api.postREQUEST(
            "EmailSend",
            JSON.stringify(formData),
        );
        if (response) {
            toast.success("Email Sent Successfully.");
            setFormData({
                recipient: "",
                subject: "",
                message: "",
            });
        } else {
            toast.error(response.error);
        }
    };

    // Clear the form fields after submission

    return (
        <div className={css.sendMailModal}>
            <div className={css.header}>
                <h5 className={css.title}>
                    <i className="fa-regular fa-envelope"></i>
                    Send Email to Applicant
                </h5>
                <button className={css.closeButton} onClick={onClose}>
                    <i className="fa fa-times"></i>
                </button>
            </div>

            <div className={css.body}>
                <form onSubmit={handleSubmit} method="POST">
                    <div className={css.formGroup}>
                        <label htmlFor="recipient" className={css.label}>
                            Recipient's Email
                        </label>
                        <input
                            type="email"
                            className={css.input}
                            id="recipient"
                            name="recipient"
                            value={formData.recipient}
                            onChange={handleChange}
                            required
                            readOnly
                        />
                    </div>

                    <div className={css.formGroup}>
                        <label htmlFor="subject" className={css.label}>
                            Subject
                        </label>
                        <input
                            type="text"
                            className={css.input}
                            id="subject"
                            name="subject"
                            placeholder="Enter email subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className={css.formGroup}>
                        <label htmlFor="message" className={css.label}>
                            Message
                        </label>
                        <textarea
                            className={css.textarea}
                            id="message"
                            name="message"
                            rows="5"
                            placeholder="Type your message here..."
                            value={formData.message}
                            onChange={handleChange}
                            required
                        ></textarea>
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
                            className={`${css.btn} ${css.btnSend}`}
                        >
                            <i className="fa-regular fa-paper-plane"></i>
                            Send Email
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const SendMailTo = ({ onClose }) => {
    return <Modal body={<Body onClose={onClose} />} />;
};

export default SendMailTo;

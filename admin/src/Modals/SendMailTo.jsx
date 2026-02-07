import React, { useState } from "react";
import Modal from "../render-model/Modal";

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
        <div className="w-[600px] max-w-[95vw] bg-white rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] font-sans flex flex-col overflow-hidden max-[600px]:w-[95%]">
            <div className="bg-gradient-to-br from-[#0284c7] to-[#23a6f0] p-[1.5rem_2rem] text-white flex justify-between items-center max-[600px]:p-[1.25rem]">
                <h5 className="m-0 text-[1.25rem] font-semibold flex items-center gap-3">
                    <i className="fa-regular fa-envelope"></i>
                    Send Email to Applicant
                </h5>
                <button className="bg-white/20 border-none w-8 h-8 rounded-lg cursor-pointer flex items-center justify-center transition-all duration-200 text-white text-[1rem] hover:bg-white/30 hover:scale-105" onClick={onClose}>
                    <i className="fa fa-times"></i>
                </button>
            </div>

            <div className="p-8 bg-white max-[600px]:p-[1.25rem]">
                <form onSubmit={handleSubmit} method="POST">
                    <div className="mb-6">
                        <label htmlFor="recipient" className="block mb-2 text-[#1e293b] font-medium text-[0.95rem]">
                            Recipient's Email
                        </label>
                        <input
                            type="email"
                            className="w-full p-[0.75rem_1rem] border border-[#e2e8f0] rounded-lg text-[0.95rem] text-[#0f172a] transition-all duration-200 bg-[#f8fafc] focus:outline-none focus:border-[#3b82f6] focus:bg-white focus:ring-[3px] focus:ring-[#3b82f6]/10"
                            id="recipient"
                            name="recipient"
                            value={formData.recipient}
                            onChange={handleChange}
                            required
                            readOnly
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="subject" className="block mb-2 text-[#1e293b] font-medium text-[0.95rem]">
                            Subject
                        </label>
                        <input
                            type="text"
                            className="w-full p-[0.75rem_1rem] border border-[#e2e8f0] rounded-lg text-[0.95rem] text-[#0f172a] transition-all duration-200 bg-[#f8fafc] focus:outline-none focus:border-[#3b82f6] focus:bg-white focus:ring-[3px] focus:ring-[#3b82f6]/10"
                            id="subject"
                            name="subject"
                            placeholder="Enter email subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="message" className="block mb-2 text-[#1e293b] font-medium text-[0.95rem]">
                            Message
                        </label>
                        <textarea
                            className="w-full p-[0.75rem_1rem] border border-[#e2e8f0] rounded-lg text-[0.95rem] text-[#0f172a] transition-all duration-200 bg-[#f8fafc] focus:outline-none focus:border-[#3b82f6] focus:bg-white focus:ring-[3px] focus:ring-[#3b82f6]/10 resize-y min-h-[120px]"
                            id="message"
                            name="message"
                            rows="5"
                            placeholder="Type your message here..."
                            value={formData.message}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>

                    <div className="flex justify-end gap-4 mt-8">
                        <button
                            type="button"
                            onClick={onClose}
                            className="p-[0.75rem_1.5rem] rounded-lg font-semibold text-[0.95rem] cursor-pointer transition-all duration-200 border-none bg-[#f1f5f9] text-[#64748b] hover:bg-[#e2e8f0] hover:text-[#475569]"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="p-[0.75rem_1.5rem] rounded-lg font-semibold text-[0.95rem] cursor-pointer transition-all duration-200 border-none bg-[#0284c7] text-white flex items-center gap-2 hover:bg-[#0369a1] hover:-translate-y-px hover:shadow-[0_4px_12px_rgba(2,132,199,0.2)]"
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

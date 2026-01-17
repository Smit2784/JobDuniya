import React, { useState } from 'react'
import Modal from '../render-model/Modal'
import css from "../Styles/modal.module.css"
import { toast } from 'react-toastify';
import useAPI from '../Hooks/useAPI';


const Body = ({ onClose }) => {
    const api = useAPI();
    const from=localStorage.getItem("mailFrom")
    const to = localStorage.getItem("mailTo")
    const senderEmail = localStorage.getItem("mailFrom")

    const [formData, setFormData] = useState({
        sender: from,
        recipient: to,
        subject: '',
        message: '' , 
        from : senderEmail
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await api.postREQUEST("EmailSend", JSON.stringify(formData))
        if (response) {
            toast.success("Email Sent Successfully.")
            setFormData({
                recipient: '',
                subject: '',
                message: ''
            });
        }
        else {
            toast.error(response.error)
        }
    }

    // Clear the form fields after submission

    return (
        <>
            <div className={css.modalBody}>
                <div className="modal-content p-3">
                    <div className="modal-header">
                        <h5 className="modal-title fs-4 fw-bolder ">Send Email to Applicant</h5>
                        <i className='fa fa-close fs-4 hand' onClick={onClose}></i>
                    </div>
                    <div className="modal-body">
                        {/* Email Form */}
                        <form onSubmit={handleSubmit} method='POST' >
                            <div className="form-group">
                                <label htmlFor="recipient">Recipient's Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="recipient"
                                    name="recipient"
                                    value={formData.recipient}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="subject">Subject</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="message">Message</label>
                                <textarea
                                    className="form-control"
                                    id="message"
                                    name="message"
                                    rows="5"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                ></textarea>
                            </div>
                            <div className='d-flex justify-content-end '>
                                <div className='d-flex justify-content-end mt-4 gap-2  w-25'>
                                    <button type="submit" onClick={onClose} className="btn btn-outline-primary">Cancle</button>
                                    <button type="submit" className="btn btn-primary text-nowrap">Send Email</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

const SendMailTo = ({ onClose }) => {
    return (
        <Modal
            body={<Body
                onClose={onClose}
            />

            }

        />
    )
}

export default SendMailTo

import React, { useState } from 'react'
import css from "../../Styles/modal.module.css"
import Modal from '../../render-model/Modal'
const Body = ({ onClose }) => {
    const [companyData, setCompanyData] = useState({
        Name: '',
        Address: [],
        Industry: '',
        Email: '',
        Password: '',
        Logo: '',
        TagLine: '',
        Websites: [],
        establishedYear: '',
        Description: [],
        secretKey: '',
        OwnerDetail: {
            Name: '',
            EmailID: '',
        },
        HRDetail: {
            Name: '',
            EmailID: '',
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCompanyData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

    };

    return (
        <>
            <div className={css.modalBody}>
                <div className="container-fluid p-4">
                    <div className='d-flex justify-content-between align-items-center'>
                        <span className='fs-1'>Edit  job</span>
                        <span onClick={onClose}>
                            <i className='fa fa-close fs-3 hand'></i>
                        </span>
                    </div>
                    <form onSubmit={handleSubmit}>
                        {/* Input fields for company profile */}
                        <div className="form-group">
                            <label className='fs-5 fw-bolder ' htmlFor="name" >Company Name</label>
                            <input
                                type="text"
                                className="form-control p-3"
                                id="name"
                                name="Name"
                                value={companyData.Name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label className='fs-5 fw-bolder ' htmlFor="indus className=''try">Industry</label>
                            <input
                                type="text"
                                className="form-control p-3"
                                id="industry"
                                name="Industry"
                                value={companyData.Industry}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label className='fs-5 fw-bolder ' htmlFor="email className=''">Email</label>
                            <input
                                type="email"
                                className="form-control p-3"
                                id="email"
                                name="Email"
                                value={companyData.Email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label className='fs-5 fw-bolder ' htmlFor="passw className=''ord">Password</label>
                            <input
                                type="password"
                                className="form-control p-3"
                                id="password"
                                name="Password"
                                value={companyData.Password}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label className='fs-5 fw-bolder ' htmlFor="logo" >Logo</label>
                            <input
                                type="file"
                                className="form-control p-3"
                                id="logo"
                                name="Logo"
                                value={companyData.Logo}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label className='fs-5 fw-bolder ' htmlFor="tagli className=''ne">Tagline</label>
                            <input
                                type="text"
                                className="form-control p-3"
                                id="tagline"
                                name="TagLine"
                                value={companyData.TagLine}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label className='fs-5 fw-bolder ' htmlFor="websi className=''tes">Websites</label>
                            <input
                                type="text"
                                className="form-control p-3"
                                id="websites"
                                name="Websites"
                                value={companyData.Websites}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label className='fs-5 fw-bolder ' htmlFor="estab className=''lishedYear">Established Year</label>
                            <input
                                type="text"
                                className="form-control p-3"
                                id="establishedYear"
                                name="establishedYear"
                                value={companyData.establishedYear}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label className='fs-5 fw-bolder ' htmlFor="descr className=''iption">Description</label>
                            <textarea
                                className="form-control p-3"
                                id="description"
                                name="Description"
                                rows="3"
                                value={companyData.Description}
                                onChange={handleChange}
                            ></textarea>
                        </div>
                        <div className="form-group">
                            <label className='fs-5 fw-bolder ' htmlFor="secre className=''tKey">Secret Key</label>
                            <input
                                type="text"
                                className="form-control p-3"
                                id="secretKey"
                                name="secretKey"
                                value={companyData.secretKey}
                                onChange={handleChange}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary mt-3">Update Profile</button>
                    </form>
                </div>
            </div>
        </>
    )
}

const EditJob = ({ onClose }) => {
    return (
        <Modal
            body={<Body  onClose={onClose} />}
        />
    )
}

export default EditJob

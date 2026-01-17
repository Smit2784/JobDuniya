import React, { useState } from 'react'
import css from "../../Styles/modal.module.css"
import Modal from '../../render-model/Modal'
import useAPI from '../../Hooks/useAPI'
import { useEffect, useCallback } from 'react'
import { useContext } from 'react'
import { GlobalState } from '../../main'

const Body = ({ onClose }) => {
    const api = useAPI();
    const [currentState, setCurrentState] = useContext(GlobalState);
    const web = currentState.Websites.join(" , ");
    const desc = currentState.Description.join(" , ");
    const id = localStorage.getItem("id");
    const [Name, setName] = useState(currentState.Name);
    const [Industry, setIndustry] = useState(currentState.Industry);
    const [Email, setEmail] = useState(currentState.Email);
    const [TagLine, setTagLine] = useState(currentState.TagLine);
    const [establishedYear, setEsatablishedYear] = useState(currentState.establishedYear);
    const [Descriptions, setDescription] = useState(desc);
    const [Website, setWebsites] = useState(web);
    const [Address, setAddress] = useState({
        personalAddress: currentState.Address[0].personalAddress,
        pinCode: currentState.Address[0].pinCode,
        state: currentState.Address[0].state,
        city: currentState.Address[0].city,
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddress({
            ...Address,
            [name]: value
        });
    }

    const Websites = Website.split(",");
    const Description = Descriptions.split(",");

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(Address);
        const result = await api.patchREQUEST("updateDetails", "companies", id, { Name, Industry, Email, Address, TagLine, establishedYear, Description, Websites });
        console.log(result);
    };

    return (
        <>
            <div className={css.modalBody}>
                <div className="container-fluid p-4">
                    <div className='d-flex justify-content-between align-items-center'>
                        <h1>Edit Your Profile</h1>
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
                                value={Name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label className='fs-5 fw-bolder ' htmlFor="indus className=''try">Industry</label>
                            <input
                                type="text"
                                className="form-control p-3"
                                id="industry"
                                name="Industry"
                                value={Industry}
                                onChange={(e) => setIndustry(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label className='fs-5 fw-bolder ' htmlFor="email className=''">Email</label>
                            <input
                                type="email"
                                className="form-control p-3"
                                id="email"
                                name="Email"
                                value={Email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        {/* {Address.map((address, index) => ( */}
                        <div className="form-group">
                            <div className="form-group d-flex gap-2" >
                                <div className="d-flex flex-grow-1 flex-column ">
                                    <label>
                                        Personal Address:
                                    </label>
                                    <input
                                        required
                                        className="form-control p-3"
                                        placeholder={"Personal Address"}
                                        type="text"
                                        name={"personalAddress"}
                                        value={Address.personalAddress}
                                        onChange={(e) => handleChange(e)}
                                    />
                                </div>
                                <div className="d-flex flex-grow-1 flex-column ">
                                    <label>
                                        Pincode:
                                    </label>
                                    <input
                                        required
                                        className="form-control p-3"
                                        placeholder={"Pincode"}
                                        type="text"
                                        name={"pinCode"}
                                        value={Address.pinCode}
                                        onChange={(e) => handleChange(e)}
                                    />
                                </div>
                            </div>
                            <div className="form-group d-flex gap-2">
                                <div className="d-flex flex-grow-1 flex-column ">
                                    <label>
                                        State:
                                    </label>
                                    <input
                                        required
                                        className="form-control p-3"
                                        placeholder={"State"}
                                        type="text"
                                        name={"state"}
                                        value={Address.state}
                                        onChange={(e) => handleChange(e)}
                                    />
                                </div>
                                <div className="d-flex flex-grow-1 flex-column ">
                                    <label>
                                        City:
                                    </label>
                                    <input
                                        required
                                        className="form-control p-3"
                                        placeholder={"City"}
                                        type="text"
                                        name={"city"}
                                        value={Address.city}
                                        onChange={(e) => handleChange(e)}
                                    />
                                </div>
                            </div>
                        </div>
                        {/* ))} */}
                        <div className="form-group">
                            <label className='fs-5 fw-bolder ' htmlFor="tagli className=''ne">Tagline</label>
                            <input
                                type="text"
                                className="form-control p-3"
                                id="tagline"
                                name="TagLine"
                                value={TagLine}
                                onChange={(e) => setTagLine(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label className='fs-5 fw-bolder ' htmlFor="websi className=''tes">Websites</label>
                            <input
                                type="text"
                                className="form-control p-3"
                                id="websites"
                                name="Websites"
                                value={Websites}
                                onChange={(e) => setWebsites(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label className='fs-5 fw-bolder ' htmlFor="estab className=''lishedYear">Established Year</label>
                            <input
                                type="text"
                                className="form-control p-3"
                                id="establishedYear"
                                name="establishedYear"
                                value={establishedYear}
                                onChange={(e) => setEsatablishedYear(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label className='fs-5 fw-bolder ' htmlFor="descr className=''iption">Description</label>
                            <textarea
                                className="form-control p-3"
                                id="description"
                                name="Description"
                                rows="3"
                                value={Description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary mt-3">Update Profile</button>
                    </form>
                </div>
            </div>
        </>
    )
}

const EditProfile = ({ onClose }) => {
    return (
        <Modal
            body={<Body onClose={onClose} />}
        />
    )
}

export default EditProfile

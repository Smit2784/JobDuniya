import React, { useState, useEffect, useContext } from "react";
import css from "../Styles/modal.module.css";
import { toast } from "react-toastify";
import { ActiveModal } from "../main";
import Modal from "../render-model/Modal";
import useAPI from "../Hooks/useAPI";
import { RenderPage } from "../Pages/Dashboard/Root";
const Body = ({ onClose }) => {
    const api = useAPI();
    let [activerModalState, setActiveModalState] = useContext(ActiveModal);
    let [page, setPage] = useContext(RenderPage);
    const id = localStorage.getItem("id");
    const [formData, setFormData] = useState({
        isProfileComplete: true,
        Name: "",
        Address: [{
            personalAddress: "",
            pinCode: "",
            state: "",
            city: "",
        }],
        Industry: "",
        Logo: "",
        TagLine: "",
        Websites: [],
        establishedYear: "",
        Description: [],
        secretKey: "",
        OwnerDetail: {
            Name: "",
            EmailID: "",
        },
        HRDetail: {
            Name: "",
            EmailID: "",
        },
    });

    const handleChange = (e, index) => {
        const { name, value } = e.target;
        if (name.includes('OwnerDetail')) {
            setFormData({
                ...formData,
                OwnerDetail: {
                    ...formData.OwnerDetail,
                    [name.split('.')[1]]: value
                }
            });
        } else if (name.includes('HRDetail')) {
            setFormData({
                ...formData,
                HRDetail: {
                    ...formData.HRDetail,
                    [name.split('.')[1]]: value
                }
            });
        } else if (name.includes('Address')) {
            const updatedAddress = [...formData.Address];
            updatedAddress[index] = {
                ...updatedAddress[index],
                [name.split('.')[1]]: value
            };
            setFormData({
                ...formData,
                Address: updatedAddress
            });
        } else {
                setFormData({
                    ...formData,
                    [name]: value
                });
        }
    };

    const handleSubmit = async (e) => {
        alert("submitt")
        setPage("dashboard")
        
        e.preventDefault();
        try {
            console.log(id);
            console.log(formData);
            // You need to replace 'API_ENDPOINT' with your actual API endpoint
            const response = await api.patchREQUEST("updateDetails", "companies", id, formData);
            console.log(response);
            // Handle success
        } catch (error) {
            console.error("Error:", error);
            // Handle error
        }
    };

    return (
        <div className={css.modalBody}>
            <div className="p-4">
                <span className="fs-3 m">Welcome to JobDuniya : you have to fill your profile</span>
                <div className="container">
                    <form onSubmit={handleSubmit} >
                        <label>
                            Name:
                        </label>
                        <input
                            required
                            className="form-control p-3"
                            placeholder={"Name"}
                            type="text"
                            name="Name"
                            style={{
                                width: "100%"
                            }}
                            width={"100%"}
                            value={formData.Name}
                            onChange={handleChange}
                        />
                        <div className="form-group">
                            <label>
                                Industry:
                            </label>
                            <input
                                required
                                className="form-control p-3"
                                placeholder={"Industry"}
                                type="text"
                                name="Industry"
                                value={formData.Industry}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>
                                Logo:
                            </label>
                            <input
                                required
                                className="form-control p-3"
                                placeholder={"Logo"}
                                type="file"
                                name="Logo"
                                value={formData.Logo}
                                onChange={handleChange}
                            />
                        </div>
                        {formData.Address.map((address, index) => (
                            <div className="form-group" key={index}>
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
                                            name={`Address[${index}].personalAddress`}
                                            value={formData.Address.personalAddress}
                                            onChange={(e) => handleChange(e, index)}
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
                                            name={`Address[${index}].pinCode`}
                                            value={formData.Address.pinCode}
                                            onChange={(e) => handleChange(e, index)}
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
                                            name={`Address[${index}].state`}
                                            value={formData.Address.state}
                                            onChange={(e) => handleChange(e, index)}
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
                                            name={`Address[${index}].city`}
                                            value={formData.Address.city}
                                            onChange={(e) => handleChange(e, index)}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="form-group">
                            <label>
                                Tagline:
                            </label>
                            <input
                                required
                                className="form-control p-3"
                                placeholder={"TagLine"}
                                type="text"
                                name="TagLine"
                                value={formData.TagLine}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>
                                Websites:(Comma(,) saperated)
                            </label>
                            <input
                                required
                                className="form-control p-3"
                                placeholder={"Websites"}
                                type="text"
                                name="Websites"
                                value={formData.Websites}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>
                                Established Year:
                            </label>
                            <input
                                required
                                className="form-control p-3"
                                placeholder={"Established Year"}
                                type="text"
                                name="establishedYear"
                                value={formData.establishedYear}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>
                                Description:(Comma(,) saperated)
                            </label>
                            <input
                                required
                                className="form-control p-3"
                                placeholder={"Description"}
                                type="text"
                                name="Description"
                                value={formData.Description}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>
                                Owner Name:
                            </label>
                            <input
                                required
                                className="form-control p-3"
                                placeholder={"Owener Name"}
                                type="text"
                                name="OwnerDetail.Name"
                                value={formData.OwnerDetail.Name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>
                                Owner Email:
                            </label>
                            <input
                                required
                                className="form-control p-3"
                                placeholder={"Owner Email"}
                                type="text"
                                name="OwnerDetail.EmailID"
                                value={formData.OwnerDetail.EmailID}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>
                                HR Name:
                            </label>
                            <input
                                required
                                className="form-control p-3"
                                placeholder={"HR Name"}
                                type="text"
                                name="HRDetail.Name"
                                value={formData.HRDetail.Name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>
                                HR Email:
                            </label>
                            <input
                                required
                                className="form-control p-3"
                                placeholder={"HR Email"}
                                type="text"
                                name="HRDetail.EmailID"
                                value={formData.HRDetail.EmailID}
                                onChange={handleChange}
                            />
                        </div>
                        <button type="submit" className="bg-primary-subtle btn mt-3 text-center">Submit</button>
                    </form>
                </div>

            </div>
        </div>
    );
};

const SignUp = ({ onClose }) => {
    return (
        <>
            <Modal body={<Body onClose={onClose} />} />
        </>
    );
};
export default SignUp;

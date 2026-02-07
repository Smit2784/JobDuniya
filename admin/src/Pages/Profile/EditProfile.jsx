import React, { useState } from "react";
import Modal from "../../render-model/Modal";
import useAPI from "../../Hooks/useAPI";
import { useEffect, useCallback } from "react";
import { useContext } from "react";
import { toast } from "react-toastify";
import { GlobalState } from "../../main";

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
    const [establishedYear, setEsatablishedYear] = useState(
        currentState.establishedYear,
    );
    const [Descriptions, setDescription] = useState(desc);
    const [Website, setWebsites] = useState(web);
    const [Address, setAddress] = useState({
        personalAddress: currentState.Address[0].personalAddress,
        pinCode: currentState.Address[0].pinCode,
        state: currentState.Address[0].state,
        city: currentState.Address[0].city,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddress({
            ...Address,
            [name]: value,
        });
    };

    const Websites = Website.split(",");
    const Description = Descriptions.split(",");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedData = {
            Name,
            Industry,
            Email,
            Address: [Address], // Address is an array in global state structure
            TagLine,
            establishedYear,
            Description,
            Websites,
        };

        try {
            const result = await api.patchREQUEST(
                "updateDetails",
                "companies",
                id,
                updatedData,
            );

            if (result) {
                // Update Global State immediately
                setCurrentState((prev) => ({
                    ...prev,
                    ...updatedData,
                    // deeply merge complex objects if necessary, but shallow merge should work for top level
                    // Address, HRDetail etc might need careful handling if they are not fully in updatedData
                    // But for this form, we seem to be updating most display keys.
                }));
                // Also specifically update address if it's nested differently in the form vs state

                toast.success("Profile Updated Successfully");
                onClose();
            } else {
                toast.error("Failed to update profile");
            }
            console.log(result);
        } catch (error) {
            console.error(error);
            toast.error("An error occurred");
        }
    };

    return (
        <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 md:p-8">
                <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Edit Your Profile
                    </h1>
                    <span
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 cursor-pointer transition-colors text-gray-400 hover:text-gray-600"
                    >
                        <i className="fa fa-close text-xl"></i>
                    </span>
                </div>
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Input fields for company profile */}
                    <div className="space-y-1">
                        <label
                            className="block text-sm font-semibold text-gray-700"
                            htmlFor="name"
                        >
                            Company Name
                        </label>
                        <input
                            type="text"
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all duration-200 bg-gray-50 focus:bg-white placeholder-gray-400"
                            id="name"
                            name="Name"
                            value={Name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter company name"
                        />
                    </div>
                    <div className="space-y-1">
                        <label
                            className="block text-sm font-semibold text-gray-700"
                            htmlFor="industry"
                        >
                            Industry
                        </label>
                        <input
                            type="text"
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all duration-200 bg-gray-50 focus:bg-white placeholder-gray-400"
                            id="industry"
                            name="Industry"
                            value={Industry}
                            onChange={(e) => setIndustry(e.target.value)}
                            placeholder="Enter industry"
                        />
                    </div>
                    <div className="space-y-1">
                        <label
                            className="block text-sm font-semibold text-gray-700"
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all duration-200 bg-gray-50 focus:bg-white placeholder-gray-400"
                            id="email"
                            name="Email"
                            value={Email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter email address"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-1">
                            <label className="block text-sm font-semibold text-gray-700">
                                Personal Address
                            </label>
                            <input
                                required
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all duration-200 bg-gray-50 focus:bg-white placeholder-gray-400"
                                placeholder="Address"
                                type="text"
                                name="personalAddress"
                                value={Address.personalAddress}
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="block text-sm font-semibold text-gray-700">
                                Pincode
                            </label>
                            <input
                                required
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all duration-200 bg-gray-50 focus:bg-white placeholder-gray-400"
                                placeholder="Pincode"
                                type="text"
                                name="pinCode"
                                value={Address.pinCode}
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="block text-sm font-semibold text-gray-700">
                                State
                            </label>
                            <input
                                required
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all duration-200 bg-gray-50 focus:bg-white placeholder-gray-400"
                                placeholder="State"
                                type="text"
                                name="state"
                                value={Address.state}
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="block text-sm font-semibold text-gray-700">
                                City
                            </label>
                            <input
                                required
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all duration-200 bg-gray-50 focus:bg-white placeholder-gray-400"
                                placeholder="City"
                                type="text"
                                name="city"
                                value={Address.city}
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label
                            className="block text-sm font-semibold text-gray-700"
                            htmlFor="tagline"
                        >
                            Tagline
                        </label>
                        <input
                            type="text"
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all duration-200 bg-gray-50 focus:bg-white placeholder-gray-400"
                            id="tagline"
                            name="TagLine"
                            value={TagLine}
                            onChange={(e) => setTagLine(e.target.value)}
                            placeholder="Enter tagline"
                        />
                    </div>
                    <div className="space-y-1">
                        <label
                            className="block text-sm font-semibold text-gray-700"
                            htmlFor="websites"
                        >
                            Websites
                        </label>
                        <input
                            type="text"
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all duration-200 bg-gray-50 focus:bg-white placeholder-gray-400"
                            id="websites"
                            name="Websites"
                            value={Websites}
                            onChange={(e) => setWebsites(e.target.value)}
                            placeholder="Comma separated URLs"
                        />
                    </div>
                    <div className="space-y-1">
                        <label
                            className="block text-sm font-semibold text-gray-700"
                            htmlFor="establishedYear"
                        >
                            Established Year
                        </label>
                        <input
                            type="text"
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all duration-200 bg-gray-50 focus:bg-white placeholder-gray-400"
                            id="establishedYear"
                            name="establishedYear"
                            value={establishedYear}
                            onChange={(e) =>
                                setEsatablishedYear(e.target.value)
                            }
                            placeholder="Year"
                        />
                    </div>
                    <div className="space-y-1">
                        <label
                            className="block text-sm font-semibold text-gray-700"
                            htmlFor="description"
                        >
                            Description
                        </label>
                        <textarea
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all duration-200 bg-gray-50 focus:bg-white placeholder-gray-400 min-h-[100px]"
                            id="description"
                            name="Description"
                            rows="3"
                            value={Description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter description"
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transform active:scale-[0.98] transition-all duration-200 mt-6 flex justify-center items-center gap-2"
                    >
                        <span>Update Profile</span>
                        <i className="fa-regular fa-paper-plane"></i>
                    </button>
                </form>
            </div>
        </div>
    );
};

const EditProfile = ({ onClose }) => {
    return <Modal body={<Body onClose={onClose} />} />;
};

export default EditProfile;

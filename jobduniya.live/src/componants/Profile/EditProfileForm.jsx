import React, { useContext, useState, useCallback, useEffect } from "react";
import DataList from "./assets/DataList";
// import css from "../../Style/profile_modal.module.css";
import ProfessionBox from "./assets/ProfessionBox";
import EditEducation from "./Edit/EditEducation";
import EditExperience from "./Edit/EditExperience";
import EditAddress from "./Edit/EditAddress";
import ProfilePreview from "../signup/Steps/profilePreview";
import { ToggleEdit } from "../Common/profile";
import useFirestorage from "../../Hooks/OTHER/useFirestorage";
import Cookies from "js-cookie";
import useAPI from "../../Hooks/USER/useAPI";
import { toast } from "react-toastify";
import axios from "axios";

const EditProfileForm = () => {
    // const upload = useFirestorage();
    const [profilePicture, setProfilePicture] = useState("");
    const [image, setImage] = useState("");
    const [isEditProfile, setIsEditProfile] = useContext(ToggleEdit);
    const [education, setEducation] = useState();
    const [experience, setExperience] = useState();
    const [address, setAddress] = useState();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [profileImage, setprofileImage] = useState();
    const [skill, setSkills] = useState("");
    const [profession, setProfession] = useState();
    const [input, setInput] = useState([]);
    const [langauge, setLanguages] = useState("");
    const api = useAPI();

    // const url = upload.imageUrl
    // const handleFileChange = (event) => {
    //     try {
    //         const file = event.target.files[0];
    //
    //         if (file) {
    //             setProfilePicture(URL.createObjectURL(file));
    //         } else {
    //             setProfilePicture("");
    //         }
    //     } catch (error) {
    //         console.error("Error creating object URL:", error);
    //     }
    // }

    const uploadProfileImage = async (file) => {
        const formData = new FormData();
        formData.append("file", file);

        const res = await axios.post(
            `${import.meta.env.VITE_LOCAL_URL} `,
            formData,
            {
                headers: { "Content-Type": "multipart/form-data" },
            },
        );

        return res.data.url;
    };

    const handleEnterSkillsEvent = (e) => {
        if (e.key == "Enter") {
            setSkills([...skill, input]);
            e.target.value = "";
        }
    };

    const handleEnterLangaugeEvent = (e) => {
        if (e.key == "Enter") {
            setLanguages([...langauge, input]);
            e.target.value = "";
        }
    };

    const handleFileChange = useCallback(async (event) => {
        // await upload.Upload(event.target.files[0]);
        const file = event.target.files[0];
        if (!file) return;

        try {
            const imageUrl = await uploadProfileImage(file);
            console.log("Image URL", imageUrl);
            setprofileImage(imageUrl);
        } catch (error) {
            alert("Upload failed");
            console.error(error);
        }
    });

    // useEffect(() => {
    //     setprofileImage(url);
    // }, [url])

    useEffect(() => {
        console.log("Profile Image", profileImage);
    }, [profileImage]);

    // const fileUpload = async () => {
    //     await upload.Upload(image, '/userprofiles', 'image/jpeg');
    // }
    const handleSubmit = useCallback(async () => {
        const langauges = langauge?.length > 0 && langauge?.split(",");
        const id = Cookies?.get("id");
        // console.log(profileImage);
        const skills = Array.isArray(skill) ? skill?.split(",") : "";
        const data = await api.patchREQUEST("updateDetails", "users", id, {
            profileImage,
            firstName,
            lastName,
            langauges,
            profession,
            skills,
        });
        if (data) {
            toast.success("Porfile updated successfully");
        }
    }, [firstName, lastName, profileImage, langauge, profession, skill]);

    // const handleFileChange =  useCallback(async (event) => {
    //     const isConfirmed = window.confirm("Are you sure?")
    //     if (isConfirmed) {
    //         await upload.Upload(event.target.files[0].name);
    //     }
    // } , []);

    // useEffect(() => {
    //     setprofileImage(url);
    // }, [url])
    return (
        <>
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[800px] max-h-[90vh] rounded-2xl bg-white shadow-2xl z-[1000] overflow-y-auto border border-slate-200 animate-[slideUp_0.3s_cubic-bezier(0.16,1,0.3,1)] font-[Inter]">
                <div className="flex justify-between items-center px-8 py-6 border-b border-slate-100 bg-white sticky top-0 z-10">
                    <h2 className="text-2xl font-bold text-slate-900 bg-gradient-to-br from-blue-700 to-blue-500 bg-clip-text text-transparent m-0 tracking-tight">
                        Edit Profile
                    </h2>
                    <button
                        className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center cursor-pointer transition-all duration-200 text-slate-500 hover:bg-red-100 hover:text-red-500 hover:rotate-90 border-none"
                        onClick={() => setIsEditProfile(false)}
                    >
                        <i className="fa fa-close"></i>
                    </button>
                </div>

                <div className="p-8 bg-slate-50">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="mb-6">
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-[0.95rem] text-slate-800 transition-all duration-200 shadow-sm focus:outline-none focus:border-blue-500 focus:shadow-[0_0_0_4px_rgba(59,130,246,0.1)] hover:border-slate-300"
                                    placeholder="First Name"
                                    onChange={(e) =>
                                        setFirstName(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-6">
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-[0.95rem] text-slate-800 transition-all duration-200 shadow-sm focus:outline-none focus:border-blue-500 focus:shadow-[0_0_0_4px_rgba(59,130,246,0.1)] hover:border-slate-300"
                                    placeholder="Last Name"
                                    onChange={(e) =>
                                        setLastName(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-5 p-5 bg-white border border-dashed border-slate-300 rounded-xl mb-6">
                        <div className="d-flex align-items-center gap-3 w-100">
                            <div className="flex-grow-1">
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Profile Picture
                                </label>
                                <input
                                    type="file"
                                    className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-[0.95rem] text-slate-800 transition-all duration-200 shadow-sm focus:outline-none focus:border-blue-500 focus:shadow-[0_0_0_4px_rgba(59,130,246,0.1)] hover:border-slate-300"
                                    onChange={(e) => handleFileChange(e)}
                                />
                            </div>
                            <div>
                                <ProfilePreview
                                    image={profileImage}
                                    className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <div className="mb-6">
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Languages
                                </label>
                                <input
                                    list="langauge"
                                    placeholder="Comma separated"
                                    className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-[0.95rem] text-slate-800 transition-all duration-200 shadow-sm focus:outline-none focus:border-blue-500 focus:shadow-[0_0_0_4px_rgba(59,130,246,0.1)] hover:border-slate-300"
                                    onChange={(e) =>
                                        setLanguages(e.target.value)
                                    }
                                    onKeyUp={(e) => handleEnterLangaugeEvent(e)}
                                />
                                <DataList Id={"langauge"} />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-6">
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Profession
                                </label>
                                <input
                                    list="profession"
                                    placeholder="Profession"
                                    className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-[0.95rem] text-slate-800 transition-all duration-200 shadow-sm focus:outline-none focus:border-blue-500 focus:shadow-[0_0_0_4px_rgba(59,130,246,0.1)] hover:border-slate-300"
                                    onChange={(e) =>
                                        setProfession(e.target.value)
                                    }
                                />
                                <ProfessionBox id={"profession"} />
                            </div>
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Skills
                        </label>
                        <input
                            type="text"
                            placeholder="Comma separated (e.g. React, Node.js)"
                            className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-[0.95rem] text-slate-800 transition-all duration-200 shadow-sm focus:outline-none focus:border-blue-500 focus:shadow-[0_0_0_4px_rgba(59,130,246,0.1)] hover:border-slate-300"
                            onChange={(e) => setSkills(e.target.value)}
                            onKeyUp={(e) => handleEnterSkillsEvent(e)}
                        />
                    </div>

                    <button
                        className="bg-gradient-to-br from-blue-600 to-blue-700 text-white font-semibold px-8 py-3 rounded-lg border-none shadow-lg shadow-blue-500/20 transition-all duration-200 w-full mt-4 text-base hover:-translate-y-px hover:shadow-xl hover:brightness-110 cursor-pointer"
                        onClick={() => handleSubmit()}
                    >
                        Save Changes
                    </button>

                    <hr className="my-6 border-slate-200" />

                    {/* Education Section */}
                    <div className="bg-white border border-slate-200 rounded-xl p-5 mb-4 transition-all duration-200 hover:shadow-md hover:border-blue-200">
                        <div className="flex justify-between items-center mb-0">
                            <h3 className="text-base font-semibold text-slate-600 m-0">
                                Education
                            </h3>
                            <button
                                className="bg-blue-50 text-blue-500 px-4 py-2 rounded-md font-medium border border-transparent transition-all duration-200 hover:bg-blue-100 hover:text-blue-700 cursor-pointer"
                                onClick={() => setEducation(!education)}
                            >
                                {education ? "Close" : "Edit"}
                            </button>
                        </div>
                        {education && (
                            <div className="mt-5">
                                <EditEducation />
                            </div>
                        )}
                    </div>

                    {/* Address Section */}
                    <div className="bg-white border border-slate-200 rounded-xl p-5 mb-4 transition-all duration-200 hover:shadow-md hover:border-blue-200">
                        <div className="flex justify-between items-center mb-0">
                            <h3 className="text-base font-semibold text-slate-600 m-0">
                                Address
                            </h3>
                            <button
                                className="bg-blue-50 text-blue-500 px-4 py-2 rounded-md font-medium border border-transparent transition-all duration-200 hover:bg-blue-100 hover:text-blue-700 cursor-pointer"
                                onClick={() => setAddress(!address)}
                            >
                                {address ? "Close" : "Edit"}
                            </button>
                        </div>
                        {address && (
                            <div className="mt-5">
                                <EditAddress />
                            </div>
                        )}
                    </div>

                    {/* Experience Section */}
                    <div className="bg-white border border-slate-200 rounded-xl p-5 mb-4 transition-all duration-200 hover:shadow-md hover:border-blue-200">
                        <div className="flex justify-between items-center mb-0">
                            <h3 className="text-base font-semibold text-slate-600 m-0">
                                Experience
                            </h3>
                            <button
                                className="bg-blue-50 text-blue-500 px-4 py-2 rounded-md font-medium border border-transparent transition-all duration-200 hover:bg-blue-100 hover:text-blue-700 cursor-pointer"
                                onClick={() => setExperience(!experience)}
                            >
                                {experience ? "Close" : "Edit"}
                            </button>
                        </div>
                        {experience && (
                            <div className="mt-5">
                                <EditExperience />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditProfileForm;

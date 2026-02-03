import React, { useContext, useState, useCallback, useEffect } from "react";
import DataList from "./assets/DataList";
import css from "../../Style/profile_modal.module.css";
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
            `${process.env.REACT_APP_LOCAL_URL} `,
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
            <div className={css.modalContainer}>
                <div className={css.header}>
                    <h2 className={css.title}>Edit Profile</h2>
                    <button
                        className={css.closeBtn}
                        onClick={() => setIsEditProfile(false)}
                    >
                        <i className="fa fa-close"></i>
                    </button>
                </div>

                <div className={css.body}>
                    <div className="row">
                        <div className="col-md-6">
                            <div className={css.formGroup}>
                                <label className={css.label}>First Name</label>
                                <input
                                    type="text"
                                    className={css.input}
                                    placeholder="First Name"
                                    onChange={(e) =>
                                        setFirstName(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className={css.formGroup}>
                                <label className={css.label}>Last Name</label>
                                <input
                                    type="text"
                                    className={css.input}
                                    placeholder="Last Name"
                                    onChange={(e) =>
                                        setLastName(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                    </div>

                    <div className={css.uploadSection + " mb-4"}>
                        <div className="d-flex align-items-center gap-3 w-100">
                            <div className="flex-grow-1">
                                <label className={css.label}>
                                    Profile Picture
                                </label>
                                <input
                                    type="file"
                                    className={css.input}
                                    onChange={(e) => handleFileChange(e)}
                                />
                            </div>
                            <div>
                                <ProfilePreview
                                    image={profileImage}
                                    className={css.uploadPreview}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <div className={css.formGroup}>
                                <label className={css.label}>Languages</label>
                                <input
                                    list="langauge"
                                    placeholder="Comma separated"
                                    className={css.input}
                                    onChange={(e) =>
                                        setLanguages(e.target.value)
                                    }
                                    onKeyUp={(e) => handleEnterLangaugeEvent(e)}
                                />
                                <DataList Id={"langauge"} />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className={css.formGroup}>
                                <label className={css.label}>Profession</label>
                                <input
                                    list="profession"
                                    placeholder="Profession"
                                    className={css.input}
                                    onChange={(e) =>
                                        setProfession(e.target.value)
                                    }
                                />
                                <ProfessionBox id={"profession"} />
                            </div>
                        </div>
                    </div>

                    <div className={css.formGroup}>
                        <label className={css.label}>Skills</label>
                        <input
                            type="text"
                            placeholder="Comma separated (e.g. React, Node.js)"
                            className={css.input}
                            onChange={(e) => setSkills(e.target.value)}
                            onKeyUp={(e) => handleEnterSkillsEvent(e)}
                        />
                    </div>

                    <button
                        className={`${css.saveBtn}`}
                        onClick={() => handleSubmit()}
                    >
                        Save Changes
                    </button>

                    <hr className="my-4" style={{ borderColor: "#e5e7eb" }} />

                    {/* Education Section */}
                    <div className={css.sectionCard}>
                        <div className={css.sectionHeader}>
                            <h3 className={css.sectionTitle}>Education</h3>
                            <button
                                className={css.actionBtn}
                                onClick={() => setEducation(!education)}
                            >
                                {education ? "Close" : "Edit"}
                            </button>
                        </div>
                        {education && (
                            <div className="mt-3">
                                <EditEducation />
                            </div>
                        )}
                    </div>

                    {/* Address Section */}
                    <div className={css.sectionCard}>
                        <div className={css.sectionHeader}>
                            <h3 className={css.sectionTitle}>Address</h3>
                            <button
                                className={css.actionBtn}
                                onClick={() => setAddress(!address)}
                            >
                                {address ? "Close" : "Edit"}
                            </button>
                        </div>
                        {address && (
                            <div className="mt-3">
                                <EditAddress />
                            </div>
                        )}
                    </div>

                    {/* Experience Section */}
                    <div className={css.sectionCard}>
                        <div className={css.sectionHeader}>
                            <h3 className={css.sectionTitle}>Experience</h3>
                            <button
                                className={css.actionBtn}
                                onClick={() => setExperience(!experience)}
                            >
                                {experience ? "Close" : "Edit"}
                            </button>
                        </div>
                        {experience && (
                            <div className="mt-3">
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

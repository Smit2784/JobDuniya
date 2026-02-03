import React, { useCallback, useEffect, useMemo, useState } from "react";
import "../../../Style/singup.css";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import "react-toastify/dist/ReactToastify.css";
import css from "../../../Style/inputBoxs.module.css";
import Stepper from "react-stepper-horizontal";
import useAPI from "../../../Hooks/USER/useAPI";
import FormButton from "../../Common/FormButton";
import me from "../../../assets/Je3eTqQJrt.json";
import FormContainer from "../../Common/FormContainer";
import "../../../Style/login.css";
import InputText from "../validateInputs";
import { isValidStep2 } from "../../../Auth/isValidate";
import ProfilePreview from "./profilePreview";
import useFirestorage from "../../../Hooks/OTHER/useFirestorage";
import axios from "axios";

const Step2 = ({ setScreen }) => {
    const lottie = (
        <Lottie
            animationData={me}
            loop={true}
            style={{ height: "100%", width: "100%" }}
        />
    );

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [profileImage, setprofileImage] = useState("");

    // const upload = useFirestorage();
    const api = useAPI();
    // const url = upload.imageUrl;

    const uploadProfileImage = async (file) => {
        const formData = new FormData();
        formData.append("file", file);

        const res = await axios.post(
            `${process.env.REACT_APP_LOCAL_URL}upload`,
            formData,
            {
                headers: { "Content-Type": "multipart/form-data" },
            },
        );

        return res.data.url;
    };

    const handleFileChange = useCallback(async (event) => {
        const isConfirmed = window.confirm("Are you sure?");
        if (!isConfirmed) return;

        const file = event.target.files[0];
        if (!file) return;

        try {
            const imageUrl = await uploadProfileImage(file);
            console.log("Image URL", imageUrl);
            setprofileImage(imageUrl);
        } catch (err) {
            alert("Upload failed");
            console.error(err);
        }
    }, []);

    // useEffect(() => {
    //     setprofileImage(url);
    // }, [url]);

    useEffect(() => {
        console.log("Profile Image", profileImage);
    }, [profileImage]);

    const isValidateStep2 = useMemo(
        () => isValidStep2(firstName, lastName, profileImage),
        [firstName, lastName, profileImage],
    );

    const handleSubmit = useCallback(async () => {
        const id = localStorage.getItem("upd_id");
        const data = await api.patchREQUEST(
            "updateDetails",
            "users",
            { _id: id },
            { firstName, lastName, profileImage },
        );
        setScreen("step3");
    }, [firstName, lastName, profileImage]);

    return (
        <FormContainer
            heading={"Sign Up"}
            title={
                "Hello there! We believe every story begins with a name. Mind sharing your first and last name with us? We're excited to get to know you better!"
            }
            leftSection={lottie}
            slogan={<Stepper steps={[{}, {}, {}, {}, {}, {}]} activeStep={1} />}
            navigat={
                <p className="--navLink">
                    Already have an account : <Link to={"/login"}>Login !</Link>
                </p>
            }
            textbox1={
                <InputText
                    inputType={"text"}
                    placeHolder={"First Name*"}
                    onChange={(e) => setFirstName(e)}
                />
            }
            textbox2={
                <InputText
                    inputType={"text"}
                    placeHolder={"Last Name*"}
                    onChange={(e) => setLastName(e)}
                />
            }
            textbox4={
                <input
                    className={css.input}
                    type="file"
                    onChange={(e) => {
                        handleFileChange(e);
                    }}
                />
            }
            textbox5={<ProfilePreview image={profileImage && profileImage} />}
            button1={
                <FormButton
                    className={"--btn"}
                    text={"back"}
                    onClick={() => setScreen("step1")}
                />
            }
            button2={
                <FormButton
                    className={isValidateStep2 ? "--btnDisabled" : "--btn"}
                    text={"next"}
                    isDisabled={isValidateStep2}
                    onClick={() => {
                        handleSubmit();
                    }}
                />
            }
        />
    );
};

export default Step2;

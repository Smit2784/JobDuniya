import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import "react-toastify/dist/ReactToastify.css";
import Stepper from "../../Common/Stepper";
import useAPI from "../../../Hooks/USER/useAPI";
import FormButton from "../../Common/FormButton";
import me from "../../../assets/Je3eTqQJrt.json";
import FormContainer from "../../Common/FormContainer";
import InputText from "../validateInputs";
import { isValidStep2 } from "../../../Auth/isValidate";
import ProfilePreview from "./profilePreview";
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

    const api = useAPI();

    const uploadProfileImage = async (file) => {
        const formData = new FormData();
        formData.append("file", file);

        const res = await axios.post(
            `${import.meta.env.VITE_LOCAL_URL}upload`,
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
                <p className="m-0 text-sm text-gray-600">
                    Already have an account :{" "}
                    <Link
                        to={"/login"}
                        className="text-[#23A6F0] hover:underline font-medium"
                    >
                        Login !
                    </Link>
                </p>
            }
            textbox2={
                <InputText
                    inputType={"text"}
                    placeHolder={"First Name*"}
                    onChange={(e) => setFirstName(e)}
                />
            }
            textbox3={
                <InputText
                    inputType={"text"}
                    placeHolder={"Last Name*"}
                    onChange={(e) => setLastName(e)}
                />
            }
            textbox4={
                <input
                    className="w-full flex p-2 px-4 text-[#23A6F0] text-[13px] font-normal leading-7 border border-[#adadad] rounded-lg items-start gap-4 flex-grow self-stretch tracking-wider focus:outline-none focus:border-[#23A6F0] focus:ring-1 focus:ring-[#23A6F0] transition-all"
                    type="file"
                    onChange={(e) => {
                        handleFileChange(e);
                    }}
                />
            }
            textbox5={<ProfilePreview image={profileImage && profileImage} />}
            button1={
                <FormButton
                    className={
                        "w-full py-3 px-4 bg-[#23A6F0] text-white text-lg font-medium rounded-lg hover:bg-[#1a8cd8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    }
                    text={"back"}
                    onClick={() => setScreen("step1")}
                />
            }
            button2={
                <FormButton
                    className={
                        isValidateStep2
                            ? "w-full py-3 px-4 bg-blue-50 text-gray-400 text-lg font-medium rounded-lg border border-gray-200 cursor-not-allowed"
                            : "w-full py-3 px-4 bg-[#23A6F0] text-white text-lg font-medium rounded-lg hover:bg-[#1a8cd8] transition-colors"
                    }
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

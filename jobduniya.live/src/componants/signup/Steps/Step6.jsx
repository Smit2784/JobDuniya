import React, { useCallback, useMemo, useState } from "react";
import ProfessionBox from "../../Common/ProfessionBox";
import Lottie from "lottie-react";
import "react-toastify/dist/ReactToastify.css";
import Stepper from "../../Common/Stepper";
import FormButton from "../../Common/FormButton";
import me from "../../../assets/Je3eTqQJrt.json";
import FormContainer from "../../Common/FormContainer";
import { Link, useNavigate } from "react-router-dom";
import { isValidStep6 } from "../../../Auth/isValidate";
import InputText from "../validateInputs";
import useAPI from "../../../Hooks/USER/useAPI";

const Step6 = ({ setScreen }) => {
    const lottie = (
        <Lottie
            animationData={me}
            loop={true}
            style={{ height: "100%", width: "100%" }}
        />
    );

    const api = useAPI();
    const navigate = useNavigate();

    const [skills, setSkills] = useState([]);
    const [profession, setProfession] = useState("");
    const [input, setInput] = useState([]);
    const [langauges, setLanguages] = useState([]);
    const [description, setDescription] = useState("");
    console.log(description);

    const isValidateStep6 = useMemo(
        () => isValidStep6(skills, profession, langauges),
        [skills, profession, langauges],
    );

    const handleEnterSkillsEvent = (e) => {
        if (e.key == "Enter") {
            setSkills([...skills, input]);
            e.target.value = "";
        }
    };

    const handleEnterLangaugeEvent = (e) => {
        if (e.key == "Enter") {
            setLanguages([...langauges, input]);
            e.target.value = "";
        }
    };

    const handleSubmit = useCallback(async () => {
        const id = localStorage.getItem("upd_id");
        const data = await api.patchREQUEST("updateDetails", "users", id, {
            langauges,
            profession,
            skills,
            description,
        });
        console.log(data);
        navigate("/loginasuser");
    }, [profession, skills, langauges]);

    const inputClass =
        "w-full flex p-2 px-4 text-[#23A6F0] text-[13px] font-normal leading-7 border border-[#adadad] rounded-lg items-start gap-4 flex-grow self-stretch tracking-wider focus:outline-none focus:border-[#23A6F0] focus:ring-1 focus:ring-[#23A6F0] transition-all";

    return (
        <FormContainer
            arrayValuesSkill={skills}
            arrayValuesLang={langauges}
            setArraySkill={setSkills}
            setArrayLang={setLanguages}
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
            heading={"Sign Up"}
            leftSection={lottie}
            title={
                "Unleash your potential and let your unique abilities shine on the path to career success."
            }
            slogan={
                <Stepper
                    style={{ color: "#001f3f" }}
                    steps={[{}, {}, {}, {}, {}, {}]}
                    activeStep={5}
                />
            }
            textbox1={
                <ProfessionBox
                    onChange={(e) => setProfession(e.target.value)}
                    arrayKey="profession"
                    multiple={false}
                />
            }
            textbox2={
                <input
                    onChange={(e) => setInput(e.target.value)}
                    type={"text"}
                    className={inputClass}
                    onKeyUp={(e) => handleEnterSkillsEvent(e)}
                    placeholder="Skills*(press enter to add)"
                    require={true}
                />
            }
            textbox4={
                <input
                    onChange={(e) => setInput(e.target.value)}
                    type={"text"}
                    className={inputClass}
                    onKeyUp={(e) => handleEnterLangaugeEvent(e)}
                    placeholder="Langauge known*(press enter to add)"
                    require={true}
                />
            }
            textbox6={
                <InputText
                    inputType={"text"}
                    onChange={(e) => setDescription(e)}
                    placeHolder={"Describe your self"}
                />
            }
            button1={
                <FormButton
                    className={
                        "w-full py-3 px-4 bg-[#23A6F0] text-white text-lg font-medium rounded-lg hover:bg-[#1a8cd8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    }
                    text={"back"}
                    onClick={() => setScreen("step5")}
                />
            }
            button2={
                <FormButton
                    className={
                        !isValidateStep6
                            ? "w-full py-3 px-4 bg-blue-50 text-gray-400 text-lg font-medium rounded-lg border border-gray-200 cursor-not-allowed"
                            : "w-full py-3 px-4 bg-[#23A6F0] text-white text-lg font-medium rounded-lg hover:bg-[#1a8cd8] transition-colors"
                    }
                    isDisabled={!isValidateStep6}
                    text={"Get Started"}
                    onClick={() => {
                        handleSubmit();
                    }}
                />
            }
        />
    );
};

export default Step6;

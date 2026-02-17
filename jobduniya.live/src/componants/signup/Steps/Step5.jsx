import React, { useCallback, useMemo, useState } from "react";
import Lottie from "lottie-react";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import Stepper from "../../Common/Stepper";
import FormButton from "../../Common/FormButton";
import me from "../../../assets/Je3eTqQJrt.json";
import useAPI from "../../../Hooks/USER/useAPI";
import FormContainer from "../../Common/FormContainer";
import InputText from "../validateInputs";
import { isValidStep5 } from "../../../Auth/isValidate";

const Step5 = ({ setScreen }) => {
    const lottie = (
        <Lottie
            animationData={me}
            loop={true}
            style={{ height: "100%", width: "100%" }}
        />
    );

    const [jobTitle, setJobTitle] = useState("");
    const [userType, setUserType] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [startDateWork, setStartDateWork] = useState("");
    const [endDateWork, setEndDateWork] = useState("");
    const [responsibilities, setResponsibilities] = useState([]);
    const [achievements, setAchievements] = useState([]);
    const [isFresher, setIsFresher] = useState(false);
    const [input, setInput] = useState([]);

    const handleEnterResponsibilitesEvent = (e) => {
        if (e.key == "Enter") {
            setResponsibilities([...responsibilities, input]);
            e.target.value = "";
        }
    };

    const handleEnterAchievementEvent = (e) => {
        if (e.key == "Enter") {
            setAchievements([...achievements, input]);
            e.target.value = "";
        }
    };

    const api = useAPI();

    const isValidateStep5 = useMemo(
        () =>
            isValidStep5(
                jobTitle,
                companyName,
                startDateWork,
                endDateWork,
                responsibilities,
                achievements,
            ),
        [
            jobTitle,
            companyName,
            startDateWork,
            endDateWork,
            responsibilities,
            achievements,
        ],
    );

    const handleSubmit = useCallback(async () => {
        const id = localStorage.getItem("upd_id");
        const data = await api.patchREQUEST("updateDetails", "users", id, {
            experience: [
                {
                    isFresher,
                    jobTitle,
                    companyName,
                    userType,
                    startDateWork,
                    endDateWork,
                    responsibilities,
                    achievements,
                },
            ],
        });
        setScreen("step6");
    }, [
        jobTitle,
        companyName,
        startDateWork,
        userType,
        endDateWork,
        responsibilities,
        achievements,
    ]);

    const inputClass =
        "w-full flex p-2 px-4 text-[#23A6F0] text-[13px] font-normal leading-7 border border-[#adadad] rounded-lg items-start gap-4 flex-grow self-stretch tracking-wider focus:outline-none focus:border-[#23A6F0] focus:ring-1 focus:ring-[#23A6F0] transition-all";

    return (
        <FormContainer
            heading={"Sign Up"}
            leftSection={lottie}
            arrayValuesResp={responsibilities}
            setArrayResp={setResponsibilities}
            arrayValuesAch={achievements}
            setArrayAch={setAchievements}
            title={
                <>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                        <input
                            type="checkbox"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                            onChange={() => {
                                if (!isFresher) {
                                    setJobTitle("");
                                    setCompanyName("");
                                    setUserType("");
                                    setStartDateWork("");
                                    setEndDateWork("");
                                    setResponsibilities([]);
                                    setAchievements([]);
                                    setInput("");
                                }
                                setIsFresher(!isFresher);
                            }}
                        />{" "}
                        I don't have an any experience.
                    </div>
                </>
            }
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
            slogan={
                <Stepper
                    style={{ color: "#001f3f" }}
                    steps={[{}, {}, {}, {}, {}, {}]}
                    activeStep={4}
                />
            }
            textbox1={
                <InputText
                    onChange={(e) => setJobTitle(e)}
                    id="JobTitle"
                    inputType={"text"}
                    placeHolder={"Job Title*"}
                    require={true}
                    disabled={isFresher}
                />
            }
            textbox2={
                <InputText
                    id="CompanyName"
                    onChange={(e) => setCompanyName(e)}
                    inputType={"text"}
                    placeHolder={"Company Name*"}
                    require={true}
                    disabled={isFresher}
                />
            }
            textbox6={
                <InputText
                    id="Employeement Type"
                    onChange={(e) => setUserType(e)}
                    inputType={"text"}
                    placeHolder={"Employeement type*"}
                    require={true}
                    disabled={isFresher}
                />
            }
            textbox4={
                <InputText
                    onChange={(e) => setStartDateWork(e)}
                    id="StartDate"
                    inputType={"date"}
                    require={true}
                    label={"Start date*"}
                    disabled={isFresher}
                />
            }
            textbox5={
                <InputText
                    id="EndDate"
                    onChange={(e) => setEndDateWork(e)}
                    inputType={"date"}
                    require={true}
                    label={"End date*"}
                    disabled={isFresher}
                />
            }
            textbox7={
                <input
                    onChange={(e) => setInput(e.target.value)}
                    type={"text"}
                    className={inputClass}
                    onKeyUp={(e) => handleEnterResponsibilitesEvent(e)}
                    placeholder="Responsiblities*(press enter to add)"
                    require={false}
                    disabled={isFresher}
                />
            }
            textbox8={
                <input
                    onChange={(e) => setInput(e.target.value)}
                    type={"text"}
                    className={inputClass}
                    onKeyUp={(e) => handleEnterAchievementEvent(e)}
                    placeholder="Achievements*(press enter to add)"
                    require={false}
                    disabled={isFresher}
                />
            }
            button1={
                <FormButton
                    className={
                        "w-full py-3 px-4 bg-[#23A6F0] text-white text-lg font-medium rounded-lg hover:bg-[#1a8cd8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    }
                    text={"back"}
                    onClick={() => setScreen("step4")}
                />
            }
            button2={
                <FormButton
                    className={
                        "w-full py-3 px-4 bg-[#23A6F0] text-white text-lg font-medium rounded-lg hover:bg-[#1a8cd8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    }
                    text={"Next"}
                    onClick={() => {
                        handleSubmit();
                    }}
                />
            }
        />
    );
};

export default Step5;

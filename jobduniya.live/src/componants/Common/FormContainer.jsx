import React, { useContext } from "react";
import Lottie from "lottie-react";
import { ToastContainer } from "react-toastify";
import me from "../../assets/me.json";
import FormTextboxes from "./FormTextbox";
import { Link } from "react-router-dom";
import FormButton from "./FormButton";
import Stepper from "./Stepper";

import { ActiveModal } from "../..";
import Saved from "./Boxes";
const FormContainer = ({
    footerSection,
    handleSubmit,
    warning,
    setEmail,
    setPassword,
    arrayValuesCetrification,
    title,
    setArrayValuesCertification,
    textbox1,
    textbox2,
    textbox3,
    textbox4,
    arrayValues,
    textbox5,
    textbox6,
    textbox7,
    textbox8,
    textbox9,
    textbox10,
    heading,
    slogan,
    navigat,
    button1,
    button2,
    leftSection,
    setArray,
    setArrayResp,
    arrayValuesResp,
    setArrayAch,
    arrayValuesAch,
    arrayValuesSkill,
    arrayValuesLang,
    setArraySkill,
    setArrayLang,
}) => {
    const [activeModalState, setActiveModalState] = useContext(ActiveModal);
    return (
        <>
            {/* <ToastContainer /> */}
            <div className="w-full flex flex-wrap items-center justify-center min-h-[90vh] overflow-auto p-4 md:p-6 bg-gray-50">
                <div className="hidden md:block w-full md:w-1/2 max-w-[500px] p-4 animate__animated animate__zoomIn">
                    {leftSection}
                </div>
                <div className="w-full md:w-1/2 max-w-[500px] p-6 md:p-8 bg-white rounded-xl shadow-sm border border-gray-100">
                    <div className="flex flex-col mb-3 gap-1">
                        <span className="text-2xl font-bold text-gray-900">
                            {heading}
                        </span>
                        <span className="text-sm text-gray-500">{slogan}</span>
                        <span className="text-sm text-[#2C73D2] text-justify leading-relaxed">
                            {title}
                        </span>
                        <span className="text-red-500 text-xs font-medium">
                            {warning}
                        </span>
                    </div>
                    <div className="w-full flex flex-col gap-1">
                        {textbox1}
                        <Saved
                            array={arrayValuesSkill}
                            setArray={setArraySkill}
                        />
                        <Saved array={arrayValues} setArray={setArray} />
                        <div className="flex w-full gap-1">
                            {textbox2 && (
                                <div className="w-full">{textbox2}</div>
                            )}
                            {textbox3 && (
                                <div className="w-full">{textbox3}</div>
                            )}
                        </div>
                        <Saved
                            array={arrayValuesLang}
                            setArray={setArrayLang}
                        />
                        <div className="flex w-full gap-3">
                            {textbox4 && (
                                <div className="w-full">{textbox4}</div>
                            )}
                            {textbox5 && (
                                <div className="w-full">{textbox5}</div>
                            )}
                        </div>
                        {textbox6}
                        <div className="flex w-full gap-3">
                            <Saved
                                array={arrayValuesResp}
                                setArray={setArrayResp}
                            />
                            <Saved
                                array={arrayValuesCetrification}
                                setArray={setArrayValuesCertification}
                            />
                        </div>
                        {textbox7}
                        <Saved array={arrayValuesAch} setArray={setArrayAch} />
                        {textbox8}
                        {textbox9}
                        {textbox10}
                        <div className="flex w-full gap-3 flex-col md:flex-row mt-2">
                            {button1}
                            {button2}
                        </div>
                    </div>
                    <div className="w-full flex flex-col items-center justify-center gap-2 mt-4">
                        <span>{navigat}</span>
                        <div className="flex justify-center items-center gap-3">
                            <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-medium cursor-pointer hover:bg-blue-100 transition-colors">
                                Privacy Policy
                            </span>
                            <span
                                onClick={() => {
                                    setActiveModalState("terms");
                                }}
                                className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-medium cursor-pointer hover:bg-blue-100 transition-colors"
                            >
                                Terms and conditions
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FormContainer;

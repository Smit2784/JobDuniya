import React, { useMemo, useCallback, useState } from "react";
import Lottie from "lottie-react";
import "react-toastify/dist/ReactToastify.css";
import Stepper from "../../Common/Stepper";
import FormButton from "../../Common/FormButton";
import FormSelectBox from "../../Common/FormSelectBox";
import me from "../../../assets/Je3eTqQJrt.json";
import { Link } from "react-router-dom";
import useAPI from "../../../Hooks/USER/useAPI";
import FormContainer from "../../Common/FormContainer";
import InputText from "../validateInputs";
import { isValidStep3 } from "../../../Auth/isValidate";

const Step3 = ({ setScreen }) => {
    const lottie = (
        <Lottie
            animationData={me}
            loop={true}
            style={{ height: "100%", width: "100%" }}
        />
    );

    const [personalAddress, setPersonalAddress] = useState("");
    const [pinCode, setPinCode] = useState("");
    const [stateValue, setStateValue] = useState("");

    const api = useAPI();

    const [state, setState] = useState("");
    const handleState = (stateValue) => {
        setStateValue(stateValue);
    };

    const [city, setCity] = useState("");
    const handleCity = (city) => {
        setCity(city);
    };

    const isValidateStep3 = useMemo(
        () => isValidStep3(stateValue, city, personalAddress, pinCode),
        [stateValue, city, personalAddress, pinCode],
    );

    const handleSubmit = useCallback(async () => {
        const id = localStorage.getItem("upd_id");
        const data = await api.patchREQUEST("updateDetails", "users", id, {
            location: [{ personalAddress, pinCode, state, city }],
        });
        setScreen("step4");
    }, [stateValue, city, personalAddress, pinCode]);

    const inputSelectClass =
        "w-full p-2 px-4 text-[#23A6F0] text-[13px] font-normal leading-7 border border-[#adadad] rounded-lg bg-white focus:outline-none focus:border-[#23A6F0] focus:ring-1 focus:ring-[#23A6F0] transition-all";

    return (
        <FormContainer
            heading={"Sign Up"}
            leftSection={lottie}
            title={
                "Rooted in City, thriving in State, and always ready to embrace the next exciting chapter wherever life takes me."
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
                    activeStep={2}
                />
            }
            textbox1={
                <InputText
                    inputType={"text"}
                    onChange={(e) => setPersonalAddress(e)}
                    placeHolder={"Personal Address"}
                />
            }
            textbox2={
                <FormSelectBox
                    type="text"
                    // warning="states"
                    className={inputSelectClass}
                    arrayKey="states"
                    selectedState={stateValue}
                    stateValue={handleState}
                    selectedCity={city}
                    state={setState}
                    city={handleCity}
                />
            }
            textbox3={
                <FormSelectBox
                    className={inputSelectClass}
                    arrayKey="cities"
                    selectedState={stateValue}
                    stateValue={handleState}
                    selectedCity={city}
                    state={setState}
                    city={handleCity}
                />
            }
            textbox4={
                <InputText
                    id={"Pincode"}
                    onChange={(e) => setPinCode(e)}
                    inputType={"text"}
                    placeHolder="PinCode"
                />
            }
            button1={
                <FormButton
                    className={
                        "w-full py-3 px-4 bg-[#23A6F0] text-white text-lg font-medium rounded-lg hover:bg-[#1a8cd8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    }
                    text={"back"}
                    onClick={() => {
                        setScreen("step2");
                    }}
                />
            }
            button2={
                <FormButton
                    className={
                        !isValidateStep3
                            ? "w-full py-3 px-4 bg-blue-50 text-gray-400 text-lg font-medium rounded-lg border border-gray-200 cursor-not-allowed"
                            : "w-full py-3 px-4 bg-[#23A6F0] text-white text-lg font-medium rounded-lg hover:bg-[#1a8cd8] transition-colors"
                    }
                    isDisabled={!isValidateStep3}
                    text={"next"}
                    onClick={() => {
                        handleSubmit();
                    }}
                />
            }
        />
    );
};

export default Step3;

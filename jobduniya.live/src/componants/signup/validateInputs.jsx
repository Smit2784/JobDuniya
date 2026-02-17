import React, { useCallback, useMemo, useState } from "react";

const InputText = ({
    onChange,
    id,
    label,
    inputType,
    placeHolder,
    warning,
    password,
    require,
    minLength = 0,
    maxLength = 100,
    value,
    onEnterHandler,
    disabled,
}) => {
    //Validating email if type is email
    const validateEmail = (email) => {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        );
    };

    const [type, setType] = useState(inputType);
    const [warningState, setWarningState] = useState("");
    const onInputChangeHandler = useCallback(
        (e) => {
            if (
                e.target.value.toString().trim() === "" ||
                e.target.value.toString().length < minLength ||
                e.target.value.toString().length > maxLength
            ) {
                setWarningState(warning);
            } else {
                if (type === "email") {
                    if (validateEmail(e.target.value)) {
                        setWarningState("");
                        onChange(e.target.value);
                    } else {
                        setWarningState("Invalid Email formate");
                    }
                } else {
                    setWarningState("");
                    onChange(e.target.value);
                }
            }
        },
        [type, warning, minLength, maxLength, inputType, onChange],
    );

    const renderEyeButton = useMemo(() => {
        const eyeClass =
            "absolute right-[5%] top-[31%] cursor-pointer text-gray-400 hover:text-[#23A6F0] transition-colors";
        if (type === "password") {
            return (
                <i
                    className={`${eyeClass} ri-eye-off-line`}
                    onClick={() => setType("text")}
                />
            );
        } else {
            return (
                <i
                    className={`${eyeClass} ri-eye-line`}
                    onClick={() => setType("password")}
                />
            );
        }
    }, [type]);

    return (
        <div className="w-full flex flex-col items-start justify-start gap-1 z-10">
            <label
                className="text-[#23A6F0] text-sm font-medium capitalize"
                htmlFor={id}
            >
                {label}
            </label>
            <div className="relative w-full">
                <input
                    className={`
                        w-full flex p-2 px-4 text-[#23A6F0] text-[13px] font-normal leading-7 
                        border border-[#adadad] rounded-lg items-start gap-4 flex-grow self-stretch tracking-wider
                        focus:outline-none focus:border-[#23A6F0] focus:ring-1 focus:ring-[#23A6F0] transition-all
                        placeholder:text-[13px] placeholder:text-[rgb(0,38,127)]
                        ${warningState !== "" ? "focus:outline-red-500 border-red-500 focus:border-red-500" : ""}
                        disabled:bg-gray-100 disabled:cursor-not-allowed
                    `}
                    type={type}
                    name={id}
                    placeholder={placeHolder}
                    id={id}
                    required={require ?? true}
                    onChange={onInputChangeHandler}
                    minLength={minLength}
                    maxLength={maxLength}
                    onKeyUp={onEnterHandler}
                    value={value}
                    disabled={disabled}
                />
                {password && renderEyeButton}
            </div>
            <span className="text-red-500 text-xs font-medium">
                {warningState}
            </span>
        </div>
    );
};

export default InputText;

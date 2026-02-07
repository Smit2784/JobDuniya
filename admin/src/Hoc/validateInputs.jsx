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
    name,
    minLength = 0,
    maxLength = 100,
    value,
    onEnterHandler,
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
        [type],
    );

    const renderEyeButton = useMemo(() => {
        if (type === "password") {
            return (
                <i
                    className="ri-eye-off-line absolute right-[5%] top-[31%] cursor-pointer max-[680px]:right-[4%] max-[680px]:top-[32%]"
                    onClick={() => setType("text")}
                />
            );
        } else {
            return (
                <i
                    className="ri-eye-line absolute right-[5%] top-[31%] cursor-pointer max-[680px]:right-[4%] max-[680px]:top-[32%]"
                    onClick={() => setType("password")}
                />
            );
        }
    }, [type]);
    return (
        <div className="w-full flex flex-col items-start z-10 justify-start gap-1">
            <label
                className="text-[#23A6F0] text-sm font-medium leading-5 capitalize"
                htmlFor={id}
            >
                {label}
            </label>
            <div className="relative w-full">
                <input
                    className={`w-full flex p-[8px_16px] text-[#23A6F0] text-[13px] font-normal leading-7 border border-[#adadad] rounded-lg items-start gap-4 grow tracking-[0.5px] focus:outline-[#23A6F0] focus:border-[1.25px] hover:outline-[#23A6F0] hover:border-[1.25px] placeholder:text-[13px] placeholder:text-[#00267f] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ${
                        warningState !== ""
                            ? "focus:outline-red-500 focus:border-red-500 border-red-500"
                            : ""
                    }`}
                    type={type}
                    name={name}
                    placeholder={placeHolder}
                    id={id}
                    required={require ?? true}
                    onChange={onInputChangeHandler}
                    minLength={minLength}
                    maxLength={maxLength}
                    onKeyUp={onEnterHandler}
                    value={value}
                />
                {password && renderEyeButton}
            </div>
            <span className="text-red-500 text-xs font-medium leading-4">
                {warningState}
            </span>
        </div>
    );
};

export default InputText;

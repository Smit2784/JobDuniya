import React, { useCallback, useContext, useMemo, useState } from "react";
import Button from "../../Hoc/Button";

import { RenderScreen } from "../../App";
import useAPI from "../../Hooks/useAPI";
import { toast } from "react-toastify";




const Registration = () => {
    const [screen, setScreen] = useContext(RenderScreen)
    const [warning ,setWarning] = useState("");
    const api = useAPI()
    const [formData, setFormData] = useState({
        Email: "",
        Password: "",
        ConfirmPassword: ""
    });


    const checkPassword = useCallback(() => {
        if (formData.Password !== "" && formData.ConfirmPassword !== "") {
            if (formData.Password === formData.ConfirmPassword) {
                if (formData.Password.length <= 7 && formData.ConfirmPassword.length <=7) {
                    setWarning("Password must be 8 charactor long")
                    return false
                }else{
                    setWarning("")
                    return true
                }
            }
            else {
                setWarning("password does not matched")
                return false
            }
        }
        else {
            return false
        }
    }, [formData.Password, formData.ConfirmPassword])

    const validateEmail = useCallback((email) => {
        const pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(email.match(pattern))
        {
            setWarning("")
            return true
        }
        else{            
            setWarning("Provide valid email address")
            return false
        }
    } , [formData.Email])
    // const checkEmail = useMemo(()=>{ 
    //     return validateEmail(formData.Email)
    // } , [])


    
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };


    const handleSubmit =async (event) => {
        event.preventDefault();
        if (formData.Email && formData.Password && formData.ConfirmPassword && warning === "") {
            const res = await api.postREQUEST("addCompany" , JSON.stringify(formData))
            if (res.success === false) {
                toast.error(res.messge)
            }
            else{
                toast.success("Registration Successfully")
                setFormData({
                    Email: "",
                    Password: "",
                    ConfirmPassword: ""
                });

            }
        }
        else{
            
        }
    };
 
    return (
        <div className="flex justify-center items-center h-screen bg-[#faebd752]">
            <form onSubmit={handleSubmit} className="w-[30%] flex flex-wrap py-[30px] px-8 min-h-[300px] gap-[10px] bg-white rounded-[5px] shadow-[0_0_10px_white] max-[992px]:w-[60%] max-[768px]:w-[95%] max-[768px]:p-5 max-[768px]:h-auto max-[768px]:overflow-auto">
                <div className="text-[xx-large] text-black font-semibold w-full">Sign Up</div>
                <div className="text-justify text-[clamp(15px,1vh,100px)] leading-[1.3] text-[#14355ec1] mt-[5px] w-full">Partnering with Our Job Portal Connects You with Endless Opportunities, Elevating Your Professional Journey to New Heights!</div>
                <div className="flex-[1_0_100%] flex flex-wrap mt-[5px]">
                    <input
                        type="text"
                        className="w-full outline-none flex-grow basis-[100px] border border-[#1e4d86] bg-[#ffffff60] p-[10px] text-[#1d5396] text-[clamp(1rem,2.5vw,1rem)] rounded-[4px] font-semibold transition-all duration-100 ease-in-out focus:outline-[4px] focus:outline-solid focus:outline-[#ececec] placeholder:text-[#133b6ba1] max-md:p-[10px]"
                        placeholder="Email"
                        onChange={handleChange}
                        onKeyUp={(e) => validateEmail(e.target.value)}
                        name="Email"
                        onBlur={(e) => validateEmail(e.target.value)}
                        value={formData.Email}
                    />
                </div>
                    <span className="text-danger">{warning}</span>
                <div className="flex-[1_0_100%] flex flex-wrap mt-[5px] gap-[5px]">
                    <input
                        type="password"
                        className="w-full outline-none flex-grow basis-[100px] border border-[#1e4d86] bg-[#ffffff60] p-[10px] text-[#1d5396] text-[clamp(1rem,2.5vw,1rem)] rounded-[4px] font-semibold transition-all duration-100 ease-in-out focus:outline-[4px] focus:outline-solid focus:outline-[#ececec] placeholder:text-[#133b6ba1] max-md:p-[10px]"
                        placeholder="Password"
                        name="Password"
                        onKeyUp={()=>checkPassword()}
                        onChange={handleChange}
                        value={formData.Password}
                    />
                    <input
                        type="password"
                        className="w-full outline-none flex-grow basis-[100px] border border-[#1e4d86] bg-[#ffffff60] p-[10px] text-[#1d5396] text-[clamp(1rem,2.5vw,1rem)] rounded-[4px] font-semibold transition-all duration-100 ease-in-out focus:outline-[4px] focus:outline-solid focus:outline-[#ececec] placeholder:text-[#133b6ba1] max-md:p-[10px]"
                        placeholder="Confirm Password"
                        name="ConfirmPassword"
                        onKeyUp={()=>checkPassword()}
                        onChange={handleChange}
                        value={formData.ConfirmPassword}
                    />
                </div>
                <div className="flex-[1_0_100%] flex flex-wrap mt-[5px]">
                    <button type="submit"  
                    className={
                        warning? "bg-[#ff0000a3] p-[15px_10px] w-full rounded-[5px] outline-none outline-[1px] border-none text-lg text-white transition-all duration-200 ease-in-out cursor-no-drop":
                        "bg-[#0a8bc2] cursor-pointer p-[15px_10px] w-full rounded-[5px] outline-none outline-[1px] border-none text-lg text-white transition-all duration-200 ease-in-out hover:outline-[4px] hover:outline-solid hover:outline-[#ececec]"
                        }
                    
                    >Join Now</button>
                </div>
                <div className="flex-[1_0_100%] flex flex-wrap mt-[5px]">
                    <div className="flex-[1_0_100%] flex flex-wrap mt-[5px]">
                        <span className="text-[#252B42]">
                            Already have an account ? <b className="hover:text-[#1e4d86] cursor-pointer" onClick={() => setScreen("signin")}>Sign In</b>
                        </span>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Registration;

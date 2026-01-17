import React, { useCallback, useContext, useMemo, useState } from "react";
import Button from "../../Hoc/Button";
import css from "../../Styles/login.module.css";
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
        <div className={css.main}>
            <form onSubmit={handleSubmit} className={css.form}>
                <div className={`${css.formHeader}`}>Sign Up</div>
                <div className={`${css.formSlogan} ${css.mt}`}>Partnering with Our Job Portal Connects You with Endless Opportunities, Elevating Your Professional Journey to New Heights!</div>
                <div className={`${css.row} ${css.mt}`}>
                    <input
                        type="text"
                        className={css.formInput}
                        placeholder="Email"
                        onChange={handleChange}
                        onKeyUp={(e) => validateEmail(e.target.value)}
                        name="Email"
                        onBlur={(e) => validateEmail(e.target.value)}
                        value={formData.Email}
                    />
                </div>
                    <span className="text-danger">{warning}</span>
                <div className={`${css.row} ${css.g} ${css.mt}`}>
                    <input
                        type="password"
                        className={css.formInput}
                        placeholder="Password"
                        name="Password"
                        onKeyUp={()=>checkPassword()}
                        onChange={handleChange}
                        value={formData.Password}
                    />
                    <input
                        type="password"
                        className={css.formInput}
                        placeholder="Confirm Password"
                        name="ConfirmPassword"
                        onKeyUp={()=>checkPassword()}
                        onChange={handleChange}
                        value={formData.ConfirmPassword}
                    />
                </div>
                <div className={`${css.row} ${css.mt}`}>
                    <button type="submit"  
                    className={
                        warning?css.bottonDisabled:
                        css.botton
                        }
                    
                    >Join Now</button>
                </div>
                <div className={`${css.row} ${css.mt}`}>
                    <div className={`${css.row} ${css.mt}`}>
                        <span className={css.formFooterText}>
                            Already have an account ? <b className={css.formLink} onClick={() => setScreen("signin")}>Sign In</b>
                        </span>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Registration;

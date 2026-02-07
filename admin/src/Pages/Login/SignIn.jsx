import React, { useContext, useState } from "react";
import Button from "../../Hoc/Button";

import { RenderScreen } from "../../App";
import useAPI from "../../Hooks/useAPI";
import { toast } from "react-toastify";

const SignIn = () => {
    const [screen, setScreen] = useContext(RenderScreen);
    const api = useAPI();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (formData.email.length >= 2 && formData.password.length >= 8) {
            try {
                const response = await api.postREQUEST(
                    "Clogin",
                    JSON.stringify(formData),
                );
                if (response.token) {
                    localStorage.setItem("token", response.token);
                    localStorage.setItem("id", response.data._id);
                    toast.success("Login Successfully.");
                    setScreen("root");
                } else {
                    toast.error(response.error);
                    setFormData({
                        email: "",
                        password: "",
                    });
                }
            } catch (e) {
                toast.error(e);
                setFormData({
                    email: "",
                    password: "",
                });
            }
        } else {
            toast.warning("provide email and passowrd");
            setFormData({
                email: "",
                password: "",
            });
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-[#faebd752]">
            <form
                onSubmit={handleSubmit}
                className="w-[30%] flex flex-wrap py-[30px] px-8 min-h-[300px] gap-[10px] bg-white rounded-[5px] shadow-[0_0_10px_white] max-[992px]:w-[60%] max-[768px]:w-[95%] max-[768px]:p-5 max-[768px]:h-auto max-[768px]:overflow-auto"
            >
                <div className="text-[xx-large] text-black font-semibold w-full">
                    Sing In
                </div>
                <div className="text-justify text-[clamp(15px,1vh,100px)] leading-[1.3] text-[#14355ec1] mt-[5px] w-full">
                    Step into the realm of security, where each login is a
                    shield against digital intrusion.
                </div>
                <div className="flex-[1_0_100%] flex flex-wrap mt-[5px]">
                    <input
                        type="email"
                        className="w-full outline-none flex-grow basis-[100px] border border-[#1e4d86] bg-[#ffffff60] p-[10px] text-[#1d5396] text-[clamp(1rem,2.5vw,1rem)] rounded-[4px] font-semibold transition-all duration-100 ease-in-out focus:outline-[4px] focus:outline-solid focus:outline-[#ececec] placeholder:text-[#133b6ba1] max-md:p-[10px]"
                        placeholder="Email"
                        onChange={handleChange}
                        required
                        name="email"
                        value={formData.email}
                    />
                </div>
                <div className="flex-[1_0_100%] flex flex-wrap mt-[5px]">
                    <input
                        type="password"
                        className="w-full outline-none flex-grow basis-[100px] border border-[#1e4d86] bg-[#ffffff60] p-[10px] text-[#1d5396] text-[clamp(1rem,2.5vw,1rem)] rounded-[4px] font-semibold transition-all duration-100 ease-in-out focus:outline-[4px] focus:outline-solid focus:outline-[#ececec] placeholder:text-[#133b6ba1] max-md:p-[10px]"
                        placeholder="Password"
                        required
                        name="password"
                        onChange={handleChange}
                        value={formData.password}
                    />
                </div>
                <div className="flex-[1_0_100%] flex flex-wrap mt-[5px]">
                    <Button type="text" text={"Login"} />
                </div>
                <div className="flex-[1_0_100%] flex flex-wrap mt-[5px]">
                    <span className="text-[#252B42]">
                        Don't have an account ?{" "}
                        <b
                            className="hover:text-[#1e4d86] cursor-pointer"
                            onClick={() => setScreen("signup")}
                        >
                            Sign Up
                        </b>
                    </span>
                </div>
                <div className="flex-[1_0_100%] flex flex-wrap mt-1">
                    <span className="text-[#0a66c2] font-semibold cursor-pointer text-lg hover:text-[#1e4d86]">
                        Forgot Password ?{" "}
                    </span>
                </div>
                <span className="text-center small w-full">
                    By clicking Agree & Join, you agree to the LinkedIn{" "}
                    <span className="text-primary-emphasis ">
                        User Agreement
                    </span>{" "}
                    and{" "}
                    <span className="text-primary-emphasis ">
                        Privacy Policy.
                    </span>
                </span>
            </form>
        </div>
    );
};

export default SignIn;

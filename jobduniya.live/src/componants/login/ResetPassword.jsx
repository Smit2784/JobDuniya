import React, { useCallback, useState, useContext } from "react";
import "./ResetPassword.css";
import css from "../../Style/inputBoxs.module.css";
import useAPI from "../../Hooks/USER/useAPI";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPassword = ({ close }) => {
    const api = useAPI();
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");
    const [step, setStep] = useState(1); // 1: Email input, 2: OTP input, 3: New password input
    const [isClose, setIsClose] = useState(false);
    const [message, setMessage] = useState("");

    const handleClose = useCallback(() => {
        setIsClose(!isClose);
        close(false);
    }, [isClose]);

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        if (email.length >= 2) {
            const response = await api.postREQUEST(
                "forgot",
                JSON.stringify({ email }),
            );

            if (response.status) {
                toast.success(response.result.message);
                setStep(2);
                setMessage("");
            } else {
                toast.error(response.message || "Failed to send OTP");
            }
        } else {
            toast.warn("Please provide a valid email");
        }
    };

    const handleOtpSubmit = async (e) => {
        e.preventDefault();
        if (otp.length === 6) {
            const response = await api.postREQUEST(
                "checkOTP",
                JSON.stringify({ otp, email }),
            );

            if (!response.success) {
                setMessage("OTP is Not valid");
                toast.error("OTP is Not valid");
            } else {
                setStep(3);
                setMessage("You can change the password");
            }
        } else {
            toast.warn("Invalid OTP");
        }
    };

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        // Implement password reset logic here (server-side logic in a real app).
        // For this example, let's assume the password is successfully reset.
        const response = await api.putREQUEST(
            "changePwd",
            JSON.stringify({ email, password }),
        );

        if (response.success) {
            setMessage("Password reset successfully!");
            toast.success("Password reset successfully!");
            close(false);
        } else {
            toast.error("Failed to reset password");
        }
    };

    return (
        <div className="forgot-password-container">
            <ToastContainer />
            <div className="forgot-password-popup">
                <button className="close-button" onClick={() => handleClose()}>
                    x
                </button>
                <div className="popup-content">
                    {step === 1 && (
                        <form onSubmit={handleEmailSubmit}>
                            <label>Email:</label>
                            <input
                                type="email"
                                value={email}
                                className={`${css.input} mb-2 mt-2`}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <button type="submit" className="bgbtn btn">
                                Submit
                            </button>
                        </form>
                    )}
                    {step === 2 && (
                        <form onSubmit={handleOtpSubmit}>
                            <label>OTP:</label>
                            <input
                                type="text"
                                value={otp}
                                className={`${css.input} mb-2 mt-2`}
                                onChange={(e) => setOtp(e.target.value)}
                            />
                            <button type="submit" className="btn bgbtn">
                                Submit
                            </button>
                        </form>
                    )}
                    {step === 3 && (
                        <form onSubmit={handlePasswordReset}>
                            <label>New Password:</label>
                            <input
                                type="password"
                                className={`${css.input} mb-2 mt-2`}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button type="submit" className="btn bgbtn">
                                Reset Password
                            </button>
                        </form>
                    )}
                    {/* {message && <p className="message">{message}</p>} */}
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;

import React, { useCallback, useState } from "react";
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
    }, [isClose, close]);

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

    const inputClasses =
        "w-full p-2 mb-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors";
    const btnClasses =
        "w-full bg-[#007bff] text-white py-2 px-4 rounded-lg hover:bg-[#0056b3] transition-colors font-medium border-none cursor-pointer";

    return (
        <div className="fixed inset-0 z-[12336677] flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <ToastContainer />
            <div className="bg-white p-5 rounded-lg shadow-lg relative max-w-xl w-full mx-4">
                <button
                    className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors"
                    onClick={() => handleClose()}
                    aria-label="Close"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
                <div className="mt-4">
                    {step === 1 && (
                        <form onSubmit={handleEmailSubmit}>
                            <label className="block mb-1 text-sm font-medium text-gray-700">
                                Email:
                            </label>
                            <input
                                type="email"
                                value={email}
                                className={inputClasses}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                            />
                            <button type="submit" className={btnClasses}>
                                Submit
                            </button>
                        </form>
                    )}
                    {step === 2 && (
                        <form onSubmit={handleOtpSubmit}>
                            <label className="block mb-1 text-sm font-medium text-gray-700">
                                OTP:
                            </label>
                            <input
                                type="text"
                                value={otp}
                                className={inputClasses}
                                onChange={(e) => setOtp(e.target.value)}
                                placeholder="Enter 6-digit OTP"
                            />
                            <button type="submit" className={btnClasses}>
                                Submit
                            </button>
                        </form>
                    )}
                    {step === 3 && (
                        <form onSubmit={handlePasswordReset}>
                            <label className="block mb-1 text-sm font-medium text-gray-700">
                                New Password:
                            </label>
                            <input
                                type="password"
                                className={inputClasses}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter new password"
                            />
                            <button type="submit" className={btnClasses}>
                                Reset Password
                            </button>
                        </form>
                    )}
                    {message && (
                        <p className="mt-2 text-sm text-center font-medium text-green-600">
                            {message}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;

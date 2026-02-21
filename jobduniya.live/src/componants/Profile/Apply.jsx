import React, {
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import useUploadPdf from "../../Hooks/OTHER/UploadPdf";
import success from "../../assets/success.json";
import Lottie from "lottie-react";
import { ActiveModal } from "../..";
import useAPI from "../../Hooks/USER/useAPI";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const Apply = ({ jobs }) => {
    const upload = useUploadPdf();
    const [activeModalState, setActiveModalState] = useContext(ActiveModal);
    const [progress, setProgress] = useState("0%");
    const [data, setData] = useState([]);
    const [user, setUser] = useState([]);
    const [userEmail, setUserEmail] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [form, setFrom] = useState("form1");
    const [cv, setCv] = useState();
    const id = localStorage.getItem("appliedID");
    const userId = Cookies.get("id");
    const api = useAPI();

    useEffect(() => {
        const search = async () => {
            try {
                const items = await api.getREQUEST(`jobs?id=${id}`);
                setData(items && items[0]);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        const user = async () => {
            const data = await api.getREQUEST(`profile/${Cookies.get("id")}`);
            if (data[0]) {
                setUser(data[0]);
                // Pre-fill email/phone if available
                if (data[0].email) setUserEmail(data[0].email);
                if (data[0].phone) setPhoneNumber(data[0].phone);
            }
        };
        search();
        user();
    }, []);

    const handleInput1 = useCallback(
        (e) => {
            const email = e.target.value;
            if (email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
                setUserEmail(email);
                setErrorMsg("");
            } else {
                setUserEmail("");
                // setErrorMsg("Invalid email format");
            }
        },
        [userEmail],
    );

    const handleInput2 = useCallback(
        (e) => {
            const phone = e.target.value;
            if (phone.match(/^[0-9]{10}$/)) {
                setPhoneNumber(phone);
            } else {
                setPhoneNumber("");
            }
        },
        [phoneNumber],
    );

    const handleChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type === "application/pdf") {
            setSelectedFile(file);
        } else {
            setSelectedFile(null);
            toast.error("Please select a PDF file only!");
        }
    };

    useEffect(() => {
        setCv(upload.url);
    }, [upload.url]);

    const handleNext1 = () => {
        setProgress("50%");
        setFrom("form2");
        localStorage.setItem("Email", userEmail);
        localStorage.setItem("phoneNumber", phoneNumber);
    };

    const handleNext2 = async () => {
        const yes = window.confirm(
            "Are you sure you want to submit the application form?",
        );
        if (yes) {
            const cId = data?.company?._id;
            const jobId = data._id;
            const email = localStorage.getItem("Email");
            const phoneNumber = localStorage.getItem("phoneNumber");
            console.log(cId, jobId, email, phoneNumber, cv);
            const RESPONSE = await api.postREQUEST(
                "Apply",
                JSON.stringify({ userId, email, phoneNumber, cv, cId, jobId }),
            );
            setProgress("100%");
            setFrom("form3");
            toast.success("Application submitted successfully");
        } else {
            setActiveModalState("");
            localStorage.clear();
        }
    };

    let isTrue = useMemo(() => {
        if (userEmail && phoneNumber) {
            return false;
        } else {
            return true;
        }
    }, [userEmail, phoneNumber]);

    return (
        <div className="fixed inset-0 top-0 left-0 w-full h-full bg-slate-900/60 backdrop-blur-sm z-100000 flex justify-center items-center animate-[fadeIn_0.3s_ease-out]">
            <div className="w-full max-w-[600px] bg-white rounded-3xl p-8 shadow-2xl border border-slate-200/80 relative max-h-[90vh] overflow-y-auto animate-[slideUp_0.4s_cubic-bezier(0.16,1,0.3,1)]">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-slate-800 m-0">
                        Apply to {data.company?.Name}
                    </h3>
                    <div
                        className="w-9 h-9 rounded-full border border-slate-200 bg-slate-50 text-slate-500 flex items-center justify-center cursor-pointer transition-all hover:bg-red-50 hover:text-red-500 hover:border-red-100 hover:rotate-90"
                        onClick={() => setActiveModalState("")}
                    >
                        <i className="fa fa-times"></i>
                    </div>
                </div>

                <div className="h-1.5 bg-slate-100 rounded-full mb-8 overflow-hidden">
                    <div
                        className="h-full bg-linear-to-r from-blue-600 to-blue-500 rounded-full transition-all duration-400 ease-in-out"
                        style={{ width: progress === "0%" ? "10%" : progress }}
                    ></div>
                </div>

                {form === "form1" && (
                    <div className="animate__animated animate__fadeIn">
                        <span className="text-lg font-semibold text-slate-700 mb-5 block">
                            Contact Info
                        </span>

                        <div className="flex items-center gap-5 p-4 bg-slate-50 rounded-2xl mb-6 border border-slate-200">
                            <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-white shadow-sm">
                                <img
                                    className="w-full h-full object-cover"
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIBYfT1otzlFrFgIErgyxOyBbO37OM5JsaUA&usqp=CAU"
                                    alt="Profile"
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="font-bold text-slate-900 text-lg">
                                    {user.firstName} {user.lastName}
                                </span>
                                <span className="text-sm text-slate-500">
                                    Student at{" "}
                                    {user.education &&
                                        user.education[0]?.univercity}
                                </span>
                                <span className="text-xs text-slate-400 flex items-center gap-1">
                                    <i className="fa fa-map-marker-alt"></i>
                                    {user.location &&
                                        user.location[0]?.city},{" "}
                                    {user.location && user.location[0]?.state}
                                </span>
                            </div>
                        </div>

                        <div className="mb-5">
                            <label className="block mb-2 font-medium text-slate-600 text-sm">
                                Email address
                            </label>
                            <input
                                type="email"
                                placeholder="name@example.com"
                                className={`w-full p-3 rounded-xl border-2 border-slate-200 text-base transition-all text-slate-800 outline-none bg-white focus:border-blue-500 focus:shadow-[0_0_0_4px_rgba(59,130,246,0.1)] placeholder:text-slate-300 ${!userEmail && errorMsg ? "border-red-500 focus:shadow-[0_0_0_4px_rgba(239,68,68,0.1)]" : ""}`}
                                onChange={handleInput1}
                                defaultValue={user.email}
                            />
                            {errorMsg && (
                                <span className="text-red-500 text-xs mt-1.5 block">
                                    {errorMsg}
                                </span>
                            )}
                        </div>

                        <div className="mb-5">
                            <label className="block mb-2 font-medium text-slate-600 text-sm">
                                Phone number
                            </label>
                            <input
                                type="text"
                                maxLength={10}
                                inputMode="numeric"
                                placeholder="10-digit mobile number"
                                className="w-full p-3 rounded-xl border-2 border-slate-200 text-base transition-all text-slate-800 outline-none bg-white focus:border-blue-500 focus:shadow-[0_0_0_4px_rgba(59,130,246,0.1)] placeholder:text-slate-300"
                                onChange={handleInput2}
                                defaultValue={user.phone}
                            />
                        </div>

                        <div className="flex justify-end mt-8 pt-6 border-t border-dashed border-slate-200">
                            <button
                                className={`px-8 py-3 rounded-xl font-semibold text-base cursor-pointer border-none transition-all ${isTrue ? "bg-slate-200 text-slate-400 cursor-not-allowed transform-none shadow-none" : "bg-linear-to-br from-blue-600 to-blue-700 text-white shadow-md hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0"}`}
                                onClick={handleNext1}
                                disabled={isTrue}
                            >
                                Next Step
                            </button>
                        </div>
                    </div>
                )}

                {form === "form2" && (
                    <div className="animate__animated animate__fadeIn">
                        <span className="text-lg font-semibold text-slate-700 mb-5 block">
                            Resume / CV
                        </span>

                        <div className="mb-5">
                            <div className="relative border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center transition-all cursor-pointer bg-slate-50 hover:border-blue-500 hover:bg-blue-50">
                                <i
                                    className="fa fa-cloud-upload-alt fa-3x"
                                    style={{
                                        color: "#94a3b8",
                                        marginBottom: "16px",
                                    }}
                                ></i>
                                <p
                                    style={{
                                        fontWeight: "500",
                                        color: "#475569",
                                    }}
                                >
                                    Click or drag to upload your resume (PDF)
                                </p>
                                <input
                                    type="file"
                                    accept="application/pdf"
                                    className="absolute w-full h-full top-0 left-0 opacity-0 cursor-pointer"
                                    onChange={handleChange}
                                />
                                {selectedFile && (
                                    <div
                                        style={{
                                            marginTop: "16px",
                                            color: "#2563eb",
                                            fontWeight: "600",
                                        }}
                                    >
                                        <i
                                            className="fa fa-file-pdf"
                                            style={{ marginRight: "8px" }}
                                        ></i>
                                        {selectedFile.name}
                                    </div>
                                )}
                            </div>

                            {upload.uploadProgress > 0 &&
                                upload.uploadProgress < 100 && (
                                    <div style={{ marginTop: "16px" }}>
                                        <div
                                            className="h-1.5 bg-slate-100 rounded-full mb-8 overflow-hidden"
                                            style={{ marginBottom: "8px" }}
                                        >
                                            <div
                                                className="h-full bg-linear-to-r from-blue-600 to-blue-500 rounded-full transition-all duration-400 ease-in-out"
                                                style={{
                                                    width: `${upload.uploadProgress}%`,
                                                }}
                                            ></div>
                                        </div>
                                        <span
                                            style={{
                                                fontSize: "0.85rem",
                                                color: "#64748b",
                                            }}
                                        >
                                            Uploading... {upload.uploadProgress}
                                            %
                                        </span>
                                    </div>
                                )}
                        </div>

                        <div className="flex justify-end mt-8 pt-6 border-t border-dashed border-slate-200">
                            {!cv ? (
                                <button
                                    className={`px-8 py-3 rounded-xl font-semibold text-base cursor-pointer border-none transition-all ${!selectedFile ? "bg-slate-200 text-slate-400 cursor-not-allowed transform-none shadow-none" : "bg-linear-to-br from-blue-600 to-blue-700 text-white shadow-md hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0"}`}
                                    onClick={() =>
                                        upload.handleUpload(selectedFile)
                                    }
                                    disabled={!selectedFile}
                                >
                                    Upload & Continue
                                </button>
                            ) : (
                                <button
                                    className="px-8 py-3 rounded-xl font-semibold text-base cursor-pointer border-none transition-all bg-linear-to-br from-blue-600 to-blue-700 text-white shadow-md hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0"
                                    onClick={handleNext2}
                                >
                                    Submit Application
                                </button>
                            )}
                        </div>
                    </div>
                )}

                {form === "form3" && (
                    <div
                        className="animate__animated animate__fadeIn"
                        style={{ textAlign: "center", padding: "40px 0" }}
                    >
                        <div style={{ width: "150px", margin: "0 auto" }}>
                            <Lottie animationData={success} loop={false} />
                        </div>
                        <h4 style={{ color: "#0f172a", margin: "20px 0 10px" }}>
                            Application Submitted!
                        </h4>
                        <p style={{ color: "#64748b" }}>
                            Good luck! The company will review your application
                            soon.
                        </p>

                        <div
                            className="flex justify-end mt-8 pt-6 border-t border-dashed border-slate-200"
                            style={{
                                justifyContent: "center",
                                borderTop: "none",
                            }}
                        >
                            <button
                                className="px-8 py-3 rounded-xl font-semibold text-base cursor-pointer border-none transition-all bg-linear-to-br from-blue-600 to-blue-700 text-white shadow-md hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0"
                                onClick={() => setActiveModalState("")}
                            >
                                Return to Jobs
                            </button>
                        </div>
                    </div>
                )}

                {form !== "form3" && (
                    <div className="text-xs text-slate-400 mt-6 text-center leading-relaxed">
                        Submitting this application won’t change your JobDuniya
                        profile.
                        <br />
                        Application powered by JobDuniya
                    </div>
                )}
            </div>
        </div>
    );
};

export default Apply;

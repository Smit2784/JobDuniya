import React, {
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import useUploadPdf from "../../Hooks/OTHER/UploadPdf";
import styles from "./Style/apply.module.css";
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
        <div className={styles.modalOverlay}>
            <div className={styles.cardContainer}>
                <div className={styles.header}>
                    <h3 className={styles.title}>
                        Apply to {data.company?.Name}
                    </h3>
                    <div
                        className={styles.closeBtn}
                        onClick={() => setActiveModalState("")}
                    >
                        <i className="fa fa-times"></i>
                    </div>
                </div>

                <div className={styles.progressContainer}>
                    <div
                        className={styles.progressBar}
                        style={{ width: progress === "0%" ? "10%" : progress }}
                    ></div>
                </div>

                {form === "form1" && (
                    <div className="animate__animated animate__fadeIn">
                        <span className={styles.sectionTitle}>
                            Contact Info
                        </span>

                        <div className={styles.profileSection}>
                            <div className={styles.imageWrapper}>
                                <img
                                    className={styles.appImage}
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIBYfT1otzlFrFgIErgyxOyBbO37OM5JsaUA&usqp=CAU"
                                    alt="Profile"
                                />
                            </div>
                            <div className={styles.userInfo}>
                                <span className={styles.userName}>
                                    {user.firstName} {user.lastName}
                                </span>
                                <span className={styles.userRole}>
                                    Student at{" "}
                                    {user.education &&
                                        user.education[0]?.univercity}
                                </span>
                                <span className={styles.userLocation}>
                                    <i className="fa fa-map-marker-alt"></i>
                                    {user.location &&
                                        user.location[0]?.city},{" "}
                                    {user.location && user.location[0]?.state}
                                </span>
                            </div>
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>
                                Email address
                            </label>
                            <input
                                type="email"
                                placeholder="name@example.com"
                                className={`${styles.input} ${!userEmail && errorMsg ? styles.inputError : ""}`}
                                onChange={handleInput1}
                                defaultValue={user.email}
                            />
                            {errorMsg && (
                                <span className={styles.errorText}>
                                    {errorMsg}
                                </span>
                            )}
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Phone number</label>
                            <input
                                type="text"
                                maxLength={10}
                                inputMode="numeric"
                                placeholder="10-digit mobile number"
                                className={styles.input}
                                onChange={handleInput2}
                                defaultValue={user.phone}
                            />
                        </div>

                        <div className={styles.footer}>
                            <button
                                className={`${styles.btn} ${isTrue ? styles.disabledBtn : styles.primaryBtn}`}
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
                        <span className={styles.sectionTitle}>Resume / CV</span>

                        <div className={styles.formGroup}>
                            <div className={styles.fileInputWrapper}>
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
                                    className={styles.fileInput}
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
                                            className={styles.progressContainer}
                                            style={{ marginBottom: "8px" }}
                                        >
                                            <div
                                                className={styles.progressBar}
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

                        <div className={styles.footer}>
                            {!cv ? (
                                <button
                                    className={`${styles.btn} ${!selectedFile ? styles.disabledBtn : styles.primaryBtn}`}
                                    onClick={() =>
                                        upload.handleUpload(selectedFile)
                                    }
                                    disabled={!selectedFile}
                                >
                                    Upload & Continue
                                </button>
                            ) : (
                                <button
                                    className={`${styles.btn} ${styles.primaryBtn}`}
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
                            className={styles.footer}
                            style={{
                                justifyContent: "center",
                                borderTop: "none",
                            }}
                        >
                            <button
                                className={`${styles.btn} ${styles.primaryBtn}`}
                                onClick={() => setActiveModalState("")}
                            >
                                Return to Jobs
                            </button>
                        </div>
                    </div>
                )}

                {form !== "form3" && (
                    <div className={styles.disclaimer}>
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

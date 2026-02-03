import React, { useState } from "react";
// import firebase from 'firebase/compat/app'
// import "firebase/compat/storage"
import axios from "axios";

const useUploadPdf = () => {
    const [uploadProgress, setUploadProgress] = useState(0);
    const [url, setUrl] = useState("");

    const handleUpload = async (selectedFile) => {
        if (!selectedFile) return;

        if (selectedFile.type !== "application/pdf") {
            alert("Only PDF files allowed");
            return;
        }

        const formData = new FormData();
        formData.append("file", selectedFile);

        try {
            const res = await axios.post(
                `${process.env.REACT_APP_LOCAL_URL}resume`,
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                    onUploadProgress: (progressEvent) => {
                        const percent = Math.round(
                            (progressEvent.loaded * 100) / progressEvent.total,
                        );
                        setUploadProgress(percent);
                    },
                },
            );
            console.log("Resume uploaded successfully", res.data.url);

            setUrl(res.data.url);
            setUploadProgress(0);
        } catch (err) {
            console.error("Resume upload failed", err);
        }
    };

    return { handleUpload, uploadProgress, url };
};

export default useUploadPdf;

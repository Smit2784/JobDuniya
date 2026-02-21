import Lottie from "lottie-react";
import { React, CSSProperties } from "react";
import animatLogo from "./assets/Animation - 1708684599176.json";
import { HashLoader } from "react-spinners";
import gif from "./assets/jobduniya (1).gif";

const Spinner = () => {
    return (
        <>
            <div className="w-full h-screen flex items-center justify-center">
                <div
                    className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
                    role="status"
                ></div>
            </div>
        </>
    );
};

export default Spinner;

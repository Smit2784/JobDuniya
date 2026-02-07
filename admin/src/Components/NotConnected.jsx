import React from "react";

import Lottie from "lottie-react";
import json from "../assets/noconnection.json";
const NotConnected = () => {
    return (
        <div className="w-full h-screen flex justify-center items-center">
            <div>
                <Lottie animationData={json} />
            </div>
        </div>
    );
};

export default NotConnected;

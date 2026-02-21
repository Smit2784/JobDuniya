import React from "react";
import Lottie from "lottie-react";
import server from "./server.json";
const serverERROR = () => {
    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-[600px] max-w-[560px] mx-auto">
                <Lottie
                    animationData={server}
                    style={{ width: 100, height: 100 }}
                ></Lottie>
            </div>
        </>
    );
};

export default serverERROR;

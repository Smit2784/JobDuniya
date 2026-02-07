import React from "react";

const Loader = () => {
    return (
        <>
            <div className="w-full h-screen grid place-items-center absolute z-[10000000000] top-0 left-0 bg-white backdrop-blur-[20px]">
                <div className="loader">
                    <div className="circle"></div>
                    <div className="circle"></div>
                    <div className="circle"></div>
                    <div className="circle"></div>
                </div>
            </div>
        </>
    );
};

export default Loader;

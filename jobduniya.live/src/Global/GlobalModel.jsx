import React from "react";

const GlobalModel = ({ modelName }) => {
    function preventScroll(event) {
        event.stopPropagation();
        event.preventDefault();
    }

    return (
        <div
            className="fixed inset-0 z-100000000 flex items-center justify-center overflow-hidden bg-black/80 backdrop-blur-[2px] w-full h-screen"
            onScroll={preventScroll}
        >
            {modelName}
        </div>
    );
};

export default GlobalModel;

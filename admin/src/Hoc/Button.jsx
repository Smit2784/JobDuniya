import React from "react";
const Button = ({ onClick, text, type, style }) => {
    return (
        <button
            className="w-full p-[15px_10px] bg-[#385170] text-white rounded-[5px] text-lg cursor-pointer outline-none transition-all duration-200 ease-in-out hover:outline-[4px] hover:outline-solid hover:outline-[#ececec]"
            onClick={onClick}
        >
            {text}
        </button>
    );
};

export default Button;

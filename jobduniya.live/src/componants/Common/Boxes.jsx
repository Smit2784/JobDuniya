import React, { useState } from "react";
import "animate.css";

const Saved = ({ array, setArray }) => {
    const perfromDelete = (index) => {
        const newArray = array.filter((e, i) => {
            return i !== index;
        });
        setArray(newArray);
    };
    return (
        <div className="flex flex-wrap gap-2 mt-2">
            {array?.map((e, i) => {
                return (
                    <div
                        key={i}
                        className="flex items-center gap-2 px-3 py-1 bg-blue-50 text-[#23A6F0] border border-blue-100 rounded-full text-sm font-medium animate__animated animate__fadeIn"
                    >
                        {e}
                        <i
                            className="ri-close-line cursor-pointer hover:text-red-500 transition-colors"
                            onClick={() => perfromDelete(i)}
                        ></i>
                    </div>
                );
            })}
        </div>
    );
};

export default Saved;

import React, { CSSProperties, MouseEventHandler, ReactElement } from "react";

const Modal = ({
    body,
    onClose,
    closeBtn = true,
    backgroundstyle,
    modalstyle,
    animate,
}) => {
    return (
        <div
            className={`w-full max-h-screen flex justify-center top-0 left-0 fixed overflow-hidden z-[11100] items-center bg-black/80 animate__animated ${animate}`}
            style={backgroundstyle}
        >
            <div
                className={`relative w-full flex justify-center items-center h-screen min-w-[20px] min-h-[20px] border border-gray-200 rounded animate-[modalanimate_300ms_linear] z-[100] max-[680px]:m-[70px_20px]`}
                style={modalstyle}
            >
                {closeBtn && (
                    <button
                        className="absolute right-[5px] top-[5px] p-[6px] border-none cursor-pointer bg-transparent hover:text-black"
                        onClick={onClose}
                    >
                        <i className="ri-close-line ri-xl"></i>
                    </button>
                )}
                <>{body}</>
            </div>
        </div>
    );
};

export default Modal;

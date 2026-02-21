import React, { CSSProperties, MouseEventHandler, ReactElement } from "react";

const Modal = ({
    body,
    onClose,
    closeBtn = true,
    backgroundstyle,
    modalstyle,
    animate,
}) => {
    console.log(body);
    return (
        <div
            className={`fixed inset-0 z-999999999 flex items-center justify-center overflow-hidden bg-black/80 animate__animated ${animate}`}
            style={backgroundstyle}
        >
            <div
                className={`relative w-full h-screen min-w-[20px] min-h-[20px] flex items-center justify-center bg-white border border-slate-200 rounded z-1000000000 animate-[modalanimate_300ms_linear]`}
                style={modalstyle}
            >
                {closeBtn && (
                    <button
                        className="absolute top-[5px] right-[5px] p-[6px] border-none bg-transparent cursor-pointer hover:text-slate-800"
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

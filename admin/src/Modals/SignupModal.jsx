import React from "react";
import Modal from "../render-model/Modal";
const Body = () => {
    return (
        <>
            <div className="rounded-[5px] font-serif w-1/2 max-h-[500px] overflow-auto bg-[#f5f5f5] max-[800px]:w-[95%]"></div>
        </>
    );
};

const SignupModal = () => {
    return <Modal body={<Body />} />;
};

export default SignupModal;

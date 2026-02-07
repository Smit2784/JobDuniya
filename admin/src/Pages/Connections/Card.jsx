import React from "react";
import Button from "../../Hoc/Button";
const Card = () => {
    return (
        <>
            <div className="shadow-[0_4px_8px_0_rgba(0,0,0,0.2)] m-auto text-center flex-[0_0_30vh] font-sans">
                <img
                    src="https://cirrusindia.co.in/wp-content/uploads/2016/10/dummy-profile-pic-male1.jpg"
                    alt="John"
                    style={{ width: "100%" }}
                />
                <h1>John Doe</h1>
                <p className="text-gray-500 text-lg">CEO & Founder, Example</p>
                <p>Harvard University</p>
                <p>
                    <Button
                        className="border-none outline-none inline-block p-2 text-white bg-black text-center cursor-pointer w-full text-lg hover:opacity-70"
                        text={"view profile"}
                    ></Button>
                </p>
            </div>
        </>
    );
};

export default Card;

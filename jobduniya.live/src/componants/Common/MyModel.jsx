import Cookies from "js-cookie";
import React from "react";
import img from "../../Images/pngwing.com.png";

const MyModel = ({ setModell }) => {
    const performLogOut = () => {
        Cookies.remove("token");
        setModell(false);
        window.location.replace("/login");
    };

    return (
        <div className="fixed w-full h-full bg-[#4242476c] backdrop-blur-[5px] flex justify-center items-center flex-col p-[10px] z-50">
            <div className="w-[50vh] h-[50vh] bg-azure flex gap-2 justify-center items-center rounded-lg flex-col shadow-xl p-8 max-sm:w-[40vh] ">
                <div className="w-25 imgcontainer">
                    <img src={img} className="img-fluid" alt="" />
                </div>
                <h1 className="text-[#720000] text-center text-xl max-md:text-base max-md:w-60">
                    Oops! Looks like your session has expired. Kindly log in
                    again to continue.
                </h1>
                <button
                    className="btn btn-danger"
                    onClick={() => performLogOut()}
                >
                    Log In
                </button>
            </div>
        </div>
    );
};

export default MyModel;

import React from "react";
import logo from "../../Images/black.png";

const NavbarBeforeLogin = ({ leftSection }) => {
    return (
        <>
            <div className="w-full h-[10vh] flex justify-between items-center">
                <div className="logo">
                    <img
                        src={logo}
                        alt=""
                        className="pl-0 md:pl-[50px] w-[20vh] md:w-[35vh] transition-all duration-200"
                    />
                </div>
                {/* <div className='login--slogan'>{leftSection}</div> */}
            </div>
        </>
    );
};

export default NavbarBeforeLogin;

import React from "react";

const Navbar = ({ left, right, center }) => {
    return (
        <div className="fixed top-0 right-0 z-[999] flex justify-between items-center h-[70px] bg-white shadow-[0_2px_10px_rgba(0,0,0,0.04)] border-b border-[#edf2f7] transition-all duration-300 px-8 left-[280px] w-[calc(100%-280px)] max-[900px]:left-[80px] max-[900px]:w-[calc(100%-80px)] max-[900px]:px-6 max-[600px]:left-0 max-[600px]:w-full max-[600px]:px-4">
            <div className="font-['Inter',_sans-serif] font-semibold text-[1.1rem] text-[#1e293b] max-[900px]:text-base max-[600px]:text-[0.95rem]">
                {left}
            </div>
        </div>
    );
};

export default Navbar;

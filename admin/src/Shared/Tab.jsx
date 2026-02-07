import React from "react";

const Tab = ({ tabName, action }) => {
    return (
        <div className="w-full bg-white rounded-xl py-4 px-6 flex justify-between items-center shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-[#edf2f7] mt-[90px] transition-all duration-200 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] max-[768px]:p-[0.875rem_1rem] max-[768px]:mt-[85px] max-[600px]:flex-col max-[600px]:gap-4 max-[600px]:items-start">
            <div className="text-[1.25rem] font-bold text-[#23a6f0] flex items-center gap-2 font-['Inter',_sans-serif] max-[768px]:text-[1.1rem] max-[600px]:text-base">
                <i className="fa-solid fa-layer-group text-[1.1rem]"></i> /{" "}
                {tabName}
            </div>
            <div className="flex items-center gap-2 py-[0.6rem] px-[1.2rem] bg-[#e0f2fe] text-[#0284c7] rounded-lg font-semibold text-[0.95rem] cursor-pointer transition-all duration-200 border border-transparent font-['Inter',_sans-serif] hover:bg-[#0284c7] hover:text-white hover:-translate-y-px hover:shadow-[0_4px_8px_rgba(2,132,199,0.2)] max-[768px]:py-2 max-[768px]:px-4 max-[768px]:text-[0.9rem] max-[600px]:w-full max-[600px]:justify-center">
                {action}
            </div>
        </div>
    );
};

export default Tab;

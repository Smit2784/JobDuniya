import React, { useContext } from "react";
import Tab from "../../Shared/Tab";

import Navbar from "../../Shared/Navbar";
import Body from "./Body";
import { ActiveModal } from "../../main";
import Button from "../../Hoc/Button";
import { GlobalState } from "../../main";
import Refresh from "../../Shared/Refresh";
const Jobs = () => {
    const [activeModalState, setActiveModalState] = useContext(ActiveModal);
    const [currentState, setCurrentState] = useContext(GlobalState);
 
    return (
        <div className="flex flex-col min-h-screen bg-[#f8fafc] w-[calc(100%-280px)] ml-[280px] transition-[margin,width] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] box-border max-[991px]:ml-0 max-[991px]:w-full">
            <Navbar left={`Hello 👋 ${currentState.HRDetail.Name}!`} />
            <div className="flex justify-between items-center bg-white py-4 px-8 rounded-2xl mx-6 mb-6 shadow-[0_1px_3px_rgba(0,0,0,0.05),0_1px_2px_rgba(0,0,0,0.1)] border border-[#f1f5f9] max-md:mx-4 max-md:mb-5 max-md:px-5 max-md:flex-col max-md:gap-4 max-md:items-start">
                <Tab
                    tabName={"Jobs"}
                    action={
                        <div className="d-flex gap-2 flex-wrap">
                            <button
                                className="bg-[#0f172a] text-white border-none py-3 px-6 rounded-xl font-semibold text-[0.95rem] flex items-center gap-[10px] transition-all duration-200 ease-in-out shadow-[0_4px_6px_-1px_rgba(15,23,42,0.1),0_2px_4px_-1px_rgba(15,23,42,0.06)] tracking-[0.025em] hover:-translate-y-[1px] hover:bg-[#1e293b] hover:shadow-[0_10px_15px_-3px_rgba(15,23,42,0.15),0_4px_6px_-2px_rgba(15,23,42,0.1)]"
                                onClick={() => {
                                    setActiveModalState("postajob");
                                }}
                            >
                                <i className="fa fa-plus text-[0.9em]"></i> Post a Job
                            </button>
                        </div>
                    }
                />
            </div>
            <div className="mx-6 mb-6 flex-1 max-md:mx-4">
                <Body />
            </div>
        </div>
    );
};

export default Jobs;

import React, { useContext } from "react";

import Counts from "./Counts";
import Tab from "../../Shared/Tab";
import Navbar from "../../Shared/Navbar";
import Applications from "../Applications/Applications";
import { GlobalState } from "../../main";
import Refresh from "../../Shared/Refresh";

const Dashboard = () => {
    const [currentState] = useContext(GlobalState);
    return (
        <div className="ml-[280px] w-[calc(100%-280px)] bg-[#f8f9fa] min-h-screen flex flex-col items-center transition-all duration-300 max-[900px]:ml-[80px] max-[900px]:w-[calc(100%-80px)]">
            <Navbar
                left={`Hello 👋 ${currentState?.HRDetail?.Name || "User"}!`}
            />
            <Tab tabName={"Dashboard"} action={<Refresh />} />
            <Counts />
            <Applications />
        </div>
    );
};

export default Dashboard;

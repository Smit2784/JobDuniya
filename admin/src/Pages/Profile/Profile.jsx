import React, { useState } from "react";
import Tab from "../../Shared/Tab";
import ProfileView, { Body } from "../../Modals/ProfileView";

import Navbar from "../../Shared/Navbar";
import { useContext } from "react";
import { ActiveModal } from "../../main";
import { GlobalState } from "../../main";

const Profile = () => {
    const [activeModalState, setActiveModalState] = useContext(ActiveModal);
    const [currentState, setCurrentState] = useContext(GlobalState);
    const [value, setValue] = useState([]);

    if (!currentState) {
        return (
            <div className="ml-[280px] w-[calc(100%-280px)] min-h-screen bg-slate-50 flex flex-col items-center justify-center max-[900px]:ml-[80px] max-[900px]:w-[calc(100%-80px)] font-sans">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
                    <p className="font-medium text-slate-500 animate-pulse">
                        Loading Profile...
                    </p>
                </div>
            </div>
        );
    }

    const companySchemaKeys = [
        "Name",
        "Industry",
        "Email",
        "Logo",
        "TagLine",
        "Websites",
        "establishedYear",
        "Description",
    ];
    const filteredData1 = currentState
        ? Object.entries(currentState).filter(([key, _]) =>
              companySchemaKeys.includes(key),
          )
        : [];

    const schemaKeysAddress = ["state", "city", "pinCode", "personalAddress"];

    const filteredData2 = currentState?.Address?.[0]
        ? Object.entries(currentState.Address[0]).filter(([key, _]) =>
              schemaKeysAddress.includes(key),
          )
        : [];

    const schemaKeys = ["Name", "EmailID"];
    const filteredData3 = currentState?.HRDetail
        ? Object.entries(currentState.HRDetail).filter(([key, _]) =>
              schemaKeys.includes(key),
          )
        : [];

    const filteredData4 = currentState?.OwnerDetail
        ? Object.entries(currentState.OwnerDetail).filter(([key, _]) =>
              schemaKeys.includes(key),
          )
        : [];

    var x = " / ";

    return (
        <div className="ml-[280px] w-[calc(100%-280px)] min-h-screen bg-slate-50 flex flex-col items-center pb-12 transition-all duration-300 ease max-[900px]:ml-[80px] max-[900px]:w-[calc(100%-80px)] max-[600px]:ml-0 max-[600px]:w-full max-[600px]:px-2 relative overflow-x-hidden">
            {/* Background Decoration */}
            <div className="absolute inset-0 opacity-40 pointer-events-none bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px]"></div>

            <Navbar left={`Hello 👋 ${currentState.HRDetail.Name}!`} />

            <div className="w-[95%] max-w-[1200px] mt-8 max-[600px]:w-full max-[600px]:mt-4 flex flex-col gap-6 relative z-10">
                <Tab
                    tabName={`Profile${value.length !== 0 ? x.concat(value[value?.length - 1]) : ""}`}
                    action={
                        <button
                            onClick={() => setActiveModalState("editprofile")}
                            className="bg-white hover:bg-slate-50 text-indigo-600 border border-indigo-100 hover:border-indigo-200 px-5 py-2.5 rounded-lg flex items-center gap-2 transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer font-medium text-sm group"
                        >
                            <span className="w-6 h-6 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-100 transition-colors">
                                <i className="fa-solid fa-pen text-xs"></i>
                            </span>
                            <span>Edit Profile</span>
                        </button>
                    }
                />
                <div className="w-full bg-transparent mt-0">
                    <Body
                        setValue={setValue}
                        hidden={true}
                        filteredData={[
                            filteredData1,
                            filteredData2,
                            filteredData3,
                            filteredData4,
                        ]}
                    />
                </div>
            </div>
        </div>
    );
};

export default Profile;

import React, { useState } from "react";
import Tab from "../../Shared/Tab";
import ProfileView, { Body } from "../../Modals/ProfileView";
import css from "./profile.module.css";
import Navbar from "../../Shared/Navbar";
import { useContext } from "react";
import { ActiveModal } from "../../main";
import { GlobalState } from "../../main";

const Profile = () => {
    const [activeModalState, setActiveModalState] = useContext(ActiveModal);
    const [currentState, setCurrentState] = useContext(GlobalState);
    const [value, setValue] = useState([]);

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
    const filteredData1 = Object.entries(currentState).filter(([key, _]) =>
        companySchemaKeys.includes(key),
    );

    const schemaKeysAddress = ["state", "city", "pinCode", "personalAddress"];

    const filteredData2 = Object.entries(currentState.Address[0]).filter(
        ([key, _]) => schemaKeysAddress.includes(key),
    );

    const schemaKeys = ["Name", "EmailID"];
    const filteredData3 = Object.entries(currentState.HRDetail).filter(
        ([key, _]) => schemaKeys.includes(key),
    );

    const filteredData4 = Object.entries(currentState.OwnerDetail).filter(
        ([key, _]) => schemaKeys.includes(key),
    );

    var x = " / ";

    return (
        <div className={css.profileContainer}>
            <Navbar left={`Hello 👋 ${currentState.HRDetail.Name}!`} />
            <div className={css.profileContent}>
                <Tab
                    tabName={`Profile${value.length !== 0 ? x.concat(value[value?.length - 1]) : ""}`}
                    action={
                        <span
                            onClick={() => setActiveModalState("editprofile")}
                        >
                            <i className="fa-solid fa-user-pen"></i> Edit
                        </span>
                    }
                />
                <div className={css.profileBody}>
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

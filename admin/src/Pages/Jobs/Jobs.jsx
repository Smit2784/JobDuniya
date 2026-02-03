import React, { useContext } from "react";
import Tab from "../../Shared/Tab";
import css from "./jobs.module.css";
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
        <div className={css.container}>
            <Navbar left={`Hello 👋 ${currentState.HRDetail.Name}!`} />
            <div className={css.actionBar}>
                <Tab
                    tabName={"Jobs"}
                    action={
                        <div className="d-flex gap-2 flex-wrap">
                            <button
                                className={css.postJobBtn}
                                onClick={() => {
                                    setActiveModalState("postajob");
                                }}
                            >
                                <i className="fa fa-plus"></i> Post a Job
                            </button>
                        </div>
                    }
                />
            </div>
            <div className={css.bodyWrapper}>
                <Body />
            </div>
        </div>
    );
};

export default Jobs;

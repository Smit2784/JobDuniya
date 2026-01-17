import React, { useContext } from 'react'
import css from "./style.module.css";
import Counts from './Counts';
import Tab from '../../Shared/Tab';
import Navbar from '../../Shared/Navbar';
import Applications from "../Applications/Applications"
import { GlobalState } from '../../main'
import Refresh from '../../Shared/Refresh';
const Dashboard = () => {
    const [currentState] = useContext(GlobalState)
    return (
        <>
            <div className={css.body}>
                <Navbar
                    left={`Hello 👋 ${currentState?.HRDetail?.Name}!`}
                />
                <Tab tabName={"Dashboard"}
                action={
                    <Refresh />
                }
                />
                <Counts />
                <Applications  />
            </div>
        </>
    )
}

export default Dashboard
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import Button from '../../Hoc/Button'
import css from "./style.module.css"
import Sidebar from '../../Shared/Sidebar'
import Tab from '../../Shared/Tab'
import Dashboard from './Dashboard'
import Profile from '../Profile/Profile'
import Jobs from '../Jobs/Jobs'
import Notification from '../Notification/Notification'
import Connections from '../Connections/Connections.jsx'
import useAPI from '../../Hooks/useAPI.jsx'
import { GlobalState } from '../../main'
import { ActiveModal } from '../../main.jsx'
import SignUp from '../../Modals/SignUp.jsx'


const RenderPage = createContext()
const Root = () => {
    const api = useAPI();
    const [currentState, setCurrentState] = useContext(GlobalState);
    const [activeModalState, setActiveModalState] = useContext(ActiveModal);
    const renderCompo = currentState.isProfileComplete?"dashboard" : "isnew"
    const [page, setPage] = useState()
    console.log(currentState.isProfileComplete);  

    useEffect(() => {
            if (currentState.isProfileComplete) {
                setPage("dashboard")
            }
            else {
                setPage("isnew")
            }
    }, [currentState])
    useEffect(() => {
        const fetchApi = async () => {
            const id = localStorage.getItem("id");
            const response = await api.getREQUEST(`company/${id}`)
            setCurrentState(response[0])
        }
        fetchApi()
    }, [])

    useEffect(() => {
        console.log(renderCompo);
        setPage(renderCompo)
    }, [])

    const renderScreen = useCallback(() => {

        switch (page) {
            case "dashboard":
                return <Dashboard />
                break;
            case "Connections":
                return <Connections />
                break;
            case "profile":
                return <Profile />
                break;
            case "jobs":
                return <Jobs />
                break;
            case "notifications":
                return <Notification />
                break;
            case "isnew":
                return <SignUp />
                break;
            default:
                break;
        }
    }, [page])
    return (
        <>
            <RenderPage.Provider value={[page, setPage]}>
                <div className={css.main}>
                    <Sidebar />
                    {renderScreen()}
                </div>
            </RenderPage.Provider>
        </>
    )
}

export default Root
export { RenderPage }
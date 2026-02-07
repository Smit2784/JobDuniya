import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";
import Button from "../../Hoc/Button";

import Sidebar from "../../Shared/Sidebar";
import Tab from "../../Shared/Tab";
import Dashboard from "./Dashboard";
import Profile from "../Profile/Profile";
import Jobs from "../Jobs/Jobs";
import Notification from "../Notification/Notification";
import Connections from "../Connections/Connections.jsx";
import useAPI from "../../Hooks/useAPI.jsx";
import { GlobalState } from "../../main";
import { ActiveModal } from "../../main.jsx";
import SignUp from "../../Modals/SignUp.jsx";
import Loader from "../../Shared/Loader.jsx";

const RenderPage = createContext();
const Root = () => {
    const api = useAPI();
    const [currentState, setCurrentState] = useContext(GlobalState);
    const [activeModalState, setActiveModalState] = useContext(ActiveModal);
    const [loading, setLoading] = useState(true);

    const [page, setPage] = useState("dashboard");

    useEffect(() => {
        if (!loading) {
            if (currentState && currentState.isProfileComplete) {
                setPage("dashboard");
            } else if (currentState) {
                // If currentState is loaded but profile is not complete, go to isnew
                setPage("isnew");
            }
        }
    }, [currentState, loading]);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const id = localStorage.getItem("id");
                const response = await api.getREQUEST(`company/${id}`);
                setCurrentState(response[0]);
            } catch (error) {
                console.error("Error fetching user data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchApi();
    }, []);

    const renderScreen = useCallback(() => {
        switch (page) {
            case "dashboard":
                return <Dashboard />;
                break;
            case "Connections":
                return <Connections />;
                break;
            case "profile":
                return <Profile />;
                break;
            case "jobs":
                return <Jobs />;
                break;
            case "notifications":
                return <Notification />;
                break;
            case "isnew":
                return <SignUp />;
                break;
            default:
                break;
        }
    }, [page]);

    if (loading) {
        return <Loader />;
    }

    return (
        <>
            <RenderPage.Provider value={[page, setPage]}>
                <div className="flex">
                    <Sidebar />
                    {renderScreen()}
                </div>
            </RenderPage.Provider>
        </>
    );
};

export default Root;
export { RenderPage };

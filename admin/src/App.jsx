import { useCallback, useContext, useState } from "react";
import Navbar from "./Shared/Navbar";
import { createContext } from "react";
import "./App.css";
import SignIn from "./Pages/Login/SignIn";
import logo from "./Images/2.png";
import Root from "./Pages/Dashboard/Root";
import Registration from "./Pages/Registration/Registration";
import Left from "./Components/left";
import Center from "./Components/center";
import Right from "./Components/right";
import Loader from "./Shared/Loader";
import NotConnected from "./Components/NotConnected";
import { ToastContainer, toast, Slide, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAPI from "./Hooks/useAPI";
import ServerError from "./Components/ServerError";
const RenderScreen = createContext([() => { }]);
const EnableLoader = createContext([() => { }]);
const ErrorState = createContext([() => { }]);  
const RefreshState = createContext([() => { }])


function App() {
    const admin = localStorage.getItem("token");
    const activeScreen = admin ? "root" : "signin";
    const [screen, setScreen] = useState(activeScreen);
    const [loaderState, setLoaderState] = useState(false);
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [error, setError] = useState(null);
    const [isRefreshing, setIsRefreshing] = useState(false);


    const renderScreen = useCallback(() => {
        switch (screen) {
            case "signin":
                return <SignIn />;
            case "signup":
                return <Registration />;
            case "root":
                return <Root />;
            default:
                break;
        }
    }, [screen]);
    return (
        <>
            <RefreshState.Provider value={[isRefreshing ,setIsRefreshing]}>
                    <ErrorState.Provider value={[error, setError]}>
                        <EnableLoader.Provider value={[loaderState, setLoaderState]}>
                            <RenderScreen.Provider value={[screen, setScreen]}>
                                <ToastContainer
                                    style={{ zIndex: "1000000000000000000000000" }}
                                    position="top-center"
                                    autoClose={2000}
                                    limit={1}
                                    hideProgressBar
                                    newestOnTop={false}
                                    closeOnClick
                                    rtl={false}
                                    pauseOnFocusLoss={false}
                                    draggable
                                    pauseOnHover
                                    transition={Slide}
                                />
                                {error && <ServerError />}
                                {loaderState && <Loader />}
                                {
                                    screen !== "root" &&
                                    <Navbar
                                        left={<>
                                            <img src={logo} className="img-fluid" style={{ width: "160px" }} alt="" />
                                        </>}
                                    />
                                }
                                {
                                    !isOnline
                                        ?
                                        <NotConnected />
                                        :
                                        renderScreen()
                                }
                            </RenderScreen.Provider>
                        </EnableLoader.Provider>
                    </ErrorState.Provider>
            </RefreshState.Provider>
        </>
    );
}

export default App;
export { RenderScreen, EnableLoader, ErrorState , RefreshState};

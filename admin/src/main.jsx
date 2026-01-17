import React, { useState } from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import "./index.css";
import RenderModal from "./render-model/RenderModal.jsx";
import { createContext } from 'react';
import 'react-tooltip/dist/react-tooltip.css'
// Create context
const ActiveModal = createContext([()=>{}]);
const ActiveToolTip = createContext([()=>{}]);
const GlobalState = createContext([() => { }]);

const Root = () => {
    let [activeModalState, setActiveModalState] = useState("");
    let [toolTip, setToolTip] = useState(false);
    const [currentState, setCurrentState] = useState("");
    

    return (
        <ActiveToolTip.Provider value={[toolTip , setToolTip]}>
            <GlobalState.Provider value={[currentState, setCurrentState]}>
            <ActiveModal.Provider value={[activeModalState, setActiveModalState]}>
                <React.StrictMode>
                    <RenderModal />
                    <App />
                </React.StrictMode>
            </ActiveModal.Provider>
            </GlobalState.Provider>
        </ActiveToolTip.Provider>
    );
};

ReactDOM.createRoot(document.getElementById("root")).render(
    <Root />

);

export { ActiveModal , GlobalState,ActiveToolTip };

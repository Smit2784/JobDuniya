import React, { useEffect, useState } from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Layout from "./Layout";
import MyModel from "./componants/Common/MyModel";
import Home from "./componants/Common/Home";
import Cookies from "js-cookie";
import Signup from "./componants/signup/Signup";
import Jobs from "./componants/Common/Jobs";

import NotFound from "./componants/Common/Notfound";
import Nearbyusers from "./componants/Common/nearbyusers";
import Profile from "./componants/Common/profile";
import JobsList from "./UserSide/JobsList";
import Postajob from "./componants/Common/postajob";
import SearchSection from "./componants/Common/SearchSection";
import SavedJobsPage from "./componants/Common/SavedJobsPage";
import { ToastContainer, Slide } from "react-toastify";
import ListUsers from "./UserSide/ListUsers";
import LoginAsUser from "./UserSide/LoginAsUser";
import AboutUs from "./UserSide/AboutUs";
import PrivacyPolicy from "./UserSide/PrivacyPolicy";
import TermsAndCondition from "./UserSide/TermsAndCondition";
import ContactUs from "./UserSide/ContactUs";
import GetHelp from "./UserSide/GetHelp";

const App = () => {
    const [modell, setModell] = useState(false);

    // 24 hours in milliseconds
    const SESSION_TIME_LIMIT = 24 * 60 * 60 * 1000;

    useEffect(() => {
        const checkSession = () => {
            const loginTimestamp = localStorage.getItem("userLoginTimestamp");
            if (loginTimestamp) {
                const now = Date.now();
                if (now - parseInt(loginTimestamp, 10) > SESSION_TIME_LIMIT) {
                    Cookies.remove("token");
                    Cookies.remove("id");
                    localStorage.removeItem("data");
                    localStorage.removeItem("userLoginTimestamp");
                    toast.info("Session expired. Please log in again.");
                    setTimeout(() => {
                        window.location.href = "/loginasuser";
                    }, 2000);
                }
            }
        };

        checkSession();
        const intervalId = setInterval(checkSession, 60 * 1000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <>
            {modell ? <MyModel setModell={setModell}></MyModel> : ""}
            <BrowserRouter>
                <ToastContainer
                    style={{ zIndex: "10000000000000000000003333333330" }}
                    position="bottom-left"
                    autoClose={2000}
                    className="upp"
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
                <Routes>
                    <Route element={<Layout />}>
                        <Route
                            path="/"
                            element={<Home setModell={setModell} />}
                        />
                        <Route path="/saved" element={<Nearbyusers />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/postajob" element={<Postajob />} />
                        <Route path="/network" element={<ListUsers />} />
                        <Route path="/saved" element={<SavedJobsPage />} />
                        <Route path="/search" element={<SearchSection />} />
                        <Route path={"/jobs/:id"} element={<Jobs />} />
                        <Route path={"/jobs"} element={<JobsList />} />
                        <Route path="/about-us" element={<AboutUs />} />
                        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                        <Route path="/terms-and-condition" element={<TermsAndCondition />} />
                        <Route path="/contact-us" element={<ContactUs />} />
                        <Route path="/get-help" element={<GetHelp />} />
                    </Route>
                    <Route path={"/loginasuser"} element={<LoginAsUser />} />
                    <Route path={"/signup"} element={<Signup />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </>
    );
};
export default App;

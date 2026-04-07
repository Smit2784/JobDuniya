import React, { useRef } from "react";
import { Outlet } from "react-router-dom";
import Footer from "./componants/Common/Footer";
import Header from "./componants/Common/Header";
import ScrollToTop from "./componants/Common/ScrollToTop";

const Layout = () => {
    const scrollRef = useRef(null);

    return (
        <>
            <div className="  ">
                <Header />
            </div>
            <div
                ref={scrollRef}
                className="overflow-scroll pt-[73px] box-border h-screen"
            >
                <Outlet></Outlet>
                <ScrollToTop scrollRef={scrollRef} />
            </div>
        </>
    );
};

export default Layout;

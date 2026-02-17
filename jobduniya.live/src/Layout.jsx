import React, { useCallback, useContext, useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Footer from "./componants/Common/Footer";
import Header from "./componants/Common/Header";
const Layout = () => {
    return (
        <>
            <div className="  ">
                <Header />
            </div>
            <div className="overflow-scroll pt-[73px] box-border h-screen">
                <Outlet></Outlet>
            </div>
        </>
    );
};

export default Layout;

import React from "react";
import css from "./navbar.module.css";

const Navbar = ({ left, right, center }) => {
    return (
        <div className={css.navbarContainer}>
            <div className={css.greetings}>{left}</div>
        </div>
    );
};

export default Navbar;

import React from 'react'
import css from './shared.module.css'
import logo from "../Images/black.png";

const Navbar = ({ left, right, center }) => {
    return (
        <>
            <div class="navbarMain">
                    <div className={css.greetings} style={{color:"rgb(1, 182, 246)"}}>
                        <span className={css.greetText}>{left}</span>
                    </div>
            </div>
        </>
    )
}

export default Navbar
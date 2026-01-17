import React from 'react'
import css from "../main.module.css"
const Left = ({ logo }) => {
    return (
        <>
            <div className={css.ImgDiv}>
                <img src={logo} className={css.ImgFluid} alt="" />
            </div>
        </>
    )
}

export default Left
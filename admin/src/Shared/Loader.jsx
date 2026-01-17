import React from 'react'
import css from "./shared.module.css"
const Loader = () => {
    return (
        <>
            <div className={css.loaderBody}>
                <div class="loader">
                    <div class="circle"></div>
                    <div class="circle"></div>
                    <div class="circle"></div>
                    <div class="circle"></div>
                </div>
            </div>
        </>
    )
}

export default Loader
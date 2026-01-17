import React, { useCallback, useEffect } from 'react'
import css from "../Styles/index.module.css";
import Lottie from "lottie-react"
import json from "../assets/error.json"
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';


const ServerError = () => {
    const call = () => {
        toast.error("Oops! It looks like there's a problem connecting to the server. Please check your internet connection and try again later.")

    }

    return (
        <div className={css.NotConnected} onLoad={()=>call()}>
            <div className={css.NotConnectedBox}>
                <Lottie
                    animationData={json}
                />
            </div>
        </div>
    )
}

export default ServerError
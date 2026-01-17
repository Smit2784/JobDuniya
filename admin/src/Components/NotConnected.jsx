import React from 'react'
import css from "../Styles/index.module.css";
import Lottie from "lottie-react"
import json from "../assets/noconnection.json"
const NotConnected = () => {
  return (
    <div className={css.NotConnected}>
        <div className={css.NotConnectedBox}>
            <Lottie 
                animationData={json}
            />
        </div>
    </div>
  )
}

export default NotConnected
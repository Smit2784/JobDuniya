import React from 'react'
import css from "./style.module.css"
const Button = ({onClick , text , type , style , }) => {
  return (
    <button className={css.botton} onClick={onClick}>{text}</button>
    )
}

export default Button
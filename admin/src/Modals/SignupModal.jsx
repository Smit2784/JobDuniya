import React from 'react'
import Modal from '../render-model/Modal'
import css from "../Styles/modal.module.css"
const Body = () =>{
    return (
<>
    <div className={css.modalBody}>

    </div>
</>
    )
}

const SignupModal = () => {
    return (
        <Modal  
            body={<Body />
            
            }
        />
    )
}

export default SignupModal

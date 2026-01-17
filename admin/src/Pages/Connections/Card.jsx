import React from 'react'
import "./style.css"
import Button from '../../Hoc/Button'
const Card = () => {
    return (
        <>
            <div class="cardProfile">
                <img src="https://cirrusindia.co.in/wp-content/uploads/2016/10/dummy-profile-pic-male1.jpg" alt="John" style={{ width: "100%" }} />
                <h1>John Doe</h1>
                <p class="titleProfile">CEO & Founder, Example</p>
                <p>Harvard University</p>
                <p><Button className='buttonProfile' text={"view profile"}></Button></p>
            </div>
        </>
    )
}

export default Card
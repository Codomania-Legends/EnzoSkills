import React from 'react'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router'

function Login() {
    const navigate = useNavigate()
    return (
        <>
            <div className="username">
                <input  type="text" placeholder='Username' />
            </div> 
            <div className="btn">
                <button onClick = {(e) => {Cookies.set("username", e.target.parentElement.previousElementSibling.firstChild.value); navigate("/dashboard/home")}}>Login</button>
            </div>
        </>
    )
}

export default Login
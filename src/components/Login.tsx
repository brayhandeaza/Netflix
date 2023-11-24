import "@styles/SignUp.scss"
import React, { useContext } from "react";
import { MainContext, MainContextType } from "@contexts";
import jwtEncode from "jwt-encode";


const Login: React.FC = () => {

    const { email, password, setEmail, setPassword }: MainContextType = useContext<any>(MainContext)

    const onClick: React.MouseEventHandler<HTMLButtonElement> = () => {
        if ((email == "email@test.com" && password == "password")) {
            const token = jwtEncode({ email, password }, 'secret')
            localStorage.setItem('sessionId', token)

            window.location.reload()
        }
    }


    return (
        <div className="SignUp">
            <div className="form">
                <h4>Log In</h4>
                <span>Email: email@test.com</span>
                <input value={email} id="email" onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email address" />
                <span>Password: password</span>
                <input value={password} id="password" onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
                <button onClick={onClick}>Log in</button>
            </div>

        </div>
    )
}

export default Login
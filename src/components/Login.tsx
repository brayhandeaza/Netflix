import "@styles/SignUp.scss"
import React, { useContext } from "react";
import { MainContext, MainContextType } from "../contexts/MainContext";


const Login: React.FC = () => {

    const { email, password, setEmail, setPassword, login }: MainContextType = useContext<any>(MainContext)

    const onClick: React.MouseEventHandler<HTMLButtonElement> = () => {
        if ((email == "email@test.com" && password == "password")) {
            login()
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
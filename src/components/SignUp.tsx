import "@styles/SignUp.scss"
import { Header } from "@components";
import { MainContext, MainContextType } from "../contexts/MainContext";
import { useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";


const SignUp: React.FC = () => {
    const { email, password, setEmail }: MainContextType = useContext<any>(MainContext)
    const location = useLocation()
    const params = new URLSearchParams(location.search)
    const emailParam = params.get("email");



    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
    }

    const onClick = () => {

    }


    useEffect(() => {
        if (emailParam) {
            setEmail(emailParam)
        }
    }, [])


    return (
        <div className="SignUp">
            <div className="blur-bg">
                <Header />
                <div className="main">
                    <div className="form">
                        <h4>Sigh In</h4>
                        <input onChange={onChange} type="text" placeholder="Full Name" />
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email address" />
                        <input value={password} onChange={onChange} type="password" placeholder="Password" />
                        <input onChange={onChange} type="password" placeholder="Confirm Password" />

                        <button onClick={onClick}>Log in</button>

                        <div className="mt-3">
                            <span style={{ color: "#b3b3b3" }}>Already have an account?</span>
                            <span className="link-to" onClick={onClick}>
                                <Link  style={{ color: "white" }} to="/login">Log in now</Link>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp
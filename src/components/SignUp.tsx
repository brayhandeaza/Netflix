import "@styles/SignUp.scss"
import { logo } from "@assets"
import { useState } from "react"
import { Button } from "antd"
import { Link } from "react-router-dom"

const SignUp = () => {
    const [isEmailActive, setIsEmailActive] = useState(false)



    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    }

    return (
        <div className="SignUp">
            <div className="blur-bg">
                <div className="header">
                    <div className="left">
                        <img className="logo" src={logo} alt="netflix logo" />
                    </div>
                </div>
                <div className="main">
                    <form>
                        <h4>Sigh In</h4>
                        <input onChange={onChange} type="email" placeholder="Email address" />
                        <input onChange={onChange} type="email" placeholder="Email address" />

                        <Button>{"Sign In"}</Button>

                        <div className="checkboxs">
                            <div className="checkbox">
                                <input type="checkbox" name="" id="" placeholder="Email address" />
                                <span>Remember me</span>
                            </div>
                            <div className="checkbox">
                                <span>
                                    <Link to="/login">
                                        <a>Need help?</a>
                                    </Link>
                                </span>
                            </div>
                        </div>

                        <div>
                            <span>New to Netflix?</span>
                            <Link to="/login">Sign up now</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignUp
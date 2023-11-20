import "@styles/LandingScreen.scss"
import { logo } from "@assets"
import { Button } from 'antd';
import { Link } from "react-router-dom";


const LandingScreen: React.FC = () => {
    return (
        <div className="LandingScreen">
            <div className="blur-bg">
                <div className="header">
                    <div className="left">
                        <img className="logo" src={logo} alt="netflix logo" />
                    </div>
                    <div className="right">
                        <Link to="/login">
                            <Button>Sign In</Button>
                        </Link>
                    </div>
                </div>

                <div className="main-content">
                    <h1>Unlimited movies, TV shows, and more</h1>
                    <h2>Watch anywhere. Cancel anytime.</h2>
                    <h2>Ready to watch? Enter your email to create or restart your membership.</h2>
                    <form>
                        <input type="email" placeholder="Email address" />
                        <Button>{"Get Started"}</Button>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default LandingScreen


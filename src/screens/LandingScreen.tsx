import "@styles/LandingScreen.scss"
import { Header, Login } from "@components";
import { useContext, useState } from "react";
import { MainContext, MainContextType } from "../contexts/MainContext";

const LandingScreen: React.FC = () => {
    const [isLoginHidden, setLoginHidden] = useState<boolean>(true)
    const {  }: MainContextType = useContext<any>(MainContext)



    return (
        <div className="LandingScreen">
            <div className="blur-bg">
                <Header />
                {isLoginHidden ? (
                    <div className="main-content">
                        <h1>Unlimited movies, TV shows, and more</h1>
                        <h2>Watch anywhere. Cancel anytime.</h2>
                        <h2>Ready to watch? Enter your email to create or restart your membership.</h2>
                        <div className="form">
                            <button onClick={() => setLoginHidden(false)}>Get Started</button>
                        </div>
                    </div>
                ) : (
                    <Login />
                )}
            </div>
        </div>
    )
}

export default LandingScreen


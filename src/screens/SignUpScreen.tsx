import { useContext } from "react"
import { SignUp, Login } from "@components"
import { MainContext, MainContextType } from "../contexts/MainContext"


const SignUpScren: React.FC = () => {
    const { isLogin }: MainContextType = useContext<any>(MainContext)

    return (
        <div className="SignUp">
            {isLogin ?
                <SignUp /> :
                <Login />
            }
        </div>
    )
}

export default SignUpScren
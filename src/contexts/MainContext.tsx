import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode"
import jwtEncode from "jwt-encode"


interface JWTType {
    email: string,
    password: string,
    iat: number
}

type MainContextType = {
    children?: React.ReactNode,
    isAuthenticated?: boolean,
    isLogin?: boolean,
    isSignIn?: boolean,
    email?: string,
    password?: string,
    confirmPassword?: string,
    setConfirmPassword?: (_password: string) => void,
    setAuthenticated?: (isAuthenticated: boolean) => void,
    setEmail?: (email: string) => void,
    setPassword?: (password: string) => void,
    setLogin?: (isLogin: boolean) => void,
    setSignIn?: (isSignIn: boolean) => void,
    login?: () => void

}

export type {
    MainContextType
}



export const MainContext = createContext<MainContextType>({})

const MainContextProvider: React.FC<MainContextType> = ({ children }) => {
    const [isLogin, setLogin] = useState<boolean>(false)
    const [isSignIn, setSignIn] = useState<boolean>(false)
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const [isAuthenticated, setAuthenticated] = useState<boolean>(false)

    const getUser = () => {
        const token = localStorage.getItem('sessionId')
        if (token) {
            const user: JWTType = jwtDecode(token)
            setAuthenticated(true)
            setEmail(user.email)
        }
    }

    const login = () => {
        const token = jwtEncode({ email, password }, 'secret')
        localStorage.setItem('sessionId', token)

        setAuthenticated(true)
        window.location.reload()

    }

    useEffect(() => {
        getUser()
    }, [isAuthenticated])


    const value = {
        isLogin,
        isSignIn,
        email,
        password,
        isAuthenticated,
        confirmPassword,
        setConfirmPassword,
        setAuthenticated,
        setEmail,
        setPassword,
        setLogin,
        setSignIn,
        login
    }


    return (
        <MainContext.Provider value={value}>
            {children}
        </MainContext.Provider>
    )
}


export default MainContextProvider
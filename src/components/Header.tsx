import '@styles/Header.scss'
import { logo } from "@assets"
import { useContext } from "react"
import { Link } from "react-router-dom"
import { MainContext, MainContextType } from '../contexts/MainContext'
import { profile } from "@assets"
import type { MenuProps } from 'antd';
import { Dropdown } from 'antd';

const onClick: React.MouseEventHandler<HTMLSpanElement> = () => {
    localStorage.removeItem('sessionId')
    window.location.reload()
}

const items: MenuProps['items'] = [
    {
        key: '1',
        label: (
            <span onClick={onClick} className='logout' style={{ color: 'white', backgroundColor: 'black' }}>Logout</span>
        )
    }
]


const Header = ({ bgColor }: { bgColor?: string }) => {
    const { isAuthenticated }: MainContextType = useContext<any>(MainContext)

    return (
        <div className="Header" style={{ position: isAuthenticated ? 'absolute' : 'relative', backgroundColor: bgColor }}>
            <div className="left">
                <Link to="/">
                    <img className="logo" src={logo} alt="netflix logo" />
                </Link>
            </div>
            <div className="right">
                {isAuthenticated && <Dropdown placement="bottomRight" className='dropdown-profile' trigger={['click']} menu={{ items }} arrow>
                    <img src={profile} alt="profile-icon" />
                </Dropdown>}
            </div>
        </div>
    )
}

export default Header
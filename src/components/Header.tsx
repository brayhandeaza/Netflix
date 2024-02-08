import '@styles/Header.scss'
import { logo } from "@assets"
import { useContext, useState } from "react"
import { Link } from "react-router-dom"
import { MainContext, MainContextType } from '../contexts/MainContext'
import { profile } from "@assets"
import type { MenuProps } from 'antd';
import { Dropdown } from 'antd';
import { Axios, POSTER_URL, substring } from '@constants'

const onClick: React.MouseEventHandler<HTMLSpanElement> = () => {
    localStorage.removeItem('sessionId')
    window.location.reload()
}

const items: MenuProps['items'] = [
    {
        key: '1',
        label: (
            <span onClick={onClick} className='logout' style={{ color: 'white' }}>Logout</span>
        )
    }
]


const Header = ({ bgColor }: { bgColor?: string }) => {
    const { isAuthenticated }: MainContextType = useContext<any>(MainContext)
    const [searchedMovies, setSearchedMovies] = useState<MenuProps['items']>([])
    const [open, setOpen] = useState<boolean>(false)



    const searchMovies = async (query: string) => {

        const moviesItems: MenuProps['items'] = []
        const search = await Axios(`/search/movie?query=${query}`, "&").get("")

        if (search.data.results.length > 0) {
            setOpen(true)

            for (let i = 0; i < 5; i++) {
                const title = search.data.results[i].title?.replace(/[ ]/g, '-').toLocaleLowerCase()
                const movieId = search.data.results[i].id

                moviesItems.push({
                    key: i.toString(),
                    label: (
                        <div onClick={() => window.location.href = `/watch/${movieId}/${title}`} className="movie">
                            <img className="searched-movie-logo" src={`${POSTER_URL}${search.data.results[i].backdrop_path}`} alt="netflix logo" />
                            <span className='logout' style={{ color: 'white', textTransform: 'capitalize' }}>{substring(search.data.results[i].title, 20)}</span>
                        </div>
                    )
                })
            }

            setSearchedMovies(moviesItems)
            setOpen(true)
        } else {
            setSearchedMovies([])
            setOpen(false)
        }
    }


    return (
        <div className="Header" style={{ position: isAuthenticated ? 'absolute' : 'relative', backgroundColor: bgColor }}>
            <div className="left">
                <Link to="/">
                    <img className="logo" src={logo} alt="netflix logo" />
                </Link>
            </div>
            <div className="right">
                {isAuthenticated && (
                    <>
                        <Dropdown open={open} placement="bottomRight" overlayClassName='dropdown-profile' trigger={['click']} menu={{ items: searchedMovies }} arrow>
                            <input onChange={(e) => searchMovies(e.target.value)} type="text" placeholder='Search...' />
                        </Dropdown>
                        <Dropdown placement="bottomRight" overlayClassName='dropdown-profile' trigger={['click']} menu={{ items }} arrow>
                            <img src={profile} alt="profile-icon" />
                        </Dropdown>
                    </>
                )}
            </div>
        </div>
    )
}

export default Header
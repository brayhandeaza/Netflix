import "@styles/HomeScreen.scss"
import { Header, Movies } from "@components";
import { Axios, POSTER_URL } from "@constants";
import { useEffect, useState } from "react";



const HomeScreen: React.FC = () => {
    const [movie, setMovie] = useState<any>({})


    const onPlay = () => {
        const title = movie?.title.toLowerCase().replace(/[ ]/g, '-')
        window.location.href = `/watch/${movie?.id}/${title}`
    }


    const substring = (str: string, n: number) => {
        return (str?.length > n) ? str.substring(0, n - 1) + '...' : str
    }

    const fetchRamdomMovies = async () => {

        const discover = await Axios("/discover/movie").get("")

        const getRamdomNumber = (length: number = discover.data.results.length) => {
            return Math.floor(Math.random() * length)
        }

        setMovie(discover.data.results[getRamdomNumber(discover.data.results.length)])
    }

    useEffect(() => {
        fetchRamdomMovies()
    }, [])

    return (
        <div className="HomeScreen">
            <div className="blur-bg">
                <div className="header">
                    <Header />
                </div>

                <div className="movie-poster">
                    {/* <YouTube style={{ display: 'none' }} className="react-player" videoId="nFybJlICaR8" opts={opts} /> */}
                    {!!movie.backdrop_path && <img loading="lazy" src={POSTER_URL + movie?.backdrop_path} alt="poster-img" />}

                    <div className="movie-details">
                        <h1 className="movie-title">{movie?.original_title}</h1>
                        <p className="movie-overview">{substring(movie?.overview, 350)}</p>
                        <button onClick={onPlay}>Play</button>
                    </div>
                </div>
                <Movies />
            </div>
        </div>
    )
}

export default HomeScreen





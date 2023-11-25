import "@styles/HomeScreen.scss"
import { Header, Movies } from "@components";
import { POSTER_URL } from "@constants";
import { useContext } from "react";
import YouTube from 'react-youtube';
import { FetchContext, FetchContextType } from "@contexts";



const HomeScreen: React.FC = () => {
    const { movie } = useContext<FetchContextType>(FetchContext)

    const onPlay = () => {
        const title = movie?.title.toLowerCase().replace(/[ ]/g, '-')
        window.location.href = `/watch/${movie?.id}/${title}`
    }

    const opts = {
        height: '100%',
        width: '100%',
        playerVars: {

            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
            controls: 0,
            showinfo: 0,
            rel: 0,
            modestbranding: 0,
            loop: 0,
            mute: 1,
            title: 0
        },
    }

    const substring = (str: string, n: number) => {
        return (str?.length > n) ? str.substring(0, n - 1) + '...' : str
    }

    return (
        <div className="HomeScreen">
            <div className="blur-bg">
                <div className="header">
                    <Header />
                </div>

                <div className="movie-poster">
                    <YouTube style={{ display: 'none' }} className="react-player" videoId="nFybJlICaR8" opts={opts} />
                    <img src={POSTER_URL + movie?.backdrop_path} alt="poster-img" />

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





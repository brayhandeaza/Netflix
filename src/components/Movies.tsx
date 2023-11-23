import '@styles/Movies.scss'
import { Axios, POSTER_URL } from "@constants"
import { FetchContext, FetchContextType } from "@contexts"
import { useContext, useState } from "react"
import { Dropdown, MenuProps } from 'antd'
import YouTube from 'react-youtube'

type MovieType = {
    listMovies?: any[],
    id?: number,
    title?: string,
}



const Movies: React.FC<{ isPlayer?: boolean }> = ({ isPlayer }) => {
    const promises: string[] = ["top", "popular", "upcoming", "playing"]
    const { movies } = useContext<FetchContextType>(FetchContext)
    const [videoId, setVideoId] = useState<string>("")


    const onClick = (movie: MovieType) => {
        const title = movie?.title?.replace(/[ ]/g, '-')
        window.location.href = `/watch/${movie?.id}/${title}`
    }


    const onOpenChange = async (movie: MovieType) => {
        await Axios(`/movie/${movie?.id}/videos`).get("").then((res) => {
            setVideoId(res.data.results[0].key)
        })
    }


    const items: MenuProps['items'] = [
        {
            key: '0',
            label: (
                <div style={{ borderRadius: 20, height: 300 }} >
                    <YouTube
                        videoId={videoId}
                        onReady={(e) => e.target.playVideo()}
                        opts={{
                            height: 300,
                            width: '100%',
                            playerVars: {
                                autoplay: 1,
                                controls: 0,
                                showinfo: 0,
                                rel: 0,
                                modestbranding: 0,
                                loop: 1,
                                mute: 0,
                                title: 0
                            }
                        }}
                    />
                </div>
            )
        }
    ]


    return (
        <div className="movies" style={{ top: isPlayer ? 0 : -300, paddingTop: 50 }}>
            {movies?.map((list: any, key: number) => (
                <div key={key + "movie-list"}>
                    <h1>{promises[key]}</h1>
                    <div className="movie-list">
                        {list.map((movie: any, index: number) => (
                            <Dropdown menu={{ items }} onOpenChange={() => onOpenChange(movie)} arrow overlayClassName='movie-dropdown' destroyPopupOnHide>
                                <div onClick={() => onClick(movie)} key={index + "movie"} className="movie">
                                    <img src={POSTER_URL + movie?.poster_path} alt="movie" />
                                </div>
                            </Dropdown>
                        ))}
                    </div>
                </div>
            ))}
        </div>

    )
}

export default Movies
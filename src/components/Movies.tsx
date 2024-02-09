import '@styles/Movies.scss'
import { Axios, POSTER_URL } from "@constants"
import { useEffect, useState } from "react"
import { Dropdown, MenuProps } from 'antd'
import YouTube from 'react-youtube'

type MovieType = {
    listMovies?: any[],
    id?: number,
    title?: string,
}



const Movies: React.FC<{ isPlayer?: boolean, movieId?: string }> = ({ isPlayer, movieId = "0" }) => {
    const [videoId, setVideoId] = useState<string>("")
    const [movies, setMovies] = useState<any>([])
    const [categories, setCategories] = useState<string[]>(["top", "popular", "upcoming", "playing"])


    const onClick = (movie: MovieType) => {
        const title = movie?.title?.replace(/[ ]/g, '-').toLocaleLowerCase()
        window.location.href = `/watch/${movie?.id}/${title}`
    }


    const onOpenChange = async (movie: MovieType) => {
        await Axios(`/movie/${movie?.id}/videos`).get("").then((res) => {
            setVideoId(res.data.results[0].key)
        })
    }

    const fetchMovies = async () => {
        const listMovies: any[] = []
        const top = await Axios("/movie/top_rated").get("")
        const upcoming = await Axios("/movie/upcoming").get("")
        const popular = await Axios("/movie/popular").get("")
        const playing = await Axios("/movie/now_playing").get("")

        if (isPlayer) {
            const similar = await Axios("/movie/" + movieId + "/similar").get("")

            setCategories(["similar movies", ...categories])
            listMovies.push(similar.data.results)
        }

        const queries = [top, popular, upcoming, playing]

        const results = await Promise.all(queries)
        results.forEach((result) => {
            listMovies.push(result.data.results)
        })

        setMovies(listMovies)
    }

    useEffect(() => {
        fetchMovies()
    }, [])


    const items: MenuProps['items'] = [
        {
            key: Date.now().toString(),
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
            {movies.map((list: any, key: number) => (
                <div key={key + "movie-list"}>
                    <h1>{categories[key]}</h1>
                    <div className="movie-list d-flex">
                        {list.map((movie: any) => (
                            <Dropdown key={movie?.id} trigger={['hover']} menu={{ items }} onOpenChange={() => onOpenChange(movie)} overlayClassName='movie-dropdown' destroyPopupOnHide>
                                <div onClick={() => onClick(movie)} className="movie">
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
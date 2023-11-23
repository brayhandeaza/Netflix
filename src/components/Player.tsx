import { Axios } from "@constants"
import { useEffect, useState } from "react"
import ReactPlayer from "react-player"
import { Header, Movies } from "@components"
import { useParams } from "react-router-dom"

const Player: React.FC = () => {
    const [videoId, setVideoId] = useState<string>("")
    const params = useParams()

    const fetchMovieVideos = async () => {
        await Axios(`/movie/${params.movieId}/videos`).get("").then((res) => {
            setVideoId(res.data.results[0].key)
            console.log(params);
            
        })
    }

    useEffect(() => {
        fetchMovieVideos()
    }, [])


    return (
        <div className="Player" style={{ width: "100%", height: "100vh", backgroundColor: "black" }}>
            <Header bgColor="black" />
            <ReactPlayer
                width={"100%"}
                height={"100%"}
                playing={true}
                url={`https://www.youtube.com/watch?v=${videoId}`}
                controls={true}
            />
            <Movies isPlayer={true} />
        </div>
    )
}

export default Player
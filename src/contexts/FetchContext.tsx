import { Axios } from "@constants";
import { createContext, useEffect, useState } from "react";


export type FetchContextType = {
    children?: React.ReactNode,
    movies?: any[],
    movie?: any
}



export const FetchContext = createContext<FetchContextType>({})

const FetchContextProvider: React.FC<FetchContextType> = ({ children }) => {
    const [movie, setMovie] = useState<any>({})
    const [movies, setMovies] = useState<any>([])


    const fetchMovies = async () => {
        const listMovies: any[] = []
        const top = await Axios("/movie/top_rated").get("")
        const upcoming = await Axios("/movie/upcoming").get("")
        const popular = await Axios("/movie/popular").get("")
        const playing = await Axios("/movie/now_playing").get("")

        const promises = [top, popular, upcoming, playing]

        const results = await Promise.all(promises)
        results.forEach((result) => {
            listMovies.push(result.data.results)
        })

        const getRamdomNumber = (length: number = listMovies.length) => {
            return Math.floor(Math.random() * length)
        }

        setMovies(listMovies)
        setMovie(listMovies[0][getRamdomNumber(listMovies.length)])
    }


    useEffect(() => {
        fetchMovies()
    }, [])

    const value = {
        movies,
        movie
    }


    return (
        <FetchContext.Provider value={value}>
            {children}
        </FetchContext.Provider>
    )
}


export default FetchContextProvider
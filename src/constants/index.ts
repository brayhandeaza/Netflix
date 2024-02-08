import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const {VITE_THE_MOVIE_DB_API_KEY } = import.meta.env


export const Axios = (url: string) => axios.create({
    baseURL: `https://api.themoviedb.org/3${url}?api_key=${VITE_THE_MOVIE_DB_API_KEY}`,
})


export const POSTER_URL = "https://image.tmdb.org/t/p/original/";



export const fetchMovies = createAsyncThunk("movies/fetchMovies", async () => {
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

    return listMovies
})
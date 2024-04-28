import { useEffect, useState } from "react"
import { axiosClient } from "../../utils/api/axiosClient"
import { ApiRoute } from "../../utils/api/apiRoutes"
import { TFeaturedMoviesResponse } from "../../utils/api/types"
import MoviePoster from "./components/MoviePoster"
import MoviePostersPlaceholder from "./components/MoviePlaceholder"


export default function HomeSubPage() {

    const [movies, setMovies] = useState<TFeaturedMoviesResponse|null>(null)

    useEffect(() => {
        axiosClient
            .get(ApiRoute.FeaturedMovies)
            .then(res => {
                const data = res.data as TFeaturedMoviesResponse
                setMovies(data)
            })
            .catch(err => console.log(ApiRoute.FeaturedMovies, " | ERROR : ", err) )
    }, [])

    return <>

        <div className="flex flex-col lg:flex-row gap-10">

            <div className="w-full lg:w-1/2">

                <h1 className="text-3xl">
                    Últimos Acessados
                </h1>
            </div>

            <div className="w-full lg:w-1/2">

                <div className="h-full w-full min-h-96 bg-red-400"></div>
            </div>
        </div>

        <h1 className="text-4xl my-10">
            Filmes em destaque
        </h1>

        <div className="flex flex-wrap gap-5 justify-around md:justify-between">
            {
                !movies ? 
                <MoviePostersPlaceholder /> :
                [movies[0]].map(movie => (
                    <MoviePoster
                        key={movie.id}
                        id={movie.id}
                        date={movie.date}
                        posterUrl={movie.posterUrl}
                        title={movie.title}
                    />
                ))
            }
        </div>
        <MoviePostersPlaceholder />
    </>
}

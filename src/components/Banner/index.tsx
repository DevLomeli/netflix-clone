import "./index.css";
import { useEffect, useState } from "react";
import tmdbAPI from "../../apis/tmdb/tmdb";
import requests from "../../apis/tmdb/Requests";
import { IMovie, IMovies } from "../../interfaces";

const Banner: React.FC = () => {
  const [movie, setMovie] = useState<IMovie | undefined>();
  const fetchData = async () => {
    const res = await tmdbAPI.get<IMovies>(requests.fetchNetflixOriginals);
    setMovie(
      res.data.results[Math.floor(Math.random() * res.data.results.length - 1)]
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  const truncate = (string: string, number: number): string => {
    return string?.length > number
      ? string.substring(0, number - 1) + "..."
      : string;
  };

  return (
    <div
      className="banner"
      style={{
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__content">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>
        <h1 className="banner__description">
          {truncate(movie?.overview || "", 200)}
        </h1>
      </div>
      <div className="banner--fadeBottom" />
    </div>
  );
};

export default Banner;

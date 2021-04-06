import "./index.css";
import { useCallback, useEffect, useState } from "react";
import tmdbAPI from "../../apis/tmdb/tmdb";
import { IRowProps, IMovie, IMovies } from "../../interfaces";

const Row: React.FC<IRowProps> = ({ title, fetchUrl, isLargeRow = false }) => {
  const [movies, setMovies] = useState<IMovie[]>([]);

  const baseUrl = "https://image.tmdb.org/t/p/original/";

  const fetchMovies = useCallback(async () => {
    const res = await tmdbAPI.get<IMovies>(fetchUrl);
    setMovies(res.data.results);
  }, [fetchUrl]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const renderRow = () => {
    if (movies) {
      return movies.map(
        (movie) =>
          ((isLargeRow && movie.poster_path) ||
            (!isLargeRow && movie.backdrop_path)) && (
            <img
              key={movie.id}
              className={`row__poster ${isLargeRow && "row__posterLarge"}`}
              src={`${baseUrl}${
                isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
              alt=""
            />
          )
      );
    }
  };

  return (
    <div className="row">
      <h2 className="row__title">{title}</h2>

      <div className="row__posters">{renderRow()}</div>
    </div>
  );
};

export default Row;

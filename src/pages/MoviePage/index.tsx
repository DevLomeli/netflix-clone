import "./index.css";
import { ReactElement, useCallback, useEffect, useState } from "react";
import { StaticContext } from "react-router";
import { RouteComponentProps } from "react-router-dom";

import tmdbAPI from "../../apis/tmdb/tmdb";
import requests from "../../apis/tmdb/Requests";
import { IMovie, IMovieImages } from "../../interfaces";

type LocationState = {
  serie: boolean;
};

const MoviePage: React.FC<
  RouteComponentProps<{ id: string }, StaticContext, LocationState>
> = (props): ReactElement => {
  const { id } = props.match.params;
  const { serie } = props.location.state;

  const [movie, setMovie] = useState<IMovie | null>(null);
  const [images, setImages] = useState<IMovieImages | null>(null);

  const fetchMovieData = useCallback(async () => {
    if (serie) {
      const { data } = await tmdbAPI.get(requests.fetchTVData(id));
      return setMovie(data);
    }
    const { data } = await tmdbAPI.get(requests.fetchMovieData(id));
    setMovie(data);
  }, [id, serie]);

  const fetchMovieImages = useCallback(async () => {
    if (serie) {
      const { data } = await tmdbAPI.get(requests.fetchTVImages(id));
      return setImages(data);
    }
    const { data } = await tmdbAPI.get(requests.fetchMovieImages(id));
    setImages(data);
  }, [id, serie]);

  useEffect(() => {
    fetchMovieData();
    fetchMovieImages();
  }, [fetchMovieData, fetchMovieImages]);

  const renderGenMovie = () => {
    return movie?.genres?.map((gen, index) => {
      if (index === movie.genres.length - 1) {
        return <small key={gen.id}>{gen.name}</small>;
      }
      return <small key={gen.id}>{gen.name} •</small>;
    });
  };

  const truncate = (string: string, number: number): string => {
    return string?.length > number
      ? string.substring(0, number - 1) + " ..."
      : string;
  };

  return (
    <div className="moviePage">
      <section
        className="moviePage__banner"
        style={{
          backgroundImage: `url("https://image.tmdb.org/t/p/original/${
            movie?.backdrop_path || movie?.poster_path
          }")`,
        }}
      >
        <div className="moviePage__info">
          <p className="moviePage__releaseDate">
            {movie?.release_date || movie?.first_air_date}
          </p>
          <h1 className="moviePage__title">{movie?.title || movie?.name}</h1>
          <div className="moviePage__genWrapper">{renderGenMovie()}</div>
          <h2 className="moviePage__description">
            {truncate(movie?.overview || "", 210)}
          </h2>
          <button className="moviePage__button button">Watch Trailer</button>
        </div>
        <div className="moviePage__overlay"></div>
      </section>
      <section className="moviePage__gallery">
        <div className="moviePage__galleryRow">
          {images?.backdrops.map((image) => (
            <img
              alt=""
              src={`https://image.tmdb.org/t/p/original/${image.file_path}`}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default MoviePage;

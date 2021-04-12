import "./index.css";
import { useCallback, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import tmdbAPI from "../../apis/tmdb/tmdb";
import { IRowProps, IMovie, IMovies } from "../../interfaces";

const Row: React.FC<IRowProps> = ({
  title,
  fetchUrl,
  isLargeRow = false,
  tv,
}) => {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const history = useHistory();
  const baseUrl = "https://image.tmdb.org/t/p/original/";

  const SliderRef = useRef<HTMLDivElement>(
    document.querySelector(".row__postersContainer")
  );
  const fetchMovies = useCallback(async () => {
    const res = await tmdbAPI.get<IMovies>(fetchUrl);
    setMovies(res.data.results);
  }, [fetchUrl]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const slideToRight = () => {
    const totalWidthScroll = SliderRef.current?.scrollWidth;
    if (SliderRef.current!.scrollLeft >= totalWidthScroll!) {
      console.log("stop");
      return;
    }
    console.log("slider");
    return (SliderRef!.current!.scrollLeft += SliderRef.current!.offsetWidth);
  };

  const slideToLeft = () => {
    SliderRef.current!.scrollLeft -= SliderRef.current!.offsetWidth;
  };

  const renderRow = () => {
    if (movies) {
      return movies.map((movie) => {
        return (
          ((isLargeRow && movie.poster_path) ||
            (!isLargeRow && movie.backdrop_path)) && (
            <img
              onClick={() =>
                history.push({
                  pathname: `/moviePage/${movie.id}`,
                  state: {
                    serie: tv || movie.media_type === "tv" ? true : false,
                  },
                })
              }
              key={movie.id}
              className={`row__poster ${isLargeRow && "row__posterLarge"}`}
              src={`${baseUrl}${
                isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
              alt=""
            />
          )
        );
      });
    }
  };

  return (
    <div className="row">
      <h2 className="row__title">{title}</h2>

      <div className="row__posters">
        <div
          className="row__keySlider row__keySlider--left"
          onClick={slideToLeft}
        >
          <p>{"<"}</p>
        </div>
        <div
          className="row__keySlider row__keySlider--right"
          onClick={slideToRight}
        >
          <p>{">"}</p>
        </div>
        <div className="row__postersContainer" ref={SliderRef}>
          {renderRow()}
        </div>
      </div>
    </div>
  );
};

export default Row;

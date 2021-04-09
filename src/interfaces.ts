interface GenMovie {
    id: number;
    name: string;
}

export interface IMovie {
    backdrop_path: string;
    first_air_date: string;
    genres: Array<GenMovie>;
    genre_ids: Array<GenMovie>;
    id: number;
    title?: string;
    name: string;
    origin_country: Array<string>;
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string;
    vote_average: number;
    vote_count: number;
    release_date: string;
    media_type: string;
}


export interface IMovies {
    page: number;
    results: Array<IMovie>;
    total_pages: number;
    total_results: number;
}

export interface IRowProps {
    title: string;
    fetchUrl: string;
    isLargeRow?: boolean;
    tv?: boolean;
}

export interface IHeaderProps {
    setSignIn?: () => void
}

interface IMovieImageBackdrop {
    file_path: string;
}

export interface IMovieImages {
    backdrops: Array<IMovieImageBackdrop>;
    id: number;
    posters: Array<object>;
}
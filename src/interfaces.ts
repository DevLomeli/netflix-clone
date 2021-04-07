export interface IMovie {
    backdrop_path: string;
    first_air_date: string;
    genre_ids: Array<number>;
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
}

export interface IHeaderProps {
    setSignIn?: () => void
}

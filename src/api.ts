const API_KEY = "2e18003e4e58b84ad2782370e62b816b";
const BASE_PATH = "https://api.themoviedb.org/3";

export interface IDetail {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

export interface IMovie {
  backdrop_path: string | null;
  overview: string;
  id: number;
  poster_path: string;
  vote_average: number;

  title?: string | undefined; // movie
  release_date?: string | undefined; // movie

  name?: string | undefined; // tv
  first_air_date?: string | undefined; // tv

  // movie detail
  genres?: IDetail[];
  production_companies?: {
    id: number;
    logo_path: string;
  }[];
  runtime?: number;
  tagline?: string;

  // movie search
  adult?: Boolean;
}

export interface IGetMoviesResults {
  date?: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export function getMovies(category: string) {
  return fetch(
    `${BASE_PATH}/movie/${category}?language=ko-KR&api_key=${API_KEY}`
  ).then((response) => response.json());
}

export function getTv(category: string) {
  return fetch(
    `${BASE_PATH}/tv/${category}?language=ko-KR&api_key=${API_KEY}`
  ).then((response) => response.json());
}

export function getMovieDetail(movieId: number) {
  return fetch(
    `${BASE_PATH}/movie/${movieId}?language=ko-KR&api_key=${API_KEY}`
  ).then((response) => response.json());
}

export function getMovieSearch(keyword: string | null) {
  return fetch(
    `${BASE_PATH}/search/movie?language=ko-KR&api_key=${API_KEY}&query=${keyword}&include_adult=true`
  ).then((response) => response.json());
}

export function getTvSearch(keyword: string | null) {
  return fetch(
    `${BASE_PATH}/search/tv?language=ko-KR&api_key=${API_KEY}&query=${keyword}&include_adult=true`
  ).then((response) => response.json());
}

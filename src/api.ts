const API_KEY = "2e18003e4e58b84ad2782370e62b816b";
const BASE_PATH = "https://api.themoviedb.org/3";

interface IMovie {
  backdrop_path: string;
  overview: string;
  id: number;
  poster_path: string;
  title: string;
  release_date: string;
  vote_average: number;
}

export interface IGetMoviesResults {
  date: {
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

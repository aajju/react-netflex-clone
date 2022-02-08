import { AnimatePresence, useViewportScroll } from "framer-motion";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { getMovieSearch, getTvSearch, IGetMoviesResults, IMovie } from "../api";
import { searchModalAtom } from "../atom";
import AllModal from "../Components/Modal";
import Slider from "../Components/Slider";

// https://api.themoviedb.org/3/search/movie?api_key=2e18003e4e58b84ad2782370e62b816b&language=en-US&query=dune&page=1&include_adult=false
const Wrapper = styled.div``;
const ResultText = styled.div`
  margin-top: 100px;
  margin-bottom: 200px;
  text-align: center;
  font-size: 30px;
  font-weight: 600;
`;

function Search() {
  let location = useLocation();
  let keyword = new URLSearchParams(location.search).get("keyword");
  console.log(keyword);

  const resultMovieSearch = useQuery<IGetMoviesResults>(
    ["movie", "search"],
    () => getMovieSearch(keyword),
    {
      refetchInterval: 1000,
    }
  );

  const resultTvSearch = useQuery<IGetMoviesResults>(
    ["tv", "search"],
    () => getTvSearch(keyword),
    {
      refetchInterval: 1000,
    }
  );

  const { scrollY } = useViewportScroll();
  let pickModal: any = {};

  const isSearchModal = useRecoilValue(searchModalAtom);

  const pickModalFunc = (content: IMovie) => {
    if (content.id === isSearchModal.id) {
      pickModal = content;
    }
    return pickModal;
  };

  switch (isSearchModal.category) {
    case `Movie result of ${keyword}`:
      resultMovieSearch.data?.results.map((content) => pickModalFunc(content));
      break;
    case "top_rated":
      resultTvSearch.data?.results.map((content) => pickModalFunc(content));
      break;
  }

  useEffect(() => {
    console.log("keyword modi");
  }, [keyword]);

  // console.log(resultMovieSearch);

  return (
    <>
      <Wrapper>
        <ResultText>Result : {keyword}</ResultText>
        {resultMovieSearch.data ? (
          <Slider
            key="movie_search"
            data={resultMovieSearch.data}
            category={`Movie result of ${keyword}`}
          />
        ) : (
          "is Loading..."
        )}

        {resultTvSearch.data ? (
          <Slider
            key="tv_search"
            data={resultTvSearch.data}
            category={`Tv Show result of ${keyword}`}
          />
        ) : (
          "is Loading..."
        )}
      </Wrapper>
      <AnimatePresence>
        {isSearchModal.id !== 0 ? (
          <AllModal pickModal={pickModal} scrollY={scrollY.get()} />
        ) : null}
      </AnimatePresence>
    </>
  );
}

export default Search;

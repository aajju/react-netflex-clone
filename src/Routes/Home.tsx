import { useQuery } from "react-query";
import styled from "styled-components";
import { getMovies, IGetMoviesResults } from "../api";
import makeImagePath from "../utils";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { type } from "os";
import Slider from "../Components/Slider";

const Wrapper = styled.div`
  background-color: black;
  padding-bottom: 300px;
`;
const FullBanner = styled.div<{ FullBgImage: string }>`
  width: 100%;
  height: 100vh;
  /* background-color: red; */
  background-image: linear-gradient(
      to right,
      rgba(0, 0, 0, 0.8) 40%,
      rgba(0, 0, 0, 0.4)
    ),
    url(${(props) => props.FullBgImage});
  background-size: cover;
  background-position: center center;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 60px;
`;

const Title = styled.h1`
  font-size: 68px;
  font-weight: 700;
  width: 50%;
`;

const MainInfo = styled.div`
  display: flex;
  justify-content: space-between;
  width: 50%;
  padding: 10px;
  margin-bottom: 10px;
  h1 {
    font-size: 22px;
    align-self: flex-end;
    font-weight: 600;
    color: yellow;
  }
  h4 {
    align-self: flex-start;
    font-size: 16px;
  }
`;

const Overview = styled.p`
  font-size: 20px;
  width: 50%;
`;

const Loading = styled.div`
  height: 50vh;
  font-size: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// --------------------- function  ----------

function Home() {
  const resultNowPlaying = useQuery<IGetMoviesResults>(
    ["movies", "now_playing"],
    () => getMovies("now_playing")
  );

  const resultPopular = useQuery<IGetMoviesResults>(["movies", "popular"], () =>
    getMovies("popular")
  );

  // const { data, isLoading } = useQuery<IGetMoviesResults>(
  //     ["movies", "now_playing"],
  //     getMovies
  //   );

  //   console.log(
  //     data?.results
  //       .slice(1)
  //       .slice(index * sliderCount, index * sliderCount + sliderCount)
  //   );

  return (
    <Wrapper>
      {resultNowPlaying.isLoading ? (
        <Loading>Loading...</Loading>
      ) : (
        <>
          <FullBanner
            FullBgImage={makeImagePath(
              resultNowPlaying.data?.results[0].backdrop_path || ""
            )}
          >
            <Title>
              {resultNowPlaying.data
                ? resultNowPlaying.data.results[0].title
                : ""}
            </Title>
            {resultNowPlaying.data ? (
              <MainInfo>
                <h4>
                  {"개봉일 : " + resultNowPlaying.data.results[0].release_date}
                </h4>
                <h1>
                  {"평점 : " + resultNowPlaying.data.results[0].vote_average}
                </h1>
              </MainInfo>
            ) : null}
            <Overview>
              {resultNowPlaying.data
                ? resultNowPlaying.data.results[0].overview
                : ""}
            </Overview>
          </FullBanner>
          {resultNowPlaying.data ? (
            <Slider
              key="now_playing"
              data={resultNowPlaying.data}
              category={"now_playing"}
            />
          ) : null}{" "}
          {resultPopular.data ? (
            <Slider
              key="popular"
              data={resultPopular.data}
              category={"popular"}
            />
          ) : null}
        </>
      )}
    </Wrapper>
  );
}

export default Home;

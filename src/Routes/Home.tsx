import { useQuery } from "react-query";
import styled from "styled-components";
import { getMovies, IGetMoviesResults } from "../api";
import makeImagePath from "../utils";

const Wrapper = styled.div`
  background-color: rebeccapurple;
`;
const FullBanner = styled.div<{ FullBgImage: string }>`
  width: 100%;
  height: 100vh;
  /* background-color: red; */
  background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6)),
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
  width: 60%;
`;

const Overview = styled.p`
  font-size: 20px;
  width: 50%;
`;

function Home() {
  const { data, isLoading } = useQuery<IGetMoviesResults>(
    ["movies", "now_playing"],
    getMovies
  );
  console.log(data, isLoading);

  return (
    <Wrapper>
      <FullBanner
        FullBgImage={makeImagePath(data?.results[0].backdrop_path || "")}
      >
        <Title>{data ? data.results[0].title : ""}</Title>
        <Overview>{data ? data.results[0].overview : ""}</Overview>
      </FullBanner>
    </Wrapper>
  );
}

export default Home;

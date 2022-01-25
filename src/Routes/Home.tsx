import { useQuery } from "react-query";
import styled from "styled-components";
import { getMovies, IGetMoviesResults, IMovie } from "../api";
import makeImagePath from "../utils";
import Slider from "../Components/Slider";
// import { useMatch } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  AnimateSharedLayout,
  useViewportScroll,
} from "framer-motion";
import { useRecoilValue } from "recoil";
import { movieModalAtom } from "../atom";
import AllModal from "../Components/Modal";

const Wrapper = styled(motion.div)`
  background-color: black;
`;
const FullBanner = styled(motion.div)<{ fullbgimage: string }>`
  width: 100%;
  height: 100vh;
  background-image: linear-gradient(
      to right,
      rgba(0, 0, 0, 0.8) 40%,
      rgba(0, 0, 0, 0.4)
    ),
    url(${(props) => props.fullbgimage});
  background-size: cover;
  background-position: center center;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 60px;
`;

const Title = styled(motion.h1)`
  font-size: 68px;
  font-weight: 700;
  width: 50%;
`;

export const MainInfo = styled(motion.div)`
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

const Overview = styled(motion.p)`
  font-size: 20px;
  width: 50%;
`;

const Loading = styled(motion.div)`
  height: 50vh;
  font-size: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// const Modal = styled(motion.div)``;

// --------------------- function  ----------

function Home() {
  const resultNowPlaying = useQuery<IGetMoviesResults>(
    ["movies", "now_playing"],
    () => getMovies("now_playing")
  );

  const resultPopular = useQuery<IGetMoviesResults>(["movies", "popular"], () =>
    getMovies("popular")
  );
  const resultTopRated = useQuery<IGetMoviesResults>(
    ["movies", "top_rated"],
    () => getMovies("top_rated")
  );

  const resultUpcoming = useQuery<IGetMoviesResults>(
    ["movies", "upcoming"],
    () => getMovies("upcoming")
  );

  const isMovieModal = useRecoilValue(movieModalAtom);
  //   const [yValue, setYValue] = useState(0);

  const { scrollY } = useViewportScroll();
  let pickModal: any = {};

  const pickModalFunc = (content: IMovie) => {
    if (content.id === isMovieModal.id) {
      pickModal = content;
    }
    return pickModal;
  };

  switch (isMovieModal.category) {
    case "popular":
      resultPopular.data?.results.map((content) => pickModalFunc(content));
      break;
    case "top_rated":
      resultTopRated.data?.results.map((content) => pickModalFunc(content));
      break;
    case "now_playing":
      resultNowPlaying.data?.results.map((content) => pickModalFunc(content));
      break;
    case "upcoming":
      resultUpcoming.data?.results.map((content) => pickModalFunc(content));
      break;
  }

  return (
    <>
      <Wrapper>
        {resultNowPlaying.isLoading ? (
          <Loading>Loading...</Loading>
        ) : (
          <>
            <FullBanner
              fullbgimage={makeImagePath(
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
                    {"개봉일 : " +
                      resultNowPlaying.data.results[0].release_date}
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
            ) : null}
            {resultPopular.data ? (
              <Slider
                key="popular"
                data={resultPopular.data}
                category={"popular"}
              />
            ) : null}

            {resultTopRated.data ? (
              <Slider
                key="top_rated"
                data={resultTopRated.data}
                category={"top_rated"}
              />
            ) : null}

            {resultUpcoming.data ? (
              <Slider
                key="upcoming"
                data={resultUpcoming.data}
                category={"upcoming"}
              />
            ) : null}
          </>
        )}
      </Wrapper>

      <AnimatePresence>
        {isMovieModal.id !== 0 ? (
          <AllModal pickModal={pickModal} scrollY={scrollY.get()} />
        ) : null}
      </AnimatePresence>
    </>
  );
}

export default Home;

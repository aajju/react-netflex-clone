import { useQuery } from "react-query";
import styled from "styled-components";
import { getTv, IGetMoviesResults, IMovie } from "../api";
import makeImagePath from "../utils";
import Slider from "../Components/Slider";
import { useRecoilValue } from "recoil";
import { AnimatePresence, useViewportScroll } from "framer-motion";
import { tvModalAtom } from "../atom";
import AllModal from "../Components/Modal";

const Wrapper = styled.div`
  background-color: black;
`;
const FullBanner = styled.div<{ fullbgimage: string }>`
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

function Tv() {
  const resultNowPlaying = useQuery<IGetMoviesResults>(
    ["tv", "on_the_air"],
    () => getTv("on_the_air")
  );

  const resultPopular = useQuery<IGetMoviesResults>(["tv", "popular"], () =>
    getTv("popular")
  );
  const resultTopRated = useQuery<IGetMoviesResults>(["tv", "top_rated"], () =>
    getTv("top_rated")
  );

  const resultAiringToday = useQuery<IGetMoviesResults>(
    ["tv", "airing_today"],
    () => getTv("airing_today")
  );

  const isTvModal = useRecoilValue(tvModalAtom);
  //   const [yValue, setYValue] = useState(0);

  const { scrollY } = useViewportScroll();
  let pickModal: any = {};

  const pickModalFunc = (content: IMovie) => {
    if (content.id === isTvModal.id) {
      pickModal = content;
    }
    return pickModal;
  };

  switch (isTvModal.category) {
    case "popular":
      resultPopular.data?.results.map((content) => pickModalFunc(content));
      break;
    case "top_rated":
      resultTopRated.data?.results.map((content) => pickModalFunc(content));
      break;
    case "on_the_air":
      resultNowPlaying.data?.results.map((content) => pickModalFunc(content));
      break;
    case "airing_today":
      resultAiringToday.data?.results.map((content) => pickModalFunc(content));
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
                  ? resultNowPlaying.data.results[0].name
                  : ""}
              </Title>
              {resultNowPlaying.data ? (
                <MainInfo>
                  <h4>
                    {"첫공개일 : " +
                      resultNowPlaying.data.results[0].first_air_date}
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
                key="on_the_air"
                data={resultNowPlaying.data}
                category={"on_the_air"}
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

            {resultAiringToday.data ? (
              <Slider
                key="airing_today"
                data={resultAiringToday.data}
                category={"airing_today"}
              />
            ) : null}
          </>
        )}
      </Wrapper>
      <AnimatePresence>
        {isTvModal.id !== 0 ? (
          <AllModal pickModal={pickModal} scrollY={scrollY.get()} />
        ) : null}
      </AnimatePresence>
    </>
  );
}

export default Tv;

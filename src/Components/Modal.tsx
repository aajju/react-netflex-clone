import { motion } from "framer-motion";
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { getMovieDetail, IMovie } from "../api";
import { movieModalAtom, searchModalAtom, tvModalAtom } from "../atom";
import makeImagePath from "../utils";

const ModalFather = styled(motion.div)``;

const ModalOutside = styled(motion.div)`
  position: absolute;
  top: 0;
  width: 100vw;
  height: 240vh;
  background-color: rgba(0, 0, 0, 0.8);
  margin: auto;
  z-index: 10;
`;
const ModalInside = styled(motion.div)`
  position: absolute;
  left: 0;
  right: 0;
  width: 50vw;
  height: 70vh;
  background-color: ${(props) => props.theme.black.lighter};
  margin: auto;
  z-index: 11;
  display: flex;
  flex-direction: column;
`;

const BgPoster = styled(motion.div)<{ fullbgimage: string }>`
  width: 100%;
  height: 200px;
  background-image: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.8) 20%,
      rgba(0, 0, 0, 0)
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

const ModalTitle = styled(motion.h1)`
  position: relative;
  top: -44px;
  font-size: 30px;
  font-weight: 600;
  padding-left: 20px;
  display: block;
`;

const Info = styled(motion.div)`
  width: 100%;
  position: relative;
  top: -45px;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
    margin-top: 5px;
  }
`;

const Tagline = styled(motion.span)`
  text-align: center;
  font-size: 20px;
  position: relative;
  top: -40px;
  font-weight: 600;
  text-decoration-line: underline;
  color: yellow;
`;

const Overview = styled(motion.p)`
  position: relative;
  top: -25px;
  padding: 0px 15px;
  line-height: 1.8;
`;

const Detail = styled(motion.div)``;

interface IModalProps {
  pickModal: IMovie;
  scrollY: number;
}

///////   ------  function ---------- ///////

function AllModal({ pickModal, scrollY }: IModalProps) {
  const [movieModal, setMovieModal] = useRecoilState(movieModalAtom);
  const [tvModal, setTvModal] = useRecoilState(tvModalAtom);
  const [searchModal, setSearchModal] = useRecoilState(searchModalAtom);

  const movieDetail = useQuery<IMovie>(["movie", "detail"], () =>
    getMovieDetail(pickModal.id)
  );

  const onClickModalOutside = () => {
    setMovieModal({ isClicked: false, id: 0, category: undefined });
    setTvModal({ isClicked: false, id: 0, category: undefined });
    setSearchModal({ isClicked: false, id: 0, category: undefined });
  };

  const timeConvert = (n: number | undefined) => {
    if (n) {
      const num = n;
      const hours = num / 60;
      const rhours = Math.floor(hours);
      const minutes = (hours - rhours) * 60;
      const rminutes = Math.round(minutes);
      return rhours + " hour " + rminutes + " minute";
    }
  };

  return (
    <ModalFather>
      <ModalOutside onClick={onClickModalOutside}></ModalOutside>

      {searchModal.category ? (
        <ModalInside
          layoutId={`${pickModal.id}_${searchModal.category}`}
          style={{ top: scrollY + 100 }}
        >
          <BgPoster
            fullbgimage={makeImagePath(pickModal.backdrop_path || "w500")}
          />
          <ModalTitle>
            {pickModal.title ? pickModal.title : pickModal.name}
          </ModalTitle>
          <Info>
            <div>
              <h4>
                {pickModal.release_date
                  ? "????????? : " + pickModal.release_date
                  : "??? ????????? : " + pickModal.first_air_date}
              </h4>
              <h4>{"???????????? : " + timeConvert(movieDetail.data?.runtime)}</h4>
            </div>
            <h1>{"?????? : " + pickModal.vote_average}</h1>
          </Info>
          <Tagline>{movieDetail.data?.tagline}</Tagline>
          <Overview>
            {pickModal.overview ? `${pickModal.overview}` : "????????? ??????"}
          </Overview>
        </ModalInside>
      ) : (
        <ModalInside
          layoutId={
            pickModal.title
              ? `${pickModal.id}_${movieModal.category}`
              : `${pickModal.id}_${tvModal.category}`
          }
          style={{ top: scrollY + 100 }}
        >
          <BgPoster
            fullbgimage={makeImagePath(pickModal.backdrop_path || "w500")}
          />
          <ModalTitle>
            {pickModal.title ? pickModal.title : pickModal.name}
          </ModalTitle>
          <Info>
            <div>
              <h4>
                {pickModal.release_date
                  ? "????????? : " + pickModal.release_date
                  : "??? ????????? : " + pickModal.first_air_date}
              </h4>
              <h4>{"???????????? : " + timeConvert(movieDetail.data?.runtime)}</h4>
            </div>
            <h1>{"?????? : " + pickModal.vote_average}</h1>
          </Info>
          <Tagline>{movieDetail.data?.tagline}</Tagline>
          <Overview>
            {pickModal.overview ? `${pickModal.overview}` : "????????? ??????"}
          </Overview>
        </ModalInside>
      )}
    </ModalFather>
  );
}

export default AllModal;

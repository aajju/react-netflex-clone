import { motion, Variants, AnimatePresence } from "framer-motion";
import { useState } from "react";
// import { useMatch, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { IGetMoviesResults } from "../api";
import { movieModalAtom, searchModalAtom, tvModalAtom } from "../atom";
import makeImagePath from "../utils";

const SliderA = styled(motion.div)`
  position: relative;
  top: -100px;
  height: 300px;
`;

const Row = styled(motion.div)`
  display: grid;
  /* grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); */
  grid-template-columns: repeat(6, 1fr);
  /* background-color: red; */
  width: 100%;
  gap: 10px;
  position: absolute;
  /* height: 100px; */
  padding: 0px 10px;
`;

const Box = styled(motion.div)<{ boxbgimage: string }>`
  height: 200px;
  width: 100%;
  min-width: 120px;
  background-color: white;
  color: white;
  background-image: url(${(props) => props.boxbgimage});
  font-size: 20px;
  background-position: center center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 15px;
  align-items: center;
  font-weight: 600;
  text-shadow: 2px 2px 2px gray;
  text-align: center;
  :first-child {
    transform-origin: left center;
  }
  :last-child {
    transform-origin: right center;
  }
`;

const BoxTitle = styled(motion.div)`
  width: 100%;
  padding: 20px 0px;
  font-size: 14px;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5));
`;

const BoxInfo = styled(motion.div)`
  height: 50px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* align-items: center; */
  padding: 5px 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  h1 {
    font-size: 16px;
    align-self: flex-end;
  }
  h4 {
    align-self: flex-start;
    font-size: 10px;
  }
  /* position: absolute; */
  /* bottom: 0; */
`;

const rowVariants: Variants = {
  initial: (isBack: Boolean) => {
    return { x: isBack ? -window.innerWidth - 10 : window.innerWidth + 10 };
  },
  animate: { x: 0 },
  exit: (isBack: Boolean) => {
    return { x: isBack ? +window.innerWidth + 10 : -window.innerWidth - 10 };
  },
};

const boxVariants: Variants = {
  hover: { scale: 1.4, transition: { delay: 0.2 } },
  //   exit: { scale: 1 },
};

const boxInfoVariants: Variants = {
  hover: { opacity: 1 },
};

interface SliderProps {
  data: IGetMoviesResults;
  category: string | null;
}

const CategoryText = styled.div`
  padding-left: 20px;
  margin-bottom: 10px;
  font-weight: 600;
  font-size: 20px;
  text-transform: uppercase;
`;

const BtnRight = styled(motion.div)`
  position: absolute;
  right: 5px;
  top: 110px;
  height: 50px;
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  color: black;
  font-size: 40px;
  font-weight: 800;
  z-index: 1;
  text-align: center;
  cursor: pointer;
`;
const BtnLeft = styled(motion.div)`
  position: absolute;
  left: 5px;
  top: 110px;
  height: 50px;
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  color: black;
  font-size: 40px;
  font-weight: 800;
  z-index: 1;
  text-align: center;
  cursor: pointer;
`;

// --------- function ---------

function Slider({ data, category }: SliderProps) {
  const sliderCount = 6;
  const [leaving, setLeaving] = useState(false);
  const [index, setindex] = useState(0);

  const [back, setBack] = useState(false);

  const toggleLeaving = () => {
    setLeaving((prev) => !prev);
  };
  //   const navigate = useNavigate();

  const nextClick = () => {
    setBack(false);

    if (data) {
      if (leaving) return;
      toggleLeaving();
      const maxIndex = Math.floor((data.results.length - 1) / sliderCount) - 1;
      setindex((prev) => (prev === maxIndex ? 0 : prev + 1));
      //   console.log(maxIndex, index);
    }
  };
  const prevClick = () => {
    setBack(true);
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const maxIndex = Math.floor((data.results.length - 1) / sliderCount) - 1;
      setindex((prev) => (prev === 0 ? maxIndex : prev - 1));

      //   console.log(maxIndex, index);
    }
  };

  const setMovieModalAtom = useSetRecoilState(movieModalAtom);
  const setTvModalAtom = useSetRecoilState(tvModalAtom);
  const setSearchModalAtom = useSetRecoilState(searchModalAtom);

  const boxClick = (contentId: number, type: any) => {
    // console.log(contentId, type);
    // navigate(`/${type}/${movieId}`);

    // stringVal.includes(substring
    if (type.includes("result")) {
      setSearchModalAtom({ isClicked: true, id: contentId, category: type });
      // console.log("hahahah");
      return;
    } else if (data) {
      data.results[0].title
        ? setMovieModalAtom({ isClicked: true, id: contentId, category: type })
        : setTvModalAtom({ isClicked: true, id: contentId, category: type });
    }
  };

  return (
    <>
      <SliderA key={category}>
        <CategoryText>
          {category ? category.replace("_", " ") : null}
        </CategoryText>
        <BtnRight onClick={nextClick}>&#62;</BtnRight>
        <BtnLeft onClick={prevClick}>&#60;</BtnLeft>
        <AnimatePresence
          custom={back}
          initial={false}
          onExitComplete={toggleLeaving}
        >
          <Row
            custom={back}
            key={index}
            variants={rowVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ type: "tween", duration: 1.5 }}
          >
            {data?.results
              .slice(1)
              .slice(index * sliderCount, index * sliderCount + sliderCount)
              .map((content) => {
                return (
                  <>
                    <Box
                      layoutId={`${content.id}_${category}`}
                      variants={boxVariants}
                      whileHover="hover"
                      key={content.id}
                      boxbgimage={makeImagePath(content.poster_path, "w500")}
                      onClick={() => {
                        content.title !== undefined
                          ? boxClick(content.id, category)
                          : boxClick(content.id, category);
                      }}
                    >
                      <BoxTitle>
                        {content.title !== undefined
                          ? content.title
                          : content.name}
                      </BoxTitle>
                      <BoxInfo variants={boxInfoVariants}>
                        <h4>
                          {content.title !== undefined
                            ? "개봉일 : " + content.release_date
                            : "첫 공개일 : " + content.first_air_date}
                        </h4>
                        <h1>{"평점 : " + content.vote_average}</h1>
                      </BoxInfo>
                    </Box>
                  </>
                );
              })}
          </Row>
        </AnimatePresence>
      </SliderA>
    </>
  );
}
export default Slider;

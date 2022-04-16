import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  min-height: 100vh;
  min-width: 100vw;
  background-color: ${(props) => props.theme.bgColor};
  padding: 120px 0px 150px 0px;
`;

const Carousel = styled(motion.div)`
  width: 100%;
  height: 754px;
  background: no-repeat url(${(props) => props.backimg});
  background-size: cover;
  background-position: center center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  position: absolute;
  h2 {
    font-size: 70px;
    color: white;
    font-family: "Source Sans Pro", sans-serif;
    font-weight: 600;
  }
  span {
    color: white;
    margin-top: 30px;
  }
`;

// const BannerIndicator1 = styled.div`
//   width: 10px;
//   height: 10px;
//   border-radius: 50%;
//   background-color: white;
// `;

// const BannerIndicator2 = styled.div`
//   width: 10px;
//   height: 10px;
//   border-radius: 50%;
//   background-color: white;
// `;

const DescContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 600px;
  margin-top: 720px;
  h2 {
    font-size: 70px;
    font-family: "Source Sans Pro", sans-serif;
    font-weight: 600;
  }
  span {
    font-size: 19px;
    font-family: "Source Sans Pro", sans-serif;
    width: 60%;
    text-align: center;
    margin-top: 35px;
  }
`;

const GalleryContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  height: 498px;
`;

const InfoBox = styled.div`
  z-index: 10;
  cursor: pointer;
  width: 100%;
  color: rgba(0, 0, 0, 0);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Source Sans Pro", sans-serif;
  font-size: 100px;
  font-weight: 600;
  &:hover {
    background: transparent;
    color: ${(props) => props.theme.textColor};
  }
`;

const Info1 = styled(InfoBox)`
  background: no-repeat
    url(https://static.wixstatic.com/media/94e66f_ee0a937509db478cabc64e2279600da4~mv2_d_3019_3275_s_4_2.gif/v1/fill/w_453,h_452,q_90/94e66f_ee0a937509db478cabc64e2279600da4~mv2_d_3019_3275_s_4_2.webp);
  background-size: cover;
  background-position: center center;
`;

const Info2 = styled(InfoBox)`
  background: no-repeat
    url(https://static.wixstatic.com/media/84770f_5b748949a90e444dbdab497ec466ab22~mv2.gif/v1/fit/w_1000,h_1000,al_c,q_80/file.jpg);
  background-size: cover;
  background-position: center center;
`;

const Info3 = styled(InfoBox)`
  background: no-repeat
    url(https://static.wixstatic.com/media/94e66f_cc6315f5bf1e43aca75ca1810f880907~mv2.gif/v1/fill/w_452,h_452,q_90/94e66f_cc6315f5bf1e43aca75ca1810f880907~mv2.webp);
  background-size: cover;
  background-position: center center;
`;

const box = {
  // custom으로부터 boolean을 받아서 isBack으로 사용
  entry: (isBack) => ({
    x: isBack ? -window.outerWidth : window.outerWidth,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
  exit: (isBack) => ({
    x: isBack ? window.outerWidth : -window.outerWidth,
    opacity: 0,
    transition: { duration: 0.5 },
  }),
};

function Landing() {
  const [visible, setVisible] = useState(1);
  // 이전으로 가는지 판단하는 변수
  const [back, setBack] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const nextPlease = () => {
    // if (leaving) return;
    // toggleLeaving();
    setBack(false);
    setVisible((prev) => (prev === 2 ? 1 : prev + 1));
  };
  // const toggleLeaving = () => {
  //   setLeaving((prev) => !prev);
  // };

  // setInterval(() => { // 자동 반복 펑션으로 슬라이더 작동
  //   setBack(false);
  //   setVisible((prev) => (prev === 2 ? 1 : prev + 1));
  // }, 5000);

  // 이전 버튼은 잘 작동하지만 애니메이션이 반대가 되지 않고 여전히 next와 똑같이 우측에서 넘어온다
  // const prevPlease = () => {
  //   setBack(true);
  //   setVisible((prev) => (prev === 1 ? 1 : prev - 1));
  // };

  const navigate = useNavigate();
  const onBoxClicked = (id) => {
    navigate(`/${id}`);
  };

  const imgUrl = [
    {
      id: 1,
      img: "https://static.wixstatic.com/media/94e66f_e748a6157aa84c24a309d318175d06d8~mv2.gif",
      title: "Life is Too Short",
      subTitle: "Luck is the residue of Design",
    },
    {
      id: 2,
      img: "https://eskipaper.com/images/usain-bolt-40.jpg",
      title: "Impossible Is Nothing",
      subTitle: "Just Do It.",
    },
  ];

  return (
    <Wrapper>
      <AnimatePresence initial={false} custom={back}>
        {imgUrl.map((item) =>
          item.id === visible ? ( // visible에 저장된 숫자와 id가 일치하는 박스만 보여줌
            <Carousel
              backimg={item.img}
              onClick={nextPlease}
              custom={back}
              variants={box}
              initial="entry"
              animate="center"
              exit="exit"
              key={visible}
            >
              <h2>{item.title}</h2>
              <h2>{item.subTitle}</h2>
              <Link to="/set/1" style={{ marginTop: "48px" }}>
                <span style={{ fontWeight: "bold" }}>+목표 세우기</span>
              </Link>
            </Carousel>
          ) : null
        )}
        {/* <BannerIndicator1 />
        <BannerIndicator2 /> */}
      </AnimatePresence>
      <DescContainer>
        <h2>Description</h2>
        <span>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
          Ipsum has been the industry's standard dummy text ever since the 1500s, when an
          unknown printer took a galley of type and scrambled it to make a type specimen
          book.
        </span>
      </DescContainer>
      <GalleryContainer>
        <Info1 onClick={() => onBoxClicked("about-us")}>#About Us</Info1>
        <Info2 onClick={() => onBoxClicked("site-rule")}>#Site Rules</Info2>
        <Info3 onClick={() => onBoxClicked("contact-us")}>#Contact Us</Info3>
      </GalleryContainer>
    </Wrapper>
  );
}

export default Landing;

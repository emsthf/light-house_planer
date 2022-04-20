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
    font-size: 48px;
    color: white;
    font-family: "Source Sans Pro", sans-serif;
    font-weight: 600;
    line-height: 5rem;
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
  height: 720px;
  margin-top: 720px;
  h2 {
    font-size: 70px;
    font-family: "Source Sans Pro", sans-serif;
    font-weight: 600;
  }
  span {
    font-size: 16px;
    font-family: "Source Sans Pro", sans-serif;
    width: 60%;
    text-align: center;
    margin-top: 35px;
    line-height: 1.5rem;
  }
  strong {
    font-weight: bold;
  }
  p {
    font-size: 14px;
    font-weight: bold;
    color: #666;
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
      title: "100만번 같은 일을 반복하면",
      subTitle: "그것이 당신의 강력한 무기가 됩니다.",
    },
    {
      id: 2,
      img: "https://eskipaper.com/images/usain-bolt-40.jpg",
      title: "꾸준함을 통해",
      subTitle: "가치있는 성장을 할 수 있도록.",
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
        <h2>About</h2>
        <span>
          <strong>
            내일은 더 멋져질 당신을 위해, <br />
            등대와 함께하는 슬기로운 습관 생활 <br />
          </strong>
          <hr />
          등대는 당신의 습관을 성취하고 관리하는 가장 강력한 툴입니다. <br />
          꾸준한 성취을 반복하며 더 멋지게 발전하는 나를 경험해보세요.
        </span>
        <span>
          <p>
          ▶ 목표 설정은 다음 단계로 이루어집니다.<br /><br />
          목표 입력<br />
          ↓<br />
          템플릿 선택(60일 or 사용자지정)<br />
          ↓<br />
          목표 시작일과 종료일 지정<br />
          ↓<br />
          일주일 실천 횟수 지정<br />
          ↓<br />
          목표에 대한 나의 다짐/설명 작성<br />
          ↓<br />
          개인대시보드에서 조회
          </p>
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

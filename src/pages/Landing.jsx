import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  min-height: 100vh;
  min-width: 100vw;
  background-color: black;
  padding: 120px 0px 150px 0px;
`;

const Carousel = styled.div`
  height: 754px;
  background: no-repeat
    url(https://static.wixstatic.com/media/94e66f_e748a6157aa84c24a309d318175d06d8~mv2.gif);
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
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

const DescContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 600px;
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
`;

const Info1 = styled(InfoBox)`
  width: 100%;
  background: no-repeat
    url(https://static.wixstatic.com/media/94e66f_ee0a937509db478cabc64e2279600da4~mv2_d_3019_3275_s_4_2.gif/v1/fill/w_453,h_452,q_90/94e66f_ee0a937509db478cabc64e2279600da4~mv2_d_3019_3275_s_4_2.webp);
  background-size: cover;
  color: rgba(0, 0, 0, 0);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Source Sans Pro", sans-serif;
  font-size: 100px;
  font-weight: 600;
  &:hover {
    background: transparent;
    color: white;
  }
`;

const Info2 = styled(InfoBox)`
  width: 100%;
  background: no-repeat
    url(https://static.wixstatic.com/media/84770f_5b748949a90e444dbdab497ec466ab22~mv2.gif/v1/fit/w_1000,h_1000,al_c,q_80/file.jpg);
  background-size: cover;
  color: rgba(0, 0, 0, 0);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Source Sans Pro", sans-serif;
  font-size: 100px;
  font-weight: 600;
  &:hover {
    background: transparent;
    color: white;
  }
`;

const Info3 = styled(InfoBox)`
  background: no-repeat
    url(https://static.wixstatic.com/media/94e66f_cc6315f5bf1e43aca75ca1810f880907~mv2.gif/v1/fill/w_452,h_452,q_90/94e66f_cc6315f5bf1e43aca75ca1810f880907~mv2.webp);
  background-size: cover;
  color: rgba(0, 0, 0, 0);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Source Sans Pro", sans-serif;
  font-size: 100px;
  font-weight: 600;
  &:hover {
    background: transparent;
    color: white;
  }
`;

function Landing() {
  return (
    <Wrapper>
      <Carousel>
        <h2>Life is Too Short</h2>
        <h2>Luck is the residue of design</h2>
        <span>+목표 세우러 가기</span>
      </Carousel>
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
        <Info1>#About Us</Info1>
        <Info2>#Site Rules</Info2>
        <Info3>#Contact Us</Info3>
      </GalleryContainer>
    </Wrapper>
  );
}

export default Landing;

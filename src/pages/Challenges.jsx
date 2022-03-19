import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AnimatePresence, motion, useViewportScroll } from "framer-motion";

const Container = styled.div`
  //   background-color: #e8ffe2;
  width: 1200px;
  margin: 20vh auto;
  min-height: 100vh;
  margin-bottom: 240px;
`;

const Wrapper = styled.div`
  //   background-color: #74b9ff;
  width: 100%;
`;

const Title = styled.div`
  width: 800px;
  height: 130px;
  background: #fafafa;
  border-radius: 20px;
  box-shadow: 3px 5px 10px #d7d7d7;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2rem auto;
`;
const TitleGridBox = styled.div`
  display: flex;
  display: grid;
  height: 70%;
  max-width: 1100px;
  // grid-template-columns: repeat(2, 1fr);
  grid-template-columns: 4fr 2fr;
`;

const GridBox = styled.div`
  display: grid;
  height: 20%;
  max-width: 850px;
  // grid-template-columns: repeat(2, 1fr);
  grid-template-columns: 4fr 2fr;
`;

const Paging = styled.span`
  background-color: #fafafa;
  width: 150px;
  height: 30px;
  border-radius: 5px;
  box-shadow: 2px 5px 10px #d7d7d7;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2rem auto;
  margin-left: 460px;
`;

const NewChallengeEnroll = styled.span`
  background-color: #fafafa;
  width: 150px;
  height: 30px;
  border-radius: 5px;
  box-shadow: 2px 5px 10px #d7d7d7;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2rem auto;
  margin-left: 160px;
`;

const HalfGridBox = styled.div`
  display: grid;
  height: 20%;
  max-width: 1000px;
  grid-template-columns: repeat(1, 1fr);
  grid-template-columns: 1fr 1fr;
`;

const ToNotice = styled.div`
  padding: 10px;
  text-align: center;
  width: 160px;
  height: 40px;
  margin-top: 45px;
  margin-left: 380px;
  border-radius: 5px;
  border: none;
  box-shadow: 3px 4px 8px #b7b7b7;
  background: ${(props) => props.backgroundColor || "#416dea"};
  color: #fff;
  font-weight: bold;
  // margin: 1rem 0;
  margin-left: ${(props) => props.marginLeft && "2rem"};
  &:hover {
    box-shadow: none;
    background: ${(props) =>
      props.hoverColor || "linear-gradient(315deg, #89d8d3, #416dea 74%)"};
  }
  &:active {
    box-shadow: none;
    background: ${(props) =>
      props.hoverColor || "linear-gradient(315deg, #89d8d3, #416dea 74%)"};
    box-shadow: 3px 4px 10px #bbb;
  }
`;
const ToAuthentication = styled.div`
  text-align: center;
  width: 160px;
  height: 40px;
  padding: 10px;
  margin-top: 45px;
  margin-left: 25px;
  border-radius: 7px;
  border: none;
  box-shadow: 3px 4px 8px #b7b7b7;
  background: ${(props) => props.backgroundColor || "#416dea"};
  color: #fff;
  font-weight: bold;
  // margin: 1rem 0;
  margin-left: ${(props) => props.marginLeft && "2rem"};
  &:hover {
    box-shadow: none;
    background: ${(props) =>
      props.hoverColor || "linear-gradient(315deg, #89d8d3, #416dea 74%)"};
  }
  &:active {
    box-shadow: none;
    background: ${(props) =>
      props.hoverColor || "linear-gradient(315deg, #89d8d3, #416dea 74%)"};
    box-shadow: 3px 4px 10px #bbb;
  }
`;

const ChallengesTable = styled.div`
  dispaly: flex;
  border-radius: 4%;
  border: 2px #878787;
  // background-color: #dcebff;
  //   background-color: #f0f8ff;
  height: 700px;
  max-width: 1100px;
  box-shadow: 4px 7px 10px #a6a6a6;
  padding: 15px;
  //   margin-right: 30px;
`;

const ChallengeCondition = styled.div`
  border-radius: 50%;
  display: block;
  background-color: #d9e5ff;
  height: 100px;
  width: 7em;
  margin: auto;
  align-items: center;
  margin-left: 6px;
  margin-right: 6px;
`;

// const BadgeBox = styled.div`
//   width: 96%;
//   margin: auto;
//   height: 11em;
//   border: 1px solid gray;
//   border-radius: 15px;
//   display: flex;
//   flex-direction: column;
//   padding: 15px;
//   margin-bottom: 52px;
// `;

// const BadgeList = styled.div`
//   display: flex;
//   flex-direction: row;
//   width: 100%;
// `;

// const Badge = styled.div`
//   width: 7em;
//   height: 7em;
//   border-radius: 50%;
//   /* border: 1px solid black; */
//   margin: auto;
//   background: no-repeat
//     url(https://cdn.pixabay.com/photo/2019/12/01/09/08/logo-4664978__480.png);
//   background-size: cover;
// `;
// const BoxTitle = styled.span`
//   font-size: 20px;
//   font-weight: bold !important;
//   margin-bottom: 8px !important;
// `;

function Challenges() {
  return (
    <Container>
      <Wrapper>
        <ChallengesTable>
          <Title>
            챌린지1<ChallengeCondition></ChallengeCondition>
          </Title>
          <Title>
            챌린지2<ChallengeCondition></ChallengeCondition>
          </Title>
          <Title>
            챌린지3<ChallengeCondition></ChallengeCondition>
          </Title>
          <GridBox>
            <Paging>1/2/3/4/5</Paging>
            <NewChallengeEnroll>새로운챌린지등록</NewChallengeEnroll>
          </GridBox>
        </ChallengesTable>

        <HalfGridBox>
          <ToNotice>공지게시판</ToNotice>
          <ToAuthentication>인증게시판</ToAuthentication>
        </HalfGridBox>
      </Wrapper>
    </Container>
  );
}

export default Challenges;

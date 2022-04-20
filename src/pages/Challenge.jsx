import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { AnimatePresence, motion, useViewportScroll } from "framer-motion";

const Wrapper = styled.div`
  // background-color: #74b9ff;
  height: auto;
  min-height: 100%;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 100px 250px 150px 100px;
  margin: auto;
  @media screen and (min-width: 768px) {
    padding-right: 24px !important;
    padding-left: 24px !important;
  }
  @media screen and (min-width: 768px) {
    padding-right: 24px !important;
    padding-left: 24px !important;
  }
`;

const Container = styled.div`
  border-radius: 3%;
  background-color: #f0f8ff;
  height: 80vh;
  width: 1200px;
  box-shadow: 10px 8px 5px rgba(0, 0, 0, 0.5);
  margin: 40px 40px 40px 40px;
`;

const ChallengeNameBox = styled.div`
  // background-color: #ffcccc;
  // background-color: #90afff;
  background-color: #d9e5ff;
  width: 96%;
  // width: 42em;
  height: 60px;
  border-radius: 7px;
  display: flex;
  // margin: auto;
  margin-top: 20px;
  margin-bottom: 15px;
  margin-right: 15px;
  margin-left: 25px;
`;

const ChallengeName = styled.span`
  margin: 15px;
  width: 40em;
  display: block;
  color: #6e2fc7;
  font-size: 30px;
  font-weight: bold;
`;

const ContentBox = styled.div`
  background-color: none;
  // border: 2px solid gray;
  display: flex;
  height: 90%;
  width: 9em;
  margin-left: 5px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 99%;
`;

const GridBox = styled.div`
  display: grid;
  height: 90%;
  // max-width: 1280px;
  width: 97%;
  // grid-template-columns: repeat(2, 1fr);
  grid-template-columns: 8fr 3fr;
  margin: 15px 15px 15px 15px;
`;

const InfoBox = styled.div`
  display: block;
  width: 100%;
  margin: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const ChallengePeriod = styled.span`
  color: #4a0ba3;
  font-size: 23px;
  font-weight: bold !important;
  margin-left: 20px;
  margin-bottom: 8px !important;
`;

const ChallengePeople = styled.span`
  color: #4a0ba3;
  font-size: 23px;
  font-weight: bold;
  margin-left: 20px;
  margin-right: 6px;
`;

const ChallengeImg = styled.div`
  border-radius: 4%;
  // width: 31em;
  // width: 45em;
  // height: 30em;
  width: 94%;
  height: 98%;
  // border: 3px solid navy;
  margin: 2px 5px 20px 0px;
  background: no-repeat
    url(https://health.chosun.com/site/data/img_dir/2018/09/10/2018091003038_0.jpg);
  background-size: cover;
  display: flex;
  justify-content: left;
  align-items: left;
`;

const ChallengeNotice = styled.span`
  color: #4a0ba3;
  font-size: 23px;
  font-weight: bold;
  margin-left: 20px;
  margin-right: 6px;
`;

const ChallengeExplanation = styled.div`
  margin-left: 23px;
  font-size: 21px;
  margin-top: 5px;
  color: ${(props) => props.theme.titleColor};
`;

const ChallengeRewardImg = styled.div`
border-radius: 50%;
width: 12em;
height: 12em;
border: 7px solid grey:
margin: auto;
margin-left: 50px;
background: no-repeat
    url(https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F2266204454D8A84F32);
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center; 
`;

const ChallengeRewardBox = styled.div`
  border-radius: 10%;
  display: block;
  background-color: #d9e5ff;
  // height: 150px;
  // width: 10em;
  height: 270px;
  width: 98%;
  // margin: auto;
  padding: 15px;
  margin-left: 3px;
  margin-right: 12px;
`;

const EnrollBtn = styled.button`
  margin-top: 15px;
  margin-left: 90px;
  width: 100px;
  height: 30px;
  border-radius: 7px;
  border: none;
  box-shadow: 3px 4px 8px #b7b7b7;
  background: ${(props) => props.backgroundColor || "#416dea"};
  color: #fff;
  font-weight: bold;
  // border-radius: 30px;
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

//여기구분

function Challenge() {
  // const [id, setId] = useState(null);
  // const { scrollY } = useViewportScroll();
  // console.log(scrollY);

  return (
    <Wrapper>
      <Container>
        <ChallengeNameBox>
          <ChallengeName>Chanllenge : 1만보 걷기</ChallengeName>
        </ChallengeNameBox>

        <GridBox>
          <ContentBox>
            <ChallengeImg></ChallengeImg>
            <InfoBox>
              <ChallengePeriod>◎ 챌린지기간: 5월1일(일)~6월31일(목)</ChallengePeriod>
            </InfoBox>
            <InfoBox>
              <ChallengePeople>◎ 참여인원:4,871</ChallengePeople>
            </InfoBox>
            <InfoBox>
              <ChallengeNotice>◎ 인증방법 및 주의사항</ChallengeNotice>
              <br />
              <ChallengeExplanation>
                60일동안 하루에 1번 인증샷을 촬영하셔야 합니다.
                <br />
                인증샷 피드에 인증샷이 공개됩니다.
                <br />
                스마트워치 혹은 앱 화면 "캡쳐"만 가능합니다.
                <br />
                동일한 사진으로 2번 이상 인증한 것으로 스탭이 판단하는 경우,
                <br />
                또는 다른 회원들의 신고를 받으신 경우, <br />
                등대에서는 추가 증빙을 요구할 수 있으며, 같은 신고가 반복될 경우 패널티가
                있을 수 있습니다.
                <br />
              </ChallengeExplanation>
            </InfoBox>
          </ContentBox>
          <div>
            <ChallengeRewardBox>
              <ChallengeRewardImg />
              <EnrollBtn>신청하기</EnrollBtn>
            </ChallengeRewardBox>
          </div>
        </GridBox>
      </Container>
    </Wrapper>
  );
}

export default Challenge;

import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { challengeId } from "../Atom";
import axios from "axios";

const Wrapper = styled.div`
  height: auto;
  min-height: 100%;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 100px 0px 150px 0px;
  margin: auto;
  margin-top: 5vh;
  margin-bottom: 3vh;
  @media screen and (max-width: 1150px) {
    padding-right: 24px !important;
    padding-left: 24px !important;
  }
  @media screen and (max-width: 768px) {
    padding-right: 24px !important;
    padding-left: 24px !important;
  }
`;

const Container = styled.div`
  height: 600px;
  width: 100%;
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const GoalBox = styled.div`
  width: 96%;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 52px;
`;

const ChallengeBox = styled(motion.div)`
  width: 55%;
  height: 100px;
  border-radius: 10px;
  border: 2px solid gray;
  display: flex !important;
  flex-direction: column;
  padding: 20px;
  margin-bottom: 10px;
  cursor: pointer;
  @media screen and (max-width: 1150px) {
    width: 70%;
  }
  @media screen and (max-width: 768px) {
    width: 80%;
  }
`;

const GoalTitle = styled.span`
  font-size: 22px;
  font-weight: bold;
  margin-right: 6px;
`;

const Explanation = styled.span`
  font-size: 15px;
`;

const GridBox = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr 1fr;
`;

const LeftGrid = styled.div`
  width: 100%;
  height: 60px;
`;

const MiddleGrid = styled.div`
  width: 100%;
  height: 60px;
`;

const RightGrid = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const Stamp = styled(motion.div)`
  transform: rotate(-20deg);
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 3px double #e74c3c;
  color: #e74c3c;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 1rem;
  position: absolute;
`;

const myVars = {
  start: { scale: 0 },
  end: { scale: 1, rotateZ: 360, transition: { type: "spring", damping: 8 } },
};

function ChanllengeList() {
  const [challenge, setChallenge] = useState();
  const [isChallengeId, setIsChallengeId] = useRecoilState(challengeId);
  const navigate = useNavigate();
  const onClicked = (id) => {
    setIsChallengeId(id);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8082/api/challenge")
      .then((Response) => {
        console.log(Response.data);
        setChallenge(Response.data);
      })
      .catch((Error) => console.log(Error));
  }, []);

  return (
    <Wrapper>
      <Container>
        {challenge &&
          challenge.map((challenge) => (
              <ChallengeBox onClick={() => {
                onClicked();
                navigate(`/challenge/${challenge.id}`);
              }} key={challenge.id}>
                <GridBox>
                  <LeftGrid>
                    <div style={{ marginBottom: 10 }}>
                      <i
                        className="fa-solid fa-person-running"
                        style={{ fontSize: 22 }}
                      ></i>
                      <GoalTitle>&nbsp;{challenge.challengeTitle}</GoalTitle>
                      {/* <Status>진행 중</Status> */}
                    </div>
                    <div>
                      <Explanation>{challenge.challengeDesc}</Explanation>
                    </div>
                  </LeftGrid>
                  <MiddleGrid>
                    {challenge.challengeState === 0 ? (
                      <Stamp variants={myVars} initial="start" animate="end">
                        terminated!
                      </Stamp>
                    ) : null}
                  </MiddleGrid>
                  <RightGrid>
                    <div>기간 : {challenge.period}일</div>
                    <div>신청자 0명</div>
                  </RightGrid>
                </GridBox>
              </ChallengeBox>
          ))}
        {/* <ChallengeBox onClick={() => onClicked()}>
          <GridBox>
            <LeftGrid>
              <div style={{ marginBottom: 10 }}>
                <i className="fa-solid fa-person-running" style={{ fontSize: 22 }}></i>
                <GoalTitle>&nbsp;챌린지 제목</GoalTitle>
                <Status>진행 중</Status>
              </div>
              <div>
                <Explanation>챌린지 설명</Explanation>
              </div>
            </LeftGrid>
            <MiddleGrid>
              <Stamp variants={myVars} initial="start" animate="end">
                terminated!
              </Stamp>
            </MiddleGrid>
            <RightGrid>
              <div>기간 : 2주</div>
              <div>신청자 0명</div>
            </RightGrid>
          </GridBox>
        </ChallengeBox> */}
        {/* <ChallengeBox></ChallengeBox>
        <ChallengeBox></ChallengeBox>
        <ChallengeBox></ChallengeBox> */}
      </Container>
    </Wrapper>
  );
}

export default ChanllengeList;

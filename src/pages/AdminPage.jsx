import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  margin: 18vh auto;
  min-height: 90vh;

  color: ${(props) => props.theme.titleColor};
`;

const Wrapper = styled.div`
  width: 100%;
`;

const Title = styled.div`
  width: 80%;
  height: 100px;
  background: #fafafa;
  border-radius: 20px;
  box-shadow: ${(props) => props.theme.boxShadow};
  display: flex;
  align-items: center;
  /* justify-content: center; */
  margin: 2rem auto;
  position: relative;
  padding: 0 20px;
  cursor: pointer;
  &:hover {
    background: #ebf7ff;
  }
  @media screen and (max-width: 1350px) {
  }
  @media screen and (max-width: 768px) {
    width: 95%;
    margin: 10px 10px;
    padding: 0 15px;
  }
`;

const ChallengeCondition = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #d9e5ff;
  position: absolute;
  top: 50%;
  right: 4rem;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const GridBox = styled.div`
  height: 60px;
  width: 90%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NewChallengeEnroll = styled.button`
  padding: 0.5rem 3rem;
  border: none;
  box-shadow: ${(props) => props.theme.boxShadow};
  background: #416dea;
  color: #fff;
  font-weight: bold;
  border-radius: 30px;
  &:hover {
    box-shadow: none;
    background: linear-gradient(315deg, #89d8d3, #416dea 74%);
  }
  &:active {
    background: linear-gradient(315deg, #89d8d3, #416dea 74%);
    box-shadow: 3px 4px 10px #bbb;
  }
`;

const BtnGridBox = styled.div`
  height: 80px;
  max-width: 1000px;
  margin: 2rem auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ToNotice = styled.button`
  padding: 10px;
  text-align: center;
  width: 160px;
  height: 40px;
  border-radius: 5px;
  border: none;
  box-shadow: ${(props) => props.theme.boxShadow};
  background: ${(props) => props.backgroundColor || "#416dea"};
  color: #fff;
  font-weight: bold;
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

const ToUserList = styled(ToNotice)``;

const DeleteBtn = styled.div`
  width: 24px;
  height: 24px;
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-weight: bold;
  padding: 4px;
  cursor: pointer;
  &:hover {
    color: #888;
  }
`;

const ChallengesTable = styled.div`
  border-radius: 40px;
  /* background-color: #fafafa; */
  max-width: 1100px;
  min-height: 420px;
  padding: 2rem 0;
  box-shadow: ${(props) => props.theme.boxShadow};
  /* padding: 15px; */
  margin: auto;
  @media screen and (max-width: 1150px) {
  }
  @media screen and (max-width: 768px) {
    border-radius: 30px;
    width: 92%;
  }
`;

function AdminPage() {
  const [challenge, setChallenge] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        // "http://localhost:8082/api/challenge"
        `http://springbootlhchallenge-env.eba-am3tqpey.us-east-1.elasticbeanstalk.com/api/challenge`
      )
      .then((Response) => {
        // console.log(Response.data);
        setChallenge(Response.data);
      });
  }, [setChallenge]);

  return (
    <Container>
      <Wrapper>
        <ChallengesTable>
          <GridBox>
            <Link to="/set/challenge">
              <NewChallengeEnroll type="button">새로운챌린지등록</NewChallengeEnroll>
            </Link>
          </GridBox>
          {challenge &&
            challenge.map((challenge) => (
              <Title key={challenge.id} onClick={() => navigate(`/challenges/${challenge.id}`)}>
                {challenge.challengeTitle}
                <ChallengeCondition>
                  {challenge.challengeState === 0 ? "진행중" : "종료"}
                </ChallengeCondition>
              </Title>
            ))}
        </ChallengesTable>
        <BtnGridBox>
          <ToNotice onClick={() => navigate("/noti")}>공지게시판</ToNotice>
          <ToUserList onClick={() => navigate("/users")} marginLeft>
            회원목록
          </ToUserList>
        </BtnGridBox>
      </Wrapper>
    </Container>
  );
}

export default AdminPage;

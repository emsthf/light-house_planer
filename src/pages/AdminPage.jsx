import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  width: 1200px;
  margin: 20vh auto;
  min-height: 100vh;
  margin-bottom: 240px;
  color: ${(props) => props.theme.titleColor};
`;

const Wrapper = styled.div`
  width: 100%;
`;

const Title = styled.div`
  width: 800px;
  height: 100px;
  background: #fafafa;
  border-radius: 20px;
  box-shadow: 3px 5px 10px #d7d7d7;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2rem auto;
  position: relative;
  &:hover {
    background: #ebf7ff;
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
  box-shadow: 3px 4px 8px #b7b7b7;
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
  background-color: #fafafa;
  max-width: 1100px;
  box-shadow: ${(props) => props.theme.boxShadow};
  padding: 15px;
  margin: auto;
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
  }, []);

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
              <Link to={`/challenges/${challenge.id}`}>
                <Title key={challenge.id}>
                  {challenge.challengeTitle}
                  <ChallengeCondition>
                    {challenge.challengeState === 0 ? "진행중" : "종료"}
                  </ChallengeCondition>
                </Title>
              </Link>
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

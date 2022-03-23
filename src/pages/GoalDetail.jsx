import axios from "axios";
import React, { useEffect, useState } from "react";
import { ProgressBar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { goalId } from "../Atom";
import HeatMapChart from "../components/HeatMapChart";
import HeatmapChart2 from "../components/HeatmapChart2";

const Container = styled.div`
  width: 1200px;
  margin: 20vh auto;
  min-height: 100vh;
  margin-bottom: 240px;
`;

const Wrapper = styled.div`
  width: 100%;
`;

const Title = styled.div`
  width: 800px;
  height: 100px;
  background: #fafafa;
  border-radius: 20px;
  box-shadow: ${(props) => props.theme.boxShadow};
  color: ${(props) => props.theme.titleColor};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2rem auto;
`;

const Desc = styled(Title)``;

const Date = styled(Title)``;

const Check = styled.form`
  width: 400px;
  height: 80px;
  margin: 0 auto;
  background: #fafafa;
  border-radius: 20px;
  box-shadow: ${(props) => props.theme.boxShadow};
  color: ${(props) => props.theme.titleColor};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProgressBox = styled.div`
  width: 80%;
  margin: auto;
  margin-top: 25px;
`;

const Input = styled.input`
  margin-left: 1rem;
  width: 1rem;
  height: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem 3rem;
  border: none;
  box-shadow: ${(props) => props.theme.boxShadow};
  background: ${(props) => props.backgroundColor || "#416dea"};
  color: #fff;
  font-weight: bold;
  border-radius: 30px;
  margin: 1rem 0;
  margin-left: ${(props) => props.marginLeft && "2rem"};
  &:hover {
    box-shadow: none;
    background: ${(props) =>
      props.hoverColor || "linear-gradient(315deg, #89d8d3, #416dea 74%)"};
  }
  &:active {
    background: ${(props) =>
      props.hoverColor || "linear-gradient(315deg, #89d8d3, #416dea 74%)"};
    box-shadow: 3px 4px 10px #bbb;
  }
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 1rem 0;
`;

const Post = styled.div`
  width: 80%;
  margin: 0 auto;
  border-top: 1px solid #bbb;
  border-bottom: 1px solid #bbb;
  box-sizing: border-box;
`;

const StyledLink = styled(Link)`
  padding: 0.5rem 2rem;
  display: flex;
  justify-content: space-between;
  &:hover {
    background: #fafafa;
  }
`;

function GoalDetail() {
  const [isGoalId, setIsGoalId] = useRecoilState(goalId);
  const [goal, setGoal] = useState({});
  const [now, setNow] = useState();
  const [checked, setChecked] = useState(false);
  const url = `http://localhost:8080/api/goal/${isGoalId}`;
  const navigate = useNavigate();

  // 목표 세부 조회
  useEffect(() => {
    axios
      .get(url)
      .then((Response) => {
        setGoal(Response.data);
        console.log(Response.data);
        setNow(
          (
            (Response.data.count /
              (Math.ceil(Response.data.totalCount / 7) * Response.data.weekCount +
                (Response.data.totalCount % 7))) *
            100
          ).toFixed(2)
        );
      })
      .catch((Error) => {
        console.log(Error);
      });
  }, [now]);

  // const now = 60;

  // 목표 일일 체크
  const onChecked = () => {
    if (checked === false) {
      axios
        .put("http://localhost:8080/api/goal", {
          id: goal.id,
          goalTitle: goal.goalTitle,
          goalDesc: goal.goalDesc,
          startDay: goal.startDay,
          endDay: goal.endDay,
          weekCount: goal.weekCount,
          count: goal.count + 1,
          totalCount: goal.totalCount,
          doing: goal.doing,
          state: goal.state,
        })
        .then((Response) => {
          setChecked(!checked); // 체크 상태 변경
          window.alert("오늘 목표 달성!");
          setNow(
            (
              (Response.data.count /
                (Math.ceil(Response.data.totalCount / 7) * Response.data.weekCount +
                  (Response.data.totalCount % 7))) *
              100
            ).toFixed(2)
          );
        })
        .catch((Error) => {
          console.log(Error);
        });
    } else {
      axios
        .put("http://localhost:8080/api/goal", {
          id: goal.id,
          goalTitle: goal.goalTitle,
          goalDesc: goal.goalDesc,
          startDay: goal.startDay,
          endDay: goal.endDay,
          weekCount: goal.weekCount,
          count: goal.count - 1,
          totalCount: goal.totalCount,
          doing: goal.doing,
          state: goal.state,
        })
        .then((Response) => {
          setChecked(!checked);
          setNow(
            (
              (Response.data.count /
                (Math.ceil(Response.data.totalCount / 7) * Response.data.weekCount +
                  (Response.data.totalCount % 7))) *
              100
            ).toFixed(2)
          );
        })
        .catch((Error) => {
          console.log(Error);
        });
    }
  };

  // 목표 삭제
  const goalDelete = (id) => {
    if (window.confirm("정말 이 목표를 지우시겠습니까?")) {
      axios
        .delete(`http://localhost:8080/api/goal/${id}`)
        .then((Response) => {
          navigate("/dash");
        })
        .catch((Error) => {
          console.log(Error);
        });
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>{goal.goalTitle ? goal.goalTitle : "목표 명"}</Title>
        <Desc>{goal.goalDesc ? goal.goalDesc : "목표 설명"}</Desc>
        <Date>
          {goal.startDay
            ? `${goal.startDay.substring(0, 10)} ~ ${goal.endDay.substring(0, 10)} 주 ${
                goal.weekCount
              }회`
            : "목표 기간"}
        </Date>
        <Check>
          <label>오늘의 목표 체크</label>
          <Input type="checkbox" onChange={() => onChecked()} />
          <Button marginLeft>인증글 쓰기</Button>
        </Check>
        <ProgressBox>
          <ProgressBar animated now={now} label={`${now}%`} style={{ height: "25px" }} />
        </ProgressBox>
        {/* <HeatMapChart /> */}
        <ButtonWrapper>
          <Button
            backgroundColor={"#373737"}
            hoverColor={"linear-gradient(315deg, #8e8e8e, #373737 74%)"}
            onClick={() => goalDelete(goal.id)}
          >
            포 기
          </Button>
        </ButtonWrapper>
      </Wrapper>
      <Post>
        <StyledLink to="/">
          <h4>post title</h4>
          <p>post date</p>
        </StyledLink>
      </Post>
    </Container>
  );
}

export default GoalDetail;

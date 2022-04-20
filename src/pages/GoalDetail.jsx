import axios from "axios";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { ProgressBar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { keyframes } from "styled-components";
import { goalId, goalState, userState } from "../Atom";
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
  margin-bottom: 4rem;
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
  font-weight: bold;
  font-size: 1.3em;
`;

const Desc = styled(Title)`
  font-weight: 400;
`;

const Date = styled(Title)`
  font-weight: 400;
`;

const Check = styled.div`
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
  &:disabled {
    background: linear-gradient(315deg, #cfcfcf, #707070 74%);
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

const Stamp = styled(motion.div)`
  width: 66px;
  height: 66px;
  border-radius: 50%;
  border: 3px double #e74c3c;
  color: #e74c3c;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 1rem;
  position: absolute;
  margin-left: 560px;
`;

const myVars = {
  start: { scale: 0 },
  end: { scale: 1, rotateZ: 360, transition: { type: "spring", damping: 5 } },
};

function GoalDetail() {
  
  const [isGoalId, setIsGoalId] = useRecoilState(goalId);
  const [goal, setGoal] = useState({});
  const [now, setNow] = useState();
  // const [checked, setChecked] = useState(false);
  const url = `http://localhost:8080/api/goal/${isGoalId}`;
  const navigate = useNavigate();

  const [checkGoal, setCheckGoal] = useRecoilState(goalState);

  const user = useRecoilValue(userState); // 로그인한 사용자
  const [post, setPost] = useState([]); // 인증글
  const [limit, setLimit] = useState(5); // 처음 화면에 보여지는 인증글 수

  // 목표 세부 조회
  useEffect(() => {
    axios
      .get(url)
      .then((Response) => {
        setGoal(Response.data);
        console.log(Response.data);
        setNow(((Response.data.count / Response.data.totalCount) * 100).toFixed(2));
      })
      .catch((Error) => {
        console.log(Error);
      });

    // 골 id로 골에 달린 모든 post 조회
    axios
      .get(`http://localhost:8081/api/post/auth/${isGoalId}`)
      .then((Response) => {
        setPost(Response.data);
      })
      .catch((Error) => console.log(Error));
  }, []);

  // 인증글쓰기로 목표 일일 체크
  const handleCheck = () => {
    setCheckGoal({
      id: goal.id,
      count: goal.count + 1,
    });
    if (post != null) {
      navigate("/authboard", { state: post[post.length - 1] });
    } else {
      navigate("/authboard");
    }
  };

  // 목표 삭제
  const goalDelete = (id) => {
    if (window.confirm("정말 이 목표를 지우시겠습니까?")) {
      console.log(id);
      axios
        .delete(`http://localhost:8080/api/goal/${id}/${user}`)
        .then((Response) => {
          axios.delete(`http://localhost:8081/api/post/${id}/${user}`); // 목표 인증글 삭제
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
        <Title>
          {goal.goalTitle ? goal.goalTitle : "목표 명"}
          {goal.state === 0 || (goal.state === 1 && goal.result === false) ? null : (
            <Stamp variants={myVars} initial="start" animate="end">
              Success!
            </Stamp>
          )}
        </Title>
        {/* <Desc>{goal.goalDesc ? goal.goalDesc : "목표 설명"}</Desc> */}
        <Desc>
          {goal ? `현재 ${goal.count} / ${goal.totalCount}회 실행` : "목표 설명"}
        </Desc>
        <Date>
          {goal.startDay
            ? `${goal.startDay.substring(0, 10)}부터 ~ ${goal.endDay.substring(
                0,
                10
              )}까지 ( 주 ${goal.weekCount}회 )`
            : "목표 기간"}
        </Date>
        {goal.state === 1 ? null : ( // 완료된 목표는 체크, 인증글 이용 못하도록
          <Check>
            <span>오늘의 목표 체크</span>
            {/* <Input type="checkbox" onChange={() => onChecked()} /> */}
            {/* 목표 시작일 0시 1분부터 인증 글 작성 가능 */}
            <Button
              marginLeft
              onClick={handleCheck}
              disabled={
                new window.Date(goal.startDay) - 9 * 59 * 60 * 1000 >= new window.Date()
              }
            >
              인증글 쓰기
            </Button>
          </Check>
        )}

        <ProgressBox>
          <ProgressBar
            animated
            now={now}
            label={`${now}%`}
            style={{ width: "100%", height: "25px" }}
          />
        </ProgressBox>
        {/* <HeatMapChart /> */}
        <ButtonWrapper>
          <Button
            backgroundColor={"#373737"}
            hoverColor={"linear-gradient(315deg, #8e8e8e, #373737 74%)"}
            onClick={() => goalDelete(goal.id)}
          >
            {goal.state === 0 ? "포 기" : "삭 제"}
          </Button>
        </ButtonWrapper>
      </Wrapper>
      {post &&
        post.slice(0, limit).map((post) => (
          <Post key={post.id}>
            <StyledLink to={`/board/${post.id}`}>
              <h4>{post.title}</h4>
              <p>{post.created}</p>
            </StyledLink>
          </Post>
        ))}
      {/* <Post>
        <StyledLink to="/">
          <h4>post title</h4>
          <p>post date</p>
        </StyledLink>
      </Post> */}
      <ButtonWrapper>
        <Button onClick={() => setLimit((prev) => prev + 5)}>더 보기</Button>
      </ButtonWrapper>
    </Container>
  );
}

export default GoalDetail;

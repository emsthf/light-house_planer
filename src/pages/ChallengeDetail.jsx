import axios from "axios";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { ProgressBar } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { keyframes } from "styled-components";
import { goalId, goalState, userState } from "../Atom";

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

function ChallengeDetail() {

  const { id } = useParams();

  const [myChallenge, setMyChallenge] = useState({});
  const user = useRecoilValue(userState); // 로그인한 사용자
  // const [post, setPost] = useState([]); // 인증글
  // const [limit, setLimit] = useState(5); // 처음 화면에 보여지는 인증글 수

  useEffect(() => {
    // axios.get(`http://localhost:8082/api/mychallenge/${id}`)
    // .then(Response => {
    //   console.log(Response.data);
    //   setMyChallenge(Response.data);
    // })
  }, []);

  return (
    <Container>
      <Wrapper>
        <Title></Title>
        <Desc></Desc>
        <Date></Date>
        <Check>
            <span>오늘의 목표 체크</span>
            <Button marginLeft>인증글 쓰기</Button>
          </Check>
        <ProgressBox>
          {/* <ProgressBar
            animated
            now={now}
            label={`${now}%`}
            style={{ width: "100%", height: "25px" }}
          /> */}
        </ProgressBox>
        <ButtonWrapper>
          <Button
            backgroundColor={"#373737"}
            hoverColor={"linear-gradient(315deg, #8e8e8e, #373737 74%)"}
          >
            포 기
          </Button>
        </ButtonWrapper>
      </Wrapper>
      {/* {post &&
        post.slice(0, limit).map((post) => (
          <Post key={post.id}>
            <StyledLink to={`/board/${post.id}`}>
              <h4>{post.title}</h4>
              <p>{post.created}</p>
            </StyledLink>
          </Post>
        ))} */}
      {/* <ButtonWrapper>
        <Button>더 보기</Button>
      </ButtonWrapper> */}
    </Container>
  );
}

export default ChallengeDetail;

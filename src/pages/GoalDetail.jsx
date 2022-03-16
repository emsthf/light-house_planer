import React from "react";
import { ProgressBar } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";
import HeatMapChart from "../components/HeatMapChart";
import HeatmapChart2 from "../components/HeatmapChart2";

const Container = styled.div`
  width: 1200px;
  margin: 20vh auto;
  min-height: 100vh;
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
`;

const Desc = styled(Title)``;

const Date = styled(Title)``;

const Check = styled.form`
  width: 400px;
  height: 80px;
  margin: 0 auto;
  background: #fafafa;
  border-radius: 20px;
  box-shadow: 3px 5px 10px #d7d7d7;
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
  box-shadow: 3px 4px 8px #b7b7b7;
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
    box-shadow: none;
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
  const now = 30;

  return (
    <Container>
      <Wrapper>
        <Title>목표명</Title>
        <Desc>설명</Desc>
        <Date>기간</Date>
        <Check>
          <label>오늘의 목표 체크</label>
          <Input type="checkbox"></Input>
          <Button marginLeft>인증글 쓰기</Button>
          {/* <Chart></Chart> */}
        </Check>
        <ProgressBox>
          <ProgressBar animated now={now} label={`${now}%`} style={{ height: "25px" }} />
        </ProgressBox>
        <HeatmapChart2 />
        <ButtonWrapper>
          <Button
            backgroundColor={"#373737"}
            hoverColor={"linear-gradient(315deg, #8e8e8e, #373737 74%)"}
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

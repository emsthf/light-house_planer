import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  width: 1200px;
  margin: 0 auto;
`;

const Wrapper = styled.div`
  width: 100%;
`;

const Title = styled.div`
  width: 800px;
  height: 100px;
  border-radius: 20px;
  background: #fad390;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem auto;
`;

const Desc = styled(Title)``;

const Date = styled(Title)``;

const Check = styled.form`
  width: 400px;
  height: 80px;
  margin: 0 auto;
  border-radius: 20px;
  background: #fad390;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  margin-left: 1rem;
  width: 1rem;
  height: 1rem;
`;

const Button = styled.button`
  padding: 0.2rem 1rem;
  margin-left: ${(props) => props.marginLeft && "2rem"};
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
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
  box-sizing: border-box;
`;

const StyledLink = styled.a`
  padding: 0.2rem 2rem;
  display: flex;
  justify-content: space-between;
`;

function GoalDetail() {
  return (
    <Container>
      <Wrapper>
        <Title>목표명</Title>
        <Desc>설명</Desc>
        <Date>기간</Date>
        <Check>
          <label>오늘의 목표 체크</label>
          <Input type="checkbox"></Input>
          <Button marginLeft>인증글쓰기</Button>
          {/* <Progress></Progress>
                    <Chart></Chart> */}
        </Check>
        <ButtonWrapper>
          <Button>포기</Button>
        </ButtonWrapper>
      </Wrapper>
      <Post>
        <StyledLink href="#">
          <h4>post title</h4>
          <p>post date</p>
        </StyledLink>
      </Post>
    </Container>
  );
}

export default GoalDetail;

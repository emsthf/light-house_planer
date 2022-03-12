import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 1200px;
  margin: 0 auto;
`;

const Setting = styled.div`
  width: 90%;
  min-height: 80vh;
  margin: 10vh auto;
  background: #eee;
`;

const Wrapper = styled.div`
  width: 80%;
  margin: 0 auto;
`;

const MainTitle = styled.h2`
  text-align: center;
  box-sizing: border-box;
  padding: 4rem 0 2rem 0;
`;

const SubTitle = styled.h3`
  margin: 2rem 0;
`;

const Content = styled.div`
  width: 100%;
  height: 2rem;
  border: 1px solid #000;
  border-radius: 20px;
`;

const Textarea = styled.textarea`
  margin-top: 0.5rem;
  padding: 1rem;
  width: 800px;
  height: 80px;
  border-radius: 20px;
`;

const ErrorMessage = styled.div`
  font-size: 0.8rem;
  margin: 0.5rem 0 0 1rem;
  color: #888;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 1rem 0;
`;

const Button = styled.button`
  padding: 0.2rem 1rem;
  margin-left: ${(props) => props.marginLeft && "2rem"};
`;

function SetGoalStep5() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const resetGoal = () => {
    navigate("/");
  };

  return (
    <Container>
      <Setting>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Wrapper>
            <MainTitle>목표 설정</MainTitle>
            <SubTitle>5 / 5 단계</SubTitle>
            <h4>나의 목표</h4>
            <Content></Content>
            <h4>나의 목표 기간</h4>
            <Content></Content>
            <h4>나의 목표 실행횟수</h4>
            <Content></Content>
            <h4>나의 목표에 대한 설명</h4>
            <Textarea {...register("goalDesc", { required: true })}></Textarea>
            <ErrorMessage>
              {errors.goalDesc?.type === "required" &&
                "목표에 대한 구체적인 설명을 입력해주세요."}
            </ErrorMessage>
            <ButtonWrapper>
              <Button>등 록</Button>
              <Button marginLeft type="button" onClick={resetGoal}>
                다시 등록하기
              </Button>
            </ButtonWrapper>
          </Wrapper>
        </form>
      </Setting>
    </Container>
  );
}

export default SetGoalStep5;

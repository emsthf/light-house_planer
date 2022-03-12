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

const ErrorMessage = styled.div`
  font-size: 0.8rem;
  margin: 0.5rem 0 0 1rem;
  color: #888;
`;

const Desc = styled.div`
  width: 100%;
  margin: 1rem 0;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 1rem 0;
`;

const Button = styled.button`
  padding: 0.2rem 1rem;
`;

function SetGoalStep4() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    navigate("/set/5");
  };

  return (
    <Container>
      <Setting>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Wrapper>
            <MainTitle>목표 설정</MainTitle>
            <SubTitle>
              4 / 5 단계
              <br />
              일주일 중 실행할 목표 실천 횟수를 지정해주세요.
            </SubTitle>
            <select {...register("weekCount", { required: true })}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
            </select>
            <ErrorMessage>
              {errors.weekCount?.type === "required" && "실행 횟수를 선택해 주세요."}
            </ErrorMessage>
            <Desc>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
              quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat.
            </Desc>
            <ButtonWrapper>
              <Button>다 음</Button>
            </ButtonWrapper>
          </Wrapper>
        </form>
      </Setting>
    </Container>
  );
}

export default SetGoalStep4;

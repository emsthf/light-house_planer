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

const Input = styled.input`
  padding: 0.5rem 1rem;
  width: 800px;
  border-radius: 20px;
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

function SetGoalStep1() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    navigate("/set/2");
  };

  return (
    <Container>
      <Setting>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Wrapper>
            <MainTitle>목표 설정</MainTitle>
            <SubTitle>
              1 / 5 단계
              <br />
              목표를 입력하세요. 33333
            </SubTitle>
            <Input
              type="text"
              placeholder="목표를 입력하세요"
              {...register("goalTitle", {
                required: true,
                pattern: /^[A-Za-z가-힣]{2,40}$/,
              })}
            ></Input>
            <ErrorMessage>
              {errors.goalTitle?.type === "required" && "목표를 반드시 입력해주세요."}
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

export default SetGoalStep1;

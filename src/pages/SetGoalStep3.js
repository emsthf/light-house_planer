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

function SetGoalStep3() {
  // const navigate = useNavigate();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const watchStartDay = watch("startDay");
  const watchEndDay = watch("endDay");

  const onSubmit = (data) => {
    console.log(data);
    // navigate('/set/4');
    if (data.endDay <= data.startDay) {
      console.log("no good!");
      // console.log(watchStartDay);
    }
  };

  const today = new Date();
  const startDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
  const endDate = `${today.getFullYear() + 1}-${today.getMonth() + 1}-${today.getDate()}`;

  return (
    <Container>
      <Setting>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Wrapper>
            <MainTitle>목표 설정</MainTitle>
            <SubTitle>
              3 / 5 단계
              <br />
              목표 시작일과 종료일을 지정해주세요.
            </SubTitle>
            <label>
              <input
                type="date"
                {...register("startDay", {
                  required: true,
                  min: startDate,
                })}
              />
            </label>
            <label>
              <input
                type="date"
                {...register("endDay", {
                  required: true,
                  min: startDate,
                  max: endDate,
                })}
              />
            </label>
            <ErrorMessage>
              {errors.startDay?.type === "required" && "시작일을 선택해 주세요."}
              {errors.startDay?.type === "min" && "시작일은 오늘부터 선택 가능합니다."}
              <br />
              {errors.endDay?.type === "required" && "종료일을 선택해 주세요."}
              {errors.endDay?.type === "max" && "종료일은 1년 이내로 지정해 주세요."}
              {watchStartDay >= watchEndDay && "목표 기간을 다시 확인하세요."}
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

export default SetGoalStep3;

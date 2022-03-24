import axios from "axios";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { goalState } from "../../Atom";

const Container = styled.div`
  width: 1200px;
  margin: 20vh auto;
  min-height: 100vh;
  margin-bottom: 240px;
`;

const Setting = styled.div`
  width: 90%;
  height: ${(props) => props.SettingHeight || "90vh"};
  margin: 5vh auto;
  background: #fafafa;
  border-radius: 40px;
  box-shadow: ${(props) => props.theme.boxShadow};
  color: ${(props) => props.theme.titleColor};
`;

const Wrapper = styled.div`
  width: 80%;
  margin: 0 auto;
`;

const MainTitle = styled.h2`
  text-align: center;
  box-sizing: border-box;
  padding: 4rem 0 2rem 0;
  font-weight: bold;
  font-size: 1.4rem;
`;

const SubTitle = styled.h3`
  margin: 2rem 0;
  font-weight: bold;
  line-height: 1.7rem;
`;

const ErrorMessage = styled.div`
  font-size: 0.8rem;
  margin: 0.5rem 0 0 1rem;
  color: #888;
`;

const Desc = styled.div`
  width: 100%;
  margin: 1rem 0;
  color: ${(props) => props.fontColor || "#000"};
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;

const Button = styled.button`
  padding: 0.5rem 3rem;
  border: none;
  box-shadow: 3px 4px 8px #b7b7b7;
  background: #416dea;
  color: #fff;
  font-weight: bold;
  border-radius: 30px;
  margin: 1rem 0;
  margin-left: ${(props) => props.marginLeft && "2rem"};
  &:hover {
    box-shadow: none;
    background: linear-gradient(315deg, #89d8d3, #416dea 74%);
  }
  &:active {
    background: linear-gradient(315deg, #89d8d3, #416dea 74%);
    box-shadow: 3px 4px 10px #bbb;
  }
`;

const GoalTitle = styled.h4`
  margin: 1rem 0 0.4rem 0.8rem;
`;

const Content = styled.div`
  width: 95%;
  height: 4rem;
  display: flex;
  align-items: center;
  padding-left: 2rem;
  border: 1px solid #cfcfcf;
  border-radius: 20px;
`;

const Strong = styled.strong`
  font-weight: bold;
  font-size: 1.1rem;
`;

const Textarea = styled.textarea`
  margin-top: 0.5rem;
  padding: 1rem;
  width: 800px;
  height: 80px;
  border-radius: 20px;
`;

function SetGoalStep5() {
  const url = "/api/goal";
  const navigate = useNavigate();
  const setGoal = useSetRecoilState(goalState);
  const goal = useRecoilValue(goalState);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // console.log(data);

    // setGoal({
    //     ...goal,
    //     goalDesc : data.goalDesc
    // });

    axios
      .post(url, {
        ...goal,
        goalDesc: data.goalDesc,
      })
      .then((Response) => {
        console.log("Success");
        navigate("/dash");
      })
      .catch((Error) => console.log(Error));
  };
  console.log(goal);

  const resetGoal = () => {
    navigate("/set/1");
    // console.log('reset');
  };

  return (
    <Container>
      <Setting SettingHeight={"115vh"}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Wrapper>
            <MainTitle>목표 설정</MainTitle>
            <SubTitle>5 / 5 단계</SubTitle>
            <GoalTitle>- 나의 목표</GoalTitle>
            <Content>
              <p>
                <Strong>{goal.goalTitle}</Strong>
              </p>
            </Content>
            <GoalTitle>- 나의 목표 기간</GoalTitle>
            <Content>
              <p>
                {goal.startDay} ~ {goal.endDay} (총 <Strong>{goal.totalCount}</Strong>일)
              </p>
            </Content>
            <GoalTitle>- 나의 목표 실행횟수</GoalTitle>
            <Content>
              <p>
                일주일에 <Strong>{goal.weekCount}</Strong>번 실행
              </p>
            </Content>
            <GoalTitle>- 나의 목표에 대한 설명</GoalTitle>
            <Textarea {...register("goalDesc", { required: true })}></Textarea>
            <ErrorMessage>
              {errors.goalDesc?.type === "required" &&
                "목표에 대한 구체적인 설명 또는 실행 방안을 입력해주세요."}
            </ErrorMessage>
            <Desc fontColor={"#a9a9a9"}>
              직접 설정한 목표의 내용을 확인하세요.
              <br />
              맞으면 등록, 틀리면 다시 등록하기 버튼을 눌러 목표를 다시 설정해주세요.
            </Desc>
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

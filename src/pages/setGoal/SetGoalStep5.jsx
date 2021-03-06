import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { goalState, userState } from "../../Atom";

const Container = styled.div`
  padding: 0px 300px;
  margin: 20vh auto;
  margin-bottom: 240px;
  @media screen and (max-width: 1150px) {
  }
  @media screen and (max-width: 768px) {
    padding: 0px 0px 0px 0px;
  }
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
  color: ${(props) => props.fontColor || "#888"};
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
  @media screen and (max-width: 1150px) {
  }
  @media screen and (max-width: 768px) {
    font-size: 15px;
  }
`;

const GoalTitle = styled.h4`
  margin: 1rem 0 0.4rem 0.8rem;
`;

const Content = styled.div`
  width: 100%;
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
  width: 100%;
  height: 80px;
  border-radius: 20px;
`;

function SetGoalStep5() {
  // const url = "http://localhost:8080/api/goal";
  const url =
    "http://springbootgoal-env.eba-wzmejvgd.us-east-1.elasticbeanstalk.com/api/goal";

  const navigate = useNavigate();
  const setGoal = useSetRecoilState(goalState);
  const goal = useRecoilValue(goalState);
  const user = useRecoilValue(userState);
  const [errorMsg, setErrorMsg] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const totalWeekCount = Math.floor(goal.period / 7) * goal.weekCount; // ?????? ?????? ????????? ???????????? ??? count ???
  const remainderDay = goal.period - Math.floor(goal.period / 7) * 7; // ?????? ???????????? ????????? ????????? ???????????? ??? ????????? ??????

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
        totalCount:
          goal.period % 7 > goal.weekCount
            ? parseInt(totalWeekCount) + parseInt(goal.weekCount)
            : goal.period % 7 === 0
            ? totalWeekCount
            : totalWeekCount + remainderDay,
        userId: user.id,
      })
      .then((Response) => {
        if (Response.data) {
          // console.log(Response.data);
          setErrorMsg(Response.data);
        } else {
          navigate("/dash");
        }
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
            <MainTitle>?????? ??????</MainTitle>
            <SubTitle>5 / 5 ??????</SubTitle>
            <GoalTitle>- ?????? ??????</GoalTitle>
            <Content>
              <p>
                <Strong>{goal.goalTitle}</Strong>
              </p>
            </Content>
            <GoalTitle>- ?????? ?????? ??????</GoalTitle>
            <Content>
              <p>
                {goal.startDay} ~ {goal.endDay} (??? <Strong>{goal.period}</Strong>???)
              </p>
            </Content>
            <GoalTitle>- ?????? ?????? ????????????</GoalTitle>
            <Content>
              <p>
                ???????????? <Strong>{goal.weekCount}</Strong>??? ??????
              </p>
            </Content>
            <GoalTitle>- ?????? ????????? ?????? ??????</GoalTitle>
            <Textarea {...register("goalDesc", { required: true })}></Textarea>
            <ErrorMessage>
              {errors.goalDesc?.type === "required" &&
                "????????? ?????? ???????????? ?????? ?????? ?????? ????????? ??????????????????."}
            </ErrorMessage>
            <Desc fontColor={"#a9a9a9"}>
              ?????? ????????? ????????? ????????? ???????????????.
              <br />
              ????????? ??????, ????????? ?????? ???????????? ????????? ?????? ????????? ?????? ??????????????????.
              <br />
            </Desc>
            <Desc>
              <ErrorMessage fontColor={"#416dea"}>{errorMsg}</ErrorMessage>
            </Desc>
            <ButtonWrapper>
              <Button>??? ???</Button>
              <Button marginLeft type="button" onClick={resetGoal}>
                ?????? ????????????
              </Button>
            </ButtonWrapper>
          </Wrapper>
        </form>
      </Setting>
    </Container>
  );
}

export default SetGoalStep5;

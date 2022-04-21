import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../../Atom";

const Container = styled.div`
  margin: 30vh auto;
  padding: 50px 0;
  /* margin-bottom: 240px; */
`;

const FormWrapper = styled.div`
  width: 500px;
  margin: 0 auto;
  padding-bottom: 8vh;
  @media screen and (max-width: 1350px) {
    padding: 0px 250px;
    width: 100%;
  }
  @media screen and (max-width: 768px) {
    padding: 0px 25px;
    width: 100%;
  }
`;

const Title = styled.h2`
  text-align: center;
  font-size: 1.4rem;
  font-weight: bold;
`;

const Form = styled.form`
  width: 100%;
`;

const HrLine = styled.div`
  border-top: 2px solid #3b4890;
  margin-top: 20px;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 1.5rem 0;
  font-size: 0.8rem;
  color: #888;
`;

const Input = styled.input`
  padding: 1rem;
  border: 0;
  width: 100%;
  border-bottom: 1px solid #000;
  background: #fafafa;
  ::placeholder {
    color: #888;
  }
  &:focus {
    outline: none;
  }
`;

const ErrorMessage = styled.div`
  font-size: 0.8rem;
  margin: 0.5rem 0 0 1rem;
  color: #888;
`;

const SubTitle = styled.p`
  margin-bottom: 0.5rem;
`;

const InputFile = styled.input``;

const ImageThumbnail = styled.img`
  margin-top: 1rem;
  width: 480px;
  height: auto;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 1rem 0;
`;

const Button = styled.button`
  padding: ${(props) => props.padding || "0.5rem 3rem"};
  border: none;
  box-shadow: ${(props) => props.theme.boxShadow};
  background: ${(props) => props.backgroundColor || "#416dea"};
  color: #fff;
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

function UserValidation() {

  const navigate = useNavigate();
  const [loginUser, SetLoginUser] = useRecoilState(userState);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  console.log(loginUser.password, " 로그인 된 유저 비밀번호");

  const onSubmit = (data) => {
    console.log(data.password, " 서브밋");
    if (loginUser.password === data.password) {
      console.log("비밀 번호 일치!!!");
      navigate("/updateprofile");
    } else {
      alert("비밀번호가 틀렸습니다.");
    }
  };

  return (
    <Container>
      <FormWrapper>
        <Title>Verify Password</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <HrLine />
          <Label>
            <Input
              type="password"
              placeholder="비밀번호 확인"
              {...register("password", {
                required: true
              })}
            ></Input>
            <ErrorMessage>
              {errors.password?.type === "required" && "비밀번호를 입력해주세요."}
            </ErrorMessage>
          </Label>
          <ButtonWrapper>
            <Button>확인</Button>
          </ButtonWrapper>
        </Form>
      </FormWrapper>
    </Container>
  );
}

export default UserValidation;

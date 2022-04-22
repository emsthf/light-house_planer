import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../../Atom";

const Container = styled.div`
  margin: 25vh auto;
  @media screen and (max-width: 1350px) {
    padding: 0px 250px;
    width: 100%;
    margin-bottom: 35vh;
  }
  @media screen and (max-width: 768px) {
    padding: 0px 25px;
    width: 100%;
    margin-bottom: 30vh;
  }
`;

const FormWrapper = styled.div`
  width: 500px;
  margin: 0 auto;
  padding-bottom: 8vh;
  @media screen and (max-width: 1350px) {
    padding: 0px 50px;
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

function EditUser() {
  const [img, setImg] = useState("");
  const navigate = useNavigate();
  const [loginUser, SetLoginUser] = useRecoilState(userState);

  // const delUrl = `http://localhost:8083/api/user/${loginUser.id}`;
  const delUrl = `http://springbootlhuser-env.eba-fykahfmb.us-east-1.elasticbeanstalk.com/api/user/${loginUser.id}`;

  const readFile = (e) => {
    const reader = new FileReader(); // 파일 미리보기 객체
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = function (e) {
      setImg(reader.result); // 미리보기1
    };
  };

  const [formValue, setFormValue] = useState(loginUser);

  console.log(formValue);

  const handleFormValue = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        // "http://localhost:8083/api/user/edit",
        "http://springbootlhuser-env.eba-fykahfmb.us-east-1.elasticbeanstalk.com/api/user/edit",
        {
          ...formValue,
        }
      )
      .then(SetLoginUser(formValue))
      .then(alert("회원 정보가 수정되었습니다"))
      .then(navigate("/dash"))
      .catch((Error) => console.log(Error));
  };

  // 회원 탈퇴
  const deleteUser = () => {
    axios
      .delete(delUrl)
      .then(alert("탈퇴되었습니다."))
      .then(
        SetLoginUser({
          id: 0,
          name: "",
          email: "",
          password: "",
          phoneNum: "",
        })
      )
      .then(navigate("/"))
      .catch((Error) => console.log(Error));
  };

  return (
    <Container>
      <FormWrapper>
        <Title>Update Profile</Title>
        <Form onSubmit={onSubmit}>
          <Label>
            <Input
              type="text"
              placeholder="이름"
              name="name"
              value={formValue.name || ""}
              readOnly
            ></Input>
          </Label>
          <Label>
            <Input
              type="text"
              placeholder="이메일"
              name="email"
              onChange={handleFormValue}
              value={formValue.email || ""}
              readOnly
            ></Input>
          </Label>
          <Label>
            <Input
              type="password"
              placeholder="비밀번호(영문자 및 숫자 8자 이상)"
              name="password"
              onChange={handleFormValue}
            ></Input>
          </Label>
          <Label>
            <Input
              type="text"
              placeholder="전화번호 ( - 제외 입력)"
              name="phoneNum"
              onChange={handleFormValue}
              value={formValue.phoneNum || ""}
            ></Input>
          </Label>
          {/* <Label>
            <SubTitle>프로필 이미지</SubTitle>
            <InputFile
              type="file"
              accept="image/*"
              {...register("img")}
              onChange={(e) => {
                readFile(e);
              }}
            ></InputFile>
            {img && <ImageThumbnail src={img} alt="thumbnail" />}
          </Label> */}
          <ButtonWrapper>
            <Button>수정</Button>
            <Button marginLeft type="button" onClick={deleteUser}>
              탈퇴
            </Button>
          </ButtonWrapper>
        </Form>
      </FormWrapper>
    </Container>
  );
}

export default EditUser;

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../../Atom";

const Container = styled.div`
  margin: 20vh auto;
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

function SignUp() {
  const [user, setUser] = useState({});
  const [img, setImg] = useState("");
  const navigate = useNavigate();
  const [loginUser, SetLoginUser] = useRecoilState(userState);
  const [userDetail, setUserDetail] = useState({});

  // const delUrl = `http://springbootlhuser-env.eba-fykahfmb.us-east-1.elasticbeanstalk.com/api/user/${user.id}`;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    defaultValues: {
      name: loginUser.name,
      email: loginUser.email,
      phone: loginUser.phoneNum,
    },
  });

  const readFile = (e) => {
    const reader = new FileReader(); // 파일 미리보기 객체
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = function (e) {
      setImg(reader.result); // 미리보기1
    };
  };

  const onSubmit = (data) => {
    console.log(data);
    console.log("서브밋");
    // setUser({
    //   name: data.name,
    //   email: data.email,
    //   password: data.password,
    //   phoneNum: data.phone,
    //   // img: data.img
    // });
    axios
      .post(
        // "http://localhost:8083/api/signup",
        "http://springbootlhuser-env.eba-fykahfmb.us-east-1.elasticbeanstalk.com/api/signup",
        {
          name: data.name,
          email: data.email,
          password: data.password,
          phoneNum: data.phone,
        }
      )
      // .then(console.log(data))
      .then(navigate("/"))
      .catch((Error) => console.log(Error));
  };

  // 회원 탈퇴
  // const deleteUser = () => {
  //   axios.delete(delUrl)
  //   .then(console.log('delete'))
  //   .catch(Error => console.log(Error));
  // }

  // const resetForm = () => {
  //   reset({
  //     name: "",
  //     email: "",
  //     password: "",
  //     passwordConfirm: "",
  //     phone: "",
  //   });
  // };

  // useEffect(() => {
  //   axios
  //     .get(
  //       `http://localhost:8083/api/user/get/${loginUser.id}`
  //       // `http://springbootlhuser-env.eba-fykahfmb.us-east-1.elasticbeanstalk.com/api/user/get/${loginUser.id}`
  //     )
  //     .then((res) => {
  //       setUserDetail(res.data);
  //       console.log(res);
  //     });
  //   console.log(userDetail);
  // }, []);

  return (
    <Container>
      <FormWrapper>
        <Title>SIgnUp</Title>
        <Form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <Label>
            <Input
              type="text"
              placeholder="이름"
              {...register("name", {
                required: true,
                pattern: /^[A-Za-z0-9가-힣]{2,20}$/,
              })}
            ></Input>
            <ErrorMessage>
              {errors.name?.type === "required" && "이름을 입력해주세요."}
            </ErrorMessage>
          </Label>
          <Label>
            <Input
              type="text"
              placeholder="이메일"
              {...register("email", {
                required: true,
                pattern: /^([a-z0-9+_.-]+)@([\da-z+-]+)\.([a-z\.]{2,6})$/,
              })}
            ></Input>
            <ErrorMessage>
              {errors.email?.type === "required" && "이메일을 입력해주세요."}
            </ErrorMessage>
          </Label>
          <Label>
            <Input
              type="password"
              placeholder="비밀번호(영문자 및 숫자 8자 이상)"
              {...register("password", {
                required: true,
                pattern: /^(?=.*\d)(?=.*[A-Za-z])[A-Za-z\d]{8,}$/,
              })}
            ></Input>
            <ErrorMessage>
              {errors.password?.type === "required" && "비밀번호를 입력해주세요."}
              {errors.password?.type === "pattern" &&
                "비밀번호는 영문자 및 숫자 8자 이상이어야 합니다."}
            </ErrorMessage>
          </Label>
          <Label>
            <Input
              type="password"
              placeholder="비밀번호 확인"
              {...register("passwordConfirm", {
                required: true,
                pattern: /^(?=.*\d)(?=.*[A-Za-z])[A-Za-z\d]{8,}$/,
              })}
            ></Input>
            <ErrorMessage>
              {errors.passwordConfirm?.type === "required" &&
                "다시 한번 비밀번호를 입력해주세요."}
              {watch("password") !== "" &&
                watch("passwordConfirm") !== "" &&
                watch("password") !== watch("passwordConfirm") &&
                "비밀번호를 다시 확인해주세요."}
            </ErrorMessage>
          </Label>
          <Label>
            <Input
              type="text"
              placeholder="전화번호 ( - 제외 입력)"
              {...register("phone", {
                required: true,
                pattern: /(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/g,
              })}
            ></Input>
            <ErrorMessage>
              {errors.phone?.type === "required" && "전화번호를 입력해주세요."}
            </ErrorMessage>
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
            <Button>가입</Button>
          </ButtonWrapper>
        </Form>
      </FormWrapper>
    </Container>
  );
}

export default SignUp;

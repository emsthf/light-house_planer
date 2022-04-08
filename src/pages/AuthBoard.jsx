import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { goalState } from "../Atom";

const Container = styled.div`
  height: auto;
  min-height: 100%;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 100px 250px 150px 100px;
  margin: auto;
  margin-top: 5vh;
  @media screen and (min-width: 768px) {
    padding-right: 24px !important;
    padding-left: 24px !important;
  }
  @media screen and (min-width: 768px) {
    padding-right: 24px !important;
    padding-left: 24px !important;
  }
`;

const Wrapper = styled.div`
  border-radius: 4px;
  border: 2px #878787;
  // height: 900px;
  /* height: 98vh; */
  width: 99%;
  padding: 5px;
  margin-left: 5px;
  margin-right: 5px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const AuthboardFrame = styled.div`
  background-color: #fdffff;
  width: 98%;
  box-shadow: ${(props) => props.theme.boxShadow};
  // min-height: 90vh;
  display: flex;
  border-radius: 4%;
  text-align: center;
  font-weight: bold;
  padding: 20px;
  margin-top: 10px;
  margin-left: 10px;
  margin-bottom: 10px;
`;

const Writer = styled.div`
  /* // background-color: #74b9ff; */
  background-color: #f7f6f6;
  color: black;
  width: 7%;
  border-radius: 7px;
  text-align: center;
  font-weight: bold;
  padding: 10px;
  margin-top: 10px;
  margin-left: 10px;
  margin-bottom: 10px;
`;

const GridBox = styled.div`
  display: grid;
  /* height: 100%; */
  max-width: 100%;
  /* grid-template-columns: repeat(2, 1fr);
  grid-template-columns: 1fr 6fr; */
`;

const ContentBox = styled.form`
  // background-color: white;
  width: 100%;
  border-radius: 7px;
  text-align: center;
  font-weight: bold;
  padding: 3px;
  margin-top: 3px;
  margin-left: 0px;
  margin-bottom: 3px;
`;

const Title = styled.div`
  background-color: gray;
  width: 90%;
  border-radius: 7px;
  text-align: center;
  font-weight: bold;
  padding: 10px;
  margin-top: 10px;
  margin-left: 10px;
  margin-bottom: 10px;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 0.7rem 0;
  font-size: 0.8rem;
  color: #888;
`;

const TitleContent = styled.input`
  background-color: #f7f6f6;
  width: 98%;
  height: 65px;
  border-radius: 7px;
  text-align: left;
  font-weight: bold;
  padding: 10px;
  margin-top: 5px;
  margin-left: 0px;
  margin-bottom: 5px;
`;

const Content = styled.textarea`
  background-color: #f7f6f6;
  width: 98%;
  height: 600px;
  border-radius: 7px;
  text-align: left;
  /* font-weight: bold; */
  padding: 10px;
  margin-top: 5px;
  margin-left: 0px;
  margin-bottom: 5px;
  font-size: 1rem;
  box-sizing: border-box;
  padding: 2rem;
`;

const PictureUploadBox = styled.input`
  background-color: #f7f6f6;
  width: 98%;
  height: 48px;
  border-radius: 7px;
  text-align: left;
  font-weight: bold;
  padding: 10px;
  margin-top: 0px;
  margin-right: 10px;
`;

const RightSideGridBox = styled.div`
  display: grid;
  /* height: 100%; */
  max-width: 99%;
  grid-template-columns: repeat(2, 1fr);
  grid-template-columns: 6fr 1fr;
`;

const CancleBtn = styled.button`
  height: 45px;
  width: 15%;
  padding: 10px;
  margin-top: 25px;
  margin-left: 870px;
  margin-right: 5px;
  margin-bottom: 20px;
  border-radius: 7px;
  border: none;
  box-shadow: 3px 4px 8px #b7b7b7;
  background: ${(props) => props.backgroundColor || "#416dea"};
  color: #fff;
  font-weight: bold;
  // margin: 1rem 0;
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

const EnrollEditBtn = styled.button`
  height: 45px;
  width: 15%;
  padding: 10px;
  margin-top: 25px;
  margin-left: 870px;
  margin-right: 5px;
  margin-bottom: 20px;
  border-radius: 7px;
  border: none;
  box-shadow: 3px 4px 8px #b7b7b7;
  background: ${(props) => props.backgroundColor || "#416dea"};
  color: #fff;
  font-weight: bold;
  // margin: 1rem 0;
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

const ImageThumbnail = styled.img`
  margin-top: 1rem;
  width: 480px;
  height: auto;
`;

function AuthBoard() {
  const [post, setPost] = useState({});
  const [img, setImg] = useState("");
  const goal = useRecoilValue(goalState); // count check할 goalId
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();

  const today = new Date();
  const todayYear = today.getFullYear();
  const todayMonth =
    today.getMonth() >= 9 ? `${today.getMonth() + 1}` : `0${today.getMonth() + 1}`;
  const todayDate = today.getDate() > 9 ? `${today.getDate()}` : `0${today.getDate()}`;
  const now = `${todayYear}-${todayMonth}-${todayDate}`;

  const onSubmit = (data) => {
    console.log("submit");
    console.log(data);

    axios.post('http://localhost:8081/api/post', {
      categoryId : 1,
      title : data.title,
      content : data.content,
      created : now,
      goalId : goal.id,
      // postImg : data.img
    }).then(Response => {
      console.log(Response.data);
      if(Response.data != null) {
        axios.put(`http://localhost:8080/api/goal/${goal.id}`, {
          ...goal,
          checkDate : now,
          postId : Response.data
        })
      }
    }).then(navigate('/dash')).catch(Error => console.log(Error))
  };

  const readFile = (e) => {
    const reader = new FileReader(); // 파일 미리보기 객체
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = function (e) {
      setImg(reader.result); // 미리보기1
    };
  };

  useEffect(() => { // 해당 일자에 작성한 일일 인증글이 있는 경우
    // axios.get(`http://localhost:8081/api/post/auth/find?goalId=${goal.id}&created=${now}`)
    // .then(Response => {
    //   setPost(Response.data)
    // }).catch(Error => console.log(Error));
  }, []);

  return (
    <Container>
      <Wrapper>
        <AuthboardFrame>
          <ContentBox onSubmit={handleSubmit(onSubmit)}>
            <Writer>작성자</Writer>
            <Label>
              <TitleContent
                type="text"
                {...register("title", { required: true })}
                value={post.title || ''}
              ></TitleContent>
            </Label>
            <Label>
              <Content {...register("content", { required: true })} value={post.content || ''} />
            </Label>

            <GridBox>
              <Label>
                <PictureUploadBox
                  type="file"
                  accept="image/*"
                  {...register("img")}
                  onChange={(e) => {
                    readFile(e);
                  }}
                ></PictureUploadBox>
                {img && <ImageThumbnail src={img} alt="thumbnail" />}
              </Label>
            </GridBox>
            <RightSideGridBox>
              <CancleBtn type="reset">취소버튼</CancleBtn>
              <EnrollEditBtn>등록/수정버튼</EnrollEditBtn>
            </RightSideGridBox>
          </ContentBox>
        </AuthboardFrame>
      </Wrapper>
    </Container>
  );
}

export default AuthBoard;

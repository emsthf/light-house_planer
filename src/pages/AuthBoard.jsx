import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { goalState, imgUrl, userState } from "../Atom";
import LoadingSpiner from "../components/LoadingSpiner";

const Container = styled.div`
  width: 1200px;
  margin: 20vh auto;
  min-height: 70vh;
  margin-bottom: 240px;
  @media screen and (max-width: 768px) {
    padding-right: 24px !important;
    padding-left: 24px !important;
  }
  @media screen and (max-width: 500px) {
    padding-right: 24px !important;
    padding-left: 24px !important;
  }
`;

const Wrapper = styled.div`
  width: 100%;
`;

const AuthboardFrame = styled.div`
  background-color: #fdffff;
  width: 98%;
  display: flex;
  border-radius: 4%;
  text-align: center;
  font-weight: bold;
  padding: 20px;
`;

const Writer = styled.div`
  background-color: #f7f6f6;
  color: black;
  width: 7%;
  border-radius: 7px;
  text-align: center;
  font-weight: bold;
  padding: 10px;
  margin: 10px 0 10px 10px;
`;

const GridBox = styled.div`
  width: 100%;
`;

const ContentBox = styled.form`
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

const ErrorMessage = styled.div`
  font-size: 0.8rem;
  margin: 0.5rem 0 0 1rem;
  color: #888;
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
  width: 100%;
  display: flex;
  justify-content: right;
  margin-top: 2rem;
`;

const CancleBtn = styled.button`
  padding: 0.5rem 2rem;
  border: none;
  box-shadow: 4px 8px 24px #d7d7d7;
  background: #416dea;
  color: #fff;
  border-radius: 10px;
  margin: 1rem;
  &:hover {
    box-shadow: none;
    background: ${(props) =>
      props.hoverColor || "linear-gradient(315deg, #89d8d3, #416dea 74%)"};
  }
  &:active {
    background: linear-gradient(315deg, #89d8d3, #416dea 74%);
    background: ${(props) =>
      props.hoverColor || "linear-gradient(315deg, #89d8d3, #416dea 74%)"};
    box-shadow: 2px 3px 10px #888;
  }
`;

const EnrollEditBtn = styled(CancleBtn)``;

const ImageThumbnail = styled.img`
  margin-top: 1rem;
  width: 480px;
  height: auto;
`;

function AuthBoard() {
  const [post, setPost] = useState({}); // 이미 작성된 일일 인증글이 있는 경우
  const [img, setImg] = useState("");
  const goal = useRecoilValue(goalState); // count check할 goalId
  const user = useRecoilValue(userState); // 로그인한 사용자
  const navigate = useNavigate();
  const [file, setFile] = useRecoilState(imgUrl);
  const [loadingToggle, setLoadingToggle] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);

  const location = useLocation();
  console.log(location.state);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: location.state != null ? location.state.title : null,
      content: location.state != null ? location.state.content : null,
      img: location.state != null ? location.state.img : null,
    },
  });

  const today = new Date();
  const todayYear = today.getFullYear();
  const todayMonth =
    today.getMonth() >= 9 ? `${today.getMonth() + 1}` : `0${today.getMonth() + 1}`;
  const todayDate = today.getDate() > 9 ? `${today.getDate()}` : `0${today.getDate()}`;
  const now = `${todayYear}-${todayMonth}-${todayDate}`;

  const onSubmit = (data) => {
    console.log("submit");
    console.log(data);

    // setLoadingToggle((prev) => !prev);

    if ((post.title && post.content) !== null && post.created === now) {
      setTimeout(() => {
        axios
          .put(`http://localhost:8081/api/post/${post.id}`, {
            id: post.id,
            title: data.title,
            content: data.content,
            postImg: file, // img url 넘기기
            goalId: goal.id,
            created: post.created,
          })
          .then((res) => {
            navigate(`/goal/${post.id}`);
            console.log("수정 : ", res);
            console.log("포스트 수정 img : ", file);
          })
          .catch((Error) => console.log(Error));
      }, 3000);
    } else {
      setTimeout(() => {
        axios
          .post("http://localhost:8081/api/post", {
            categoryId: 1,
            title: data.title,
            content: data.content,
            created: now,
            goalId: goal.id,
            postImg: file, // img url 넘기기
            userId: user,
            count: goal.count,
          })
          .then((Response) => {
            console.log("등록 : ", Response.data);
            console.log("포스트 등록 img : ", file);
            // setFile();
            if (Response.data != null) {
              axios
                .put(`http://localhost:8080/api/goal/${goal.id}`, {
                  ...goal,
                  checkDate: now,
                  postId: Response.data,
                  userId: user
                })
                .then((res) => {
                  console.log(res);
                  navigate("/dash");
                });
            }
          })
          .catch((Error) => console.log(Error));
      }, 3000);
    }

    // axios
    //   .post("http://localhost:8081/api/post", {
    //     categoryId: 1,
    //     title: data.title,
    //     content: data.content,
    //     created: now,
    //     goalId: goal.id,
    //     postImg: file, // img url 넘기기
    //     userId : user
    //   })
    //   .then((Response) => {
    //     console.log(Response.data);
    //     if (Response.data != null) {
    //       axios
    //         .put(`http://localhost:8080/api/goal/${goal.id}`, {
    //           ...goal,
    //           checkDate: now,
    //           postId: Response.data,
    //           userId : user,
    //           // count : goal.count
    //         })
    //         .then((res) => {
    //           console.log(res);
    //           navigate("/dash");
    //         });
    //     }
    //   })
    //   .catch((Error) => console.log(Error));
  };

  // 이미지 파일 업로드
  // const [uploadPercentage, setUploadPercentage] = useState(0);
  // const [file, setFile] = useState([]);
  // const [file, setFile] = useState();
  const upload = (e) => {
    if (document.getElementById("uploadFile").files.length) {
      setImgLoading((prev) => !prev);

      const formData = new FormData();
      formData.append("file", document.getElementById("uploadFile").files[0]);
      axios.post("http://localhost:8081/api/postImg", formData).then((res) => {
        // document.getElementById("uploadFile").value = "";
        console.log(res);
        alert("업로드 완료!");
        setImgLoading(false);

        const reader = new FileReader(); // 파일 미리보기 객체
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = function (e) {
          setImg(reader.result); // 미리보기
        };
        // setFile(file.concat([Response.data]));
        setFile(res.data);
        console.log("이미지 업로드 완료 : ", res.data);
      });
    }
  };

  useEffect(() => {
    // 해당 일자에 작성한 일일 인증글이 있는 경우
    axios
      .get(`http://localhost:8081/api/post/auth/find?goalId=${goal.id}&created=${now}`)
      .then((Response) => {
        console.log(Response.data);
        setPost(Response.data);
      })
      .catch((Error) => console.log(Error));
  }, [file]);

  return (
    <Container>
      {loadingToggle === true ? (
        <LoadingSpiner />
      ) : (
        <Wrapper>
          <AuthboardFrame>
            <ContentBox encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
              <Writer>{post.userId === 1 ? "케빈" : null}</Writer>
              <Label>
                <TitleContent
                  type="text"
                  {...register("title", { required: true })}
                  placeholder="제목을 입력해주세요"
                ></TitleContent>
                <ErrorMessage>
                  {errors.title?.type === "required" && "제목이 비어있습니다."}
                </ErrorMessage>
              </Label>
              <Label>
                <Content {...register("content", { required: true })} />
                <ErrorMessage>
                  {errors.content?.type === "required" && "내용이 비어있습니다."}
                </ErrorMessage>
              </Label>
              <GridBox>
                <Label>
                  <PictureUploadBox
                    id="uploadFile"
                    type="file"
                    accept="image/*"
                    {...register("img", { required: true })}
                    onChange={upload}
                    // onChange={(e) => {
                    //   readFile(e);
                    // }}
                  />
                  <ErrorMessage>
                    {errors.img?.type === "required" && "인증 사진이 없어요"}
                  </ErrorMessage>
                  {/* {uploadPercentage > 0 ? (
                    <ProgressBar
                      animated
                      now={uploadPercentage}
                      active
                      label={`${uploadPercentage}%`}
                      style={{ width: "90%", marginTop: 12 }}
                    />
                  ) : null} */}

                  {imgLoading === true ? (
                    <LoadingSpiner />
                  ) : (
                    img && <ImageThumbnail src={img} alt="thumbnail" />
                  )}
                  {/* {img && <ImageThumbnail src={img} alt="thumbnail" />} */}
                  {post.postImg && <ImageThumbnail src={post.postImg} alt="thumbnail" />}
                </Label>
              </GridBox>
              <RightSideGridBox>
                <CancleBtn type="reset">취 소</CancleBtn>
                <EnrollEditBtn marginLeft>
                  {post.created !== now ? "등 록" : "수 정"}
                </EnrollEditBtn>
              </RightSideGridBox>
            </ContentBox>
          </AuthboardFrame>
          {/* <div>
          <input id="uploadFile" type="file" accept="image/*" onChange={upload} />
          {img && <ImageThumbnail src={img} alt="thumbnail" />}
          <button onClick={upload}>upLoad</button>
        </div> */}
        </Wrapper>
      )}
    </Container>
  );
}

export default AuthBoard;

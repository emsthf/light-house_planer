import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  width: 60%;
  margin: 150px auto;
  min-height: 100vh;
  margin-bottom: 240px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 100%;
`;

const TitleWrapper = styled.div`
  width: 100%;
  text-align: center;
`;

const Title = styled.h3`
  font-size: 1.6rem;
  margin-bottom: 0.5rem;
`;

const InfoWrapper = styled.div`
  display: grid;
  grid-template-columns: 5fr 1fr;
`;

const Info = styled.div`
  text-align: left;
`;

const ContentWrapper = styled.div`
  width: 100%;
`;

const Content = styled.div`
  width: 100%;
  min-height: 50vh;
  border-top: 1px solid #aaa;
  border-bottom: 3px solid #3b4890;
  margin-top: 5px;
  padding: 2rem 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  word-wrap: break-word;
  line-height: 1.5em;
  white-space: pre-wrap; // <br>과 개행 문자에서 줄바꿈. 한 줄이 너무 길어서 넘칠 때에도 줄바꿈
`;

const NotiImg = styled.img`
  src: ${(props) => props.src};
  width: 500px;
  height: 600px;
  alt: "NotificationImg";
  object-fit: contain;
`;

const Comment = styled.div`
  width: 100%;
  min-height: 10vh;
  border: 1px dotted #aaa;
  margin: 0.4rem 0;
  box-sizing: border-box;
  display: flex;
  align-items: center;
`;

const CommentForm = styled.form`
  width: 90%;
  margin: 0 auto;
  display: flex;
  align-items: center;
`;

const Label = styled.label`
  margin-right: 1rem;
`;

const Textarea = styled.textarea`
  width: 80%;
  min-height: 2rem;
  padding: 0.2rem;
  resize: none;
  background: ${(props) => props.background || "#eaeaea"};
  border: none;
  border-bottom: ${(props) => props.borderBottom || "none"};
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;

const Button = styled.button`
  padding: ${(props) => props.padding || "0.5rem 2rem"};
  border: none;
  box-shadow: ${(props) => props.theme.boxShadow};
  background: ${(props) => props.backgroundColor || "#416dea"};
  color: #fff;
  border-radius: ${(props) => props.borderRadius || "30px"};
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

function NotificationDetail() {
  const { id } = useParams();
  const [noti, setNoti] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:8081/api/notification/${id}`)
      .then((Response) => {
        setNoti(Response.data);
        console.log(Response.data.notifImg);
      })
      .catch((Error) => console.log(Error));
  }, []);

  return (
    <Container>
      <Wrapper>
        <TitleWrapper>
          <Title>{noti.title}</Title>
          <InfoWrapper>
            <Info>
              admin😼&nbsp;&nbsp;|&nbsp;&nbsp;
              {noti.created}
            </Info>
            {/* <Info></Info> */}
            <Info></Info>
          </InfoWrapper>
        </TitleWrapper>
        <ContentWrapper>
          <Content>
            {noti.notifImg ? <NotiImg src={noti.notifImg} /> : null}
            {noti.content}
          </Content>
          {/* <Comment>
            <CommentForm>
              <Label>아이디</Label>
              <Textarea readOnly></Textarea>
              <Button
                padding={"0.4rem 1rem"}
                borderRadius={"10px"}
                backgroundColor={"#373737"}
                hoverColor={"linear-gradient(315deg, #8e8e8e, #373737 74%)"}
              >
                수정
              </Button>
            </CommentForm>
          </Comment>
          <CommentForm>
            <Label>아이디</Label>
            <Textarea borderBottom={"1px solid #888"} background={"#efefef"}></Textarea>
            <Button
              padding={"0.4rem 1rem"}
              borderRadius={"10px"}
              backgroundColor={"#373737"}
              hoverColor={"linear-gradient(315deg, #8e8e8e, #373737 74%)"}
            >
              작성
            </Button>
          </CommentForm> */}
        </ContentWrapper>
        <ButtonWrapper>
          <Link to="/noti">
            <Button>공지 목록</Button>
          </Link>
          {/* <Button>수정</Button>
          <Button backgroundColor={"#373737"}>삭제</Button> */}
        </ButtonWrapper>
      </Wrapper>
    </Container>
  );
}

export default NotificationDetail;

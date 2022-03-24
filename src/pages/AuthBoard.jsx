import React from "react";
import styled from "styled-components";

const Container = styled.div`
  // background-color: #e8ffe2;
  width: 1280px;
  margin: 20vh auto;
  min-height: 100vh;
  margin-bottom: 600px;
`;

const Wrapper = styled.div`
  // background-color: white;
  border-radius: 4px;
  border: 2px #878787;
  // height: 900px;
  height: 98vh;
  width: 99%;
  padding: 5px;
  margin-left: 5px;
  margin-right: 5px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const AuthboardFrame = styled.form`
  // background-color: pink;
  // background-color: #74b9ff;
  // background-color: #ebf7ff;
  background-color: #fdffff;
  width: 98%;
  height: 85vh;
  box-shadow: 4px 7px 10px #a6a6a6;
  min-height: 90vh;
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
  // background-color: #74b9ff;
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
  grid-template-columns: repeat(2, 1fr);
  grid-template-columns: 1fr 6fr;
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

const TitleContent = styled.input`
  background-color: #f7f6f6;
  width: 98%;
  height: 65px;
  border-radius: 7px;
  text-align: left;
  font-weight: bold;
  padding: 10px;
  margin-top: 10px;
  margin-left: 0px;
  margin-bottom: 10px;
`;

const Content = styled.input`
  background-color: #f7f6f6;
  width: 98%;
  height: 600px;
  border-radius: 7px;
  text-align: left;
  font-weight: bold;
  padding: 10px;
  margin-top: 10px;
  margin-left: 0px;
  margin-bottom: 10px;
`;

const PictureUploadBox = styled.input`
  background-color: #f7f6f6;
  width: 99%;
  height: 65px;
  border-radius: 7px;
  text-align: left;
  font-weight: bold;
  padding: 10px;
  margin-top: 10px;
  margin-left: 0px;
  margin-bottom: 10px;
`;

const PictureUploadBtn = styled.button`
  background-color: #f7f6f6;
  width: 90%;
  border-radius: 7px;
  text-align: center;
  font-weight: bold;
  padding: 10px;
  margin-top: 10px;
  margin-left: 10px;
  margin-bottom: 10px;
`;

const RightSideGridBox = styled.div`
  display: grid;
  /* height: 100%; */
  max-width: 99%;
  grid-template-columns: repeat(2, 1fr);
  grid-template-columns: 6fr 1fr;
`;

const CancleBtn = styled.button`
  height: 40px;
  width: 15%;
  padding: 10px;
  margin-top: 25px;
  margin-left: 870px;
  margin-right: 5px;
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
  height: 40px;
  margin-top: 25px;
  margin-left: 25px;
  margin-right: 5px;
  padding: 10px;
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

function AuthBoard() {
  return (
    <Container>
      <Wrapper>
        <AuthboardFrame>
          <ContentBox>
            <Writer>작성자</Writer>
            <TitleContent></TitleContent>
            <Content type="content" name="content" />
            <GridBox>
              <PictureUploadBtn>사진업로드버튼</PictureUploadBtn>
              <PictureUploadBox></PictureUploadBox>
            </GridBox>
            <RightSideGridBox>
              <CancleBtn>취소버튼</CancleBtn>
              <EnrollEditBtn>등록/수정버튼</EnrollEditBtn>
            </RightSideGridBox>
          </ContentBox>
        </AuthboardFrame>
      </Wrapper>
    </Container>
  );
}

export default AuthBoard;

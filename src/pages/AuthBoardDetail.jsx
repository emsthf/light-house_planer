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
`;

const AuthboardFrame = styled.form`
  // background-color: pink;
  // background-color: #74b9ff;
  // background-color: #ebf7ff;
  background-color: #fdffff;
  width: 98%;
  min-height: 90vh;
  box-shadow: 4px 7px 10px #a6a6a6;
  min-height: 10vh;
  display: flex;
  border-radius: 4%;
  text-align: center;
  font-weight: bold;
  padding: 20px;
  margin-top: 10px;
  margin-left: 10px;
  margin-bottom: 10px;
`;

const GridBox116 = styled.div`
  display: grid;
  /* height: 100%; */
  max-width: 100%;
  grid-template-columns: repeat(2, 1fr);
  grid-template-columns: 1fr 1fr 6fr;
`;

const Writer = styled.button`
  background-color: white;
  width: 90%;
  border-radius: 7px;
  text-align: center;
  font-weight: bold;
  padding: 10px;
  margin-top: 10px;
  margin-left: 10px;
  margin-bottom: 10px;
`;

const RecordDate = styled.div`
  background-color: white;
  width: 15%;
  border-radius: 7px;
  text-align: center;
  font-weight: bold;
  padding: 10px;
  margin-top: 10px;
  margin-left: 10px;
  margin-bottom: 10px;
`;

const Views = styled.div`
  background-color: white;
  width: 15%;
  border-radius: 7px;
  text-align: center;
  font-weight: bold;
  padding: 10px;
  margin-top: 10px;
  margin-left: 750px;
  margin-bottom: 10px;
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
  background-color: #ebf7ff;
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
  background-color: #ebf7ff;
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

const ReplyForm = styled.form`
  background-color: #eaeaea;
  width: 98%;
  border-radius: 7px;
  text-align: center;
  font-weight: bold;
  //   padding: 5px;
  //   margin-top: 10px;
  margin-left: 10px;
  //   margin-bottom: 10px;
`;

const GridBox1611 = styled.div`
  display: grid;
  /* height: 100%; */
  max-width: 99%;
  grid-template-columns: repeat(2, 1fr);
  grid-template-columns: 1fr 7fr 0.9fr 1fr;
`;
const GridBox181 = styled.div`
  display: grid;
  /* height: 100%; */
  max-width: 99%;
  grid-template-columns: repeat(2, 1fr);
  grid-template-columns: 1fr 8fr 1fr;
`;

const ReplyWriterId = styled.button`
  background-color: white;
  border: 2px #8d8d8d;
  width: 90%;

  border-radius: 7px;
  text-align: center;
  font-weight: bold;
  padding: 10px;
  margin-top: 10px;
  margin-left: 13px;
  margin-bottom: 10px;
`;

const Reply = styled.input`
  background-color: white;
  border: 2px #8d8d8d;
  width: 98%;
  border-radius: 7px;
  text-align: center;
  font-weight: bold;
  padding: 10px;
  margin-top: 10px;
  margin-left: 13px;
  margin-bottom: 10px;
`;

const ReplyEdit = styled.button`
  background-color: white;
  border: 2px #8d8d8d;
  width: 90%;
  border-radius: 20px;
  text-align: center;
  font-weight: bold;
  padding: 10px;
  margin-top: 10px;
  margin-left: 9px;
  margin-bottom: 10px;
`;

const ReplyDate = styled.div`
  background-color: white;
  width: 95%;
  border-radius: 7px;
  text-align: center;
  font-weight: bold;
  padding: 10px;
  margin-top: 10px;
  margin-left: 10px;
  margin-bottom: 10px;
`;

const PictureUploadBtn = styled.button`
  background-color: white;
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

const EditBtn = styled.button`
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

const DeleteBtn = styled.button`
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

const GridBox12 = styled.div`
  display: grid;
  /* height: 100%; */
  max-width: 100%;
  grid-template-columns: repeat(2, 1fr);
  grid-template-columns: 1fr 2fr;
`;

const ReplyWiterProfileRound = styled.div`
  border-radius: 10%;
  display: block;
  background-color: #d9e5ff;
  // height: 150px;
  // width: 10em;
  height: 7px;
  width: 7%;
  // margin: auto;
  padding: 10px;
  margin-left: 3px;
  margin-right: 12px;
`;

function AuthBoardDetail() {
  return (
    <Container>
      <Wrapper>
        <AuthboardFrame>
          <ContentBox>
            <TitleContent></TitleContent>
            <GridBox116>
              <Writer>작성자</Writer>
              <RecordDate>2022.03.21</RecordDate>
              <Views>views: 3,210</Views>
            </GridBox116>
            <Content type="content" name="content" />
            <ReplyForm>
              <GridBox1611>
                <ReplyWriterId>
                  <GridBox12>
                    <ReplyWiterProfileRound></ReplyWiterProfileRound>
                    아이디
                  </GridBox12>
                </ReplyWriterId>
                <Reply></Reply>
                <ReplyEdit>댓글수정</ReplyEdit>
                <ReplyDate>2022.03.22</ReplyDate>
              </GridBox1611>
              <GridBox181>
                <ReplyWriterId>
                  <GridBox12>
                    <ReplyWiterProfileRound></ReplyWiterProfileRound>
                    아이디
                  </GridBox12>
                </ReplyWriterId>
                <Reply></Reply>
                {/* <ReplyEdit>댓글수정</ReplyEdit> */}
                <ReplyDate>2022.03.22</ReplyDate>
              </GridBox181>
              <GridBox181>
                <ReplyWriterId>
                  <GridBox12>
                    <ReplyWiterProfileRound></ReplyWiterProfileRound>
                    아이디
                  </GridBox12>
                </ReplyWriterId>
                <Reply></Reply>
                {/* <ReplyEdit>댓글수정</ReplyEdit> */}
                <ReplyDate>2022.03.22</ReplyDate>
              </GridBox181>
            </ReplyForm>

            <RightSideGridBox>
              <EditBtn>수정버튼</EditBtn>
              <DeleteBtn>삭제버튼</DeleteBtn>
            </RightSideGridBox>
          </ContentBox>
        </AuthboardFrame>
      </Wrapper>
    </Container>
  );
}

export default AuthBoardDetail;

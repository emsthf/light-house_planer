import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  height: auto;
  min-height: 100%;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 100px 250px 150px 250px;
  margin: auto;
  margin-top: 5vh;
  @media screen and (max-width: 768px) {
    padding-right: 24px !important;
    padding-left: 24px !important;
  }
  @media screen and (max-width: 500px) {
    padding-right: 24px !important;
    padding-left: 24px !important;
  }
`;

const Container = styled.div`
  height: 600px;
  width: 100%;
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: pink;
`;

const Title = styled.div`
  font-size: 30px;
`;

const TagBox = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const Tag = styled.div`
  padding: 5px 10px;
  border: 1px solid gray;
  border-radius: 20px;
  text-align: center;
  margin: 0 5px;
`;

const BigTagBox = styled.div``;

const BigTag = styled.div``;

const Subscript = styled.div``;

const ContentBox = styled.div``;

function Challenge2() {
  return (
    <Wrapper>
      <Container>
        <Title>숨 쉬기 챌린지</Title>
        <TagBox>
          <Tag>2주</Tag>
          <Tag>D-4 시작</Tag>
        </TagBox>
        <BigTagBox>
          <BigTag>
            <Subscript>기간</Subscript>
          </BigTag>
        </BigTagBox>
        <ContentBox></ContentBox>
      </Container>
    </Wrapper>
  );
}

export default Challenge2;

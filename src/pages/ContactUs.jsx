import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  min-height: 100vh;
  min-width: 100vw;
  background-color: ${(props) => props.theme.bgColor};
  padding: 120px 0px 150px 0px;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  max-width: 1280px;
  margin: auto;
  margin-top: 200px;
`;

const TitleBox = styled.div`
  height: 400px;
  /* background-color: pink; */
  display: flex;
  flex-direction: column;
  padding-left: 8rem;
  span {
    font-size: 52px;
    font-family: "Source Sans Pro", sans-serif;
    font-weight: 600;
  }
`;

const InputBox = styled.div`
  height: 400px;
  background-color: #fafafa;
`;

const Desc = styled.div`
  width: 80%;
  color : #888;
  margin: 5rem auto;
`;

function ContactUs() {
  return (
    <Wrapper>
      <GridContainer>
        <TitleBox>
          <span>Have</span>
          <span>Something</span>
          <span>to Say?</span>
          <span>Contact us!</span>
        </TitleBox>
        <InputBox>
          <Desc>
          회원가입<br />
          메뉴를 통해 이용약관, 개
          인정보보호정책 동의 및 일정 양식의
          가입항목을 기입함으로써 회원에 가
          입되며, 가입 즉시 서비스를 무료로 이
          용하실 수 있습니다. 회원을 위한 이벤
          트에 참여하실 수 있습니다.
          </Desc>
        </InputBox>
      </GridContainer>
    </Wrapper>
  );
}

export default ContactUs;

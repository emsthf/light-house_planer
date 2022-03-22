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
  background-color: pink;
  display: flex;
  flex-direction: column;
  span {
    font-size: 70px;
    font-family: "Source Sans Pro", sans-serif;
    font-weight: 600;
  }
`;

const InputBox = styled.div`
  height: 400px;
  background-color: skyblue;
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
        <InputBox></InputBox>
      </GridContainer>
    </Wrapper>
  );
}

export default ContactUs;

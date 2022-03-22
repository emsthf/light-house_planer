import React, { useState } from "react";
import styled from "styled-components";
import { Parallax } from "react-scroll-parallax";

const Wrapper = styled.div`
  min-height: 100vh;
  min-width: 100vw;
  background-color: ${(props) => props.theme.bgColor};
  padding: 120px 0px 150px 0px;
`;

const Title = styled.div`
  text-align: center;
  margin-top: 185px;
  margin-bottom: 17px;
  font-size: 70px;
  line-height: 1.2em;
  font-family: "Source Sans Pro", sans-serif;
  font-weight: 600;
`;

const SubTitle = styled.div`
  text-align: center;
  margin-bottom: 80px;
`;

const OuterStepBox = styled.div`
  background-color: pink;
  width: 90%;
  height: 300px;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InnerStepBox = styled.div`
  background-color: skyblue;
  width: 80%;
  height: 200px;
  margin: auto;
`;

const FAQContainer = styled.div`
  width: 65%;
  background-color: pink;
  margin: auto;
`;

const FAQUl = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const FAQLi = styled.li`
  padding-top: 25px;
  padding-bottom: 25px;
  cursor: pointer;
  min-height: 50px;
  border-bottom: 1px solid gray;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

function SiteRule() {
  const [isOpen, setMenu] = useState(false); // 메뉴의 초기값을 false로 설정
  const toggleMenu = () => {
    setMenu((isOpen) => !isOpen); // on,off 개념 boolean
  };

  return (
    <Wrapper>
      <Title>Site Rules</Title>
      <SubTitle>Lighte House 이용방법</SubTitle>
      <OuterStepBox>
        <InnerStepBox></InnerStepBox>
      </OuterStepBox>
      <Title>FAQ</Title>
      <SubTitle>자주 묻는 질문들</SubTitle>
      <Parallax translateY={[30, -80]}>
        <FAQContainer>
          <FAQUl>
            <FAQLi onClick={() => toggleMenu()}>
              <span>How do I add a new question?</span>
              <i className="fa-solid fa-angle-down"></i>
            </FAQLi>
            <FAQLi>
              <span>How do I add a new question?</span>
              <i className="fa-solid fa-angle-down"></i>
            </FAQLi>
            <FAQLi>
              <span>How do I add a new question?</span>
              <i className="fa-solid fa-angle-down"></i>
            </FAQLi>
            <FAQLi>How do I add a new question?</FAQLi>
          </FAQUl>
        </FAQContainer>
      </Parallax>
    </Wrapper>
  );
}

export default SiteRule;

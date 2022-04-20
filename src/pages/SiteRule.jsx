import React, { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  min-height: 100vh;
  min-width: 100vw;
  background-color: ${(props) => props.theme.bgColor};
  padding: 120px 0px 150px 0px;
`;

const Title = styled.div`
  text-align: center;
  margin-top: 170px;
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
  background: url(https://www.abookforthat.com/abookforthat/uploads/2020/08/notebook-hack-habit-tracker-theres-a-book-for-that-01.jpg);
  width: 90%;
  height: 600px;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InnerStepBox = styled.div`
  background-color: ${(props) => props.theme.bgColor};
  width: 80%;
  height: 500px;
  margin: auto;
  padding: 4rem;
`;

const FAQContainer = styled.div`
  width: 65%;
  margin: auto;
`;

const FAQUl = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 50px;
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
        <InnerStepBox>
          <div>기간형 목표</div>
          <div>1. 목표의 이름을 설정하세요.</div>
          <div>
            2. 템플릿을 사용할 것인지 나에게 맞는 기간을 사용자화 할것인지 정하세요.
          </div>
          <div>
            3. 시작 날짜와 종료 날짜를 선택하세요. 최대 1년의 기간을 설정할 수 있고,<br/>
            시작날짜는 오늘로부터 1달 이내에 시작하는 날짜이어야 합니다.
          </div>
          <div>4. 일주일에 몇번을 실행할지 정하세요.</div>
          <div>5. 목표를 알맞게 설정했는지 확인하고 목표에 대한 설명을 추가하세요.</div><br />
          <div>챌린지</div>
          <div>1. 관리자가 생성한 챌린지에 신청해보세요.</div>
          <div>2. 챌린지 시작일이 되면 도전이 시작됩니다. </div>
        </InnerStepBox>
      </OuterStepBox>
      <Title>FAQ</Title>
      <SubTitle>자주 묻는 질문들</SubTitle>
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
          <FAQLi>
            <span>How do I add a new question?</span>
            <i className="fa-solid fa-angle-down"></i>
          </FAQLi>
        </FAQUl>
      </FAQContainer>
    </Wrapper>
  );
}

export default SiteRule;

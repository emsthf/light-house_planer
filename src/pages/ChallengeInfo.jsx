import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  /* width: 1200px; */
  margin: 20vh auto;
  min-height: 80vh;
  margin-bottom: 240px;
  @media screen and (max-width: 1350px) {
  }
  @media screen and (max-width: 768px) {
    padding-left: 0px;
    min-height: 60vh;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  margin-bottom: 4rem;
`;

const Title = styled.div`
  width: 800px;
  height: 100px;
  background: #fafafa;
  border-radius: 20px;
  box-shadow: ${(props) => props.theme.boxShadow};
  color: ${(props) => props.theme.titleColor};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2rem auto;
  font-weight: bold;
  font-size: 1.3em;
  @media screen and (max-width: 1350px) {
    width: 80%;
    padding: 0 100px;
  }
  @media screen and (max-width: 768px) {
    width: 92%;
    margin: 1rem 15px;
  }
`;

const Desc = styled(Title)`
  font-weight: 400;
`;

const Date = styled(Title)`
  font-weight: 400;
`;

const Check = styled.div`
  width: 400px;
  height: 80px;
  margin: 0 auto;
  background: #fafafa;
  border-radius: 20px;
  box-shadow: ${(props) => props.theme.boxShadow};
  color: ${(props) => props.theme.titleColor};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProgressBox = styled.div`
  width: 80%;
  margin: auto;
  margin-top: 25px;
`;

const Input = styled.input`
  margin-left: 1rem;
  width: 1rem;
  height: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem 3rem;
  border: none;
  box-shadow: ${(props) => props.theme.boxShadow};
  background: ${(props) => props.backgroundColor || "#416dea"};
  color: #fff;
  font-weight: bold;
  border-radius: 30px;
  margin: 1rem 0;
  margin-left: ${(props) => props.marginLeft && "2rem"};
  &:hover {
    box-shadow: none;
    background: ${(props) =>
      props.hoverColor || "linear-gradient(315deg, #89d8d3, #416dea 74%)"};
  }
  &:active {
    background: ${(props) =>
      props.hoverColor || "linear-gradient(315deg, #89d8d3, #416dea 74%)"};
    box-shadow: 3px 4px 10px #bbb;
  }
  &:disabled {
    background: linear-gradient(315deg, #cfcfcf, #707070 74%);
    box-shadow: 3px 4px 10px #bbb;
  }
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 1rem 0;
`;

const Post = styled.div`
  width: 80%;
  margin: 0 auto;
  border-top: 1px solid #bbb;
  box-sizing: border-box;
`;

const StyledLink = styled(Link)`
  padding: 0.5rem 2rem;
  display: flex;
  justify-content: space-between;
  &:hover {
    background: #fafafa;
  }
`;

function ChallengeInfo() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [challenge, setChallenge] = useState({});
  const [count, setCount] = useState(0);

  // const url1 = `http://localhost:8082/api/challenge/${id}`;
  // const url2 = `http://localhost:8082/api/challenge/${id}`
  // const url3 = `http://localhost:8082/api/mychallenge/all/${id}`;

  const url1 = `http://springbootlhchallenge-env.eba-am3tqpey.us-east-1.elasticbeanstalk.com/api/challenge/${id}`;
  const url2 = `http://springbootlhchallenge-env.eba-am3tqpey.us-east-1.elasticbeanstalk.com/api/challenge/${id}`;
  const url3 = `http://springbootlhchallenge-env.eba-am3tqpey.us-east-1.elasticbeanstalk.com/api/mychallenge/all/${id}`;

  const deleteChallenge = () => {
    if (window.confirm("챌린지를 삭제하시겠습니까?")) {
      axios
        .delete(url1)
        .then(navigate("/challenge"))
        .catch((Error) => console.log(Error));
    }
  };

  useEffect(() => {
    axios
      .get(url2)
      .then((Response) => {
        console.log(Response.data);
        setChallenge(Response.data);
      })
      .catch((Error) => console.log(Error));

    axios
      .get(url3)
      .then((Response) => {
        setCount(Response.data);
      })
      .catch((Error) => console.log(Error));
  }, []);

  return (
    <Container>
      <Wrapper>
        <Title>{challenge && challenge.challengeTitle}</Title>
        <Desc>{challenge && challenge.challengeDesc}</Desc>
        <Date>{challenge && `${challenge.startDay} ~ ${challenge.endDay}`}</Date>
        <Desc>신청 인원 : {count && count}명</Desc>
        <ButtonWrapper>
          <Button
            backgroundColor={"#373737"}
            hoverColor={"linear-gradient(315deg, #8e8e8e, #373737 74%)"}
            onClick={deleteChallenge}
          >
            삭 제
          </Button>
        </ButtonWrapper>
      </Wrapper>
    </Container>
  );
}

export default ChallengeInfo;

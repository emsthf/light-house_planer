import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { userState } from "../Atom";

const Container = styled.div`
  width: 1200px;
  margin: 20vh auto;
  min-height: 100vh;
  margin-bottom: 240px;
`;

const Wrapper = styled.div`
  width: 90%;
  margin: 0 auto;
`;

const SearchWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const SearchForm = styled.form``;

const Select = styled.select`
  width: 80px;
  text-align: center;
  height: 2rem;
`;

const SearchInput = styled.input`
  height: 2rem;
  margin-right: 1rem;
`;

const Button = styled.button`
  padding: 0.4rem 1rem;
  border: none;
  box-shadow: ${(props) => props.theme.boxShadow};
  background: ${(props) => props.backgroundColor || "#416dea"};
  color: #fff;
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
`;

const List = styled.div`
  width: 90%;
  height: 80px;
  background: #fafafa;
  border-radius: 20px;
  box-shadow: ${(props) => props.theme.boxShadow};
  color: ${(props) => props.theme.titleColor};
  display: flex;
  align-items: center;
  margin: 1rem auto;
  cursor: pointer;
  &:hover {
    background: #f0f8ff;
  }
`;

const Title = styled.div`
  margin-left: 2rem;
  font-weight: bold;
`;

const Desc = styled.div`
  flex-grow: 2;
  margin-left: 1rem;
`;

const Tag = styled.div`
  width: 48px;
  height: 48px;
  background: ${(props) => props.background || "#416dea"};
  border-radius: 50%;
  margin-right: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 0.9rem;
`;

function GoalList() {
  const user = useRecoilValue(userState);
  const [list, setList] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [result, setResult] = useState({});
  const [listState, setListState] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);

  const handleFormValue = (e) => {
    setKeyword(e.target.value);
  };

  // const url1 = `http://localhost:8080/api/goal/1/${user.id}/search?keyword=${keyword}`;
  // const url2 = `http://localhost:8080/api/dGoal/1/${user.id}`;

  const url1 = `http://springbootgoal-env.eba-wzmejvgd.us-east-1.elasticbeanstalk.com/api/goal/1/${user.id}/search?keyword=${keyword}`;
  const url2 = `http://springbootgoal-env.eba-wzmejvgd.us-east-1.elasticbeanstalk.com/api/dGoal/1/${user.id}`;

  const submitForm = (e) => {
    e.preventDefault();
    console.log(keyword);
    axios.get(url1).then((Response) => {
      console.log(Response.data);
      setResult(Response.data);
      setListState(false);
    });
  };

  useEffect(() => {
    axios
      .get(url2)
      .then((Response) => {
        //   console.log(Response.data);
        setList(Response.data);
      })
      .catch((Error) => console.log(Error));
  }, []);

  return (
    <Container>
      <Wrapper>
        <SearchWrapper>
          <SearchForm onSubmit={submitForm}>
            {/* <Select>
              <option>전체</option>
              <option>성공</option>
              <option>실패</option>
            </Select> */}
            <SearchInput onChange={handleFormValue}></SearchInput>
            <Button>Search</Button>
          </SearchForm>
        </SearchWrapper>
        {list &&
          listState === true &&
          list.map((goal) => (
            <List key={goal.id}>
              <Title>{goal.goalTitle}</Title>
              <Desc>{`(총 ${goal.totalCount}회 중 ${goal.count}회 실행)`}</Desc>
              {goal.result === true ? (
                <Tag>성공</Tag>
              ) : (
                <Tag background={"#373737"}>실패</Tag>
              )}
            </List>
          ))}
        {result.length > 0
          ? result.map((goal) => (
            <List key={goal.id}>
              <Title>{goal.goalTitle}</Title>
              <Desc>{`(총 ${goal.totalCount}회 중 ${goal.count}회 실행)`}</Desc>
              {goal.result === true ? <Tag>성공</Tag> : <Tag background={'#373737'}>실패</Tag>}
            </List>
          ))
          : null
        }
      </Wrapper>
    </Container>
  );
}

export default GoalList;

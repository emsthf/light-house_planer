import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

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
`;

const Title = styled.div`
  margin: 0 4rem;
  font-weight: bold;
`;

const Desc = styled.div`
  margin-left: 1rem;
`;

function UserList() {
  const [users, setUsers] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [result, setResult] = useState({});
  const [listState, setListState] = useState(true);

  const handleFormValue = (e) => {
    setKeyword(e.target.value);
  };

  // const url1 = `http://localhost:8083/api/user/search?keyword=${keyword}`;
  // const url2 = `http://localhost:8083/api/user/getAll`;

  const url1 = `http://springbootlhuser-env.eba-fykahfmb.us-east-1.elasticbeanstalk.com/api/user/search?keyword=${keyword}`;
  const url2 = `http://springbootlhuser-env.eba-fykahfmb.us-east-1.elasticbeanstalk.com/api/user/getAll`;

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
        // console.log(Response.data);
        setUsers(Response.data);
      })
      .catch((Error) => console.log(Error));
  }, []);

  return (
    <Container>
      <Wrapper>
        <SearchWrapper>
          <SearchForm onSubmit={submitForm}>
            <SearchInput onChange={handleFormValue}></SearchInput>
            <Button>Search</Button>
          </SearchForm>
        </SearchWrapper>
        {users &&
          listState == true &&
          users.map((user) => (
            <List key={user.id}>
              <Title>{user.email}</Title>
              <Desc>{user.name}</Desc>
              <Desc>({user.phoneNum})</Desc>
            </List>
          ))}
        {result.length > 0
          ? result.map((findUser) => (
              <List key={findUser.id}>
                <Title>{findUser.email}</Title>
                <Desc>{findUser.name}</Desc>
                <Desc>({findUser.phoneNum})</Desc>
              </List>
            ))
          : null}
      </Wrapper>
    </Container>
  );
}

export default UserList;

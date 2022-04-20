import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Pagination from "../components/Pagination";

const Wrapper = styled.div`
  height: auto;
  min-height: 100vh;
  /* width: 100vw; */
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 100px 0px 150px 0px;
  margin: auto;
  margin-top: 5vh;
  @media screen and (max-width: 768px) {
  }
  @media screen and (max-width: 500px) {
  }
`;

// const Wrapper = styled.div`
//   /* background-color: #74b9ff; */
//   height: auto;
//   min-height: 140vh;
//   width: 100%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   padding: 100px 250px 150px 100px;
//   margin: auto;
//   @media screen and (min-width: 768px) {
//     padding-right: 24px !important;
//     padding-left: 24px !important;
//   }
//   @media screen and (min-width: 768px) {
//     padding-right: 24px !important;
//     padding-left: 24px !important;
//   }
// `;

const BoardBox = styled.div`
  padding: 0px 300px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  height: 100%;
  @media screen and (max-width: 1350px) {
    padding: 0px 150px;
  }
  @media screen and (max-width: 1150px) {
    padding: 0px 150px;
  }
  @media screen and (max-width: 768px) {
    padding: 0px 25px;
  }
`;

const BoxTitle = styled.span`
  font-size: 20px;
  font-weight: bold !important;
  margin-bottom: 40px !important;
`;

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  border-style: hidden;
  @media screen and (max-width: 768px) {
  }
  @media screen and (max-width: 500px) {
  }
`;

const TH = styled.th`
  /* border: 1px solid; */
  text-align: center;
  padding: 8px;
  background-color: rgba(0, 0, 0, 0.5);
  font-weight: 100;
  color: #fff;
  @media screen and (max-width: 500px) {
    font-size: 12px;
  }
`;

const TR = styled(motion.tr)`
  /* cursor: pointer; */
  height: 45px;
  cursor: pointer;
  &:nth-child(even) {
    background-color: rgba(154, 170, 192, 0.2);
  }
  &:nth-child(odd) {
    background-color: rgba(154, 170, 192, 0.1);
  }
  &:hover {
    background-color: ${(props) => props.theme.cardBgColor};
  }
`;

const TD = styled.td`
  /* border: 1px solid; */
  text-align: ${(props) => props.textAlign || "left"};
  padding: 8px;
  vertical-align: middle; // 테이블 수직 중앙 정렬
  @media screen and (max-width: 500px) {
    font-size: 13px;
  }
`;

const PageWrapper = styled.div`
  margin-top: 4rem;
`;

function Board() {
  const [post, setPost] = useState([]);
  const [limit, setLimit] = useState(10); // 한 페이지당 게시물 수
  const [page, setPage] = useState(1); // 현재 페이지 번호
  const offset = (page - 1) * limit; // 게시물의 위치

  useEffect(() => {
    axios
      .get(
        // "http://localhost:8081/api/post"
        "http://springbootlhpost-env.eba-rktpiamg.us-east-1.elasticbeanstalk.com/api/post"
      )
      .then((Response) => {
        // console.log(Response.data);
        setPost(Response.data);
      })
      .catch((Error) => console.log(Error));
  }, []);

  const navigate = useNavigate();
  const onClicked = (id) => {
    navigate(`/board/${id}`);
  };

  return (
    // <Container>
    <Wrapper>
      <BoardBox>
        <BoxTitle>게시판</BoxTitle>
        <Table>
          <thead>
            <tr>
              <TH>Category</TH>
              <TH>Title</TH>
              <TH>작성자</TH>
              <TH>Created date</TH>
              <TH>View</TH>
            </tr>
          </thead>
          <tbody>
            {post &&
              post.slice(offset, offset + limit).map((post) => (
                <TR key={post.id} onClick={() => onClicked(post.id)}>
                  <TD textAlign={"center"}>
                    {post.category === "GOAL" ? "인증" : "챌린지"}
                  </TD>
                  <TD>{post.title}</TD>
                  <TD textAlign={"center"}>케빈</TD>
                  <TD textAlign={"center"}>{post.created}</TD>
                  <TD textAlign={"center"}>{post.view}</TD>
                </TR>
              ))}
            {/* <TR>
                <TD textAlign={"center"}>인증</TD>
                <TD>3.15 공부 인증</TD>
                <TD textAlign={"center"}>케빈</TD>
                <TD textAlign={"center"}>22.03.15</TD>
                <TD textAlign={"center"}>123</TD>
              </TR>
              <TR>
                <TD textAlign={"center"}>인증</TD>
                <TD>3.16 공부 인증</TD>
                <TD textAlign={"center"}>케빈</TD>
                <TD textAlign={"center"}>22.03.16</TD>
                <TD textAlign={"center"}>127</TD>
              </TR>
              <TR>
                <TD textAlign={"center"}>인증</TD>
                <TD>3.17 공부 인증</TD>
                <TD textAlign={"center"}>케빈</TD>
                <TD textAlign={"center"}>22.03.17</TD>
                <TD textAlign={"center"}>162</TD>
              </TR>
              <TR>
                <TD textAlign={"center"}>인증</TD>
                <TD>3.18 공부 인증</TD>
                <TD textAlign={"center"}>케빈</TD>
                <TD textAlign={"center"}>22.03.18</TD>
                <TD textAlign={"center"}>134</TD>
              </TR>
              <TR>
                <TD textAlign={"center"}>자랑</TD>
                <TD>공부 포기</TD>
                <TD textAlign={"center"}>케빈</TD>
                <TD textAlign={"center"}>22.03.19</TD>
                <TD textAlign={"center"}>2340</TD>
              </TR> */}
          </tbody>
        </Table>
        <PageWrapper>
          <Pagination total={post.length} limit={limit} page={page} setPage={setPage} />
        </PageWrapper>
      </BoardBox>
    </Wrapper>
    // </Container>
  );
}

export default Board;

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
  /* padding: 0px 300px; */
  width: 1000px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  height: 100%;
  @media screen and (max-width: 1350px) {
    padding: 0px 250px;
    width: 100%;
  }
  @media screen and (max-width: 1150px) {
    padding: 0px 200px;
    width: 100%;
  }
  @media screen and (max-width: 768px) {
    padding: 0px 25px;
    width: 100%;
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
  @media screen and (max-width: 1150px) {
  }
  @media screen and (max-width: 768px) {
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

function Notification() {
  const [noti, setNoti] = useState([]);
  const [limit, setLimit] = useState(10); // 한 페이지당 게시물 수
  const [page, setPage] = useState(1); // 현재 페이지 번호
  const offset = (page - 1) * limit; // 게시물의 위치

  useEffect(() => {
    axios
      .get(
        // "http://localhost:8081/api/notification"
        "http://springbootlhpost-env.eba-rktpiamg.us-east-1.elasticbeanstalk.com/api/notification"
      )
      .then((Response) => {
        // console.log(Response.data);
        setNoti(Response.data);
        console.log(Response);
      })
      .catch((Error) => console.log(Error));
  }, []);

  const navigate = useNavigate();
  const onClicked = (id) => {
    navigate(`/noti/${id}`);
  };

  return (
    // <Container>
    <Wrapper>
      <BoardBox>
        <BoxTitle>공지 사항</BoxTitle>
        <Table>
          <thead>
            <tr>
              <TH>Title</TH>
              <TH>작성자</TH>
              <TH>Created date</TH>
            </tr>
          </thead>
          <tbody>
            {noti &&
              noti.slice(offset, offset + limit).map((noti) => (
                <TR key={noti.id} onClick={() => onClicked(noti.id)}>
                  <TD>{noti.title}</TD>
                  <TD textAlign={"center"}>admin😼</TD>
                  <TD textAlign={"center"}>{noti.created}</TD>
                </TR>
              ))}
          </tbody>
        </Table>
        <PageWrapper>
          <Pagination total={noti.length} limit={limit} page={page} setPage={setPage} />
        </PageWrapper>
      </BoardBox>
    </Wrapper>
    // </Container>
  );
}

export default Notification;

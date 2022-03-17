import React from "react";
import styled from "styled-components";
import { AnimatePresence, motion, useViewportScroll } from "framer-motion";

const Wrapper = styled.div`
  /* background-color: #74b9ff; */
  height: auto;
  min-height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 100px 250px 150px 100px;
  margin: auto;
  @media screen and (min-width: 768px) {
    padding-right: 24px !important;
    padding-left: 24px !important;
  }
  @media screen and (min-width: 768px) {
    padding-right: 24px !important;
    padding-left: 24px !important;
  }
`;

const BoardBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  height: 300px;
`;

const BoxTitle = styled.span`
  font-size: 20px;
  font-weight: bold !important;
  margin-bottom: 8px !important;
`;

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  border-style: hidden;
  @media screen and (max-width: 480px) {
    table {
      font-size: 8px;
    }
  }
`;

const TH = styled.th`
  /* border: 1px solid; */
  text-align: left;
  padding: 8px;
  background-color: rgba(0, 0, 0, 0.5);
  font-size: 22px;
  @media screen and (max-width: 500px) {
    font-size: 12px;
  }
`;

const TR = styled(motion.tr)`
  cursor: pointer;
  height: 45px;
  &:nth-child(even) {
    background-color: rgb(154, 170, 192);
  }
  &:hover {
    background-color: #ffffff;
  }
`;

const TD = styled.td`
  /* border: 1px solid; */
  text-align: left;
  padding: 8px;
  vertical-align: middle; // 테이블 수직 중앙 정렬
  @media screen and (max-width: 500px) {
    font-size: 13px;
  }
`;

function Board() {
  return (
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
            <TR>
              <TD>인증</TD>
              <TD>3.15 공부 인증</TD>
              <TD>케빈</TD>
              <TD>22.03.15</TD>
              <TD>123</TD>
            </TR>
            <TR>
              <TD>인증</TD>
              <TD>3.16 공부 인증</TD>
              <TD>케빈</TD>
              <TD>22.03.16</TD>
              <TD>127</TD>
            </TR>
            <TR>
              <TD>인증</TD>
              <TD>3.17 공부 인증</TD>
              <TD>케빈</TD>
              <TD>22.03.17</TD>
              <TD>162</TD>
            </TR>
            <TR>
              <TD>인증</TD>
              <TD>3.18 공부 인증</TD>
              <TD>케빈</TD>
              <TD>22.03.18</TD>
              <TD>134</TD>
            </TR>
            <TR>
              <TD>자랑</TD>
              <TD>공부 포기</TD>
              <TD>케빈</TD>
              <TD>22.03.19</TD>
              <TD>2340</TD>
            </TR>
          </tbody>
        </Table>
      </BoardBox>
    </Wrapper>
  );
}

export default Board;

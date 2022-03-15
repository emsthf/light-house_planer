import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AnimatePresence, motion, useViewportScroll } from "framer-motion";

const Wrapper = styled.div`
  /* background-color: #74b9ff; */
  height: auto;
  min-height: 100%;
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

const GridBox = styled.div`
  display: grid;
  height: 100%;
  max-width: 1280px;
  grid-template-columns: repeat(2, 1fr);
  grid-template-columns: 1fr 4fr;
`;

const Container = styled.div`
  /* background-color: #a29bfe; */
  height: 600px;
  /* box-shadow: 10px 8px 5px rgba(0, 0, 0, 0.5); */
  margin-right: 30px;
`;

const ProfileImg = styled.div`
  border-radius: 50%;
  width: 16em;
  height: 16em;
  border: 2px solid gray;
  margin: auto;
  background: no-repeat
    url(http://jjal.today/data/file/gallery/1028612757_tfzgnpT0_8b425806e9bc8770ee9926f757d5ff046f92f11e.png);
  background-size: cover;
  /* display: flex;
  justify-content: center;
  align-items: center; */
`;

const ProfileBox = styled.div`
  display: block;
  background-color: white;
  height: 250px;
  width: 16em;
  margin: auto;
  margin-top: 15px;
`;

const Name = styled.span`
  display: block;
  color: black;
  font-size: 30px;
  font-weight: bold;
`;

const InfoBox = styled.div`
  display: block;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const Email = styled.span`
  display: block !important;
  color: black;
  width: 100%;
  line-height: 24px;
`;

const Phone = styled(Email)``;
const Motto = styled(Email)`
  margin-top: 5px;
`;

const Grade = styled(Email)``;

const EditBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 33px;
  background-color: #6c5ce7;
  border-radius: 10px;
  text-align: center;
  margin: auto;
  margin-top: 20px;
  cursor: pointer;
  &:hover {
    background-color: #a29bfe;
  }
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const GoalBox = styled.div`
  width: 100%;
  /* background-color: #5f27cd; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const BoxTitle = styled.span`
  font-size: 20px;
  font-weight: bold !important;
  margin-bottom: 8px !important;
`;

const GoalTitle = styled.span`
  font-size: 20px;
  font-weight: bold;
  margin-right: 6px;
`;

const Status = styled.div`
  background-color: #badc58;
  color: white;
`;

const Explanation = styled.span`
  font-size: 10px;
  margin-top: 8px;
`;

const Goal = styled(motion.div)`
  width: 100%;
  height: 100px;
  background-color: #dff9fb;
  border-radius: 10px;
  border: 1px solid gray;
  display: flex !important;
  flex-direction: column;
  padding: 20px;
  margin-bottom: 10px;
  div {
    display: flex;
    flex-direction: row;
    i {
      color: white;
      margin-right: 6px;
      font-size: 20px;
      color: #95afc0;
    }
    /* ${GoalTitle} {
      font-size: 20px;
      font-weight: bold;
      margin-right: 6px;
    } */
    div {
      border: 1px solid gray;
      border-radius: 10px;
      width: 48px;
      height: 22px;
      font-size: 12px;
      padding-top: 3px;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
    }
  }
`;

const CreateBtn = styled.button`
  border-radius: 5px;
`;

const BadgeBox = styled.div`
  width: 100%;
  height: 11em;
  border: 1px solid gray;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  padding: 15px;
  margin-bottom: 20px;
`;

const BadgeList = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const Badge = styled.div`
  width: 7em;
  height: 7em;
  border-radius: 50%;
  border: 1px solid black;
  margin: auto;
  background: no-repeat
    url(https://cdn.pixabay.com/photo/2019/12/01/09/08/logo-4664978__480.png);
  background-size: cover;
`;

const StatisticsBox = styled.div`
  width: 100%;
  height: 300px;
  border: 1px solid gray;
  border-radius: 15px;
  margin-bottom: 30px;
`;

const DoneGoalBox = styled.div`
  width: 100%;
  /* border: 1px solid black; */
  margin-bottom: 30px;
`;

const BoardBox = styled.div`
  width: 100%;
  height: 300px;
  /* border: 1px solid black; */
  margin-bottom: 30px;
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

const IconBox = styled.div`
  width: 100%;
  height: 100%;
  align-items: center;
  padding: 10px 0px 10px 0px;
  transition: all 300ms ease;
  &:hover {
    transform: rotate(-20deg) scale(1.1);
    color: #ff9f43;
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  opacity: 0;
  z-index: 80;
`;

const Box = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: white;
  z-index: 90;
  /* overflow: auto; */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const modalVariants = {
  entry: { opacity: 0, y: -50 },
  normal: { opacity: 1, y: 0 },
  exit: {
    opacity: 0,
    y: -50,
  },
};

function DashBoard() {
  const [id, setId] = useState(null);
  const { scrollY } = useViewportScroll();
  console.log(scrollY);

  return (
    <Wrapper>
      <GridBox>
        <Container>
          <ProfileImg />
          <ProfileBox>
            <Name>Kevin</Name>
            <InfoBox>
              <Email>alone@gmail.com</Email>
              <Phone>010-0000-0000</Phone>
              <Motto>no pain, no gain</Motto>
              <Grade>🕊️ 갈매기</Grade>
            </InfoBox>
            <EditBtn>Edit profile</EditBtn>
          </ProfileBox>
        </Container>
        <ContentBox>
          <GoalBox>
            <BoxTitle>현재 진행중인 목표</BoxTitle>
            <Goal onClick={() => setId("1")} layoutId="1">
              <div>
                <i class="fa-regular fa-calendar-check"></i>
                <GoalTitle>숨 쉬기</GoalTitle>
                <Status>진행 중</Status>
              </div>
              <div>
                <Explanation>동해물과 백두산이 마르고 닯도록 하느님이</Explanation>
              </div>
            </Goal>
            <Goal onClick={() => setId("2")} layoutId="2">
              <div>
                <i class="fa-regular fa-calendar-check"></i>
                <GoalTitle>밥 먹기</GoalTitle>
                <Status>진행 중</Status>
              </div>
              <div>
                <Explanation>동해물과 백두산이 마르고 닯도록 하느님이</Explanation>
              </div>
            </Goal>
            <Goal onClick={() => setId("3")} layoutId="3">
              <div>
                <i class="fa-regular fa-calendar-check"></i>
                <GoalTitle>걷기</GoalTitle>
                <Status>진행 중</Status>
              </div>
              <div>
                <Explanation>동해물과 백두산이 마르고 닯도록 하느님이</Explanation>
              </div>
            </Goal>
            <Link to={"/"}>
              <CreateBtn>새 목표 생성</CreateBtn>
            </Link>
          </GoalBox>
          <BadgeBox>
            <BoxTitle style={{ marginBottom: "10px" }}>최근 획득 배지</BoxTitle>
            <BadgeList>
              <Badge />
              <Badge />
              <Badge />
              <Badge />
              <Badge />
            </BadgeList>
          </BadgeBox>
          <StatisticsBox>통계 박스. Apex Chart 원형 차트로 표시</StatisticsBox>
          <DoneGoalBox>
            <BoxTitle>최근 완료 목표</BoxTitle>
            <Goal onClick={() => setId("4")} layoutId="4">
              <div>
                <i class="fa-regular fa-calendar-check"></i>
                <GoalTitle>숨 쉬기</GoalTitle>
                <Status style={{ backgroundColor: "skyblue" }}>성공</Status>
              </div>
              <div>
                <Explanation>동해물과 백두산이 마르고 닯도록 하느님이</Explanation>
              </div>
            </Goal>
            <Goal onClick={() => setId("5")} layoutId="5">
              <div>
                <i class="fa-regular fa-calendar-check"></i>
                <GoalTitle>숨 쉬기</GoalTitle>
                <Status style={{ backgroundColor: "skyblue" }}>성공</Status>
              </div>
              <div>
                <Explanation>동해물과 백두산이 마르고 닯도록 하느님이</Explanation>
              </div>
            </Goal>
            <Goal onClick={() => setId("6")} layoutId="6">
              <div>
                <i class="fa-regular fa-calendar-check"></i>
                <GoalTitle>숨 쉬기</GoalTitle>
                <Status style={{ backgroundColor: "tomato" }}>실패</Status>
              </div>
              <div>
                <Explanation>동해물과 백두산이 마르고 닯도록 하느님이</Explanation>
              </div>
            </Goal>
          </DoneGoalBox>
          <BoardBox>
            <BoxTitle>내 작성 글</BoxTitle>
            <Table>
              <thead>
                <tr>
                  <TH>Category</TH>
                  <TH>Title</TH>
                  <TH>Created date</TH>
                  <TH>View</TH>
                  <TH style={{ textAlign: "center" }}>Delete</TH>
                </tr>
              </thead>
              <tbody>
                <TR>
                  <TD>인증</TD>
                  <TD>3.15 공부 인증</TD>
                  <TD>22.03.15</TD>
                  <TD>123</TD>
                  <TD style={{ textAlign: "center", padding: 0 }}>
                    <IconBox>
                      <i className="fa-solid fa-trash-can" />
                    </IconBox>
                  </TD>
                </TR>
                <TR>
                  <TD>인증</TD>
                  <TD>3.16 공부 인증</TD>
                  <TD>22.03.16</TD>
                  <TD>127</TD>
                  <TD style={{ textAlign: "center", padding: 0 }}>
                    <IconBox>
                      <i className="fa-solid fa-trash-can" />
                    </IconBox>
                  </TD>
                </TR>
                <TR>
                  <TD>인증</TD>
                  <TD>3.17 공부 인증</TD>
                  <TD>22.03.17</TD>
                  <TD>162</TD>
                  <TD style={{ textAlign: "center", padding: 0 }}>
                    <IconBox>
                      <i className="fa-solid fa-trash-can" />
                    </IconBox>
                  </TD>
                </TR>
                <TR>
                  <TD>인증</TD>
                  <TD>3.18 공부 인증</TD>
                  <TD>22.03.18</TD>
                  <TD>134</TD>
                  <TD style={{ textAlign: "center", padding: 0 }}>
                    <IconBox>
                      <i className="fa-solid fa-trash-can" />
                    </IconBox>
                  </TD>
                </TR>
                <TR>
                  <TD>자랑</TD>
                  <TD>공부 포기</TD>
                  <TD>22.03.19</TD>
                  <TD>2340</TD>
                  <TD style={{ textAlign: "center", padding: 0 }}>
                    <IconBox>
                      <i className="fa-solid fa-trash-can" />
                    </IconBox>
                  </TD>
                </TR>
              </tbody>
            </Table>
          </BoardBox>
        </ContentBox>
      </GridBox>

      <AnimatePresence>
        {/* Box를 클릭해서 setId()로 해당 박스 id가 저장되어 id가 존재하면 Overlay를 보여준다 */}
        {id ? (
          <Overlay
            // Overlay를 클릭 시 id에 null을 저장해서 Overlay를 숨긴다
            onClick={() => setId(null)}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Overlay에 있는 Box 컴포넌트와 하나로 여겨지는 것은 Grid에서 id가 선택된 Box */}
            <Box
              layoutId={id}
              variants={modalVariants}
              initial="entry"
              animate="normal"
              exit="exit"
              style={{ top: scrollY.get() + 100 }}
            >
              {id}
            </Box>
          </Overlay>
        ) : null}
      </AnimatePresence>
    </Wrapper>
  );
}

export default DashBoard;

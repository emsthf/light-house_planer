import React, { useEffect, useState } from "react";
import { Link, useNavigate, useMatch } from "react-router-dom";
import styled from "styled-components";
import { AnimatePresence, motion, useViewportScroll } from "framer-motion";
import PieChart from "../components/PieChart";
import TimelineChart from "../components/TimelineChart";
import axios from "axios";
import { useRecoilState } from "recoil";
import { goalId, goalPeriod } from "../Atom";
import Badge from "./Badge";

const Wrapper = styled.div`
  height: auto;
  min-height: 100%;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 100px 250px 150px 100px;
  margin: auto;
  margin-top: 5vh;
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
  max-width: 1280px;
  grid-template-columns: repeat(2, 1fr);
  grid-template-columns: 1fr 4fr;
`;

const Container = styled.div`
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
`;

const ProfileBox = styled.div`
  display: block;
  height: 250px;
  width: 16em;
  margin: auto;
  margin-top: 15px;
`;

const Name = styled.span`
  display: block;
  color: ${(props) => props.theme.textColor};
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
  color: ${(props) => props.theme.textColor};
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
  background-color: #40739e;
  border-radius: 10px;
  text-align: center;
  margin: auto;
  margin-top: 20px;
  cursor: pointer;
  &:hover {
    background-color: #487eb0;
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
  width: 96%;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 52px;
`;

const OrEmpty = styled.span`
  font-size: 50px;
  font-weight: 600;
  text-align: center;
  margin: 25px 0px;
  line-height: 2;
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
  border-radius: 10px;
  border: 1px solid gray;
  display: flex !important;
  flex-direction: column;
  padding: 20px;
  margin-bottom: 10px;
  cursor: pointer;
  div {
    display: flex;
    flex-direction: row;
    i {
      color: white;
      margin-right: 6px;
      font-size: 20px;
      color: #95afc0;
    }
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
  padding: 0.5rem 2rem;
  border: none;
  box-shadow: ${(props) => props.theme.boxShadow};
  background: #416dea;
  color: #fff;
  font-weight: bold;
  border-radius: 15px;
  &:hover {
    box-shadow: none;
    background: linear-gradient(315deg, #89d8d3, #416dea 74%);
  }
  &:active {
    background: linear-gradient(315deg, #89d8d3, #416dea 74%);
    box-shadow: 3px 4px 10px #bbb;
  }
`;

const BadgeBox = styled.div`
  width: 96%;
  margin: auto;
  /* height: 11em; */
  border: 1px solid gray;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  padding: 15px;
  margin-bottom: 52px;
`;

const BadgeList = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

// const Badge = styled.div`
//   width: 7em;
//   height: 7em;
//   border-radius: 50%;
//   /* border: 1px solid black; */
//   margin: auto;
//   background: no-repeat
//     url(https://cdn.pixabay.com/photo/2019/12/01/09/08/logo-4664978__480.png);
//   background-size: cover;
//   cursor: pointer;
// `;

const MoreBadge = styled.span`
  margin-top: 15px;
  text-align: center;
  cursor: pointer;
`;

const StatisticsCon = styled(GoalBox)``;

const StatisticsBox = styled(GoalBox)`
  width: 100%;
  border: 1px solid gray;
  border-radius: 15px;
  flex-direction: row;
  /* justify-content: space-between; */
  align-items: center;
  margin-bottom: 0;
`;

const DoneGoalBox = styled(GoalBox)``;

const BoardBox = styled(GoalBox)`
  height: 300px;
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
  padding-left: 2rem;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  @media screen and (max-width: 500px) {
    font-size: 12px;
  }
`;

const TR = styled(motion.tr)`
  cursor: pointer;
  height: 45px;
  &:nth-child(even) {
    background-color: rgba(154, 170, 192, 0.4);
  }
  &:nth-child(odd) {
    background-color: rgba(154, 170, 192, 0.1);
  }
  &:hover {
    background-color: #ffffff;
  }
`;

const TD = styled.td`
  /* border: 1px solid; */
  text-align: left;
  padding: 8px;
  padding-left: 2rem;
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
  const [isGoalId, setIsGoalId] = useRecoilState(goalId);
  const [isGoalPeriod, setIsGoalPeriod] = useRecoilState(goalPeriod);
  const [id, setId] = useState(null); // 모달용 임시 state
  const [doingGoals, setDoingGoals] = useState([]);
  const [doneGoals, setDoneGoals] = useState([]);
  const [badge, setBadge] = useState([]);

  const navigate = useNavigate();
  const { scrollY } = useViewportScroll();

  const goalMatch = useMatch("/badge/:badgeId");
  const clickedBadge =
    goalMatch?.params.goalId &&
    doingGoals.find((goal) => String(goal.id) === goalMatch.params.goalId);

  const clickedBadgeList = () => {
    navigate("/badge");
  };

  // 모달용 옵션
  const onClicked = (id) => {
    setIsGoalId(id);
    navigate(`/goal/${id}`);
  };
  // 모달 배경 클릭시 이전 화면으로
  const onOverlayClick = () => {
    navigate("/dash");
  };

  useEffect(() => {
    // 최근 진행중 목표 3개 불러오기
    axios.get("http://localhost:8080/api/dGoal/0").then((Response) => {
      setDoingGoals(Response.data);
      // console.log(Response.data);
      setIsGoalPeriod(Response.data);
    });

    // 최근 완료된 목표 3개 불러오기
    axios.get("http://localhost:8080/api/dGoal/1").then((Response) => {
      setDoneGoals(Response.data);
      // console.log(Response.data);
    });

    // 획득한 배지 가져오기
    axios
      .get("http://localhost:8080/api/badge")
      .then((Response) => {
        setBadge(Response.data.slice(0, 5));
      })
      .catch((Error) => console.log(Error));

    // 이미지 조회
    axios.get("http://localhost:8081/postImg").then((Response) => {
      setFiles(Response.data);
    });
  }, [setBadge]);

  // const [files, setFiles] = useState([]);
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // let files = e.target.photo.files;
  //   const formData = new FormData();
  //   formData.append("files", files.length && files[0].uploadedFile);

  //   axios
  //     .post("http://localhost:8081/postImg", {
  //       mode: "cors",
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //       data: formData,
  //     })
  //     .then((Response) =>
  //       console.log("image upload success!!!!!!!!!!").catch((Err) => console.log(Err))
  //     );
  // };

  // const handleUpload = (e) => {
  //   e.preventDefault();
  //   console.log(e.target.files[0]);
  //   const file = e.target.files[0];
  //   setFiles([...files, { uploadedFile: file }]);

  //   const formData = new FormData();
  //   formData.append("files", files[0]);
  //   axios
  //     .post("http://localhost:8081/postImg", {
  //       mode: "cors",
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //       data: formData,
  //     })
  //     .then((Response) =>
  //       console.log("image upload success!!!!!!!!!!").catch((Err) => console.log(Err))
  //     );
  // };
  const fileDataDownloadUrl = "/api/download/";
  const [files, setFiles] = useState([]);

  const upload = () => {
    if (document.getElementById("uploadFile").files.length) {
      const formData = new FormData();
      formData.append("file", document.getElementById("uploadFile").files[0]);
      axios.post("http://localhost:8081/postImg", formData).then((Response) => {
        document.getElementById("uploadFile").value = "";
        alert("업로드 완료!");
        setFiles(files.concat([Response.data]));
      });
    }
  };

  return (
    <>
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
              <Link to="/signup">
                <EditBtn>Edit profile</EditBtn>
              </Link>
              <div>
                <input id="uploadFile" type="file" accept="image/*" />
                <button onClick={upload}>upLoad</button>
              </div>
            </ProfileBox>
          </Container>
          <ContentBox>
            <GoalBox>
              <BoxTitle>현재 진행중인 목표</BoxTitle>
              {doingGoals.length === 0 ? (
                <OrEmpty>
                  진행중인 목표가 없습니다.😥
                  <br /> 목표를 설정해 주세요.
                </OrEmpty>
              ) : (
                doingGoals.slice(-3).map((item) => (
                  <Goal
                    key={item.id}
                    onClick={() => onClicked(item.id)}
                    layoutId={item.id}
                  >
                    <div>
                      <i className="fa-regular fa-calendar-check"></i>
                      <GoalTitle>{item.goalTitle}</GoalTitle>
                      <Status>진행 중</Status>
                    </div>
                    <div>
                      <Explanation>{item.goalDesc}</Explanation>
                    </div>
                  </Goal>
                ))
              )}
              <Link
                to={"/set/1"}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CreateBtn>새 목표 생성</CreateBtn>
              </Link>
            </GoalBox>
            <BadgeBox>
              <BoxTitle style={{ marginBottom: "10px" }}>최근 획득 배지</BoxTitle>
              <BadgeList>
                {badge &&
                  badge.map((badge) => <Badge key={badge} badge={badge} setId={setId} />)}
                {/* <Badge onClick={() => setId("1")} layoutId={"1"} />
                <Badge onClick={() => setId("2")} layoutId={"2"} />
                <Badge onClick={() => setId("3")} layoutId={"3"} />
                <Badge onClick={() => setId("4")} layoutId={"4"} />
                <Badge onClick={() => setId("5")} layoutId={"5"} /> */}
              </BadgeList>
              <MoreBadge onClick={() => clickedBadgeList()}>+더보기</MoreBadge>
            </BadgeBox>
            <StatisticsCon>
              <BoxTitle>나의 목표 통계</BoxTitle>
              <StatisticsBox>
                <PieChart />
                <TimelineChart doingGoals={doingGoals} />
              </StatisticsBox>
            </StatisticsCon>
            <DoneGoalBox>
              <BoxTitle>최근 완료 목표</BoxTitle>
              {doneGoals.length === 0 ? (
                <OrEmpty>완료된 목표가 없습니다.😏</OrEmpty>
              ) : (
                doneGoals.slice(-3).map((item) => (
                  <Goal
                    key={item.id}
                    onClick={() => onClicked(item.id)}
                    layoutId={item.id}
                  >
                    <div>
                      <i className="fa-regular fa-calendar-check"></i>
                      <GoalTitle>{item.goalTitle}</GoalTitle>
                      <Status style={{ backgroundColor: "skyblue" }}>성공</Status>
                    </div>
                    <div>
                      <Explanation>{item.goalDesc}</Explanation>
                    </div>
                  </Goal>
                ))
              )}
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
      </Wrapper>

      <AnimatePresence>
        {/* Box를 클릭해서 setId()로 해당 박스 id가 저장되어 id가 존재하면 Overlay를 보여준다 */}
        {id ? (
          <>
            <Overlay
              onClick={() => setId(null)}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <Box
              layoutId={id}
              variants={modalVariants}
              initial="entry"
              animate="normal"
              exit="exit"
              style={{ top: scrollY.get() + 100 }}
            >
              배지 상세 페이지 {id}
            </Box>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}

export default DashBoard;

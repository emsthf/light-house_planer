import React, { useEffect, useState } from "react";
import { Link, useNavigate, useMatch } from "react-router-dom";
import styled from "styled-components";
import { AnimatePresence, motion, useViewportScroll } from "framer-motion";
import PieChart from "../components/PieChart";
import TimelineChart from "../components/TimelineChart";
import axios from "axios";
import { useRecoilState } from "recoil";
import { goalId, goalPeriod, userState } from "../Atom";
import Badge from "./Badge";

const Wrapper = styled.div`
  /* height: auto; */
  min-height: 100%;
  /* width: 100vw; */
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 100px 250px 150px 250px;
  margin: auto;
  margin-top: 5vh;
  @media screen and (max-width: 1150px) {
    padding-right: 24px !important;
    padding-left: 24px !important;
  }
  @media screen and (max-width: 768px) {
  }
`;

const GridBox = styled.div`
  display: grid;
  max-width: 1280px;
  grid-template-columns: repeat(2, 1fr);
  grid-template-columns: 1fr 4fr;
  @media screen and (max-width: 1150px) {
  }
  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const Container = styled.div`
  height: 600px;
  /* box-shadow: 10px 8px 5px rgba(0, 0, 0, 0.5); */
  margin-right: 30px;
  @media screen and (max-width: 1150px) {
  }
  @media screen and (max-width: 768px) {
    margin-right: 0;
    margin-top: 40px;
  }
`;

const ProfileImg = styled.div`
  border-radius: 50%;
  width: 16em;
  height: 16em;
  border: 2px solid gray;
  margin: auto;
  background: no-repeat
    url(https://images.velog.io/images/wjdtmdgml/profile/b44a98b1-8fd3-498a-87f1-4ef1a922e2ce/%EB%AF%B8%EB%AA%A8%ED%8B%B0%EC%BD%982.png);
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
  @media screen and (max-width: 1150px) {
  }
  @media screen and (max-width: 768px) {
    width: 60%;
  }
`;

const OrEmpty = styled.span`
  font-size: 50px;
  font-weight: 600;
  text-align: center;
  margin: 25px 0px;
  line-height: 2;
`;

const Empty = styled(OrEmpty)`
  font-size: 32px;
`;

const BoxTitle = styled.span`
  font-size: 20px;
  font-weight: bold !important;
  margin-bottom: 8px !important;
  @media screen and (max-width: 1150px) {
  }
  @media screen and (max-width: 768px) {
    font-size: 18px;
  }
`;

const GoalTitle = styled.span`
  font-size: 20px;
  font-weight: bold;
  margin-right: 6px;
  @media screen and (max-width: 1150px) {
  }
  @media screen and (max-width: 768px) {
    font-size: 18px;
  }
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

const ChallengeBox = styled(GoalBox)``;

const ChallengeItem = styled(Goal)`
  height: 70px;
  cursor: pointer;
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
  @media screen and (max-width: 1150px) {
  }
  @media screen and (max-width: 768px) {
    width: 60%;
  }
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
  @media screen and (max-width: 1150px) {
  }
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const DoneGoalBox = styled(GoalBox)`
  margin-bottom: 40px;
`;

const MoreViewBtn = styled(MoreBadge)``;

const BoardBox = styled(GoalBox)`
  min-height: 320px;
  @media screen and (max-width: 1350px) {
  }
  @media screen and (max-width: 768px) {
  }
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
  vertical-align: middle; // ????????? ?????? ?????? ??????
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
  const [id, setId] = useState(null); // ????????? ?????? state
  const [doingGoals, setDoingGoals] = useState([]);
  const [doneGoals, setDoneGoals] = useState([]);
  const [badge, setBadge] = useState([]);
  const [post, setPost] = useState([]);
  const [user, setUser] = useRecoilState(userState); // ???????????? ??????
  const [challenge, setChallenge] = useState([]); // ?????? ?????? ?????????

  // const url1 = `http://localhost:8080/api/dGoal/0/${user.id}`;
  // const url2 = `http://localhost:8080/api/dGoal/1/${user.id}`;
  // const url3 = `http://localhost:8080/api/mybadge/${user.id}`;
  // const url4 = `http://localhost:8081/api/post/list/${user.id}`;
  // const url5 = `http://localhost:8082/api/mychallenge/list/${user.id}`;

  const url1 = `http://springbootgoal-env.eba-wzmejvgd.us-east-1.elasticbeanstalk.com/api/dGoal/0/${user.id}`;
  const url2 = `http://springbootgoal-env.eba-wzmejvgd.us-east-1.elasticbeanstalk.com/api/dGoal/1/${user.id}`;
  const url3 = `http://springbootgoal-env.eba-wzmejvgd.us-east-1.elasticbeanstalk.com/api/mybadge/${user.id}`;
  const url4 = `http://springbootlhpost-env.eba-rktpiamg.us-east-1.elasticbeanstalk.com/api/post/list/${user.id}`;
  const url5 = `http://springbootlhchallenge-env.eba-am3tqpey.us-east-1.elasticbeanstalk.com/api/mychallenge/list/${user.id}`;

  const navigate = useNavigate();
  const { scrollY } = useViewportScroll();

  const goalMatch = useMatch("/badge/:badgeId");
  const clickedBadge =
    goalMatch?.params.goalId &&
    doingGoals.find((goal) => String(goal.id) === goalMatch.params.goalId);

  const clickedBadgeList = () => {
    navigate("/badge");
  };

  const onClicked = (id) => {
    setIsGoalId(id);
    navigate(`/goal/${id}`);
  };

  // ?????? ?????? ????????? ?????? ????????????
  const onOverlayClick = () => {
    navigate("/dash");
  };

  useEffect(() => {
    // ?????? ????????? ?????? 3??? ????????????
    axios.get(url1).then((Response) => {
      setDoingGoals(Response.data.slice(0, 3));
      // console.log(Response.data);
      setIsGoalPeriod(Response.data.slice(0, 3));
    });

    // ?????? ????????? ?????? ????????????
    axios
      .get(url2)
      .then((Response) => {
        setDoneGoals(Response.data);
        console.log(Response.data);
      })
      .catch((Error) => console.log(Error));

    // ????????? ?????? ????????????
    axios
      .get(url3)
      .then((Response) => {
        // console.log(Response.data);
        setBadge(Response.data.slice(0, 5));
      })
      .catch((Error) => console.log(Error));

    // ??? ?????? ??? ????????????
    axios
      .get(url4)
      .then((Response) => {
        // console.log(Response.data);
        setPost(Response.data.slice(0, 5));
      })
      .catch((Error) => console.log(Error));

    // ?????? ?????? ????????? ????????????
    axios
      .get(url5)
      .then((Response) => {
        setChallenge(Response.data.slice(0, 3));
      })
      .catch((Error) => console.log(Error));
  }, [badge, doingGoals, doneGoals]);

  console.log(challenge);

  return (
    <>
      <Wrapper>
        <GridBox>
          <Container>
            <ProfileImg />
            <ProfileBox>
              <Name>{user.name}</Name>
              <InfoBox>
                <Email>{user.email}</Email>
                <Phone>{user.phoneNum}</Phone>
                <Motto>no pain, no gain</Motto>
                <Grade>??????? ?????????</Grade>
              </InfoBox>
              <Link to="/userValidation">
                <EditBtn>Edit profile</EditBtn>
              </Link>
            </ProfileBox>
          </Container>
          <ContentBox>
            <GoalBox>
              <BoxTitle>?????? ???????????? ??????</BoxTitle>
              {doingGoals.length === 0 ? (
                <OrEmpty>
                  ???????????? ????????? ????????????.????
                  <br /> ????????? ????????? ?????????.
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
                      <Status>?????? ???</Status>
                    </div>
                    <div>
                      <Explanation>{item.goalDesc}</Explanation>
                    </div>
                    <div>
                      {item.count} / {item.totalCount}
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
                <CreateBtn>??? ?????? ??????</CreateBtn>
              </Link>
            </GoalBox>
            <ChallengeBox>
              <BoxTitle>?????? ?????? ?????? ?????????</BoxTitle>
              {challenge.length === 0 && <Empty>?????? ?????? ???????????? ????????????.????</Empty>}
              {challenge &&
                challenge.map((challenge) => (
                  <ChallengeItem
                    key={challenge.challenge.id}
                    onClick={() => navigate(`/challenge/${challenge.challenge.id}`)}
                  >
                    <div>
                      <i className="fa-regular fa-calendar-check"></i>
                      <GoalTitle>{challenge.challenge.challengeTitle}</GoalTitle>
                      <Explanation>{challenge.challenge.challengeDesc}</Explanation>
                      {/* <Status>?????? ???</Status> */}
                    </div>
                  </ChallengeItem>
                ))}
            </ChallengeBox>
            <BadgeBox>
              <BoxTitle style={{ marginBottom: "10px" }}>?????? ?????? ??????</BoxTitle>
              <BadgeList>
                {badge &&
                  badge.map((badge) => (
                    <Badge key={badge.id} badge={badge.badge} setId={setId} />
                  ))}
                {/* <Badge onClick={() => setId("1")} layoutId={"1"} />
                <Badge onClick={() => setId("2")} layoutId={"2"} />
                <Badge onClick={() => setId("3")} layoutId={"3"} />
                <Badge onClick={() => setId("4")} layoutId={"4"} />
                <Badge onClick={() => setId("5")} layoutId={"5"} /> */}
              </BadgeList>
              <MoreBadge onClick={() => clickedBadgeList()}>+?????????</MoreBadge>
            </BadgeBox>
            <StatisticsCon>
              <BoxTitle>?????? ?????? ??????</BoxTitle>
              <StatisticsBox>
                <PieChart />
                <TimelineChart doingGoals={doingGoals} />
              </StatisticsBox>
            </StatisticsCon>
            <DoneGoalBox>
              <BoxTitle>?????? ?????? ??????</BoxTitle>
              {doneGoals.length === 0 ? (
                <OrEmpty>????????? ????????? ????????????.????</OrEmpty>
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
                      {item.result === true ? (
                        <Status style={{ backgroundColor: "skyblue" }}>??????</Status>
                      ) : (
                        <Status style={{ backgroundColor: "pink" }}>??????</Status>
                      )}
                    </div>
                    <div>
                      <Explanation>{item.goalDesc}</Explanation>
                    </div>
                  </Goal>
                ))
              )}
              {doneGoals.length > 3 ? (
                <MoreViewBtn onClick={() => navigate("/goal/list")}>+??? ??????</MoreViewBtn>
              ) : null}
            </DoneGoalBox>
            <BoardBox>
              <BoxTitle>??? ?????? ???</BoxTitle>
              <Table>
                <thead>
                  <tr>
                    <TH>Category</TH>
                    <TH>Title</TH>
                    <TH>Created date</TH>
                    <TH>View</TH>
                  </tr>
                </thead>
                <tbody>
                  {post.map((post) => (
                    <TR key={post.id}>
                      <TD>{post.category}</TD>
                      <Link to={`/board/${post.id}`}>
                        <TD>{post.title}</TD>
                      </Link>
                      <TD>{post.created}</TD>
                      <TD>{post.view}</TD>
                    </TR>
                  ))}
                </tbody>
              </Table>
            </BoardBox>
          </ContentBox>
        </GridBox>
      </Wrapper>

      <AnimatePresence>
        {/* Box??? ???????????? setId()??? ?????? ?????? id??? ???????????? id??? ???????????? Overlay??? ???????????? */}
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
              ?????? ?????? ????????? {id}
            </Box>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}

export default DashBoard;

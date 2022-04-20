import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AnimatePresence, motion, useViewportScroll } from "framer-motion";
import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "../Atom";

const Container = styled.div`
  width: 1200px;
  margin: 15vh auto;
  margin-bottom: 240px;
`;

const Wrapper = styled.div`
  width: 100%;
`;

const MainTitle = styled.div`
  width: 100%;
  text-align: center;
  font-size: 1.4rem;
  font-weight: bold;
  margin-bottom: 40px;
`;

const Section = styled.section`
  width: 880px;
  margin: 0 auto;
  color: ${(props) => props.theme.textColor};
  /* text-align: center; */
`;

const Title = styled.h3`
  margin: 2rem 0 1rem 2rem;
`;

const BadgeWrapper = styled.div`
  width: 100%;
  min-height: 500px;
  padding: 2rem 1rem 4rem 1rem;
  box-sizing: border-box;
  /* background: #fafafa; */
  background: ${(props) => props.theme.innerBgColor};
  border: ${(props) => props.theme.border};
  border-radius: 20px;
  box-shadow: ${(props) => props.theme.boxShadow};
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  margin-bottom: 4rem;
`;

const Badge = styled.div`
  width: 120px;
  height: 120px;
  background: #fafafa;
  /* background-size: 80%;
  background-position: center center; */
  box-shadow: ${(props) => props.theme.boxShadow};
  border-radius: 50%;
  margin: 24px;
  position: relative;
  cursor: pointer;
  &:hover {
    background: rgba(65, 109, 234, 0.1);
  }
`;

const Img = styled.img`
  width: 90%;
  height: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const BadgeContent = styled.div`
  font-size: 0.9rem;
  font-weight: bold;
  position: absolute;
  left: 50%;
  bottom: -1.6rem;
  transform: translateX(-50%);
  color: ${(props) => props.theme.textColor};
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

function BadgeList() {
  const { scrollY } = useViewportScroll();
  const [id, setId] = useState(null); // 모달용 임시 state
  const [specialBadge, setSpecialBadge] = useState();
  const [badge, setBadge] = useState();
  const [user, setUser] = useRecoilState(userState); // 로그인한 유저

  const findBadgeName = (badge) => {
    if (badge.badge.badgeName === "100") {
      return (
        <Badge
          key={badge.id}
          onClick={() => setId(`${badge.id}`)}
          layoutId={`${badge.id}`}
        >
          <Img src="../assets/images/badge100.png " alt="goal badge" />
          <BadgeContent>
            {badge.badge.badgeName}({badge.count})
          </BadgeContent>
        </Badge>
      );
    } else if (badge.badge.badgeName === "90") {
      return (
        <Badge
          key={badge.id}
          onClick={() => setId(`${badge.id}`)}
          layoutId={`${badge.id}`}
        >
          <Img src="../assets/images/badge90.png " alt="goal badge" />
          <BadgeContent>
            {badge.badge.badgeName}({badge.count})
          </BadgeContent>
        </Badge>
      );
    } else if (badge.badge.badgeName === "80") {
      return (
        <Badge
          key={badge.id}
          onClick={() => setId(`${badge.id}`)}
          layoutId={`${badge.id}`}
        >
          <Img src="../assets/images/badge80.png" alt="goal badge" />
          <BadgeContent>
            {badge.badge.badgeName}({badge.count})
          </BadgeContent>
        </Badge>
      );
    }
  };

  // const url1 = `http://localhost:8080/api/mybadge/list/${user.id}?type=Special`;
  // const url2 = `http://localhost:8080/api/mybadge/list/${user.id}?type=Ordinary`;

  const url1 = `http://springbootgoal-env.eba-wzmejvgd.us-east-1.elasticbeanstalk.com/api/mybadge/list/${user.id}?type=Special`;
  const url2 = `http://springbootgoal-env.eba-wzmejvgd.us-east-1.elasticbeanstalk.com/api/mybadge/list/${user.id}?type=Ordinary`;

  useEffect(() => {
    axios
      .get(url1) // 특별 한정 배지 리스트
      .then((Response) => {
        setSpecialBadge(Response.data);
        console.log(Response.data);
      })
      .catch((Error) => console.log(Error));

    axios
      .get(url2) // 목표 달성 배지 리스트
      .then((Response) => {
        setBadge(Response.data);
        console.log(Response.data);
      })
      .catch((Error) => console.log(Error));
  }, []);

  return (
    <Container>
      <Wrapper>
        <MainTitle>My Badge</MainTitle>
        <Section>
          <Title>특별 한정</Title>
          <BadgeWrapper>
            {specialBadge &&
              specialBadge.map((badge) => (
                <Badge
                  key={badge.id}
                  onClick={() => setId(`${badge.id}`)}
                  layoutId={`${badge.id}`}
                >
                  {badge.badge.badgeName.includes("Goal") ? (
                    <Img src="../assets/images/special_reward.png " alt="special badge" />
                  ) : null}
                  <BadgeContent>{badge.badge.badgeName}</BadgeContent>
                </Badge>
              ))}
            {/* <Badge onClick={() => setId("1")} layoutId={"1"}>
              <BadgeCount>1</BadgeCount>
            </Badge>
            <Badge onClick={() => setId("2")} layoutId={"2"}>
              <BadgeCount>1</BadgeCount>
            </Badge>
            <Badge onClick={() => setId("3")} layoutId={"3"}>
              <BadgeCount>1</BadgeCount>
            </Badge> */}
          </BadgeWrapper>
        </Section>
        <Section>
          <Title>목표 달성</Title>
          <BadgeWrapper>
            {badge && badge.map((badge) => findBadgeName(badge))}
          </BadgeWrapper>
        </Section>
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
    </Container>
  );
}

export default BadgeList;

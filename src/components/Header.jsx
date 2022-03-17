import { motion, useAnimation, useViewportScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Nav = styled(motion.nav)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  top: 0;
  font-size: 14px;
  padding: 30px 90px 20px 100px;
  color: white;
  z-index: 99;
`;

const Col = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled(motion.svg)`
  margin-right: 50px;
  width: 143px;
  height: 38px;
  fill: ${(props) => props.theme.red};
  path {
    stroke-width: 6px;
    stroke: white;
  }
`;

const HeaderTitle = styled.div`
  color: gray;
  font-size: 40px;
  margin-right: 25px;
  font-family: "Source Sans Pro", sans-serif;
  font-weight: 600;
`;

const Items = styled.ul`
  display: flex;
  align-items: center;
  font-size: 20px;
`;

const Item = styled.li`
  margin-right: 20px;
  color: ${(props) => props.theme.black.lighter};
  transition: color 0.3s ease-in-out;
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  font-weight: 600;
  &:hover {
    /* color: ${(props) => props.theme.black.darker}; */
  }
`;

const Search = styled.form`
  color: gray;
  display: flex;
  align-items: center;
  position: relative;
  svg {
    height: 25px;
  }
`;

const Circle = styled(motion.span)`
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 5px;
  bottom: -7px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${(props) => props.theme.red};
`;

const Input = styled(motion.input)`
  // transform-orgin은 변화가 시작되는 위치
  transform-origin: right center;
  position: absolute;
  right: 0px;
  padding: 5px 10px;
  padding-left: 40px;
  z-index: -1;
  color: white;
  font-size: 16px;
  background-color: transparent;
  border: 1px solid ${(props) => props.theme.white.lighter};
`;

const logoVariants = {
  normal: {
    fillOpacity: 1,
  },
  active: {
    fillOpacity: [0, 1, 0],
    transition: {
      repeat: Infinity,
    },
  },
};

const navVariants = {
  top: { backgroundColor: "rgba(0, 0, 0, 0)" },
  scroll: { backgroundColor: "rgba(0, 0, 0, 1)" },
};

function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  // useMatch는 react router의 기능으로, 해당 router 안에 있는지 알려준다
  const homeMatch = useMatch("/dash");
  const tvMatch = useMatch("/board");
  const challengeMatch = useMatch("/challenge");
  const inputAnumation = useAnimation();
  const navAnimation = useAnimation();
  // useViewPortScroll은 제일 아래로부터 얼마나 멀리 있는지를 알려준다.
  // srcollX, scrollY는 픽셀이 단위고, srcollXProgress, srcollYProgress는 백분율로 나타낸다
  const { scrollY } = useViewportScroll();

  const toggleSearch = () => {
    if (searchOpen) {
      // trigger the close animation
      inputAnumation.start({
        scaleX: 0,
      });
    } else {
      // trigger the open animation
      inputAnumation.start({
        scaleX: 1,
      });
    }
    setSearchOpen((prev) => !prev);
  };
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm();
  const onValid = (data) => {
    navigate(`/search?keyword=${data.keyword}`);
    setValue("keyword", "");
  };

  useEffect(() => {
    scrollY.onChange(() => {
      if (scrollY.get() > 80) {
        navAnimation.start("scroll");
      } else {
        navAnimation.start("top");
      }
    });
  }, [scrollY, navAnimation]);

  return (
    <Nav variants={navVariants} initial="top" animate={navAnimation}>
      <Col>
        <HeaderTitle>Light House</HeaderTitle>
      </Col>
      <Col>
        {/* <Search onSubmit={handleSubmit(onValid)}>
          <motion.svg
            onClick={toggleSearch}
            animate={{ x: searchOpen ? -217 : 0 }}
            transition={{ type: "linear" }}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            style={{ cursor: "pointer" }}
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            ></path>
          </motion.svg>
          <Input
            {...register("keyword", { required: true, minLength: 2 })}
            animate={inputAnumation}
            initial={{ scaleX: 0 }}
            transition={{ type: "linear" }}
            placeholder="Search for Movie or Tv Show..."
          />
        </Search> */}

        <Items>
          <Item>
            <Link to="/dash">공지 사항 {homeMatch && <Circle layoutId="circle" />}</Link>
          </Item>
          <Item>
            <Link to="/dash">나의 목표 {homeMatch && <Circle layoutId="circle" />}</Link>
          </Item>
          <Item>
            <Link to="/board">게시판 {tvMatch && <Circle layoutId="circle" />}</Link>
          </Item>
          <Item>
            <Link to="/challenge">
              Challenge {challengeMatch && <Circle layoutId="circle" />}
            </Link>
          </Item>
        </Items>
      </Col>
    </Nav>
  );
}

export default Header;

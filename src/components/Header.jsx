import { motion, useAnimation, useViewportScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import DarkModeToggle from "react-dark-mode-toggle";
import { useRecoilState } from "recoil";
import { darkModeState } from "../Atom";

const Nav = styled(motion.nav)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  top: 0;
  font-size: 14px;
  padding: 30px 90px 20px 100px;
  color: gray;
  z-index: 99;
`;

const Col = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
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
  color: gray;
  transition: color 0.3s ease-in-out;
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  font-weight: 600;
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
  background-color: #e51013;
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
  // const [isDarkMode, setIsDarkMode] = useState(() => false);
  const [isDarkMode, setIsDarkMode] = useRecoilState(darkModeState);
  const toggleDarkAtom = () => setIsDarkMode((prev) => !prev);

  // useMatch는 react router의 기능으로, 해당 router 안에 있는지 알려준다
  const homeMatch = useMatch("/dash");
  const boardMatch = useMatch("/board");
  const notiMatch = useMatch("/noti");
  const challengeMatch = useMatch("/challenge");
  const loginMatch = useMatch("/login");
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
        <Link to="/">
          <HeaderTitle>Light House</HeaderTitle>
        </Link>
        <DarkModeToggle onChange={toggleDarkAtom} checked={isDarkMode} size={60} />
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
            <Link to="/noti">공지 사항 {notiMatch && <Circle layoutId="circle" />}</Link>
          </Item>
          <Item>
            <Link to="/dash">나의 목표 {homeMatch && <Circle layoutId="circle" />}</Link>
          </Item>
          <Item>
            <Link to="/board">게시판 {boardMatch && <Circle layoutId="circle" />}</Link>
          </Item>
          <Item>
            <Link to="/challenge">
              Challenge {challengeMatch && <Circle layoutId="circle" />}
            </Link>
          </Item>
          <Item>
            <Link to="/login">
              <motion.svg
                data-bbox="0 0 50 50"
                data-type="shape"
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                viewBox="0 0 50 50"
                style={{ marginRight: "8px" }}
              >
                <g>
                  <path d="M25 48.077c-5.924 0-11.31-2.252-15.396-5.921 2.254-5.362 7.492-8.267 15.373-8.267 7.889 0 13.139 3.044 15.408 8.418-4.084 3.659-9.471 5.77-15.385 5.77m.278-35.3c4.927 0 8.611 3.812 8.611 8.878 0 5.21-3.875 9.456-8.611 9.456s-8.611-4.246-8.611-9.456c0-5.066 3.684-8.878 8.611-8.878M25 0C11.193 0 0 11.193 0 25c0 .915.056 1.816.152 2.705.032.295.091.581.133.873.085.589.173 1.176.298 1.751.073.338.169.665.256.997.135.515.273 1.027.439 1.529.114.342.243.675.37 1.01.18.476.369.945.577 1.406.149.331.308.657.472.98.225.446.463.883.714 1.313.182.312.365.619.56.922.272.423.56.832.856 1.237.207.284.41.568.629.841.325.408.671.796 1.02 1.182.22.244.432.494.662.728.405.415.833.801 1.265 1.186.173.154.329.325.507.475l.004-.011A24.886 24.886 0 0 0 25 50a24.881 24.881 0 0 0 16.069-5.861.126.126 0 0 1 .003.01c.172-.144.324-.309.49-.458.442-.392.88-.787 1.293-1.209.228-.232.437-.479.655-.72.352-.389.701-.78 1.028-1.191.218-.272.421-.556.627-.838.297-.405.587-.816.859-1.24a26.104 26.104 0 0 0 1.748-3.216c.208-.461.398-.93.579-1.406.127-.336.256-.669.369-1.012.167-.502.305-1.014.44-1.53.087-.332.183-.659.256-.996.126-.576.214-1.164.299-1.754.042-.292.101-.577.133-.872.095-.89.152-1.791.152-2.707C50 11.193 38.807 0 25 0"></path>
                </g>
              </motion.svg>
              Login {loginMatch && <Circle layoutId="circle" />}
            </Link>
          </Item>
        </Items>
      </Col>
    </Nav>
  );
}

export default Header;

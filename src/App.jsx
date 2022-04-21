import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import { ThemeProvider } from "styled-components";
import { ParallaxProvider } from "react-scroll-parallax";
import Footer from "./components/Footer";
import Header from "./components/Header";
import BadgeList from "./pages/BadgeList";
import Board from "./pages/Board";
import DashBoard from "./pages/DashBoard";
import GoalDetail from "./pages/GoalDetail";

import SetGoalStep1 from "./pages/setGoal/SetGoalStep1";
import SetGoalStep2 from "./pages/setGoal/SetGoalStep2";
import SetGoalStep3 from "./pages/setGoal/SetGoalStep3";
import SetGoalStep4 from "./pages/setGoal/SetGoalStep4";
import SetGoalStep5 from "./pages/setGoal/SetGoalStep5";
import SignUp from "./pages/sign/SignUp";

import Landing from "./pages/Landing";
import { darkTheme, lightTheme, theme } from "./theme";
import { useRecoilState } from "recoil";
import { darkModeState } from "./Atom";

import Challenge from "./pages/Challenge";
import AuthBoard from "./pages/AuthBoard";
import SiteRule from "./pages/SiteRule";
import ContactUs from "./pages/ContactUs";
import BoardDetail from "./pages/BoardDetail";
import GoalList from "./pages/GoalList";
import TopScroll from "./components/TopScroll";
import SetChallenge from "./pages/SetChallenge";
import ChanllengeList from "./pages/ChanllengeList";
import Notification from "./pages/Notification";
import NotificationDetail from "./pages/NotificationDetail";
import ChallengeInfo from "./pages/ChallengeInfo";
import UserList from "./pages/UserList";
import AdminPage from "./pages/AdminPage";
import EditUser from "./pages/sign/EditUser";
import UserValidation from "./pages/sign/UserValidation";

const GlobalStyle = createGlobalStyle`
  html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
  line-height: 1;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
* {
  box-sizing: border-box;
}
body {
  font-weight: 400;
  font-family: 'Source Sans Pro', sans-serif;
  color: ${(props) => props.theme.textColor};
  /* color : #0e1014; */
  line-height: 1.2;
  background-color: ${(props) => props.theme.bgColor};
  // 슬라이드 작동 시 좌우 스크롤 바 숨기기
  overflow-x:hidden
}
a {
  text-decoration: none;
  color: inherit;
}
::-webkit-scrollbar {width: 12px; height: 12px;  }
::-webkit-scrollbar-button:start:decrement, 
::-webkit-scrollbar-button:end:increment {display: block; width: 12px;height: 12px; background: url() rgba(0,0,0,.05);}
::-webkit-scrollbar-track {     background: rgba(0,0,0,.05); }
::-webkit-scrollbar-thumb {  background: rgba(185,185,185,.9); border-radius: 12px;  }
`;

function App() {
  const [isDarkMode, setIsDarkMode] = useRecoilState(darkModeState);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <GlobalStyle />
      <BrowserRouter>
        <Header />
        <TopScroll />
        <Routes>
          <Route path="/dash" element={<DashBoard />} />
          <Route path="/set/1" element={<SetGoalStep1 />} />
          <Route path="/set/2" element={<SetGoalStep2 />} />
          <Route path="/set/3" element={<SetGoalStep3 />} />
          <Route path="/set/4" element={<SetGoalStep4 />} />
          <Route path="/set/5" element={<SetGoalStep5 />} />
          <Route path="/goal/*" element={<GoalDetail />} />
          <Route path="/badge" element={<BadgeList />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/noti" element={<Notification />} />
          <Route path="/noti/:id" element={<NotificationDetail />} />
          <Route path="/board" element={<Board />} />
          <Route path="/board/:id" element={<BoardDetail />} />
          <Route path="/" element={<Landing />} />
          <Route path="/challenge" element={<ChanllengeList />} />
          <Route path="/challenge/:id" element={<Challenge />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/challenges/:id" element={<ChallengeInfo />} />
          <Route path="/set/challenge" element={<SetChallenge />} />
          <Route path="/authboard" element={<AuthBoard />} />
          <Route path="/site-rule" element={<SiteRule />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/goal/list" element={<GoalList />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/updateprofile" element={<EditUser />} />
          <Route path="/userValidation" element={<UserValidation />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

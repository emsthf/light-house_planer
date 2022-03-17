import { BrowserRouter, Route, Routes } from "react-router-dom";
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
import SetGoal from "./pages/SetGoal";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/dash" element={<DashBoard />} />
        <Route path="/set/1" element={<SetGoalStep1 />} />
        <Route path="/set/2" element={<SetGoalStep2 />} />
        <Route path="/set/3" element={<SetGoalStep3 />} />
        <Route path="/set/4" element={<SetGoalStep4 />} />
        <Route path="/set/5" element={<SetGoalStep5 />} />
        <Route path="/goal" element={<GoalDetail />} />
        <Route path="/badge" element={<BadgeList />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Landing />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

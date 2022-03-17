import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import BadgeList from "./pages/BadgeList";
import Board from "./pages/Board";
import DashBoard from "./pages/DashBoard";
import GoalDetail from "./pages/GoalDetail";
import Landing from "./pages/Landing";
import SetGoal from "./pages/SetGoal";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/dash" element={<DashBoard />} />
        <Route path="/set/1" element={<SetGoal step="1" />} />
        <Route path="/set/2" element={<SetGoal step="2" />} />
        <Route path="/set/3" element={<SetGoal step="3" />} />
        <Route path="/set/4" element={<SetGoal step="4" />} />
        <Route path="/set/5" element={<SetGoal step="5" />} />
        <Route path="/board*" element={<Board />} />
        <Route path="/goal" element={<GoalDetail />} />
        <Route path="/badge" element={<BadgeList />} />
        <Route path="/" element={<Landing />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import DashBoard from "./pages/DashBoard";
import GoalDetail from "./pages/GoalDetail";
import SetGoal from "./pages/SetGoal";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/dash" element={<DashBoard />} />
        <Route path="/" element={<SetGoal step='1' />} />
        <Route path="/set/2" element={<SetGoal step='2' />} />
        <Route path="/set/3" element={<SetGoal step='3' />} />
        <Route path="/set/4" element={<SetGoal step='4' />} />
        <Route path="/set/5" element={<SetGoal step='5' />} />
        <Route path="/goal" element={<GoalDetail />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

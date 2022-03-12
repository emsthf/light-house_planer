import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import DashBoard from "./pages/DashBoard";
import GoalDetail from "./pages/GoalDetail";
import SetGoalStep1 from "./pages/SetGoalStep1";
import SetGoalStep2 from "./pages/SetGoalStep2";
import SetGoalStep3 from "./pages/SetGoalStep3";
import SetGoalStep4 from "./pages/SetGoalStep4";
import SetGoalStep5 from "./pages/SetGoalStep5";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/dash" element={<DashBoard />} />
        <Route path="/" element={<SetGoalStep1 />} />
        <Route path="/set/2" element={<SetGoalStep2 />} />
        <Route path="/set/3" element={<SetGoalStep3 />} />
        <Route path="/set/4" element={<SetGoalStep4 />} />
        <Route path="/set/5" element={<SetGoalStep5 />} />
        <Route path="/goal" element={<GoalDetail />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

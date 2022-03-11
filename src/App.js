import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import DashBoard from "./pages/DashBoard";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/dash" element={<DashBoard />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

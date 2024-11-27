import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/login/page";
import HomePage from "../pages/home/page";
import HistoricalPage from "../pages/historical/page";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/historical" element={<HistoricalPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

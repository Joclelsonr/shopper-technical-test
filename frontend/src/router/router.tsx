import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/login/page";
import HomePage from "../pages/home/page";
import HistoricalPage from "../pages/historical/page";
import ErrorPage from "../pages/error/page";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/historical" element={<HistoricalPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

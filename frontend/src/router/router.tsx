import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/login/page";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

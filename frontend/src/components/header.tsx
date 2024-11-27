import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <header className="w-full h-16 border-b ">
      <nav>
        <ul className="h-16 flex justify-center items-center gap-4">
          <li
            className={`font-medium ${
              pathname === "/home" ? "text-blue-800" : "text-blue-400"
            }`}
          >
            <a href="" onClick={() => navigate("/home")}>
              Solicitação de viagem
            </a>
          </li>
          <li
            className={`font-medium ${
              pathname === "/historical" ? "text-blue-800" : "text-blue-400"
            }`}
          >
            <a href="" onClick={() => navigate("/historical")}>
              Histórico de viagens
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

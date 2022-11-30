import { useNavigate } from "react-router";
import "./styles.css";

interface HeaderProps {
  mode: string;
  onChangeMode: React.Dispatch<React.SetStateAction<"Light" | "Dark">>;
}

const Header: React.FC<HeaderProps> = ({ mode, onChangeMode }) => {
  const navigate = useNavigate();
  const nextMode = mode === "Light" ? "Dark" : "Light";

  const handleUpdateMode = () => {
    onChangeMode(nextMode);
    localStorage.setItem("mode", nextMode);
  };

  return (
    <header className="header">
      <h2 onClick={() => navigate("/")}>Where in the world?</h2>
      <button onClick={handleUpdateMode}>
        <span className="icon">
          <i className="fas fa-circle-half-stroke" />
        </span>
        {nextMode}
      </button>
    </header>
  );
};

export default Header;

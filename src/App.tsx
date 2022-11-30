import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";
import CountryDetail from "./pages/CountryDetails";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "./App.css";

type Mode = "Light" | "Dark";
const App: React.FC = () => {
  const storedMode = (localStorage.getItem("mode") as Mode) || "Light";
  const [mode, setMode] = useState<Mode>(storedMode);

  return (
    <BrowserRouter>
      <div className={`app--${mode.toLowerCase()}`}>
        <Header onChangeMode={setMode} mode={mode} />
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/country/:cioc" element={<CountryDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;

import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";
import CountryDetail from "./pages/Country";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "./App.css";

const App: React.FC = () => {
  const [mode, setMode] = useState<"Light" | "Dark">("Light");

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

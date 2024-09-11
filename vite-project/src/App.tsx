import "./App.css";
import Home from "./views/Home";
import NavBar from "./components/NavBar/NavBar";
import { Outlet } from "react-router-dom";
import ThemeContext from "./services/ThemeContext.ts";
import React, { createContext, useState } from "react";
import { Theme, ThemeType } from "./types/types.ts";

function App() {
  const [theme, setTheme] = useState<Theme>("light");
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={`app-container ${theme}`}>
        <NavBar/>
        <Outlet />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;

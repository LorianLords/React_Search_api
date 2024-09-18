import { createContext } from "react";
import { ThemeType } from "../types/types.ts";

const ThemeContext = createContext<ThemeType>({
  theme: "light",
  setTheme: null,
});

export default ThemeContext;

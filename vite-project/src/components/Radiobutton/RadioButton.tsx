import themeContext from "../../services/ThemeContext.ts";
import { useContext } from "react";

const RadioButton = () => {
  const { theme, setTheme } = useContext(themeContext);
  return (
    <div>
      <h1>Theme toggle</h1>
      <label htmlFor="">
        <input
          type="radio"
          value={"light"}
          checked={theme === "light"}
          onChange={() => setTheme && setTheme("light")}
        />{" "}
        Light
      </label>
      <label style={{ marginLeft: "20px" }}>
        <input
          type="radio"
          value="dark"
          checked={theme === "dark"}
          onChange={() => setTheme && setTheme("dark")}
        />
        Dark
      </label>
    </div>
  );
};

export default RadioButton;

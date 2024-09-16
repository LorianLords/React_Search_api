import styles from "./NavBar.module.css";
import React, {FC, useContext} from "react";
import { Link } from "react-router-dom";
import { links } from "../../types/Const.ts";
import RadioButton from "../Radiobutton/RadioButton.tsx";
import themeContext from "../../services/ThemeContext.ts";

const NavBar: FC = () => {
    const {theme} = useContext(themeContext)
  return (
    <nav className={`${styles.navBar} ${theme === "light" ? styles.light : styles.dark}`}>
      <ul>
        {links.map((link, index) => (
          <li key={index}>
            <Link key={index} to={`${link.url}`} className={`${theme}`}>
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
      <RadioButton />
    </nav>
  );
};

export default NavBar;

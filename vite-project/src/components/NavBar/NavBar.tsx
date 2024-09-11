import styles from "./NavBar.module.css";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import { links } from "../../types/Const.ts";
import RadioButton from "../Radiobutton/RadioButton.tsx";

const NavBar: FC = () => {
  return (
    <nav className={styles.navBar}>
      <ul>
        {links.map((link, index) => (
          <li key={index}>
            <Link key={index} to={`${link.url}`}>
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

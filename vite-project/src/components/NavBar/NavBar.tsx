import styles from "./NavBar.module.css"
import React, {FC} from "react";
import {Link} from "react-router-dom";

const NavBar: FC = () => {


    return (
        <nav className={styles.navBar}>
            <ul>
                <li>
                   <Link to={"/home"}>Home</Link>
                </li>
                <li>
                    <Link to={"/about"}>About</Link>
                </li>
                <li>
                    <Link to={"/contact"}>Contact</Link>
                </li>
            </ul>
        </nav>
    )
}

export default NavBar;
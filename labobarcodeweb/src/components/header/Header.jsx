import clsx from "clsx";
import React, { useState } from "react";
import styles from "./Header.module.css";
import Menu from "../menu/Menu";
import logo from "../../assets/images/logo.jpg";
const Header = () => {
    const menuData = [
        {
            id: 1,
            name: "Home",
            href: "/",
        },
        {
            id: 2,
            name: "About",
            href: "/About",
        },
        {
            id: 3,
            name: "Services",
            href: "/Services",
        },
        {
            id: 4,
            name: "Contact",
            href: "/Contact",
        },
        {
            id: 5,
            name: "Warranty",
            href: "/",
        },
        {
            id: 6,
            name: "Cad Services",
            href: "/CadServices",
        },
        {
            id: 7,
            name: "Case",
            href: "/Case",
        },
    ];
    return (
        <div className={clsx(styles.nav)}>
            <div className={clsx(styles.logo)}>
                <img alt="Logo" src={logo} style={{ width: '150px', height: 'auto' }} />
            </div>
            <div className={clsx(styles.menu)}>
                <Menu menuData={menuData} />
            </div>
        </div>
    );
};

export default Header;

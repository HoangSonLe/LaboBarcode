import clsx from 'clsx';
import React, { useState } from 'react';
import styles from './Header.module.css';
import Menu from '../menu/Menu';
import logo from '../../assets/img/logo.png';
const Header = () => {
  const menuData = [
    {
      id: 1,
      name:"Home",
      href:"/"
    },
    {
      id: 2,
      name:"About",
      href:"/About"
    },
    {
      id: 3,
      name:"Services",
      href:"/Services"
    },
    {
      id: 4,
      name:"Contact",
      href:"/Contact"
    },
    {
      id: 5,
      name:"Warranty",
      href:"/Warranty"
    },
    {
      id: 6,
      name:"Cad Services",
      href:"/CadServices"
    },
    {
      id: 7,
      name:"Case",
      href:"/Case"
    }
  ]
  return (
    <div className={clsx(styles.nav)}>
        <img alt='Logo' src={logo}/>
        <Menu menuData={menuData}/>
    </div>
  );
};

export default Header;
import clsx from 'clsx';
import React, { useState } from 'react';
import styles from './Header.module.css';
import Menu from '../menu/Menu';
import logo from '../../assets/img/logo.png';
const Header = () => {

  return (
    <div className={clsx(styles.nav)}>
        <img src={logo}/>
        <Menu/>
    </div>
  );
};

export default Header;
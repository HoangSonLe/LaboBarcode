import clsx from 'clsx';
import React, { useState } from 'react';
import styles from './Layout.module.css';
import Header from "../header/Header";
import Footer from "../footer/Footer";
const Layout = ({children})=> {
    return <div className={clsx(styles.container)}>
        <Header/>
        <div className={clsx(styles.body)}>{children}</div>
        <Footer/>
    </div>
}
export default Layout;
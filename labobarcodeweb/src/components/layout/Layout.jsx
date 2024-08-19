import clsx from "clsx";
import React, { useState } from "react";
import styles from "./Layout.module.css";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Layout = () => {
    return (
        <div className={clsx(styles.container)}>
            <ToastContainer position="bottom-right" />
            <Header />
            <div className={clsx(styles.body)}>
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};
export default Layout;

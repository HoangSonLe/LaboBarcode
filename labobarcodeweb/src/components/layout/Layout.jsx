import clsx from "clsx";
import React, { useState } from "react";
import styles from "./Layout.module.css";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { Outlet, useMatch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = () => {
    const managementPage = useMatch("/quanlythebaohanh");
    const isManagementPage = Boolean(managementPage);
    return (
        <div className={clsx(isManagementPage ? styles.container : styles.containerClient)}>
            <ToastContainer position="bottom-right" />
            <Header />
            <div className={clsx(styles.body)}>
                <Outlet />
            </div>
            {!isManagementPage && <Footer />}
        </div>
    );
};
export default Layout;

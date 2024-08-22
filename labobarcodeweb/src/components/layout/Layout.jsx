import clsx from "clsx";
import { Outlet, useMatch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import styles from "./Layout.module.css";

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

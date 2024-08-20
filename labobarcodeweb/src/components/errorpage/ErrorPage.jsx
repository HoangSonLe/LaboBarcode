import clsx from "clsx";
import React, { useState } from "react";
import styles from "./ErrorPage.module.css";
import BarcodeScannerComponent from "../ui-kit/BarcodeScanner/BarcodeScanner";
const ErrorPage = () => {
    return (
        <div className={clsx(styles.container)}>
            ErrorPage
            <BarcodeScannerComponent />
        </div>
    );
};

export default ErrorPage;

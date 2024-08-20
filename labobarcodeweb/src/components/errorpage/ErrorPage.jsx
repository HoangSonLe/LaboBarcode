import clsx from "clsx";
import QrCodeScanner from "../ui-kit/BarcodeScanner/BarcodeScanner";
import styles from "./ErrorPage.module.css";
const ErrorPage = () => {
    return (
        <div className={clsx(styles.container)}>
            ErrorPage
            <QrCodeScanner />
        </div>
    );
};

export default ErrorPage;

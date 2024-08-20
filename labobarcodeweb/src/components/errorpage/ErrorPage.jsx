import clsx from "clsx";
import Example from "../ui-kit/BarcodeScanner/BarcodeScanner";
import styles from "./ErrorPage.module.css";
const ErrorPage = () => {
    return (
        <div className={clsx(styles.container)}>
            ErrorPage
            <Example />
        </div>
    );
};

export default ErrorPage;

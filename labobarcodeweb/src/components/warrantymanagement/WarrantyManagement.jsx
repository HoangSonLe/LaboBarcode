import clsx from "clsx";
import styles from "./WarrantyManagement.module.css";

import WarrantyTable from "./WarrantyTable";
import { useEffect, useLayoutEffect, useState } from "react";
import AuthCode from "../ui-kit/Auth/Auth";
import moment from "moment";
const WarrantyManagement = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleAuthentication = (status) => {
        setIsAuthenticated(status);
    };
    useLayoutEffect(() => {
        const authLaboExpiredDate = localStorage.getItem("authLaboExpiredDate");
        if (authLaboExpiredDate) {
            const storedDate = moment(authLaboExpiredDate);
            const currentDate = moment(new Date());
            if (storedDate.isAfter(currentDate)) {
                setIsAuthenticated(true);
            }
        }
    }, []);
    return (
        <div className={clsx(styles.container)}>
            {isAuthenticated ? (
                <WarrantyTable />
            ) : (
                <AuthCode onAuthenticate={handleAuthentication} />
            )}
        </div>
    );
};

export default WarrantyManagement;

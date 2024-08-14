import clsx from "clsx";
import styles from "./WarrantyManagement.module.css";

import WarrantyTable from "./WarrantyTable";
const WarrantyManagement = () => {
    
    return (
        <div className={clsx(styles.container)}>
            <WarrantyTable />
        </div>
    );
};

export default WarrantyManagement;

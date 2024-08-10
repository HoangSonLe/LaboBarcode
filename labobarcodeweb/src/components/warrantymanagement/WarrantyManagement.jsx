import clsx from "clsx";
import styles from "./WarrantyManagement.module.css";

import WarrantyTable from "./WarrantyTable";
const WarrantyManagement = () => {
    return (
        <div className={clsx(styles.container)}>
            <div className={clsx(styles.filterContainer)}></div>
            <div className={clsx(styles.tableContainer)}>
                <div className={clsx(styles.table)}>
                    <div style={{ width: "100%" }}>
                        <WarrantyTable />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WarrantyManagement;

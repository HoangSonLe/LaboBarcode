import clsx from "clsx";
import styles from "./WarrantyManagement.module.css";

import WarrantyTable from "./WarrantyTable";
import { Button } from "@mui/material";
import React from "react";
import SearchIcon from '@mui/icons-material/Search';
import ResearchWarrantyModal from "./ResearchWarrantyModal";
const WarrantyManagement = () => {
    const [modalProps, setModalProps] = React.useState(false);
    const modalRef = React.useRef();
    const openAddOrEditModal = () => {
        setModalProps(true);
        setTimeout(() => {
            modalRef.current.onOpenModal();
        }, 0); // Ensure modal is rendered before calling openModal
    };
    const handleCloseModal = () => {
        setModalProps(null); // Unmount the modal after closing
    };
    return (
        <div className={clsx(styles.container)}>
            <div className={clsx(styles.filterContainer)}>
            {modalProps && (
                <ResearchWarrantyModal
                    ref={modalRef}
                    id={modalProps.id}
                    onClose={handleCloseModal}
                />
            )}
                <Button
                    size="small"
                    onClick={openAddOrEditModal}
                    variant="contained"
                    sx={{
                        marginRight: "5px",
                        backgroundColor: "green", // Default background color
                        color: "white", // Text color
                        "&:hover": {
                            backgroundColor: "darkgreen", // Color on hover
                        },
                    }}
                    startIcon={<SearchIcon />}
                >
                    Tìm kiếm
                </Button>
            </div>
            <WarrantyTable />
        </div>
    );
};

export default WarrantyManagement;

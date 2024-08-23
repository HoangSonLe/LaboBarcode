import CloseIcon from "@mui/icons-material/Close";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { forwardRef, useImperativeHandle, useState } from "react";
import styles from "./DialogPreviewImage.module.css";

const DialogPreviewImage = forwardRef(({ imageSrc }, ref) => {
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const openModal = () => {
        setOpen(true);
    };
    useImperativeHandle(ref, () => ({
        openModal,
    }));

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="md">
            <DialogTitle
                className={styles.headerModal}
                sx={{ m: 0, p: 2 }}
                id="customized-dialog-title"
            >
                Xem ảnh
            </DialogTitle>
            <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                    position: "absolute",
                    right: 8,
                    top: 8,
                    color: "var(--primary-color)",
                }}
            >
                <CloseIcon fontSize="large" />
            </IconButton>
            <DialogContent>
                {imageSrc && (
                    <img
                        src={imageSrc}
                        alt="Selected"
                        style={{ maxWidth: "100%", height: "auto" }}
                    />
                )}
            </DialogContent>
        </Dialog>
    );
});

export default DialogPreviewImage;

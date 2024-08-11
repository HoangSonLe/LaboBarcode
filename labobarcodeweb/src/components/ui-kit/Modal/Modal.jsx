import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import * as React from "react";
import styles from "./Modal.module.css";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiPaper-root": {
        maxWidth: "unset !important",
    },
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
    },
}));

const CustomizedModal = React.forwardRef(
    ({ title, children, onSave,onClose, customRenderFooter, className }, ref) => {
        const [open, setOpen] = React.useState(false);

        const openModal = () => {
            setOpen(true);
        };
        const closeModal = () => {
            setOpen(false);
            onClose();
        };
        const handleSave = () => {
            onSave(() => setOpen(false));
        };
        React.useImperativeHandle(ref, () => ({
            openModal,
            closeModal,
        }));

        return (
            <React.Fragment>
                <BootstrapDialog
                    onClose={openModal}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                >
                    <DialogTitle
                        className={styles.headerModal}
                        sx={{ m: 0, p: 2 }}
                        id="customized-dialog-title"
                    >
                        {title}
                    </DialogTitle>
                    <IconButton
                        aria-label="close"
                        onClick={closeModal}
                        sx={{
                            position: "absolute",
                            right: 8,
                            top: 8,
                            color: "#148f96",
                        }}
                    >
                        <CloseIcon fontSize="large" />
                    </IconButton>
                    <DialogContent dividers>{children}</DialogContent>
                    <DialogActions>
                        {typeof customRenderFooter == "function" ? (
                            customRenderFooter(closeModal)
                        ) : (
                            <Box
                                display="flex"
                                flex="1"
                                alignItems="center"
                                justifyContent="flex-end"
                            >
                                <Button
                                    sx={{ marginRight: 2 }}
                                    variant="outlined"
                                    autoFocus
                                    onClick={closeModal}
                                >
                                    Đóng
                                </Button>
                                <Button variant="contained" autoFocus onClick={handleSave}>
                                    Lưu
                                </Button>
                            </Box>
                        )}
                    </DialogActions>
                </BootstrapDialog>
            </React.Fragment>
        );
    }
);
export default CustomizedModal;

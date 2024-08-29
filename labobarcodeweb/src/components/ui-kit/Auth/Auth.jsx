import { Button, Dialog, DialogContent, DialogTitle, TextField, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import moment from "moment";
import { useState } from "react";
import { authByCode } from "../../../apis/auth.api";
import styles from "./Auth.module.css";
const AuthCode = ({ onAuthenticate }) => {
    const [code, setCode] = useState("");
    const [errorState, setErrorState] = useState("");

    const authMutation = useMutation({
        mutationFn: (code) => authByCode(code),
        onSuccess: (_, code) => {
            localStorage.setItem(
                "authLaboExpiredDate",
                moment(new Date(), "DD-MM-YYYY").add(4, "hours").format()
            );
            onAuthenticate(true); // Call the function to mark the user as authenticated
        },
        onError: () => {
            setErrorState("Incorrect code. Please try again.");
        },
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        authMutation.mutate(code);
    };

    return (
        <Dialog
            title=""
            open={true}
            maxWidth="sm"
            PaperProps={{
                sx: {
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                },
            }}
        >
            <DialogTitle
                className={styles.headerModal}
                sx={{ m: 0, p: 2 }}
                id="customized-dialog-title"
            >
                Enter Security Code
            </DialogTitle>
            <DialogContent sx={{ p: 1 }}>
                <div className={styles.container}>
                    <div className={styles.filterContainer}>
                        <TextField
                            label="Security Code"
                            sx={{
                                marginBottom: "5px !important"
                            }}
                            size="small"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                        />
                        <Button
                            className={styles.button}
                            sx={{ ml: 1 }}
                            variant="contained"
                            onClick={handleSubmit}
                        >
                            Check
                        </Button>
                    </div>
                    {errorState && (
                        <div className={styles.errorContainer}>
                            <Typography
                                variant="h4"
                                sx={{
                                    color: "var(--red-color)",
                                }}
                            >
                                {errorState}
                            </Typography>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default AuthCode;

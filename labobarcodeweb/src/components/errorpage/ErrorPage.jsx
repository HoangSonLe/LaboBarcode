import clsx from "clsx";
import styles from "./ErrorPage.module.css";
import { Typography } from "@mui/material";
const ErrorPage = () => {
    return (
        <div className={clsx(styles.container)}>
            <Typography
                variant="h4"
                sx={{
                    color: "var(--red-color)",
                }}
            >
                Error Page
            </Typography>
        </div>
    );
};

export default ErrorPage;

import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
const ResponsiveButton = ({ renderIconButton, renderButton }) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 600); // Adjust the width as needed
        };

        window.addEventListener("resize", handleResize);

        // Set initial state based on current window width
        handleResize();

        // Clean up the event listener on component unmount
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    const iconButtonComp =
        typeof renderIconButton == "function" ? (
            renderIconButton()
        ) : (
            <IconButton color="primary">
                <MenuIcon />
            </IconButton>
        );
    const buttonComp =
        typeof renderButton == "function" ? (
            renderButton()
        ) : (
            <Button variant="contained" color="primary">
                Regular Button
            </Button>
        );
    return <>{isMobile ? iconButtonComp : buttonComp}</>;
};

export default ResponsiveButton;

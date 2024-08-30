import clsx from "clsx";
import logo from "../../assets/images/logo1.png";
import Menu from "../menu/Menu";
import styles from "./Header.module.css";
import { Typography } from "@mui/material";
const Header = () => {
    const menuData = [
        {
            id: 1,
            name: "Home",
            href: "/",
        },
        {
            id: 2,
            name: "About",
            href: "/About",
        },
        {
            id: 3,
            name: "Services",
            href: "/Services",
        },
        {
            id: 4,
            name: "Contact",
            href: "/Contact",
        },
        {
            id: 5,
            name: "Warranty",
            href: "/",
        },
        {
            id: 6,
            name: "Cad Services",
            href: "/CadServices",
        },
        {
            id: 7,
            name: "Case",
            href: "/Case",
        },
    ];
    return (
        <div className={clsx(styles.nav)}>
            <div className={clsx(styles.logo)}>
                {/* <img
                    alt="Logo"
                    src={logo}
                    style={{
                        width: "150px",
                        height: "auto",
                        filter: "brightness(1.2) contrast(1.2)",
                        marginTop: "-15px",
                    }}
                /> */}
                <Typography fontFamily={"open sans-serif"} color="black" variant="h4">SunnyTa</Typography>
            </div>
            <div className={clsx(styles.menu)}>
                <Menu menuData={menuData} />
            </div>
        </div>
    );
};

export default Header;

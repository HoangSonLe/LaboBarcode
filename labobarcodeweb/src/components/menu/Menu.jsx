import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Menu.css";
import { Link, useSearchParams } from "react-router-dom";

const Menu = ({ menuData }) => {
    const [click, setClick] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    console.log(searchParams);
    const handleClick = () => setClick(!click);
    return null;
    return (
        <div className="navbar">
            <ul className={click ? "nav-menu active" : "nav-menu"}>
                {menuData.map((i) => (
                    <li key={i.id} className="nav-item" onClick={handleClick}>
                        <Link to={i.href}>{i.name}</Link>
                    </li>
                ))}
            </ul>
            <div className="hamburger" onClick={handleClick}>
                {click ? (
                    <FaTimes size={30} style={{ color: "#f8f8f8" }} />
                ) : (
                    <FaBars size={30} style={{ color: "#f8f8f8" }} />
                )}
            </div>
        </div>
    );
};

export default Menu;

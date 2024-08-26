import clsx from "clsx";
import React, { useState } from "react";
import styles from "./Footer.module.css";
import { IoShareSocial, IoCall, IoMail, IoLocation } from "react-icons/io5";
import BannerLogo from "../../assets/images/bannerLogo.png";
import FacebookIcon from "../../assets/images/facebook.png";
import TwitterIcon from "../../assets/images/twitter.png";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
const containerStyle = {
    width: "100%",
    height: "100%",
};
const center = {
    lat: 40.712776, // Example latitude (New York City)
    lng: -74.005974, // Example longitude (New York City)
};
const Footer = () => {
    return (
        <div className={clsx(styles.footer)}>
            <div className={clsx(styles.container)}>
                <div className={clsx(styles.mapContainer)}>
                    <LoadScript googleMapsApiKey="AIzaSyDaOulQACiJzBfqumbsqg_-vKha8fCnL-s">
                        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
                            <Marker position={center} />
                        </GoogleMap>
                    </LoadScript>
                </div>
                {/* <div className={clsx(styles.bannerLogo)}>
                    <img alt="Banner" src={BannerLogo} />
                </div> */}
                <div className={clsx(styles.contactContainer)}>
                    <div className={clsx(styles.contactItem)}>
                        <div className={clsx(styles.contactIcon)}>
                            <IoShareSocial fon={"12px"} />
                        </div>
                        <div className={clsx(styles.contactContent)}>
                            <div className={clsx(styles.contactContentHeader)}>Follow me</div>
                            <div className={clsx(styles.contactContentInfor)}>
                                <img alt="Facebook" src={FacebookIcon} />
                                <img alt="Twitter" src={TwitterIcon} />
                            </div>
                        </div>
                    </div>
                    <div className={clsx(styles.contactItem)}>
                        <div className={clsx(styles.contactIcon)}>
                            <IoCall fon={"12px"} />
                        </div>
                        <div className={clsx(styles.contactContent)}>
                            <div className={clsx(styles.contactContentHeader)}>Phone</div>
                            <div className={clsx(styles.contactContentInfor)}>
                                <a href="tel:+84 28 22099 239">(+84) 938700203</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={clsx(styles.contactContainer)}>
                    <div className={clsx(styles.contactItem)}>
                        <div className={clsx(styles.contactIcon)}>
                            <IoMail fon={"12px"} />
                        </div>
                        <div className={clsx(styles.contactContent)}>
                            <div className={clsx(styles.contactContentHeader)}>Contact</div>
                            <div className={clsx(styles.contactContentInfor)}>
                                <a href="mailto:labsunnyta@gmail.com">labsunnyta@gmail.com</a>
                            </div>
                        </div>
                    </div>
                    <div className={clsx(styles.contactItem)}>
                        <div className={clsx(styles.contactIcon)}>
                            <IoLocation fon={"12px"} />
                        </div>
                        <div className={clsx(styles.contactContent)}>
                            <div className={clsx(styles.contactContentHeader)}>Address</div>
                            <div>
                                <span >Số 59, Đường số 5, Khu Dân Cư Vạn Phúc, Hiệp Bình Chánh, TP Thủ Đức</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;

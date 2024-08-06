import clsx from "clsx";
import React, { useState } from "react";
import styles from "./About.module.css";
import A from "../../assets/images/imagesAbout/A.png";
import B from "../../assets/images/imagesAbout/B.png";
import C from "../../assets/images/imagesAbout/C.png";
import D from "../../assets/images/imagesAbout/D.png";
import E from "../../assets/images/imagesAbout/E.png";
import F from "../../assets/images/imagesAbout/F.png";
import footer from "../../assets/images/imagesAbout/footer.png";
const About = () => {
    const imageList = [
        {
            id: 1,
            src: A,
            alt: "",
        },
        {
            id: 2,
            src: B,
            alt: "",
        },
        {
            id: 3,
            src: C,
            alt: "",
        },
        {
            id: 4,
            src: D,
            alt: "",
        },
        {
            id: 5,
            src: E,
            alt: "",
        },
        {
            id: 6,
            src: F,
            alt: "",
        },
    ];
    return (
        <div className={clsx(styles.container)}>
            <div className={clsx(styles.title)}>Our Story</div>
            <div className={clsx(styles.imageContainer)}>
                <div className={clsx(styles.imageList)}>
                    {imageList.map((i) => (
                        <img key={i.id} alt={i.alt} src={i.src} />
                    ))}
                </div>
                <div className={clsx(styles.imageFooter)}>
                    <img alt="footer" src={footer} />
                </div>
            </div>
            <div className={clsx(styles.content)}>
                <b>DDS LAB</b> is your trusted partner for all your dental needs. As a leading
                dental laboratory, we are dedicated to providing top-quality dental solutions that
                are both functional and aesthetically pleasing. <br />
                Our team of experts use the latest technology and techniques to create durable and
                long-lasting dental prosthetics. Whether you're a dentist or a patient seeking a
                smile makeover,<b> DDS LAB</b> is here to help. Contact us today to learn more about
                our services and to experience the benefits of a beautiful, healthy smile.
            </div>
            <div className={clsx(styles.footer)}></div>
        </div>
    );
};

export default About;

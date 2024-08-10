import React, { useEffect, useState } from "react";
import { TextField, Box, Dialog, DialogTitle, DialogContent } from "@mui/material";
import Slider from "react-slick";
import styles from "./SliderImage.module.css";
import clsx from "clsx";
const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow style={styles.arrow} />,
};
function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={clsx(className, styles.arrowCustom)}
            style={{ ...style, right: 0 }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={clsx(className, styles.arrowCustom)}
            style={{ ...style, left: 0 }}
            onClick={onClick}
        />
    );
}
export default function SliderImage({ imageSourceList, handleImageClick }) {
    return (
        <Slider {...sliderSettings}>
            {imageSourceList.map((preview, index) => (
                <div
                    key={index}
                    onClick={() => handleImageClick(preview)}
                    className={styles.imageContainer}
                >
                    <img src={preview} alt={`Selected File ${index + 1}`} />
                </div>
            ))}
        </Slider>
    );
}

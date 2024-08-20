import clsx from "clsx";
import Slider from "react-slick";
import styles from "./SliderImage.module.css";
import { IconButton } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={clsx(className, styles.arrowCustom)}
            style={{ ...style, right: 0, zIndex: 99 }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={clsx(className, styles.arrowCustom)}
            style={{ ...style, left: 0, zIndex: 99 }}
            onClick={onClick}
        />
    );
}
export default function SliderImage({ imageSourceList, handleImageClick, onClickRemoveImage }) {
    const sliderSettings = {
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: imageSourceList.length > 1,
        dots: imageSourceList.length > 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        centerMode: false, // Disable centering mode
        variableWidth: false, // Disable variable width, which could cause additional slides
    };
    return (
        <Slider {...sliderSettings}>
            {imageSourceList.map((preview, index) => (
                <div key={index} className={styles.imageContainer}>
                    <img
                        src={preview}
                        onClick={() => handleImageClick(preview)}
                        alt={`Selected File ${index + 1}`}
                    />
                    <IconButton
                        style={{
                            position: "absolute",
                            top: "0px",
                            right: "0px",
                            color: "rgba(0, 0, 0, 0.7)",
                        }}
                        onClick={(e) => {
                            e.stopPropagation();
                            onClickRemoveImage(index);
                        }}
                    >
                        <HighlightOffIcon fontSize="large" />
                    </IconButton>
                </div>
            ))}
        </Slider>
    );
}

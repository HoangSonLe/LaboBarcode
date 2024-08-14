import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import styles from "./AutoFadeCarousel.module.css";
import { useRef, useState } from "react";
import DialogPreviewImage from "../FileUpload/DialogPreviewImage";
const AutoFadeCarousel = ({ imageSrcList }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const modalRef = useRef();
    const onOpenModal = () => {
        setTimeout(() => {
            modalRef.current.openModal();
        }, 0);
    };
    const handleClickReview = (image) => {
        setSelectedImage(image);
        onOpenModal();
    };

    const settings = {
        dots: false, // Show navigation dots
        arrows: false,
        pauseOnFocus: true,
        pauseOnHover: true,
        infinite: true, // Loop through slides infinitely
        speed: 1000, // Animation speed for the fade effect
        slidesToShow: 1, // Show one slide at a time
        slidesToScroll: 1, // Scroll one slide at a time
        autoplay: true, // Enable auto-play
        autoplaySpeed: 3000, // Period time (3 seconds)
        fade: true, // Enable fade effect
    };

    return (
        <div className={styles.customSlider}>
            <Slider {...settings}>
                {imageSrcList.map((i) => (
                    <img
                        key={i.id}
                        onClick={() => handleClickReview(i.src)}
                        src={i.src}
                        alt={i.title}
                    />
                ))}
            </Slider>
            {selectedImage && <DialogPreviewImage ref={modalRef} imageSrc={selectedImage} />}
        </div>
    );
};

export default AutoFadeCarousel;

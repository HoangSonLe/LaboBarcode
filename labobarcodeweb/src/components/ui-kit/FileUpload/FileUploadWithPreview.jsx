import CloseIcon from "@mui/icons-material/Close";
import { Box, Dialog, DialogContent, DialogTitle, IconButton, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import SliderImage from "../SliderImage/SliderImage";
import styles from "./FileUploadWithPreview.module.css";

const FileUploadWithPreview = ({ selectedFiles, setSelectedFiles }) => {
    const [previews, setPreviews] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        setSelectedFiles(files);
    };

    useEffect(() => {
        if (selectedFiles && selectedFiles.length > 0) {
            const filePreviews = selectedFiles.map((file) => {
                const reader = new FileReader();
                return new Promise((resolve) => {
                    reader.onloadend = () => {
                        resolve(reader.result);
                    };
                    reader.readAsDataURL(file);
                });
            });

            Promise.all(filePreviews).then((results) => {
                setPreviews(results);
            });
        } else {
            setPreviews([]);
        }
    }, [selectedFiles]);

    const handleImageClick = (image) => {
        setSelectedImage(image);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleTextFieldClick = () => {
        document.getElementById("file-input").click();
    };

    return (
        <Box>
            <input
                id="file-input"
                type="file"
                accept="image/*"
                multiple
                style={{ display: "none" }}
                onChange={handleFileChange}
            />
            <TextField
                label="Tải ảnh"
                variant="outlined"
                fullWidth
                value={selectedFiles.length > 0 ? `${selectedFiles.length} file(s) đã được chọn` : ""}
                onClick={handleTextFieldClick}
                InputProps={{
                    readOnly: true,
                }}
            />
            {previews.length > 0 && (
                <Box mt={2}>
                    <SliderImage
                        imageSourceList={previews}
                        handleImageClick={handleImageClick}
                    ></SliderImage>
                </Box>
            )}

            <Dialog open={open} onClose={handleClose} maxWidth="md">
                <DialogTitle
                    className={styles.headerModal}
                    sx={{ m: 0, p: 2 }}
                    id="customized-dialog-title"
                >
                    Xem ảnh
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: "#148f96",
                    }}
                >
                    <CloseIcon fontSize="large" />
                </IconButton>
                <DialogContent>
                    {selectedImage && (
                        <img
                            src={selectedImage}
                            alt="Selected"
                            style={{ maxWidth: "100%", height: "auto" }}
                        />
                    )}
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default FileUploadWithPreview;

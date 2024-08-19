import CloseIcon from "@mui/icons-material/Close";
import { Box, Dialog, DialogContent, DialogTitle, IconButton, TextField } from "@mui/material";
import { memo, useEffect, useState } from "react";
import SliderImage from "../SliderImage/SliderImage";
import styles from "./FileUploadWithPreview.module.css";

const FileUploadWithPreview = memo(
    ({ selectedFiles = [], existingImages = [], setSelectedFiles }) => {
        const [allPreviews, setAllPreviews] = useState([]);
        const [open, setOpen] = useState(false);
        const [selectedImage, setSelectedImage] = useState(null);

        // Handle file input change
        const handleFileChange = (event) => {
            const files = Array.from(event.target.files);
            setSelectedFiles(files);
        };

        // Function to handle new file previews
        const getFilePreviews = async () => {
            const filePreviews = await Promise.all(
                selectedFiles.map((file) => {
                    const reader = new FileReader();
                    return new Promise((resolve) => {
                        reader.onloadend = () => {
                            resolve(reader.result);
                        };
                        reader.readAsDataURL(file);
                    });
                })
            );
            return filePreviews;
        };

        // Load previews on selectedFiles or existingImages change
        useEffect(() => {
            const loadPreviews = async () => {
                const newPreviews = await getFilePreviews();
                setAllPreviews((prev) => {
                    const combinedPreviews = [
                        ...existingImages.map((img) => img.url), // Ensure this is a valid URL string
                        ...newPreviews
                    ];
                    if (JSON.stringify(combinedPreviews) !== JSON.stringify(prev)) {
                        return combinedPreviews;
                    }
                    return prev;
                });
            };

            loadPreviews();
        }, [selectedFiles, existingImages]);

        // Open image dialog
        const handleImageClick = (image) => {
            setSelectedImage(image);
            setOpen(true);
        };

        // Close image dialog
        const handleClose = () => {
            setOpen(false);
        };

        // Open file input dialog
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
                    value={
                        allPreviews.length > 0
                            ? `${allPreviews.length} file(s) đã được chọn`
                            : ""
                    }
                    onClick={handleTextFieldClick}
                    InputProps={{
                        readOnly: true,
                    }}
                />
                {allPreviews.length > 0 && (
                    <Box mt={2}>
                        <SliderImage
                            imageSourceList={allPreviews}
                            handleImageClick={handleImageClick}
                        />
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
    }
);

export default FileUploadWithPreview;

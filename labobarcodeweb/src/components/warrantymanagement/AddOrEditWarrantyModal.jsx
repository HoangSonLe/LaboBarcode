import { Box, Grid, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { createWarranty, getWarranty, updateWarranty } from "../../apis/warranty.api";
import FileUploadWithPreview from "../ui-kit/FileUpload/FileUploadWithPreview";
import CustomizedModal from "../ui-kit/Modal/Modal";
import styles from "./AddOrEditWarrantyModal.module.css";
const AddOrEditWarrantyModal = React.forwardRef(({ id = "", onClose }, ref) => {
    const [formData, setFormData] = useState({
        clinic: "",
        codeNumber: "",
        doctor: "",
        expirationDate: moment(new Date(), "DD-MM-YYYY").add(30, "days"),
        imageSrcList: [],
        imageSrcPreviewList: [],
        labName: "",
        patientName: "",
        patientPhoneNumber: "",
        product: "",
        warrantyId: id,
    });
    // const [selectedFiles, setSelectedFiles] = useState([]);
    const childRef = React.useRef();

    const onOpenModal = () => {
        setTimeout(() => {
            childRef.current.openModal();
        }, 0);
    };

    const queryClient = useQueryClient();
    const warrantyQuery = useQuery({
        queryKey: ["warranty", id],
        queryFn: () => getWarranty(id),
        enabled: !!id,
        staleTime: 1000 * 10,
    });

    const createOrEditWarrantyMutation = useMutation({
        mutationFn: (data) => (!id ? createWarranty(data) : updateWarranty(id, data)),
        onError: (error) => {
            console.log(error.response?.data?.message);
            // Customize error handling here
            if (error.response && error.response.status === 400) {
                if (error.response?.data?.message) {
                    toast.error(error.response?.data?.message);
                }
            }
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["warrantys"] });
        },
    });

    useEffect(() => {
        if (warrantyQuery.data) {
            console.log(warrantyQuery.data.data.data);
            setFormData(warrantyQuery.data.data.data);
        }
    }, [warrantyQuery.data?.data]);

    const handleInputChange = (name) => (event) => {
        setFormData((prev) => ({ ...prev, [name]: event.target.value }));
    };
    const handleSubmit = (callbackCloseModal) => {
        const postData = new FormData();
        // Append each key-value pair from the object to FormData
        Object.keys(formData).forEach((key) => {
            switch (key) {
                case "expirationDate":
                    postData.append(key, new Date(formData[key])?.toISOString());
                    break;
                case "warrantyId":
                    if (formData[key] !== null && formData[key] !== undefined) {
                        postData.append(key, formData[key]);
                    }
                    break;
                case "imageSrcList":
                    if (formData[key] !== null && formData[key] !== undefined) {
                        formData[key].forEach((file, index) => {
                            postData.append(key, file); // e.g., file0, file1, etc.
                        });
                    }
                    break;
                default:
                    postData.append(key, formData[key]);
                    break;
            }
        });
        console.log(JSON.stringify(postData));

        createOrEditWarrantyMutation.mutate(postData, {
            onSuccess: () => {
                callbackCloseModal();
                toast.success("Thêm thành công!");
            },
        });
    };
    React.useImperativeHandle(ref, () => ({
        onOpenModal,
    }));
    return (
        <CustomizedModal
            className={styles.customModal}
            title={id ? "Chỉnh sửa" : "Thêm mới"}
            onSave={handleSubmit}
            onClose={onClose}
            ref={childRef}
            styles={{
                "& .MuiPaper-root": {
                    width: "50rem",
                    height: "40rem",
                    maxWidth: "unset !important",
                },
            }}
        >
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Box sx={{ pr: 1, pl: 1 }}>
                        <TextField
                            label="Tên bệnh nhân"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={formData.patientName}
                            onChange={handleInputChange("patientName")}
                        />
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box sx={{ pr: 1, pl: 1 }}>
                        <TextField
                            label="Số điện thoại bệnh nhân"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={formData.patientPhoneNumber}
                            onChange={handleInputChange("patientPhoneNumber")}
                        />
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box sx={{ pr: 1, pl: 1 }}>
                        <TextField
                            label="Tên phòng khám"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={formData.clinic}
                            onChange={handleInputChange("clinic")}
                        />
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box sx={{ pr: 1, pl: 1 }}>
                        <TextField
                            label="Tên phòng LAB"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={formData.labName}
                            onChange={handleInputChange("labName")}
                        />
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box sx={{ pr: 1, pl: 1 }}>
                        <TextField
                            label="Bác sĩ"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={formData.doctor}
                            onChange={handleInputChange("doctor")}
                        />
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box sx={{ pr: 1, pl: 1 }}>
                        <TextField
                            label="Sản phẩm"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={formData.product}
                            onChange={handleInputChange("product")}
                        />
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box sx={{ pr: 1, pl: 1 }}>
                        <TextField
                            label="Số thẻ bảo hành"
                            variant="outlined"
                            fullWidth
                            margin="dense"
                            value={formData.codeNumber}
                            onChange={handleInputChange("codeNumber")}
                        />
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box
                        sx={{
                            p: 1,
                            "& .MuiTextField-root": {
                                width: "100%",
                            },
                        }}
                    >
                        <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="en-gb">
                            <DatePicker
                                label="Ngày hết hạn"
                                views={["year", "month", "day"]}
                                value={moment(formData.expirationDate)}
                                onChange={(value) =>
                                    setFormData((prev) => ({ ...prev, expirationDate: value }))
                                }
                                format="DD/MM/YYYY"
                                renderInput={(params) => <TextField fullWidth {...params} />}
                            />
                        </LocalizationProvider>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box sx={{ pr: 1, pl: 1 }}>
                        <FileUploadWithPreview
                            selectedFiles={formData.imageSrcList}
                            existingImages={(formData.imageSrcPreviewList ?? []).map((i) => i.src)}
                            setSelectedFiles={(selectedFiles) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    imageSrcList: selectedFiles,
                                }))
                            }
                        />
                    </Box>
                </Grid>
            </Grid>
        </CustomizedModal>
    );
});

export default AddOrEditWarrantyModal;

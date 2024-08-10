import { Box, Grid, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { createWarranty, getWarranty, updateWarranty } from "../../apis/warranty.api";
import CustomizedModal from "../ui-kit/Modal/Modal";
import FileUploadWithPreview from "../ui-kit/FileUpload/FileUploadWithPreview";
import styles from "./AddOrEditWarrantyModal.module.css";
const AddOrEditWarrantyModal = React.forwardRef(({ id }, ref) => {
    const [formData, setFormData] = useState({});
    const [selectedFiles, setSelectedFiles] = useState([]);
    const childRef = React.useRef();

    const onOpenModal = () => {
        if (childRef.current) {
            childRef.current.openModal(); // Trigger child to open the modal
        }
    };

    const queryClient = useQueryClient();
    const warrantyQuery = useQuery({
        queryKey: ["warranty", id],
        queryFn: () => ({
            data: {
                data: {},
            },
        }), //getWarranty(id),
        staleTime: 1000 * 10,
    });

    const createOrEditWarrantyMutation = useMutation({
        mutationFn: (_) => (id == null ? createWarranty(formData) : updateWarranty(formData)),
        onSuccess: (data) => {
            queryClient.setQueryData(["warranty"], data);
        },
    });

    useEffect(() => {
        if (warrantyQuery.data) {
            setFormData(warrantyQuery.data.data);
        }
    }, [warrantyQuery.data]);

    const handleInputChange = (name) => (event) => {
        setFormData((prev) => ({ ...prev, [name]: event.target.value }));
    };
    const handleSubmit = (callbackCloseModal) => {
        createOrEditWarrantyMutation.mutate(formData, {
            onSuccess: () => {
                toast.success("Thêm thành công!");
                callbackCloseModal();
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
            ref={childRef}
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
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                            <DatePicker
                                label="Ngày hết hạn"
                                views={["year", "month", "day"]}
                                value={formData.expirationDate}
                                onChange={handleInputChange("expirationDate")}
                                renderInput={(params) => <TextField fullWidth {...params} />}
                            />
                        </LocalizationProvider>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box sx={{ pr: 1, pl: 1 }}>
                        <FileUploadWithPreview
                            selectedFiles={selectedFiles}
                            setSelectedFiles={setSelectedFiles}
                        />
                    </Box>
                </Grid>
            </Grid>
        </CustomizedModal>
    );
});

export default AddOrEditWarrantyModal;

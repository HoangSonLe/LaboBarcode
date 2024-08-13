import { Button, Skeleton, TextField } from "@mui/material";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import CustomizedModal from "../ui-kit/Modal/Modal";
import styles from "./ResearchWarrantyModal.module.css";
const ResearchWarrantyModal = React.forwardRef(({ onClose }, ref) => {
    const [cardNumber, setCardNumber] = useState("");
    const childRef = React.useRef();

    const onOpenModal = () => {
        if (childRef.current) {
            childRef.current.openModal(); // Trigger child to open the modal
        }
    };
    React.useImperativeHandle(ref, () => ({
        onOpenModal,
    }));
    const queryClient = useQueryClient();
    const { data, error, isLoading, refetch } = useQuery({
        queryKey: ["warrantyCard"],
        queryFn: () => ({
            data: {
                patientName: "Test",
                inventoryStatus: true,
                product: "Zirco on IMP 27,47. Zirco 17",
                expirationDate: new Date(),
                imageSrcList: [],
            },
        }), //getWarranty(id),
        enabled: false,
    });
    const handleInputChange = (event) => {
        setCardNumber(event.target.value);
    };
    const handleSubmit = () => {
        refetch();
    };
    useEffect(() => {
        queryClient.resetQueries(["warrantyCard"]);
    }, []);
    return (
        <CustomizedModal
            styles={{
                "& .MuiPaper-root": {
                    width: "55rem",
                    height: "40rem",
                    maxWidth: "unset !important",
                },
            }}
            title="Tra mã bảo hành"
            customRenderFooter={() => null}
            onClose={onClose}
            ref={childRef}
        >
            <div className={styles.container}>
                <div className={styles.filterContainer}>
                    <TextField
                        label="Mã bảo hành"
                        variant="outlined"
                        sx={{
                            width: "20rem",
                        }}
                        size="small"
                        value={cardNumber}
                        onChange={handleInputChange}
                    />
                    <Button sx={{ ml: 1 }} variant="contained" onClick={handleSubmit}>
                        Tìm kiếm
                    </Button>
                </div>
                <div className={styles.result}>
                    <div className={styles.leftResult}>
                        {isLoading && <Skeleton variant="rounded" width={210} height={60} />}
                        {error && <p>Error fetching data</p>}
                        {data && <div>{JSON.stringify(data)}</div>}
                        <div>Có hàng</div>
                        <div>Tên bệnh nhân</div>
                        <div>
                            <div>Ảnh</div>
                            <div>
                                <div>Sản phẩm</div>
                                <div>Hạn sử dụng</div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.rightResult}>DDS LAB</div>
                </div>
            </div>
        </CustomizedModal>
    );
});

export default ResearchWarrantyModal;

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { Box, Button, Skeleton, TextField } from "@mui/material";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import CustomizedModal from "../ui-kit/Modal/Modal";
import AutoFadeCarousel from "../ui-kit/SliderImage/AutoFadeCarousel";
import styles from "./ResearchWarrantyModal.module.css";
import { getWarrantyByCode } from "../../apis/warranty.api";
const ResearchWarrantyModal = React.forwardRef(({ onClose }, ref) => {
    const [cardNumber, setCardNumber] = useState("");
    const childRef = React.useRef();

    const onOpenModal = () => {
        setTimeout(() => {
            childRef.current.openModal();
        }, 0);
    };
    React.useImperativeHandle(ref, () => ({
        onOpenModal,
    }));
    const queryClient = useQueryClient();
    const { data, error, isLoading, refetch } = useQuery({
        queryKey: ["warrantyCard"],
        queryFn: () => getWarrantyByCode(cardNumber),
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
    console.log(data?.data?.data);
    var headerRenderData =
        data?.data?.data?.inventoryStatus == true
            ? {
                  title: "Có hàng",
                  icon: <CheckCircleOutlineIcon sx={{ fontSize: 40 }} />,
                  className: styles.titleInventory,
              }
            : {
                  title: "Hết hàng",
                  icon: <HighlightOffIcon sx={{ fontSize: 40 }} />,
                  className: styles.titleNoInventory,
              };
    return (
        <CustomizedModal
            styles={{
                "& .MuiPaper-root": {
                    width: "50rem",
                    height: "35rem",
                    maxWidth: "unset !important",
                },
            }}
            title="Tra mã bảo hành"
            onClose={onClose}
            ref={childRef}
            isHasFooter={false}
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
                        {isLoading && (
                            <Box>
                                <div className={headerRenderData.className}>
                                    <Skeleton variant="rounded" width={210} />
                                </div>
                                <div className={styles.patientTitle}>
                                    <Skeleton variant="rounded" width={210} height={60} />
                                </div>
                                <div className={styles.productContainer}>
                                    <div className={styles.imageDiv}>
                                        <Skeleton
                                            variant="rounded"
                                            width="100%"
                                            height="100%"
                                            sx={{ borderRadius: "inherit" }}
                                        />
                                    </div>
                                    <div className={styles.productInfor}>
                                        <div className={styles.productName}>
                                            <Skeleton variant="rounded" width={210} height={60} />
                                        </div>
                                        <div className={styles.expirationDate}>
                                            <Skeleton variant="rounded" width={210} height={30} />
                                        </div>
                                    </div>
                                </div>
                            </Box>
                        )}
                        {/* {error && <p>Error fetching data</p>} */}
                        {data?.data?.data && (
                            <Box>
                                <div className={headerRenderData.className}>
                                    <Box>{headerRenderData.icon}</Box>
                                    <Box sx={{ ml: 2, mb: 1 }}>{headerRenderData.title}</Box>
                                </div>
                                <div className={styles.patientTitle}>
                                    {data.data.data.patientName}
                                </div>
                                <div className={styles.productContainer}>
                                    <div className={styles.imageDiv}>
                                        <AutoFadeCarousel
                                            imageSrcList={data.data.data.imageSrcList ?? []}
                                        />
                                    </div>
                                    <div className={styles.productInfor}>
                                        <div className={styles.productName}>
                                            {data.data.data.product}
                                        </div>
                                        <div className={styles.expirationDate}>
                                            {data.data.data.expirationDate != null &&
                                                new Date(
                                                    data.data.data.expirationDate
                                                ).toLocaleDateString()}
                                        </div>
                                    </div>
                                </div>
                            </Box>
                        )}
                    </div>

                    <div className={styles.rightResult}>
                        <div className={styles.rightContent}>DDS LAB</div>
                    </div>
                </div>
            </div>
        </CustomizedModal>
    );
});

export default ResearchWarrantyModal;

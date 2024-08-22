import SearchIcon from "@mui/icons-material/Search";
import { LoadingButton } from "@mui/lab";
import { CircularProgress, InputAdornment, OutlinedInput, Typography } from "@mui/material";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { getWarrantyByCode } from "../../apis/warranty.api";
// import BarcodeScannerComponent from "../ui-kit/BarcodeScanner/BarcodeScanner";
import BarcodeScanner from "../ui-kit/BarcodeScanner/BarcodeScanner";
import styles from "./Warranty.module.css";
import { toast } from "react-toastify";
const Warranty = () => {
    const [cardNumber, setCardNumber] = useState("");
    const [isUseResultBarcode, setIsUseResultBarcode] = useState(false);
    const queryClient = useQueryClient();
    const { data, isSuccess, isError, isFetching, refetch } = useQuery({
        queryKey: ["warrantyCard"],
        queryFn: () => getWarrantyByCode(cardNumber),
        enabled: false,
        staleTime: 0,
    });
    const handleSubmit = () => {
        if (cardNumber) {
            refetch();
        }
    };
    useEffect(() => {
        if (cardNumber && isUseResultBarcode) {
            refetch();
            setIsUseResultBarcode(false);
        }
    }, [cardNumber, isUseResultBarcode]);

    const hanldeScanQRSuccess = (barcodeUrl) => {
        // Find the starting index of the remaining substring
        const apiUrl = `${process.env.REACT_APP_BARCODE_PREFIX_URL}`;
        const startIndex = barcodeUrl.indexOf(apiUrl) + apiUrl.length;
        const barcodeText = barcodeUrl.slice(startIndex);
        if (barcodeText) {
            console.log(barcodeText);
            setCardNumber(barcodeText);
            setIsUseResultBarcode(true);
        } else {
            toast.error("Barcode is empty.");
        }
    };
    var warrantyInfomation = data?.data?.data;

    return (
        <div className={clsx(styles.container)}>
            <div className={clsx(styles.cardContainer)}>
                <div className={clsx(styles.formContainer)}>
                    <div className={clsx(styles.formTitle)}>
                        Vui lòng nhập mã số trên thẻ của bạn để kiểm tra thông tin bảo hành:
                    </div>
                    <OutlinedInput
                        className={clsx(styles.textFieldForm)}
                        id="outlined-basic"
                        placeholder="Enter warranty code"
                        variant="outlined"
                        InputLabelProps={{
                            shrink: false,
                        }}
                        endAdornment={
                            <InputAdornment position="end">
                                <BarcodeScanner hanldeScanQRSuccess={hanldeScanQRSuccess} />
                            </InputAdornment>
                        }
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                    />
                    <LoadingButton
                        loading={isFetching}
                        className={clsx(styles.buttonForm)}
                        variant="contained"
                        loadingPosition="start"
                        startIcon={<SearchIcon />}
                        onClick={handleSubmit}
                    >
                        Check
                    </LoadingButton>
                </div>
                {isError && (
                    <div className={clsx(styles.tableCard)}>
                        <Typography
                            variant="h4"
                            sx={{
                                color: "#DF0F0F",
                            }}
                        >
                            Error
                        </Typography>
                    </div>
                )}
                {isFetching && !warrantyInfomation && (
                    <div className={clsx(styles.tableCard)}>
                        <CircularProgress color="success" />
                    </div>
                )}
                {warrantyInfomation && (
                    <div className={clsx(styles.tableCard)}>
                        <table>
                            <thead>
                                <tr>
                                    <th colSpan={2}>Patient Information</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Field</td>
                                    <td>Information</td>
                                </tr>
                                <tr>
                                    <td>Warranty Code</td>
                                    <td>{warrantyInfomation.codeNumber}</td>
                                </tr>
                                <tr>
                                    <td>PatientName</td>
                                    <td>{warrantyInfomation.patientName}</td>
                                </tr>
                                <tr>
                                    <td>Clinic</td>
                                    <td>{warrantyInfomation.clinic}</td>
                                </tr>
                                <tr>
                                    <td>Doctor</td>
                                    <td>{warrantyInfomation.doctor}</td>
                                </tr>
                                <tr>
                                    <td>Lab Name</td>
                                    <td>{warrantyInfomation.labName}</td>
                                </tr>
                                <tr>
                                    <td>ExpirationDate</td>
                                    <td>
                                        {warrantyInfomation.expirationDate != null &&
                                            new Date(
                                                warrantyInfomation.expirationDate
                                            ).toLocaleDateString()}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Product</td>
                                    <td>{warrantyInfomation.product}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}
                {!isFetching && data?.data?.message && !warrantyInfomation && (
                    <div className={clsx(styles.tableCard)}>
                        <Typography variant="h6">{data.data.message}</Typography>
                    </div>
                )}
            </div>
            <div className={clsx(styles.subContentContainer)}>
                <div className={clsx(styles.subtitle)}>Điều Kiện Bảo Hành:</div>
                <div className={clsx(styles.subContent)}>
                    <ul>
                        <li>Sản phẩm phải có thẻ bảo hành hợp lệ.</li>
                        <li>Sản phẩm vẫn còn trong thời gian bảo hành.</li>
                    </ul>
                </div>
                <div className={clsx(styles.subtitle)}>Các Điều Kiện Không Được Bảo Hành:</div>
                <div className={clsx(styles.subContent)}>
                    <ul>
                        <li>
                            Phục hình bị vỡ do rơi, va chạm trước khi lắp đặt, bị nứt do rơi, hoặc
                            chấn thương.
                        </li>
                    </ul>
                </div>
                <div className={clsx(styles.subtitle)}>Chi Tiết:</div>
                <div className={clsx(styles.subContent)}>
                    <ul>
                        <li>
                            Các loại phục hình Zirconia khác nhau do SunnyTA Lab sản xuất, được chế
                            tạo bằng nguyên liệu nhập khẩu chính hãng có nguồn gốc rõ ràng.
                        </li>
                        <li>Khuyến nghị tuân thủ theo hướng dẫn của nha sĩ điều trị.</li>
                        <li>
                            Nha sĩ điều trị và phòng thí nghiệm nha khoa chịu trách nhiệm về việc
                            triển khai và bảo hành phục hình Zirconia, đảm bảo cả về mặt thẩm mỹ và
                            hiệu suất chức năng.
                        </li>
                        <li>Thời gian bảo hành cho các loại Zirconia khác nhau:</li>
                    </ul>
                </div>
                <div className={clsx(styles.subContentTable)}>
                    <table>
                        <thead>
                            <tr>
                                <th>Sản phẩm</th>
                                <th>Thời gian bảo hành</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>VITA</td>
                                <td>7 Năm</td>
                            </tr>
                            <tr>
                                <td>Cercon</td>
                                <td>7 Năm</td>
                            </tr>
                            <tr>
                                <td>DDBIO</td>
                                <td>10 Năm</td>
                            </tr>
                            <tr>
                                <td>Venus</td>
                                <td>10 Năm</td>
                            </tr>
                            <tr>
                                <td>Ceramill Zolid</td>
                                <td>10 Năm</td>
                            </tr>
                            <tr>
                                <td>HT Smile</td>
                                <td>10 Năm</td>
                            </tr>
                            <tr>
                                <td>Emax</td>
                                <td>10 Năm</td>
                            </tr>
                            <tr>
                                <td>Everest</td>
                                <td>10 Năm</td>
                            </tr>
                            <tr>
                                <td>Lava</td>
                                <td>15 Năm</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className={clsx(styles.subtitle)}>Một Số Lưu Ý Khi Sử Dụng Phục Hình Sứ:</div>
                <div className={clsx(styles.subContent)}>
                    <ul>
                        <li>
                            Sau khi lắp phục hình sứ, bạn cần một thời gian để quen với phục hình
                            mới. Răng và nướu có thể nhạy cảm trong vài ngày đầu tiên khi đeo phục
                            hình.
                        </li>
                        <li>
                            Giống như răng tự nhiên, bạn nên bảo vệ phục hình bằng cách tránh cắn
                            hoặc nhai thức ăn quá cứng (xương, đá, v.v.). Tránh tiêu thụ thức ăn quá
                            nóng hoặc quá lạnh. Rửa miệng bằng nước muối ấm có thể mang lại cảm giác
                            thoải mái hơn.
                        </li>
                        <li>
                            Duy trì vệ sinh răng miệng sau bữa ăn, luôn đánh răng và sử dụng chỉ nha
                            khoa nếu cần thiết để bảo vệ nướu và răng tự nhiên dưới phục hình. Nếu
                            cảm thấy phục hình bất cân bằng khi nhai, hãy liên hệ với nha sĩ điều
                            trị.
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Warranty;

import clsx from "clsx";
import React, { useState } from "react";
import styles from "./Warranty.module.css";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
const Warranty = () => {
    const [cardNumber, setCardNumber] = useState("");
    const handleSubmit = () => {
        console.log(cardNumber);
    };
    var warrantyInfomation = {
        cardNumber: 52252999,
        patientName: "Lưu Đình Cường",
        clinic: "Wilson",
        doctor: "Dr Sang",
        labo: "DDS LAB",
        validTo: new Date(),
        product: "Zirco on IMP 27,47. Zirco 17",
    };
    return (
        <div className={clsx(styles.container)}>
            <div className={clsx(styles.cardContainer)}>
                <div className={clsx(styles.formContainer)}>
                    <div className={clsx(styles.formTitle)}>
                        Please put code number on your card to check warranty infomation:
                    </div>
                    <TextField
                        className={clsx(styles.textFieldForm)}
                        id="outlined-basic"
                        placeholder="Nhập mã bảo hành"
                        variant="outlined"
                        InputLabelProps={{
                            shrink: false,
                        }}
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.value)}
                    />
                    <Button
                        className={clsx(styles.buttonForm)}
                        variant="contained"
                        onClick={handleSubmit}
                    >
                        Kiểm tra
                    </Button>
                </div>
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
                                <td>Mã số</td>
                                <td>{warrantyInfomation.cardNumber}</td>
                            </tr>
                            <tr>
                                <td>Tên khách hàng</td>
                                <td>{warrantyInfomation.patientName}</td>
                            </tr>
                            <tr>
                                <td>Phòng khám</td>
                                <td>{warrantyInfomation.clinic}</td>
                            </tr>
                            <tr>
                                <td>Bác sĩ</td>
                                <td>{warrantyInfomation.doctor}</td>
                            </tr>
                            <tr>
                                <td>Labo</td>
                                <td>{warrantyInfomation.labo}</td>
                            </tr>
                            <tr>
                                <td>Ngày hết hạn</td>
                                <td>{warrantyInfomation.validTo.toLocaleDateString()}</td>
                            </tr>
                            <tr>
                                <td>Tên sản phẩm</td>
                                <td>{warrantyInfomation.product}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
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
                        <li>Phục hình bị vỡ do rơi, va chạm trước khi lắp đặt, bị nứt do rơi, hoặc chấn thương.</li>
                    </ul>
                </div>
                <div className={clsx(styles.subtitle)}>Chi Tiết:</div>
                <div className={clsx(styles.subContent)}>
                    <ul>
                        <li>Các loại phục hình Zirconia khác nhau do DDS LAB sản xuất, được chế tạo bằng nguyên liệu nhập khẩu chính hãng có nguồn gốc rõ ràng.</li>
                        <li>Khuyến nghị tuân thủ theo hướng dẫn của nha sĩ điều trị.</li>
                        <li>Nha sĩ điều trị và phòng thí nghiệm nha khoa chịu trách nhiệm về việc triển khai và bảo hành phục hình Zirconia, đảm bảo cả về mặt thẩm mỹ và hiệu suất chức năng.</li>
                        <li>Thời gian bảo hành cho các loại Zirconia khác nhau:</li>
                    </ul>
                </div>
                <div className={clsx(styles.subContentTable)}>
                    <table>
                        <tr>
                            <th>Sản phẩm</th>
                            <th>Thời gian bảo hành</th>
                        </tr>
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
                    </table>
                </div>
                <div className={clsx(styles.subtitle)}>Một Số Lưu Ý Khi Sử Dụng Phục Hình Sứ:</div>
                <div className={clsx(styles.subContent)}>
                    <ul>
                        <li>Sau khi lắp phục hình sứ, bạn cần một thời gian để quen với phục hình mới. Răng và nướu có thể nhạy cảm trong vài ngày đầu tiên khi đeo phục hình.</li>
                        <li>Giống như răng tự nhiên, bạn nên bảo vệ phục hình bằng cách tránh cắn hoặc nhai thức ăn quá cứng (xương, đá, v.v.). Tránh tiêu thụ thức ăn quá nóng hoặc quá lạnh. Rửa miệng bằng nước muối ấm có thể mang lại cảm giác thoải mái hơn.</li>
                        <li>Duy trì vệ sinh răng miệng sau bữa ăn, luôn đánh răng và sử dụng chỉ nha khoa nếu cần thiết để bảo vệ nướu và răng tự nhiên dưới phục hình. Nếu cảm thấy phục hình bất cân bằng khi nhai, hãy liên hệ với nha sĩ điều trị.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Warranty;

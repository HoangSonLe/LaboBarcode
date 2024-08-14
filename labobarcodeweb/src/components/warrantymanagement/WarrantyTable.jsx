import AddCircleIcon from "@mui/icons-material/AddCircle";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import {
    Button,
    Chip,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
} from "@mui/material";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import { alpha } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { visuallyHidden } from "@mui/utils";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import * as React from "react";
import { toast } from "react-toastify";
import { deleteWarranty } from "../../apis/warranty.api";
import AddOrEditWarrantyModal from "./AddOrEditWarrantyModal";
import ResearchWarrantyModal from "./ResearchWarrantyModal";
import styles from "./WarrantyManagement.module.css";
import { LoadingButton } from "@mui/lab";
function createData(
    expiredStatus,
    warrantyId,
    patientName,
    patientPhoneNumber,
    clinic,
    labName,
    doctor,
    product,
    codeNumber,
    expirationDate,
    createdAt,
    updatedAt
) {
    return {
        expiredStatus,
        warrantyId,
        patientName,
        patientPhoneNumber,
        clinic,
        labName,
        doctor,
        product,
        codeNumber,
        expirationDate,
        createdAt,
        updatedAt,
    };
}

const rows = [
    createData(
        true,
        1,
        "patientName",
        "patientPhoneNumber",
        "clinic",
        "labName",
        "doctor",
        "product",
        "codeNumber",
        new Date(),
        new Date(),
        null
    ),
    createData(
        false,
        2,
        "patientName2",
        "patientPhoneNumber2",
        "clinic2",
        "labName2",
        "doctor2",
        "product2",
        "codeNumber2",
        new Date(),
        new Date(),
        new Date()
    ),
];
const headCells = [
    {
        id: 0,
        numeric: false,
        label: "Trạng thái",
        minWidth: 100,
    },
    {
        id: 1,
        numeric: false,
        label: "Tên bệnh nhân",
        minWidth: 170,
    },
    {
        id: 2,
        numeric: false,
        label: "Số điện thoại",
        minWidth: 170,
    },
    {
        id: 3,
        numeric: false,
        label: "Phòng khám",
        minWidth: 170,
    },
    {
        id: 4,
        numeric: false,
        label: "Phòng LAB",
        minWidth: 170,
    },
    {
        id: 5,
        numeric: false,
        label: "Bác sĩ",
        minWidth: 170,
    },
    {
        id: 6,
        numeric: false,
        label: "Sản phẩm",
        minWidth: 170,
    },
    {
        id: 7,
        numeric: false,
        label: "Mã Code",
        minWidth: 170,
    },
    {
        id: 8,
        numeric: false,
        label: "Ngày hết hạn",
        minWidth: 170,
    },
    {
        id: 9,
        numeric: false,
        label: "Ngày cập nhật",
        minWidth: 170,
    },
];

export default function WarrantyTable({ tableData }) {
    const defaultSearch = {
        searchString: "",
        expiredFromDate: null,
        expiredToDate: null,
        expiredStatus: null,
    };
    const [order, setOrder] = React.useState("asc");
    const [orderBy, setOrderBy] = React.useState("patientName");
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const [searchModel, setSearchModel] = React.useState(defaultSearch);

    //#region Ref AddOrEdit
    const [addOrEditModalProps, setAddOrEditModalProps] = React.useState(null);
    const addOrEditModalRef = React.useRef();
    const openAddOrEditModal = () => {
        var id = null;
        if (selected.length == 1) {
            id = selected[0].warrantyId;
        }
        setAddOrEditModalProps({ id });
        setTimeout(() => {
            addOrEditModalRef.current.onOpenModal();
        }, 0); // Ensure modal is rendered before calling openModal
    };
    const handleCloseModal = () => {
        setAddOrEditModalProps(null); // Unmount the modal after closing
    };

    //#endregion
    //#region SearchCardNumber
    const [searchCardNumberModalProps, setModalProps] = React.useState(false);
    const searchCardNumberModalRef = React.useRef();
    const openSearchCardModal = () => {
        setModalProps(true);
        setTimeout(() => {
            searchCardNumberModalRef.current.onOpenModal();
        }, 0); // Ensure modal is rendered before calling openModal
    };
    const handleCloseSearchCardModal = () => {
        setModalProps(null); // Unmount the modal after closing
    };
    //#endregion
    //#region API
    const queryClient = useQueryClient();
    tableData = {
        dataRows: rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
        total: rows.length,
    };

    const { data, error, isLoading, refetch } = useQuery({
        queryKey: ["warrantys", page],
        queryFn: () => {
            const controller = new AbortController();
            setTimeout(() => {
                controller.abort();
            }, 5000);
            return tableData;
            // return getWarrantys(
            //     {
            //         searchModel: {
            //             searchString: "",
            //             fromDate: new Date(),
            //             toDate: new Date(),
            //         },
            //         sort: orderBy,
            //         sortDirection: order,
            //         page: page,
            //         pageSize: rowsPerPage,
            //     },
            //     controller.signal
            // );
        },
        keepPreviousData: true,
        retry: 0,
    });

    const deleteWarrantyMutation = useMutation({
        mutationFn: (id) => deleteWarranty(id),
        onSuccess: (_, id) => {
            toast.success(`Xóa thành công`);
            queryClient.invalidateQueries({ queryKey: ["warrantys", page], exact: true });
        },
    });
    //#endregion
    //#region Handle Action Table
    const handleInputChange = (name) => (event) => {
        setSearchModel((prev) => ({ ...prev, [name]: event.target.value }));
    };
    const handleOnDelete = () => {
        deleteWarrantyMutation.mutate(selected[0].warrantyId);
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };
    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.warrantyId);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };
    const handleClickRowItem = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }
        setSelected(newSelected);
    };
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const onClickSearch = () => {
        refetch();
    };
    const onClickClearSearch = () => {
        setSearchModel(defaultSearch);
    };
    const isSelected = (id) => selected.indexOf(id) !== -1;
    //#endregion
    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 5;

    let numSelected = selected.length;

    let total = isLoading ? 0 : data.dataRows.length;

    return (
        <Box
            sx={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}
        >
            {addOrEditModalProps && (
                <AddOrEditWarrantyModal
                    ref={addOrEditModalRef}
                    id={addOrEditModalProps.id}
                    onClose={handleCloseModal}
                />
            )}

            <Paper sx={{ width: "90%" }}>
                <div className={clsx(styles.filterContainer)}>
                    <Stack
                        direction={{ sm: "column", md: "row" }}
                        spacing={{ xs: 1, sm: 2, md: 2 }}
                    >
                        <TextField
                            label="Tìm kiếm"
                            variant="outlined"
                            size="small"
                            value={searchModel.searchString}
                            onChange={handleInputChange("searchString")}
                        />
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                            <DatePicker
                                label="Ngày hết hạn từ"
                                views={["year", "month", "day"]}
                                value={searchModel.expiredFromDate}
                                onChange={(value) =>
                                    setSearchModel((prev) => ({
                                        ...prev,
                                        expiredFromDate: value,
                                    }))
                                }
                                slotProps={{ textField: { size: "small" } }}
                            />
                        </LocalizationProvider>
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                            <DatePicker
                                label="Ngày hết hạn đến"
                                views={["year", "month", "day"]}
                                value={searchModel.expiredToDate}
                                onChange={(value) =>
                                    setSearchModel((prev) => ({
                                        ...prev,
                                        expiredToDate: value,
                                    }))
                                }
                                format="DD/MM/YYYY"
                                slotProps={{ textField: { size: "small" } }}
                            />
                        </LocalizationProvider>
                        <FormControl sx={{ ml: 1, minWidth: 120 }} size="small">
                            <InputLabel id="expiredStatusLabel">Trạng thái</InputLabel>
                            <Select
                                size="small"
                                labelId="expiredStatusLabel"
                                value={searchModel.expiredStatus}
                                label="Trạng thái"
                                onChange={handleInputChange("expiredStatus")}
                            >
                                <MenuItem value={true}>Còn hạn</MenuItem>
                                <MenuItem value={false}>Hết hạn</MenuItem>
                            </Select>
                        </FormControl>
                        <Button
                            onClick={onClickClearSearch}
                            variant="outlined"
                            startIcon={<CleaningServicesIcon />}
                            sx={{
                                backgroundColor: "rgba(98, 0, 238, 0.1)", // Set the background color
                                borderColor: "purple", // Change border color if needed
                                color: "purple", // Change text color if needed
                                "&:hover": {
                                    backgroundColor: "rgba(98, 0, 238, 0.2)", // Change background on hover
                                    borderColor: "purple",
                                },
                            }}
                        >
                            Xóa bộ lộc
                        </Button>
                        <LoadingButton
                            onClick={onClickSearch}
                            variant="contained"
                            sx={{
                                marginRight: "5px",
                                backgroundColor: "green", // Default background color
                                color: "white", // Text color
                                "&:hover": {
                                    backgroundColor: "darkgreen", // Color on hover
                                },
                            }}
                            loading = {isLoading}
                            loadingPosition="start"
                            startIcon={<SearchIcon />}
                        >
                            Tìm kiếm
                        </LoadingButton>
                        <Button
                            onClick={openSearchCardModal}
                            variant="contained"
                            sx={{
                                marginRight: "5px",
                                backgroundColor: "green", // Default background color
                                color: "white", // Text color
                                "&:hover": {
                                    backgroundColor: "darkgreen", // Color on hover
                                },
                            }}
                            startIcon={<ContentPasteSearchIcon />}
                        >
                            Tra mã bảo hành
                        </Button>
                    </Stack>
                    {searchCardNumberModalProps && (
                        <ResearchWarrantyModal
                            ref={searchCardNumberModalRef}
                            id={searchCardNumberModalProps.id}
                            onClose={handleCloseSearchCardModal}
                        />
                    )}
                </div>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                        <TableHead className={clsx(styles.tableHead)}>
                            <TableRow>
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        sx={{
                                            "&.Mui-checked": {
                                                color: "#19d2cb", // Color when checked
                                            },
                                            "&.MuiCheckbox-indeterminate": {
                                                color: "#19d2cb", // Color when checked
                                            },
                                        }}
                                        indeterminate={numSelected > 0 && numSelected < total}
                                        checked={total > 0 && numSelected === total}
                                        onChange={handleSelectAllClick}
                                        inputProps={{
                                            "aria-label": "select all desserts",
                                        }}
                                    />
                                </TableCell>
                                {headCells.map((headCell) => (
                                    <TableCell
                                        key={headCell.id}
                                        align={"center"}
                                        sortDirection={orderBy === headCell.id ? order : false}
                                        sx={{
                                            minWidth: headCell.minWidth,
                                        }}
                                    >
                                        <TableSortLabel
                                            active={orderBy === headCell.id}
                                            direction={orderBy === headCell.id ? order : "asc"}
                                            onClick={(e) => handleRequestSort(e, headCell.id)}
                                        >
                                            {headCell.label}
                                            {orderBy === headCell.id ? (
                                                <Box component="span" sx={visuallyHidden}>
                                                    {order === "desc"
                                                        ? "sorted descending"
                                                        : "sorted ascending"}
                                                </Box>
                                            ) : null}
                                        </TableSortLabel>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {isLoading && (
                                <TableRow
                                    style={{
                                        height: 53 * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6}>Loading....</TableCell>
                                </TableRow>
                            )}
                            {!isLoading &&
                                data.dataRows.map((row, index) => {
                                    const isItemSelected = isSelected(row.warrantyId);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) =>
                                                handleClickRowItem(event, row.warrantyId)
                                            }
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.warrantyId}
                                            selected={isItemSelected}
                                            sx={{ cursor: "pointer" }}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    color="primary"
                                                    checked={isItemSelected}
                                                    inputProps={{
                                                        "aria-labelledby": labelId,
                                                    }}
                                                    sx={{
                                                        "&.Mui-checked": {
                                                            color: "#19d2cb", // Color when checked
                                                        },
                                                        "&.MuiCheckbox-indeterminate": {
                                                            color: "#19d2cb", // Color when checked
                                                        },
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                padding="none"
                                                align="center"
                                            >
                                                {row.expiredStatus ? (
                                                    <Chip label="Còn hạn" color="success" />
                                                ) : (
                                                    <Chip label="Hết hạn" color="error" />
                                                )}
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {row.patientName}
                                            </TableCell>
                                            <TableCell align="left">
                                                {row.patientPhoneNumber}
                                            </TableCell>
                                            <TableCell align="left">{row.clinic}</TableCell>
                                            <TableCell align="left">{row.labName}</TableCell>
                                            <TableCell align="left">{row.doctor}</TableCell>
                                            <TableCell align="left">{row.product}</TableCell>
                                            <TableCell align="left">{row.codeNumber}</TableCell>
                                            <TableCell align="center">
                                                {row.expirationDate.toLocaleDateString()}
                                            </TableCell>
                                            <TableCell align="center">
                                                {(
                                                    row.updatedAt ?? row.createdAt
                                                ).toLocaleDateString()}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: 53 * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Toolbar
                    sx={{
                        pl: { sm: 2 },
                        pr: { xs: 1, sm: 1 },
                        ...(numSelected > 0 && {
                            bgcolor: (theme) =>
                                alpha(
                                    theme.palette.primary.main,
                                    theme.palette.action.activatedOpacity
                                ),
                        }),
                    }}
                >
                    <Box display="flex" flex="1" alignItems="center" justifyContent="space-between">
                        {/* Custom component at the start */}
                        <div
                            style={{
                                marginRight: "20px",
                                display: "flex",
                            }}
                        >
                            {numSelected > 0 ? (
                                <Typography
                                    sx={{ marginRight: "10px" }}
                                    color="inherit"
                                    variant="subtitle1"
                                    component="div"
                                >
                                    {numSelected} đã chọn
                                </Typography>
                            ) : (
                                <Typography
                                    variant="subtitle1"
                                    id="tableTitle"
                                    component="div"
                                ></Typography>
                            )}
                            {numSelected == 0 ? (
                                <Button
                                    size="small"
                                    onClick={openAddOrEditModal}
                                    variant="contained"
                                    sx={{
                                        marginRight: "5px",
                                        backgroundColor: "green", // Default background color
                                        color: "white", // Text color
                                        "&:hover": {
                                            backgroundColor: "darkgreen", // Color on hover
                                        },
                                    }}
                                    startIcon={<AddCircleIcon />}
                                >
                                    Thêm mới
                                </Button>
                            ) : null}
                            {numSelected == 1 ? (
                                <Button
                                    size="small"
                                    onClick={openAddOrEditModal}
                                    variant="contained"
                                    sx={{
                                        marginRight: "5px",
                                        backgroundColor: "green", // Default background color
                                        color: "white", // Text color
                                        "&:hover": {
                                            backgroundColor: "darkgreen", // Color on hover
                                        },
                                    }}
                                    startIcon={<BorderColorIcon />}
                                >
                                    Chỉnh sửa
                                </Button>
                            ) : null}
                            {numSelected > 0 ? (
                                <Button
                                    size="small"
                                    sx={{
                                        backgroundColor: "green", // Default background color
                                        color: "white", // Text color
                                        "&:hover": {
                                            backgroundColor: "darkgreen", // Color on hover
                                        },
                                    }}
                                    onClick={handleOnDelete}
                                    variant="outlined"
                                    startIcon={<DeleteIcon />}
                                >
                                    Xóa
                                </Button>
                            ) : null}
                        </div>

                        {/* TablePagination component */}
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            labelRowsPerPage="Số hàng mỗi trang"
                            labelDisplayedRows={({ from, to, count }) => {
                                return `${from}–${to} trong ${count !== -1 ? count : `hơn ${to}`}`;
                            }}
                        />
                    </Box>
                </Toolbar>
            </Paper>
        </Box>
    );
}

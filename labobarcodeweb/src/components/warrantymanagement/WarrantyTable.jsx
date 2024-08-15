import AddCircleIcon from "@mui/icons-material/AddCircle";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import { LoadingButton } from "@mui/lab";
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
import moment from "moment";
import { toast } from "react-toastify";
import { deleteWarranty, deleteWarranties, getWarranties } from "../../apis/warranty.api";
import AddOrEditWarrantyModal from "./AddOrEditWarrantyModal";
import ResearchWarrantyModal from "./ResearchWarrantyModal";
import styles from "./WarrantyManagement.module.css";
import { useEffect, useRef, useState } from "react";

const headCells = [
    {
        id: 0,
        numeric: false,
        label: "Trạng thái",
        minWidth: 100,
    },
    {
        id: 7,
        numeric: false,
        label: "Mã Code",
        minWidth: 170,
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
        expiredFromDate: moment(),
        expiredToDate: moment(new Date(), "DD-MM-YYYY").add(5, "days"),
        expiredStatus: undefined,
    };
    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState("patientName");
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [searchModel, setSearchModel] = useState(defaultSearch);

    //#region Ref AddOrEdit
    const [addOrEditModalProps, setAddOrEditModalProps] = useState(null);
    const addOrEditModalRef = useRef();
    const openAddOrEditModal = () => {
        var id = null;
        if (selected.length == 1) {
            id = selected[0];
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
    const [searchCardNumberModalProps, setModalProps] = useState(false);
    const searchCardNumberModalRef = useRef();
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
    const { data, error, isLoading, refetch } = useQuery({
        queryKey: ["warrantys", page, rowsPerPage],
        queryFn: () => {
            const controller = new AbortController();
            setTimeout(() => {
                controller.abort();
            }, 5000);
            // return tableData;
            return getWarranties(
                {
                    searchModel: {
                        searchString: searchModel.searchString,
                        fromDate: searchModel.expiredFromDate,
                        toDate: searchModel.expiredToDate,
                    },
                    sort: orderBy,
                    sortDirection: order,
                    page: page + 1,
                    pageSize: rowsPerPage,
                },
                controller.signal
            );
        },
        keepPreviousData: true,
        retry: 0,
    });
    useEffect(() => {
        if (data?.data?.total > (page + 1) * data?.data?.data.length) {
            console.log(data?.data?.total, (page + 1) * data?.data?.data.length, page);
            queryClient.prefetchQuery({
                queryKey: ["warrantys", page + 1, rowsPerPage],
                queryFn: () => {
                    const controller = new AbortController();
                    setTimeout(() => {
                        controller.abort();
                    }, 5000);
                    return getWarranties(
                        {
                            searchModel: {
                                searchString: searchModel.searchString,
                                fromDate: searchModel.expiredFromDate,
                                toDate: searchModel.expiredToDate,
                            },
                            sort: orderBy,
                            sortDirection: order,
                            page: page + 2,
                            pageSize: rowsPerPage,
                        },
                        controller.signal
                    );
                },
                keepPreviousData: true,
                retry: 0,
            });
        }
    }, [data, page, rowsPerPage, queryClient]);
    const deleteWarrantyMutation = useMutation({
        mutationFn: (id) => deleteWarranty(id),
        onSuccess: (_, id) => {
            toast.success(`Xóa thành công`);
            queryClient.invalidateQueries({ queryKey: ["warrantys"] });
            let newSelected = selected.filter((i) => i != id);
            setSelected(newSelected);
        },
    });
    const deleteWarrantiesMutation = useMutation({
        mutationFn: (idList) => deleteWarranties(idList),
        onSuccess: (_, idList) => {
            toast.success(`Xóa thành công`);
            queryClient.invalidateQueries({ queryKey: ["warrantys"] });
            let newSelected = selected.filter((i) => !idList.includes(i));
            setSelected(newSelected);
        },
    });
    //#endregion
    //#region Handle Action Table
    const handleInputChange = (name) => (event) => {
        setSearchModel((prev) => ({ ...prev, [name]: event.target.value }));
    };
    const handleOnDelete = () => {
        // deleteWarrantyMutation.mutate(selected[0]);
        deleteWarrantiesMutation.mutate(JSON.stringify({ ids: selected }));
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };
    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = data?.data?.data.map((n) => n.warrantyId);
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
    let total = !data ? 0 : data.data.total;
    let numSelected = selected.length;
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data?.data?.total) : 0;
    console.log(page);
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
                            loading={isLoading}
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
                    <Table
                        stickyHeader
                        sx={{ minWidth: 750, height: 600 }}
                        aria-labelledby="tableTitle"
                    >
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
                            {/* {isLoading && (
                                <TableRow
                                    style={{
                                        height: 53 * emptyRows,
                                    }}
                                >
                                    <TableCell align="center" colSpan={headCells.length + 1}>
                                        <CircularProgress color="success" />
                                    </TableCell>
                                </TableRow>
                            )} */}
                            {data?.data?.data.map((row, index) => {
                                const isItemSelected = isSelected(row.warrantyId);
                                const labelId = `enhanced-table-checkbox-${index}`;
                                const updateDate = row.updatedAt ?? row.createdAt;
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
                                        sx={{ cursor: "pointer", height: 5 }}
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
                                        <TableCell align="left">{row.codeNumber}</TableCell>
                                        <TableCell component="th" scope="row">
                                            {row.patientName}
                                        </TableCell>
                                        <TableCell align="left">{row.patientPhoneNumber}</TableCell>
                                        <TableCell align="left">{row.clinic}</TableCell>
                                        <TableCell align="left">{row.labName}</TableCell>
                                        <TableCell align="left">{row.doctor}</TableCell>
                                        <TableCell>
                                            <Box
                                                component="div"
                                                sx={{
                                                    textOverflow: "ellipsis",
                                                    width: "20rem",
                                                    overflow: "hidden",
                                                }}
                                            >
                                                {row.product}
                                            </Box>
                                        </TableCell>
                                        <TableCell align="center">
                                            {row.expirationDate != null &&
                                                new Date(row.expirationDate).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell align="center">
                                            {new Date(updateDate).toLocaleDateString()}
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
                            count={total}
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

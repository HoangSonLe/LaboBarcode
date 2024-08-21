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
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { deleteWarranties, deleteWarranty, getWarranties } from "../../apis/warranty.api";
import AddOrEditWarrantyModal from "./AddOrEditWarrantyModal";
import ResearchWarrantyModal from "./ResearchWarrantyModal";
import styles from "./WarrantyManagement.module.css";
import "../globals/variables.css";

const headCells = [
    // {
    //     id: 0,
    //     numeric: false,
    //     label: "Trạng thái",
    //     minWidth: 100,
    //     align: "center",
    //     name: "abc"
    // },
    {
        id: 7,
        numeric: false,
        label: "Code",
        minWidth: 170,
        align: "center",
        name: "codeNumber",
    },
    {
        id: 1,
        numeric: false,
        label: "Patient Name",
        minWidth: 170,
        name: "patientName",
    },
    {
        id: 2,
        numeric: false,
        label: "Patient Phone Number",
        minWidth: 170,
        align: "center",
        name: "patientPhoneNumber",
    },
    {
        id: 3,
        numeric: false,
        label: "Clinic",
        minWidth: 170,
        name: "clinic",
    },
    {
        id: 4,
        numeric: false,
        label: "Lab Name",
        minWidth: 170,
        name: "labName",
    },
    {
        id: 5,
        numeric: false,
        label: "Doctor",
        minWidth: 170,
        name: "doctor",
    },
    {
        id: 6,
        numeric: false,
        label: "Product",
        minWidth: 170,
        name: "product",
    },

    {
        id: 8,
        numeric: false,
        label: "Expiration Date",
        minWidth: 170,
        align: "center",
        name: "expirationDate",
    },
    {
        id: 9,
        numeric: false,
        label: "Updated At",
        minWidth: 170,
        align: "center",
        name: "updated_at",
    },
];

export default function WarrantyTable({ tableData }) {
    const defaultSearch = {
        searchString: "",
        expiredFromDate: moment(new Date(), "DD-MM-YYYY").add(-7, "days"),
        expiredToDate: moment(new Date(), "DD-MM-YYYY").add(7, "days"),
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
        retry: 3,
    });

    useEffect(() => {
        // Call refetch whenever `order` or `orderBy` changes
        refetch();
    }, [order, orderBy]);
    useEffect(() => {
        if (data?.data?.total > (page + 1) * data?.data?.data.length) {
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
            toast.success(`Successfully deleted`);
            queryClient.invalidateQueries({ queryKey: ["warrantys"] });
            let newSelected = selected.filter((i) => i != id);
            setSelected(newSelected);
        },
    });
    const deleteWarrantiesMutation = useMutation({
        mutationFn: (idList) => deleteWarranties(idList),
        onSuccess: (_, idList) => {
            toast.success(`Successfully deleted`);
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
        deleteWarrantiesMutation.mutate(selected);
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };
    const handleSelectAllClick = (event) => {
        console.log("event", event.target.checked);
        if (event.target.indeterminate) {
            debugger;
        }
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
        setSelected([]);
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const onClickSearch = () => {
        setPage(0);
        refetch();
    };
    const onClickClearSearch = () => {
        setSearchModel(defaultSearch);
    };
    const isSelected = (id) => selected.indexOf(id) !== -1;
    //#endregion
    // Avoid a layout jump when reaching the last page with empty rows.
    let total = !data ? 0 : data.data.total;
    let currentTotal = !data ? 0 : data.data.data.length;
    let numSelected = selected.length;
    const emptyRows = page > 0 ? Math.max(0, Math.abs(rowsPerPage - data?.data?.data.length)) : 0;
    // console.log(currentTotal);
    console.log(emptyRows, page);
    console.log(data?.data?.total, rowsPerPage, (1 + page) * rowsPerPage - data?.data?.total, page);
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
            <Paper sx={{ width: "95%" }}>
                <div className={clsx(styles.filterContainer)}>
                    <Stack
                        direction={{ sm: "column", md: "row" }}
                        spacing={{ xs: 1, sm: 2, md: 2 }}
                    >
                        <TextField
                            label="Search"
                            variant="outlined"
                            size="small"
                            value={searchModel.searchString}
                            onChange={handleInputChange("searchString")}
                            sx={{
                                marginTop: "4px !important",
                                marginBottom: "4px !important",
                            }}
                        />
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                            <DatePicker
                                label="From Date"
                                value={searchModel.expiredFromDate}
                                onChange={(value) =>
                                    setSearchModel((prev) => ({
                                        ...prev,
                                        expiredFromDate: value,
                                    }))
                                }
                                format="DD/MM/YYYY"
                                slotProps={{ textField: { size: "small" } }}
                                sx={{
                                    marginTop: "4px !important",
                                    marginBottom: "4px !important",
                                }}
                            />
                        </LocalizationProvider>
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                            <DatePicker
                                label="To Date"
                                value={searchModel.expiredToDate}
                                onChange={(value) =>
                                    setSearchModel((prev) => ({
                                        ...prev,
                                        expiredToDate: value,
                                    }))
                                }
                                format="DD/MM/YYYY"
                                slotProps={{ textField: { size: "small" } }}
                                sx={{
                                    marginTop: "4px !important",
                                    marginBottom: "4px !important",
                                }}
                            />
                        </LocalizationProvider>
                        {/* <FormControl
                            sx={{
                                marginTop: "4px !important",
                                marginBottom: "4px !important",
                                minWidth: 120,
                            }}
                            size="small"
                        >
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
                        </FormControl> */}
                        <Button
                            size="medium"
                            onClick={onClickClearSearch}
                            variant="outlined"
                            className={clsx(styles.outlinedButton)}
                            startIcon={<CleaningServicesIcon />}
                            sx={{
                                marginLeft: "2rem !important",
                            }}
                        >
                            Clear filter
                        </Button>
                        <LoadingButton
                            size="small"
                            onClick={onClickSearch}
                            variant="contained"
                            className={clsx(styles.button)}
                            loading={isLoading}
                            loadingPosition="start"
                            startIcon={<SearchIcon />}
                        >
                            Search
                        </LoadingButton>
                        <Button
                            size="small"
                            variant="contained"
                            className={clsx(styles.secondaryButton)}
                            onClick={openSearchCardModal}
                            startIcon={<ContentPasteSearchIcon />}
                        >
                            Check warranty code
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
                            <TableRow
                                style={{
                                    height: 53,
                                }}
                            >
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        sx={{
                                            "&.Mui-checked": {
                                                color: "var(--light-green-color)", // Color when checked
                                            },
                                            "&.MuiCheckbox-indeterminate": {
                                                color: "var(--light-green-color)", // Color when checked
                                            },
                                        }}
                                        indeterminate={
                                            numSelected > 0 && numSelected < currentTotal
                                        }
                                        checked={currentTotal > 0 && numSelected === currentTotal}
                                        onChange={handleSelectAllClick}
                                        inputProps={{
                                            "aria-label": "select all desserts",
                                        }}
                                    />
                                </TableCell>
                                {headCells.map((headCell) => (
                                    <TableCell
                                        key={headCell.id}
                                        align={headCell.align ?? "left"}
                                        sortDirection={orderBy === headCell.id ? order : false}
                                        sx={{
                                            minWidth: headCell.minWidth,
                                        }}
                                        padding="none"
                                    >
                                        <TableSortLabel
                                            active={orderBy === headCell.name}
                                            direction={orderBy === headCell.name ? order : "asc"}
                                            onClick={(e) => handleRequestSort(e, headCell.name)}
                                        >
                                            {headCell.label}
                                            {orderBy === headCell.name ? (
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
                                        sx={{ cursor: "pointer" }}
                                        style={{
                                            height: 53,
                                        }}
                                    >
                                        <TableCell size="small" padding="checkbox">
                                            <Checkbox
                                                color="primary"
                                                checked={isItemSelected}
                                                inputProps={{
                                                    "aria-labelledby": labelId,
                                                }}
                                                sx={{
                                                    "&.Mui-checked": {
                                                        color: "var(--dark-green-color)", // Color when checked
                                                    },
                                                }}
                                            />
                                        </TableCell>
                                        {/* <TableCell
                                            id={labelId}
                                            scope="row"
                                            padding="none"
                                            align="center"
                                            size="small"
                                        >
                                            {row.expiredStatus ? (
                                                <Chip label="Còn hạn" color="success" />
                                            ) : (
                                                <Chip label="Hết hạn" color="error" />
                                            )}
                                        </TableCell> */}
                                        <TableCell size="small" align="center" padding="none">
                                            {row.codeNumber}
                                        </TableCell>
                                        <TableCell
                                            size="small"
                                            scope="row"
                                            padding="none"
                                            sx={{
                                                overflow: "hidden",
                                                whiteSpace: "nowrap",
                                                textOverflow: "ellipsis",
                                                maxWidth: 150, // Optional: Set a max width for the ellipsis to work
                                            }}
                                        >
                                            {row.patientName}
                                        </TableCell>
                                        <TableCell size="small" align="center" padding="none">
                                            {row.patientPhoneNumber}
                                        </TableCell>
                                        <TableCell size="small" align="left" padding="none">
                                            {row.clinic}
                                        </TableCell>
                                        <TableCell size="small" align="left" padding="none">
                                            {row.labName}
                                        </TableCell>
                                        <TableCell size="small" align="left" padding="none">
                                            {row.doctor}
                                        </TableCell>
                                        <TableCell
                                            size="small"
                                            padding="none"
                                            sx={{
                                                overflow: "hidden",
                                                whiteSpace: "nowrap",
                                                textOverflow: "ellipsis",
                                                maxWidth: 150, // Optional: Set a max width for the ellipsis to work
                                            }}
                                        >
                                            {row.product}
                                        </TableCell>
                                        <TableCell size="small" align="center" padding="none">
                                            {row.expirationDate != null &&
                                                new Date(row.expirationDate).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell size="small" align="center" padding="none">
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
                                    <TableCell colSpan={headCells.length + 1} />
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
                                    className={clsx(styles.button)}
                                    startIcon={<AddCircleIcon />}
                                >
                                    Add New
                                </Button>
                            ) : null}
                            {numSelected == 1 ? (
                                <Button
                                    size="small"
                                    onClick={openAddOrEditModal}
                                    variant="contained"
                                    className={clsx(styles.button)}
                                    startIcon={<BorderColorIcon />}
                                >
                                    Edit
                                </Button>
                            ) : null}
                            {numSelected > 0 ? (
                                <Button
                                    size="small"
                                    className={clsx(styles.redoutlinedButton)}
                                    onClick={handleOnDelete}
                                    variant="outlined"
                                    startIcon={<DeleteIcon />}
                                >
                                    Delete
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
                            labelRowsPerPage="Number of rows per page"
                            labelDisplayedRows={({ from, to, count }) => {
                                return `${from}–${to} in ${count !== -1 ? count : `more ${to}`}`;
                            }}
                        />
                    </Box>
                </Toolbar>
            </Paper>
        </Box>
    );
}

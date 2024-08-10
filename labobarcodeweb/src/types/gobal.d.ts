type TableDataItem = {
    id : string | number,
    name : any
}
type TableData = {
    data: TableDataItem,
    total: int
}
interface TableProps {
    /** The text to display inside the button */
    tableData: TableData;
    /** Whether the button can be interacted with */
    onClickDelete: (object) => void;
    onClickEdit: (object) => void;
  }
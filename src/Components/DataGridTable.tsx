// will recieve as a prop tanstack table
// will take care of pagination and rendering
// wont control how we sort, search or filter (that will be controlled by header)

import { Box, Table, TableBody, TableCell, TableCellProps, TableHead, TablePagination, TableRow, TableSortLabel, TextField } from "@mui/material";
import { Header, Table as TanstackTable, flexRender } from "@tanstack/react-table";

interface iTable<T> {
    regularCellProps?: TableCellProps,
    headerCellProps?: TableCellProps,
    table: TanstackTable<T>,
    pageSizeOptions?: number[],
    currentPageSize?: number,
}

const DataGridTable: React.FC<iTable<any>> = ({ regularCellProps, headerCellProps, table, pageSizeOptions = [10,20,30,40,50], }) => {
    const handleColumnSort = () => {
        table.setColumnFilters([{
            id: "lastUpdateDate",
            value: new Date('2023-11-19'),
        }]);
    }

    const HeaderRenderer = (header: Header<any, unknown>) => {
        const isSorted = header.column.getIsSorted();        
        const nextStateFunc = () => isSorted === "desc" ? header.column.toggleSorting(false) : isSorted === "asc" ? header.column.clearSorting() : header.column.toggleSorting(true);
        return (
            <TableCell key={header.id} onClick={nextStateFunc} {...headerCellProps}>
                <TableSortLabel active={isSorted !== false} direction={isSorted === "asc" ? "asc" : "desc"}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                </TableSortLabel>
            </TableCell>
        )
    }
    return (
        <Box sx={{display: "flex", flexDirection: "column"}}>
            <TextField  label="חיפוש גלובלי" size="small" onChange={(event) => table.setGlobalFilter(event.target.value)}/>
            {/* <Button variant="contained" onClick={handleColumnSort}>לחץ עליי ככה שאציג רק תאריכים מעל ה19.11.23</Button> */}
            {/* <Button variant="contained" size="small" onClick={() => {table.setColumnVisibility({sadir: false})}}>לחץ עליי בשביל להסתיר את הסדיר לא סדיר</Button> */}
            <Box sx={{ flex: "1 1 auto", maxHeight: "1000px", minHeight: 0, overflowY: "scroll"}}>
                <Table stickyHeader >
                    <TableHead>
                        {table.getHeaderGroups().map(headerGroup => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    HeaderRenderer(header)
                                ))}
                            </TableRow>
                        ))}
                    </TableHead>
                    <TableBody>
                        {table.getRowModel().rows.map(row => (
                            <TableRow key={row.id}>
                                {row.getVisibleCells().map(cell => (
                                    <TableCell key={cell.id} {...regularCellProps}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
            <TablePagination
                component="div"
                count={table.getPrePaginationRowModel().rows.length}
                rowsPerPageOptions={pageSizeOptions}
                page={table.getState().pagination.pageIndex}
                labelDisplayedRows={({ from, to, count }) =>
                `${from}-${to} מתוך ${count !== -1 ? count : `${to}`}`
                }
                labelRowsPerPage= "שורות לעמוד:"
                onPageChange={(_, data) => { table.setPageIndex(data); console.log(data)}}
                rowsPerPage={table.getState().pagination.pageSize}
                onRowsPerPageChange={eventOfRows => table.setPageSize(parseInt(eventOfRows.target.value))}
            />
        </Box>

    );
  };
  
  export default DataGridTable;
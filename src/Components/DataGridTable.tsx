// will recieve as a prop tanstack table
// will take care of pagination and rendering
// wont control how we sort, search or filter (that will be controlled by header)

import { Box, Table, TableBody, TableCell, TableCellProps, TableHead, TablePagination, TableRow } from "@mui/material";
import { Table as TanstackTable, flexRender } from "@tanstack/react-table";

interface iTable<T> {
    regularCellProps?: TableCellProps,
    headerCellProps?: TableCellProps,
    table: TanstackTable<T>,
    pageSizeOptions?: number[],
    currentPageSize?: number,
}

const DataGridTable: React.FC<iTable<any>> = ({ regularCellProps, headerCellProps, table, pageSizeOptions = [10,20,30,40,50], }) => {
    console.log("page count:", table.getPageCount());
    console.log("current page index: ", table.getState().pagination.pageIndex);
    console.log("current rows per page: ", table.getState().pagination.pageSize);
    return (
        <Box>
            <Table stickyHeader>
                <TableHead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <TableCell key={header.id} {...headerCellProps}>{flexRender(header.column.columnDef.header, header.getContext())}</TableCell>
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
// will recieve as a prop tanstack table
// will take care of pagination and rendering
// wont control how we sort, search or filter (that will be controlled by header)

import { Table, TableBody, TableCell, TableCellProps, TableHead, TablePagination, TableRow } from "@mui/material";
import { Table as TanstackTable, flexRender } from "@tanstack/react-table";

interface iTable<T> {
    regularCellProps?: TableCellProps,
    headerCellProps?: TableCellProps,
    table: TanstackTable<T>,
    pageSizeOptions?: number[],
    currentPageSize?: number,
}

const DataGridTable: React.FC<iTable<any>> = ({ regularCellProps, headerCellProps, table, pageSizeOptions = [10,20,30,40,50], }) => {
    return (
        <>
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
                count={table.getPageCount()}
                rowsPerPageOptions={pageSizeOptions}
                page={table.getState().pagination.pageIndex + 1}
                labelDisplayedRows={({ from, to, count }) =>
                `${from}-${to} מתוך ${count !== -1 ? count : `${to}`}`
                }
                labelRowsPerPage= "שורות לעמוד:"
                onPageChange={() => table.nextPage()}
                rowsPerPage={table.getState().pagination.pageSize}
                onRowsPerPageChange={data => table.setPageSize(parseInt(data.target.value))}
            />
        </>

    );
  };
  
  export default DataGridTable;
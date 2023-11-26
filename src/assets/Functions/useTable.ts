import { ColumnDef, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"
import { useMemo } from "react";
import { ColumnsType } from "../../interfaces";

const dateStringToDate = (dateStr: string) : Date => {
    const [day, month, year] = dateStr.split('.');
    // Convert to a valid date format (mm/dd/yyyy)
    const formattedDateString = `${month}/${day}/${year}`;
    // Create a Date object
    return new Date(formattedDateString);
} 

const createTanstackTable = <T>(data: T[], columns: ColumnsType<T>[], visibleColumns: any, defaultRows?: number, debug: boolean = false) => {
    const onColumn = (column: ColumnsType<T>) => {
        if (column.type === "Date") {
            return {
                accessorFn: row => (row[column.accessorKey] as Date).toLocaleDateString("he-IL", {
                    day: "numeric",
                    month: "numeric",
                    year: "numeric"
                }),
                id: column.accessorKey,
                header: column.header,
                filterFn: (row, coulmnId, valueRecieved) => {
                    const date = dateStringToDate(row.getValue(coulmnId));
                    return column.filterFn ? column.filterFn(date, valueRecieved) : true;
                },
                sortingFn: (rowA, rowB, columnId) => {
                    const dateA = dateStringToDate(rowA.getValue(columnId));
                    const dateB = dateStringToDate(rowB.getValue(columnId));
                    return dateA > dateB ? 1 : -1;
                    
                },
            } as ColumnDef<T>;
        }
        else {
            return column;
        }
    }


    const newCoulmns = useMemo(() => columns.map(onColumn), [columns]) as ColumnDef<T>[];

    const table = useReactTable<T>({
        data,
        columns: newCoulmns,
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        initialState: {
            pagination: {
                pageIndex: 0,
                pageSize: defaultRows ? defaultRows : 20,
            },
            columnVisibility: visibleColumns
        },
        enableFilters: true,
        enableSorting: true,
        debugAll: debug
    });

    return table;

}

export default createTanstackTable;

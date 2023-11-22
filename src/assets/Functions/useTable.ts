/*
    a function to get data and return a table object,
    with pagination and filters

    will get columns, table, default rows
*/

import { ColumnDef, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table"
import { useMemo } from "react";
type CustomColumnDef<T> = ColumnDef<T> & {
    type: "DATE" | "BOOLEAN" | "ARRAY" | "STRING";
};

const createTanstackTable = <T>(data: T[], columns: CustomColumnDef<T>[], defaultRows?: number, debug: boolean = false) => {

    const onColumn = (column: CustomColumnDef<T>) => {
        if (column.type === "DATE") {
            return {
                accessorFn: row => <T>(row[column.accessorKey] as Date).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "numeric",
                    year: "numeric"
                }),
                id: column.id,
                header: column.header,
                filterFn: (row, coulmnId, valueRecieved) => {
                    const date = new Date(row[coulmnId]);
                    return column.filterFn(date, valueRecieved);
                }            
            }
        }
        else {
            return column;
        }
    }


    const newCoulmns = useMemo(() => columns.map(onColumn), [columns]);

    
    const table = useReactTable<T>({
        data,
        columns: newCoulmns,
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getCoreRowModel: getCoreRowModel(),
        initialState: {
            pagination: {
                pageIndex: 0,
                pageSize: defaultRows ? defaultRows : 20
            }
        },
        enableFilters: true,
        enableSorting: true,
        debugAll: debug
    });

    return table;

}

export default createTanstackTable;

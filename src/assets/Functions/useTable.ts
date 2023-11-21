/*
    a function to get data and return a table object,
    with pagination and filters

    will get columns, table, default rows
*/

import { ColumnDef, getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table"


const createTanstackTable = <T>(data: T[], columns: ColumnDef<T>[], defaultRows?: number, debug: boolean = false) => {
    const table = useReactTable<T>({
        data,
        columns,
        getPaginationRowModel: getPaginationRowModel(),
        getCoreRowModel: getCoreRowModel(),
        initialState: {
            pagination: {
                pageIndex: 0,
                pageSize: defaultRows ? defaultRows : 20
            }
        },
        
        debugAll: debug
    });

    return table;

}

export default createTanstackTable;
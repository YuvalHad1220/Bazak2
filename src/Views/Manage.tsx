import { useMemo } from "react";
import Card from "../Components/Card";
import DataGridTable from "../Components/DataGridTable";
import createTanstackTable from "../assets/Functions/createTable";
import { ColumnsType, iFilter, iToggleFilter } from "../interfaces";
import { DataGridFooter } from "../Components/Footer";
import { Box } from "@mui/material";
import { DataGridNavbar } from "../Components/Navbar";
import Filter from "../Components/Filter";
import useCache from "../hooks/useCache";

interface iMilitaryUser {
    command: string;
    brigade: string;
    division: string;
    sadir: boolean;
    lastUpdateDate: Date; // You might want to use a Date type if it's a date
    valid: boolean;
  }

  function generateRandomMilitaryUsers(count: number): iMilitaryUser[] {
    const getRandomString = (): string => Math.random().toString(36).substring(7);
  
    // Function to generate a random date within a specific range
    const getRandomDate = (startDate: Date, endDate: Date): Date => {
      const startTimestamp = startDate.getTime();
      const endTimestamp = endDate.getTime();
      const randomTimestamp = startTimestamp + Math.random() * (endTimestamp - startTimestamp);
      return new Date(randomTimestamp);
    };
  
    // Define the date range (31/10/23 - 3/3/24)
    const startDate = new Date('2023-10-31');
    const endDate = new Date('2024-03-03');
  
    return Array.from({ length: count }, () => ({
      command: getRandomString(),
      brigade: getRandomString(),
      division: getRandomString(),
      sadir: Math.random() < 0.5,
      lastUpdateDate: getRandomDate(startDate, endDate),
      valid: Math.random() < 0.5,
    }));
  }
  

const ManageView = () => {
    const data = useMemo(() => generateRandomMilitaryUsers(120_000), []);
    const columns = useMemo(() => {
        return [
          {
              accessorKey: 'command',
              id: 'command',
              header: 'מפקד',
          },
          {
          accessorKey: 'brigade',
          id: 'brigade',
          header: 'חטיבה', // החלף בתרגום המתאים אם נדרש
          },
          {
          accessorKey: 'division',
          id: 'division',
          header: 'גדוד', // החלף בתרגום המתאים אם נדרש
          },
          {
          accessorFn: row => row.sadir ? "סדיר" : "לא סדיר",
          id: 'sadir',
          header: 'סדיר',

          },
          {
              accessorKey: 'lastUpdateDate',
              id: 'lastUpdateDate',
              type: "Date",
              header: 'תאריך עדכון אחרון',
              filterFn: (date: Date, valueRecieved: Date) => {
                  return date > valueRecieved;
              }
          },
          {
          // accessorKey: 'valid',
          header: 'תקין',
          id: "tkinot",
          accessorFn: row => row.valid ? "תקין" : "לא תקין",
          cell: cell => <div style={{backgroundColor: cell.getValue() === "תקין" ? "green" : "red"}}>{cell.getValue() as string}</div>
          },
        ] as ColumnsType<iMilitaryUser>[];

    }, []);
    

    // if hidden columns doesnt exist - will display all columns
    const [visibleColumnsCache, updateVisibleColumns, _] = useCache("manage_table_visible_columns", () => ({}));
    const table = createTanstackTable<iMilitaryUser>(data, columns, visibleColumnsCache);
    const allColumns = table.getAllColumns().map(column => ({id: column.columnDef.id, value: column.columnDef.header}));
    const visibleColumns = table.getVisibleFlatColumns().map(column => ({id: column.columnDef.id, value: column.columnDef.header}));

    const filter: iFilter[] = [{
      title: "עמודות מוצגות",
      id: "visibleColumns",
      options: allColumns,
      type: "TOGGLE",
      selectAll: true,
      flexDirection: "row",
      defaultValues: visibleColumns,
    } as iToggleFilter
  ];


  const setNewDisplayedColumns = (filter: Set<string>) => {
    const columnsToHide = table.getAllColumns().reduce((acc, column) => {
      const columnId = column.columnDef.id as string;
      if (filter.has(columnId)) {
        return acc;
      } else {
        acc[columnId] = false;
        return acc;
      }
    }, {} as Record<string, boolean>);

    updateVisibleColumns(columnsToHide);

    table.setColumnVisibility(columnsToHide);
  };
  return (
    <Box style={{display: "flex", flexDirection: "column", gap: 16}}>
      <DataGridNavbar table={table}/>
      <Filter filterFields={filter} onFilterChange={setNewDisplayedColumns}/>
      <Card>
          <DataGridTable table={table} />
      </Card>
      <DataGridFooter />
    </Box>

    )
};

export default ManageView;
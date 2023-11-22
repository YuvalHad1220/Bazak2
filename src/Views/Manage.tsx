import { useMemo } from "react";
import Card from "../Components/Card";
import DataGridTable from "../Components/DataGridTable";
import createTanstackTable from "../assets/Functions/useTable";
import { ColumnDef } from "@tanstack/react-table";

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
  
  type CustomColumnDef<T> = ColumnDef<T> & {
    type: "DATE" | "BOOLEAN" | "ARRAY" | "STRING";
};

const ManageView = () => {
    const data = useMemo(() => generateRandomMilitaryUsers(6), []);
    const columns = useMemo(() => {
        return [
            {
                accessorKey: 'command',
                header: 'מפקד',
            },
            {
            accessorKey: 'brigade',
            header: 'חטיבה', // החלף בתרגום המתאים אם נדרש
            },
            {
            accessorKey: 'division',
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
                type: "DATE",
                header: 'תאריך עדכון אחרון',
                filterFn: (date, valueRecieved) => {
                    return date > valueRecieved;
                }
            },
            {
            // accessorKey: 'valid',
            header: 'תקין',
            accessorFn: row => row.valid ? "תקין" : "לא תקין",
            cell: cell => <div style={{backgroundColor: cell.getValue() === "תקין" ? "green" : "red"}}>{cell.getValue() as string}</div>
            },
        ] as CustomColumnDef<iMilitaryUser>[];

    }, []);
    const table = createTanstackTable<iMilitaryUser>(data, columns);

    return (
        <Card sx={{height: "100%"}}>
             <DataGridTable table={table} />
        </Card>
    )
};

export default ManageView;
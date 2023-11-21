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
  
    return Array.from({ length: count }, () => ({
      command: getRandomString(),
      brigade: getRandomString(),
      division: getRandomString(),
      sadir: Math.random() < 0.5,
      lastUpdateDate: new Date(),
      valid: Math.random() < 0.5,
    }));
  }
  
const ManageView = () => {
    const data = useMemo(() => generateRandomMilitaryUsers(300), []);
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
            accessorKey: 'sadir',
            header: 'סדיר',
            cell: cell => cell.getValue() ? "סדיר" : "לא סדיר"

            },
            {
            accessorKey: 'lastUpdateDate',
            header: 'תאריך עדכון אחרון',
            cell: cell => (cell.getValue() as Date).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "numeric",
                year: "numeric"
              })
            },
            {
            accessorKey: 'valid',
            header: 'תקין',
            cell: cell => cell.getValue() ? "תקין" : "לא תקין"
            },
        ] as ColumnDef<iMilitaryUser>[];

    }, []);
    const table = createTanstackTable<iMilitaryUser>(data, columns, 30, true);

    console.log(data, columns);

    return (
        <Card sx={{height: "100%"}}>
             <DataGridTable table={table} />
        </Card>
    )
};

export default ManageView;
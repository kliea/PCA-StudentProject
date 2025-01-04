import { DataTable } from "@/Components/DataTable";
import DropdownDialog from "@/Components/DropdownDialog";
import { Button } from "@/Components/ui/button";
import { ScrollArea } from "@/Components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
    ColumnDef,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { MoreHorizontal, Plus } from "lucide-react";
import { useState } from "react";

const EmployeesList = () => {
    const [data, setData] = useState<Array<EmployeesListTypes>>([
        {
            first_name: "John",
            last_name: "Doe",
            compensations: 5000,
            deductions: 1000,
        },
        {
            first_name: "Jane",
            last_name: "Smith",
            compensations: 6000,
            deductions: 1200,
        },
        {
            first_name: "Michael",
            last_name: "Johnson",
            compensations: 5500,
            deductions: 1100,
        },
        {
            first_name: "Emily",
            last_name: "Williams",
            compensations: 5200,
            deductions: 1050,
        },
        {
            first_name: "David",
            last_name: "Brown",
            compensations: 5800,
            deductions: 1150,
        },
        {
            first_name: "Sarah",
            last_name: "Jones",
            compensations: 5300,
            deductions: 1080,
        },
        {
            first_name: "Daniel",
            last_name: "Garcia",
            compensations: 5700,
            deductions: 1130,
        },
        {
            first_name: "Olivia",
            last_name: "Martinez",
            compensations: 5400,
            deductions: 1090,
        },
        {
            first_name: "Matthew",
            last_name: "Rodriguez",
            compensations: 5600,
            deductions: 1120,
        },
        {
            first_name: "Sophia",
            last_name: "Hernandez",
            compensations: 5500,
            deductions: 1100,
        },
    ]);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });
    return (
        <div className="flex">
            <section className="w-full">
                <section className="flex justify-end my-2">
                    <Button className="gap-2">
                        <Plus size={20}></Plus>Add Employee
                    </Button>
                </section>
                <ScrollArea className="h-[calc(100%-20%)]">
                    <DataTable
                        table={table}
                        rowStyle="bg-white"
                    ></DataTable>
                </ScrollArea>
            </section>
        </div>
    );
};

export default EmployeesList;

interface EmployeesListTypes {
    first_name: string;
    last_name: string;
    compensations: number;
    deductions: number;
}

const columns: ColumnDef<EmployeesListTypes>[] = [
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => {
            return cn(row.original.last_name, ",", row.original.first_name);
        },
    },
    {
        accessorKey: "compensations",
        header: "Compensations",
    },
    {
        accessorKey: "deductions",
        header: "Deductions",
    },
    {
        id: "action",
        cell: ({ row }) => {
            const [openDialog, setOpenDialog] = useState<string | null>(null);
            const rowData = row.original;
            const dialogs = [
                {
                    tag: "1",
                    name: "Edit",
                    dialogtitle: cn(
                        "Edit Employee: ",
                        rowData.last_name,
                        ",",
                        rowData.first_name
                    ),
                    // dialogContent: (

                    // ),
                },
            ];

            return (
                <div>
                    <DropdownDialog
                        dialogClassName="max-w-[1000px] min-h-[350px]"
                        openDialog={openDialog}
                        setOpenDialog={setOpenDialog}
                        dialogs={dialogs}
                        trigger={
                            <>
                                <section>
                                    <MoreHorizontal className="h-4 w-4" />
                                </section>
                            </>
                        }
                    ></DropdownDialog>
                </div>
            );
        },
    },
];

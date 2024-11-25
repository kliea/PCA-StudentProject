import { DataTable } from "@/Components/DataTable";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Input } from "@/Components/ui/input";
import AuthenticatedLayoutAdmin from "@/Layouts/AuthenticatedLayout";
import BodyContentLayout from "@/Layouts/BodyContentLayout";
import { Head, usePage } from "@inertiajs/react";
import {
    ColumnDef,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Data from "@/Components/Constants/data7.json";
import { AdminLinks } from "@/lib/payrollData";

type employeeTypes = {
    name: string;
    id: string;
    official_station: string;
    position: string;
    appointment: string;
    sg: string;
    step: string;
};

const columns: ColumnDef<employeeTypes>[] = [
    { accessorKey: "name", header: "Name" },
    { accessorKey: "id", header: "Id" },
    { accessorKey: "official_station", header: "Official Station" },
    { accessorKey: "position", header: "Position" },
    { accessorKey: "appointment", header: "Appointment" },
    { accessorKey: "sg", header: "SG" },
    { accessorKey: "step", header: "Step" },
    {
        id: "action",
        cell: ({ row }) => {
            const values = row.original;
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <section>
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </section>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>View</DropdownMenuItem>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

export default function Employees() {
    const pageData = (usePage().props.data as employeeTypes[]) || [];
    const data: employeeTypes[] = pageData;

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
            pagination: {
                pageSize: 12,
            },
        },
    });
    return (
        <AuthenticatedLayoutAdmin title="Employees" links={AdminLinks}>
            <BodyContentLayout headerName={"Employee List"}>
                <div className="flex  mb-5 gap-3">
                    <Input
                        type="text"
                        placeholder="Search..."
                        className="w-1/4 rounded-pca"
                    />
                </div>
                <div>
                    <DataTable
                        columns={columns}
                        table={table}
                        rowStyle="odd:bg-white even:bg-transparent text-center"
                    ></DataTable>
                </div>
            </BodyContentLayout>
        </AuthenticatedLayoutAdmin>
    );
}

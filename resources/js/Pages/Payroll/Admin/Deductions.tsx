import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import AuthenticatedLayoutAdmin from "@/Layouts/AuthenticatedLayoutAdmin";
import BodyContentLayout from "@/Layouts/BodyContentLayout";
import { Head, usePage } from "@inertiajs/react";
import {
    ColumnDef,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { MoreHorizontal, Plus, View } from "lucide-react";
import Data from "@/Components/Constants/data8.json";
import { DataTable } from "@/Components/DataTable";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";

type columnTypes = {
    name: string;
    amount: number;
    code: number;
    percent: number;
    mandatory: boolean;
    group: string;
    type: string;
    shorthand: string;
};

const columns: ColumnDef<columnTypes>[] = [
    { accessorKey: "name", header: "Name" },
    { accessorKey: "amount", header: "Amount" },
    { accessorKey: "code", header: "Code" },
    { accessorKey: "percent", header: "Percent" },
    { accessorKey: "mandatory", header: "Mandatory" },
    { accessorKey: "group", header: "group" },
    { accessorKey: "type", header: "type" },
    { accessorKey: "shorthand", header: "shorthand" },
    {
        id: "actions",
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
                        <DropdownMenuItem>
                            Edit Deduction Profile
                        </DropdownMenuItem>

                        <DropdownMenuItem className="text-red-600">
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

export default function Deductions() {
    const data: columnTypes[] = Data;

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
        <AuthenticatedLayoutAdmin>
            <Head title="Deductions" />

            <BodyContentLayout headerName={"Deductions"}>
                <div className="flex  mb-5 gap-3">
                    <Input
                        type="text"
                        placeholder="Search..."
                        className="w-1/4 rounded-[10px]"
                    />

                    <Button className="flex gap-1">
                        <Plus size={20} />
                        Add New Deduction Profile
                    </Button>
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

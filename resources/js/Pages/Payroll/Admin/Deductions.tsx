import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import AuthenticatedLayoutAdmin from "@/Layouts/AuthenticatedLayout";
import BodyContentLayout from "@/Layouts/BodyContentLayout";
import { Head, usePage } from "@inertiajs/react";
import {
    ColumnDef,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { MoreHorizontal, Plus, View } from "lucide-react";
import { DataTable } from "@/Components/DataTable";
import { Input } from "@/Components/ui/input";
import { AdminLinks } from "@/lib/payrollData";
import DialogMenu from "@/Components/Dialog";
import { useState } from "react";
import { DeductionStore } from "@/Components/CrudComponents/DeductionCRUD";

type deductionTypes = {
    deduction_code: number;
    deduction_name: string;
    shorthand: string;
    amount: number;
    is_mandatory: boolean;
    remittance_percent: number;
    ceiling_amount: number;
};

const columns: ColumnDef<deductionTypes>[] = [
    { accessorKey: "deduction_code", header: "ID" },
    { accessorKey: "deduction_name", header: "DEDUCTION NAME" },
    { accessorKey: "shorthand", header: "SHORTHAND" },
    { accessorKey: "amount", header: "AMOUNT" },
    { accessorKey: "is_mandatory", header: "MANDATORY" },
    { accessorKey: "remittance_percent", header: "REMITTANCE %" },
    { accessorKey: "ceiling_amount", header: "CEILING AMOUNT" },
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
    const pageData = (usePage().props.data as deductionTypes[]) || [];
    const data: deductionTypes[] = pageData;
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
    const [openDialog, setOpenDialog] = useState(false);
    return (
        <AuthenticatedLayoutAdmin title="Deductions" links={AdminLinks}>
            <BodyContentLayout headerName={"Deductions"}>
                <div className="flex  mb-5 gap-3">
                    <Input
                        type="text"
                        placeholder="Search..."
                        className="w-1/4 rounded-pca"
                    />

                    <div>
                        <DialogMenu
                            open={openDialog}
                            openDialog={() => setOpenDialog(!openDialog)}
                            trigger={
                                <section className="flex items-center justify-center bg-secondaryGreen p-2 text-white rounded-pca pl-3 pr-3">
                                    <Plus className="mr-2 h-6 w-auto" />
                                    New Deduction Profile
                                </section>
                            }
                            title="New Deduction Profile"
                        >
                            <DeductionStore
                                openDialog={() => setOpenDialog(!openDialog)}
                            ></DeductionStore>
                        </DialogMenu>
                    </div>
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

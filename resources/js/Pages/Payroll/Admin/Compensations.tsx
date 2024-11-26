import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import AuthenticatedLayoutAdmin from "@/Layouts/AuthenticatedLayout";
import BodyContentLayout from "@/Layouts/BodyContentLayout";
import { usePage } from "@inertiajs/react";
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
import { CompensationStore } from "@/Components/CrudComponents/CompensationCRUD";

type compensationTypes = {
    compensation_name: string;
    shorthand: string;
    amount: number;
    is_taxable: boolean;
    is_fixed: boolean;
};

const columns: ColumnDef<compensationTypes>[] = [
    { accessorKey: "compensation_name", header: "COMPENSATION NAME" },
    { accessorKey: "shorthand", header: "SHORTHAND" },
    { accessorKey: "amount", header: "AMOUNT" },
    { accessorKey: "is_taxable", header: "TAXABLE" },
    { accessorKey: "is_fixed", header: "FIXED" },
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

export default function Compensation() {
    const pageData = (usePage().props.data as compensationTypes[]) || [];
    const data: compensationTypes[] = pageData;
    console.log(usePage().props.data);

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
        <AuthenticatedLayoutAdmin title="Compensations" links={AdminLinks}>
            <BodyContentLayout headerName={"Compensations"}>
                <div className="flex  mb-5 gap-3">
                    <Input
                        type="text"
                        placeholder="Search..."
                        className="w-1/4 rounded-pca"
                    />

                    <div>
                        <DialogMenu
                            trigger={
                                <section className="flex items-center justify-center bg-secondaryGreen p-2 text-white rounded-pca pl-3 pr-3">
                                    <Plus className="mr-2 h-6 w-auto" />
                                    Add New Compensation Profile
                                </section>
                            }
                            title="Add New Compensation Profile"
                        >
                            <CompensationStore></CompensationStore>
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

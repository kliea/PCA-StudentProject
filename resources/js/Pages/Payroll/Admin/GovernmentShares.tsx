import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import AuthenticatedLayoutAdmin from "@/Layouts/AuthenticatedLayout";
import BodyContentLayout from "@/Layouts/BodyContentLayout";
import {
    ColumnDef,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { MoreHorizontal, Plus, View } from "lucide-react";
import Data from "@/Components/Constants/data9.json";
import { DataTable } from "@/Components/DataTable";
import { Input } from "@/Components/ui/input";
import DialogMenu from "@/Components/Dialog";
import { AdminLinks } from "@/lib/payrollData";
import { AgencyShareStore } from "@/Components/CrudComponents/AgencyShareCRUD";
import { usePage } from "@inertiajs/react";

type agencyTypes = {
    name: string;
    amount: number;
    percent: number;
    mandatory: boolean;
    shorthand: string;
};

const columns: ColumnDef<agencyTypes>[] = [
    { accessorKey: "name", header: "Name" },
    { accessorKey: "amount", header: "Amount" },
    { accessorKey: "percent", header: "Percent" },
    { accessorKey: "mandatory", header: "Mandatory" },
    { accessorKey: "shorthand", header: "Shorthand" },
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
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

export default function GovernmentShare() {
    const pageData = (usePage().props.data as agencyTypes[]) || [];
    const data: agencyTypes[] = pageData;

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
        <AuthenticatedLayoutAdmin title="Government Shares " links={AdminLinks}>
            <BodyContentLayout headerName={"Government Shares"}>
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
                                    Add New Government Share Profile
                                </section>
                            }
                            title="Add New Government Share Profile"
                        >
                            <AgencyShareStore></AgencyShareStore>
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

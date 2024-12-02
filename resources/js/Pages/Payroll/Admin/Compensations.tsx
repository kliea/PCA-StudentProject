import AuthenticatedLayoutAdmin from "@/Layouts/AuthenticatedLayout";
import BodyContentLayout from "@/Layouts/BodyContentLayout";
import { Head, usePage } from "@inertiajs/react";
import {
    ColumnDef,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { MoreHorizontal, Plus } from "lucide-react";
import { DataTable } from "@/Components/DataTable";
import { Input } from "@/Components/ui/input";
import { AdminLinks } from "@/lib/payrollData";
import DialogMenu from "@/Components/Dialog";
import { useState } from "react";
import {
    CompensationStore,
    CompensationDelete,
    CompensationUpdate,
} from "@/Components/CrudComponents/CompensationCRUD";
import { cn } from "@/lib/utils";
import DropdownDialog from "@/Components/DropdownDialog";
import PaginationTable from "@/Components/Pagination";

type compensationTypes = {
    compensation_code: number;
    compensation_name: string;
    shorthand: string;
    amount: number;
    is_taxable: boolean;
    is_fixed: number;
};

const columns: ColumnDef<compensationTypes>[] = [
    { accessorKey: "compensation_code", header: "ID" },
    { accessorKey: "compensation_name", header: "COMPENSATION NAME" },
    { accessorKey: "shorthand", header: "SHORTHAND" },
    {
        accessorKey: "amount",
        header: "AMOUNT",
        cell: ({ row }) => {
            const number = Number(row.getValue("amount"));
            return row.original.is_fixed ? (
                <p>₱{number.toLocaleString("en-US")}</p>
            ) : (
                "BASIC PAY"
            );
        },
    },
    {
        accessorKey: "is_taxable",
        header: "TAXABLE",
        cell: ({ row }) => (row.getValue("is_taxable") ? "YES" : "NO"),
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const [openDialog, setOpenDialog] = useState<string | null>(null);
            const rowData = row.original;
            const dialogs = [
                {
                    tag: "1",
                    name: "Edit",
                    dialogtitle: cn(
                        "Edit Compensation ",
                        rowData.compensation_name
                    ),
                    dialogContent: (
                        <CompensationUpdate
                            RowData={rowData}
                            setOpenDialog={setOpenDialog}
                        ></CompensationUpdate>
                    ),
                },
                {
                    tag: "2",
                    name: "Delete",
                    dialogtitle: cn(
                        "Are you sure you want to delete ",
                        rowData.compensation_name,
                        "?"
                    ),
                    dialogContent: (
                        <CompensationDelete
                            rowId={rowData.compensation_code}
                            setOpenDialog={setOpenDialog}
                        ></CompensationDelete>
                    ),
                    style: "text-red-600",
                },
            ];

            return (
                <div>
                    <DropdownDialog
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

export default function Compensations() {
    const pageData = (usePage().props.data as compensationTypes[]) || [];
    const data: compensationTypes[] = pageData;
    const [globalFilter, setGlobalFilter] = useState<any>([]);
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
        getFilteredRowModel: getFilteredRowModel(),
        globalFilterFn: "auto",
        state: {
            globalFilter,
        },
        onGlobalFilterChange: setGlobalFilter,
    });
    const [openDialog, setOpenDialog] = useState(false);
    return (
        <AuthenticatedLayoutAdmin title="Compensations" links={AdminLinks}>
            <BodyContentLayout headerName={"Compensation Profiles"}>
                <div className="flex  mb-5 gap-3">
                    <Input
                        type="text"
                        placeholder="Search..."
                        className="w-1/4 rounded-pca"
                        onChange={(e) => setGlobalFilter(e.target.value || "")}
                    />

                    <div>
                        <DialogMenu
                            open={openDialog}
                            openDialog={() => setOpenDialog(!openDialog)}
                            trigger={
                                <section className="flex items-center justify-center bg-secondaryGreen p-2 text-white rounded-pca pl-3 pr-3">
                                    <Plus className="mr-2 h-6 w-auto" />
                                    New Compensation Profile
                                </section>
                            }
                            title="New Compensation Profile"
                        >
                            <CompensationStore
                                openDialog={() => setOpenDialog(!openDialog)}
                            ></CompensationStore>
                        </DialogMenu>
                    </div>
                </div>
                <div>
                    <DataTable
                        columns={columns}
                        table={table}
                        rowStyle="odd:bg-white even:bg-transparent text-center"
                    ></DataTable>
                    <PaginationTable table={table}></PaginationTable>
                </div>
            </BodyContentLayout>
        </AuthenticatedLayoutAdmin>
    );
}

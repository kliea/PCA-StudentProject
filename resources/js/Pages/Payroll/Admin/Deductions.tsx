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
import { MoreHorizontal, Plus, View } from "lucide-react";
import { DataTable } from "@/Components/DataTable";
import { Input } from "@/Components/ui/input";
import { AdminLinks } from "@/lib/payrollData";
import DialogMenu from "@/Components/Dialog";
import { useState } from "react";
import {
    DeductionStore,
    DeductionsDelete,
    DeductionUpdate,
} from "@/Components/CrudComponents/DeductionCRUD";
import { cn } from "@/lib/utils";
import DropdownDialog from "@/Components/DropdownDialog";
import PaginationTable from "@/Components/Pagination";

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
            const [openDialog, setOpenDialog] = useState<string | null>(null);
            const rowData = row.original;
            const dialogs = [
                {
                    tag: "1",
                    name: "Edit",
                    dialogtitle: cn("Edit", rowData.deduction_name),
                    dialogContent: (
                        <DeductionUpdate
                            compensationTypes={
                                usePage().props
                                    .compensationTypes as Array<string>
                            }
                            RowData={rowData}
                            setOpenDialog={setOpenDialog}
                        ></DeductionUpdate>
                    ),
                },
                {
                    tag: "2",
                    name: "Delete",
                    dialogtitle: cn(
                        "Are you sure you want to delete ",
                        rowData.deduction_name,
                        "?"
                    ),
                    dialogContent: (
                        <DeductionsDelete
                            rowId={rowData.deduction_code}
                            setOpenDialog={setOpenDialog}
                        ></DeductionsDelete>
                    ),
                    style: "text-red-600",
                },
            ];

            return (
                <div>
                    <DropdownDialog
                        dialogClassName="max-w-[1000px] min-h-[400px]"
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

export default function Deductions() {
    const pageData = (usePage().props.data as deductionTypes[]) || [];
    const data: deductionTypes[] = pageData;
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
        <AuthenticatedLayoutAdmin title="Deductions" links={AdminLinks}>
            <BodyContentLayout headerName={"Deductions"}>
                <div className="flex  mb-5 gap-3">
                    <Input
                        onChange={(e) => setGlobalFilter(e.target.value || "")}
                        type="text"
                        placeholder="Search..."
                        className="w-1/4 rounded-pca"
                    />

                    <div>
                        <DialogMenu
                            dialogClassName="max-w-[1000px] min-h-[400px]"
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
                                compensationTypes={
                                    usePage().props
                                        .compensationTypes as Array<string>
                                }
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

                    <PaginationTable table={table}></PaginationTable>
                </div>
            </BodyContentLayout>
        </AuthenticatedLayoutAdmin>
    );
}

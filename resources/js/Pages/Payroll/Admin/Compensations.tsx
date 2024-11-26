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
import { MoreHorizontal, Plus } from "lucide-react";
import { DataTable } from "@/Components/DataTable";
import { Input } from "@/Components/ui/input";
import { AdminLinks } from "@/lib/payrollData";
import DialogMenu from "@/Components/Dialog";
import { useState } from "react";
import {
    CompensationStore,
    CompensationDelete,
} from "@/Components/CrudComponents/CompensationCRUD";
import { cn } from "@/lib/utils";
import DropdownDialog from "@/Components/DropdownDialog";

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
    { accessorKey: "amount", header: "AMOUNT" },
    { accessorKey: "is_taxable", header: "TAXABLE" },
    { accessorKey: "is_fixed", header: "FIXED" },
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
                    // dialogContent: (
                    //     <AppointmentUpdate
                    //         compensationTypes={
                    //             usePage().props
                    //                 .compensationTypes as Array<string>
                    //         }
                    //         RowData={rowData}
                    //         setOpenDialog={setOpenDialog}
                    //     ></AppointmentUpdate>
                    // ),
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
        <AuthenticatedLayoutAdmin title="Compensations" links={AdminLinks}>
            <BodyContentLayout headerName={"Compensation Profiles"}>
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
                </div>
            </BodyContentLayout>
        </AuthenticatedLayoutAdmin>
    );
}

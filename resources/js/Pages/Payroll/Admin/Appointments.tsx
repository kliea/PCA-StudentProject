import AuthenticatedLayoutAdmin from "@/Layouts/AuthenticatedLayout";
import BodyContentLayout from "@/Layouts/BodyContentLayout";
import {
    AppointmentStore,
    AppointmentDelete,
    AppointmentUpdate,
} from "@/Components/CrudComponents/AppointmentCRUD";
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
import DropdownDialog from "@/Components/DropdownDialog";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { usePage } from "@inertiajs/react";
import PaginationTable from "@/Components/Pagination";

type appointmentTypes = {
    appointment_code: number;
    appointment_type: string;
    basic_pay_type: string;
    tax_type: string;
    has_mandatory_deduction: boolean;
};

const columns: ColumnDef<appointmentTypes>[] = [
    { accessorKey: "appointment_code", header: "ID" },
    { accessorKey: "appointment_type", header: "TYPE" },
    { accessorKey: "basic_pay_type", header: "BASIC PAY TYPE" },
    { accessorKey: "tax_type", header: "TAX TYPE" },
    { accessorKey: "has_mandatory_deduction", header: "MANDATORY DEDUCTION" },
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
                        "Edit Appointment ",
                        rowData.appointment_type
                    ),
                    dialogContent: (
                        <AppointmentUpdate
                            compensationTypes={
                                usePage().props
                                    .compensationTypes as Array<string>
                            }
                            RowData={rowData}
                            setOpenDialog={setOpenDialog}
                        ></AppointmentUpdate>
                    ),
                },
                {
                    tag: "2",
                    name: "Delete",
                    dialogtitle: cn(
                        "Are you sure you want to delete ",
                        rowData.appointment_type,
                        "?"
                    ),
                    dialogContent: (
                        <AppointmentDelete
                            rowId={rowData.appointment_code}
                            setOpenDialog={setOpenDialog}
                        ></AppointmentDelete>
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

export default function Appointments() {
    const pageData = (usePage().props.data as appointmentTypes[]) || [];
    const data: appointmentTypes[] = pageData;

    const [globalFilter, setGlobalFilter] = useState<any>([]);
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
            pagination: {
                pageSize: 11,
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
        <AuthenticatedLayoutAdmin title="Appointments" links={AdminLinks}>
            <BodyContentLayout headerName={"Appointments List"}>
                <div className="h-full">
                    <div className="flex  mb-5 gap-3">
                        <Input
                            onChange={(e) =>
                                setGlobalFilter(e.target.value || "")
                            }
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
                                        New Appointment Profile
                                    </section>
                                }
                                title="New Appointment Profile"
                            >
                                <AppointmentStore
                                    compensationTypes={
                                        usePage().props
                                            .compensationTypes as Array<string>
                                    }
                                    openDialog={() =>
                                        setOpenDialog(!openDialog)
                                    }
                                />
                            </DialogMenu>
                        </div>
                    </div>
                    <DataTable
                        columns={columns}
                        table={table}
                        rowStyle="odd:bg-white even:bg-transparent text-center"
                    ></DataTable>
                </div>
                <PaginationTable table={table}></PaginationTable>
            </BodyContentLayout>
        </AuthenticatedLayoutAdmin>
    );
}

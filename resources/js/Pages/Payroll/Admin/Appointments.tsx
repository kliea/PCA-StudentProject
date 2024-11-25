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
                        "Editing Appointment ",
                        rowData.appointment_type
                    ),
                    dialogContent: (
                        <AppointmentUpdate
                            RowData={rowData}
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
        <AuthenticatedLayoutAdmin title="Appointments" links={AdminLinks}>
            <BodyContentLayout headerName={"Appointments List"}>
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
                                    Add New Appointment Profile
                                </section>
                            }
                            title="Add New Appointment Profile"
                        >
                            <AppointmentStore />
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

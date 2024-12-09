import {
    AppointmentDelete,
    AppointmentUpdate,
} from "@/Components/CrudComponents/AppointmentCRUD";
import DropdownDialog from "@/Components/DropdownDialog";
import AuthenticatedLayout from "@/Components/Layouts/Common/AuthenticatedLayout";
import { Input } from "@/Components/ui/input";
import { cn } from "@/lib/utils";
import { appointmentTypes } from "@/types/payrollPagesTypes";
import { usePage } from "@inertiajs/react";
import {
    ColumnDef,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { MoreHorizontal, Plus } from "lucide-react";
import { useState } from "react";
import DialogMenu from "@/Components/Dialog";
import { Button } from "@/Components/ui/button";
import { Label } from "@/Components/ui/label";
import { DataTable } from "@/Components/DataTable";
import PaginationTable from "@/Components/Pagination";

const AppointmentsPage = () => {
    const data = (usePage().props.data as appointmentTypes[]) || [];
    const [openDialog, setOpenDialog] = useState(false);
    const [globalFilter, setGlobalFilter] = useState<string>("");
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
    return (
        <AuthenticatedLayout
            pageTitle="Appointments"
            navigationType="payrollAdmin"
        >
            <div className="h-full flex flex-col">
                <div className="mb-5 flex flex-row gap-5">
                    <Input
                        type="search"
                        onChange={(e) => setGlobalFilter(e.target.value || "")}
                        className="w-1/4 rounded-pca"
                        placeholder="Search...."
                    />
                    <div className="grid grid-cols-1 gap-5 w-1/4">
                        <DialogMenu
                            open={openDialog}
                            openDialog={() => setOpenDialog(!openDialog)}
                            trigger={
                                <Button
                                    className="gap-2 rounded-pca"
                                    aria-label="New Appointment Profile"
                                >
                                    <Plus size={20} />
                                    <Label>New Appointment Profile</Label>
                                </Button>
                            }
                            title="Add Salary Grade"
                            description=""
                        ></DialogMenu>
                    </div>
                </div>
                <DataTable
                    {...{
                        table,
                        rowStyle: "odd:bg-white even:bg-transparent",
                    }}
                />

                <PaginationTable table={table}></PaginationTable>
            </div>
        </AuthenticatedLayout>
    );
};

export default AppointmentsPage;

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

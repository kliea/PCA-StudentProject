import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import AuthenticatedLayoutAdmin from "@/Layouts/AuthenticatedLayoutBioAdmin";
import BodyContentLayout from "@/Layouts/BodyContentLayout";
import { Head, usePage } from "@inertiajs/react";
import {
    ColumnDef,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { File, FolderUp, MoreHorizontal } from "lucide-react";
import Data from "@/Components/Constants/data13.json";
import { DataTable } from "@/Components/DataTable";
import { Input } from "@/Components/ui/input";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { DatePickerWithRange } from "@/Components/DateRangePicker";
import { addDays } from "date-fns";
import React, { useState } from "react";
import { DateRange } from "react-day-picker";
import { Button } from "@/Components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import {
    OrderDelete,
    OrderStore,
    OrderUpdate,
} from "@/Components/CrudComponents/OrderCrud";
import DialogMenu from "@/Components/Dialog";
import { useTable } from "@/hooks/BioAdmin/useTable";
//  Set accepted column types
type columnTypes = {
    employee_code: string;
    // name: string;
    leave_request_type: string;
    date_filed: string;
    leave_request_status: string;
};
// Generate the headers for the columns
const columns: ColumnDef<columnTypes>[] = [
    { accessorKey: "employee_code", header: "Employee ID" },
    // { accessorKey: "name", header: "Name" },
    {
        accessorKey: "leave_request_type", header: "Leave Type"
    },
    { accessorKey: "date_filed", header: "Applied On" },
    { accessorKey: "leave_request_status", header: "Status" },
    {
        id: "actions",
        cell: ({ row }) => {
            const action = row.original;
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <section>
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </section>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem className="text-green-600">
                            Approve
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                            Deny
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },


];


export default function LeaveOrder() {
    const { leaveData } = usePage<{ leaveData: ColumnType[] }>().props

    console.log(leaveData);
    const { table, globalFilter, setGlobalFilter } = useTable({
        data: leaveData,
        columns,
    });
    const [openDialog, setOpenDialog] = useState(false);
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: new Date(),
        to: addDays(new Date(), 20),
    });
    return (
        <AuthenticatedLayoutAdmin
            header={<h2>{usePage().component.split("/")[1]}</h2>}
        >
            <Head title="AttendanceRecord" />

            <BodyContentLayout headerName={"Leave Order"}>


                <div className="flex mb-5 justify-between">
                    <section className="flex gap-7 mt-5 w-full justify-right">

                        <section className="flex gap-7 w-1/4 justify-left">
                            <Input
                                type="text"
                                placeholder="Search..."
                                onChange={(e) =>
                                    setGlobalFilter(e.target.value || "")
                                }
                                className="rounded-[10px]"
                            />
                        </section>
                        <section className="flex gap-7 w-full justify-end">
                            <div>
                                <Select>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Leave Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All</SelectItem>
                                        <SelectItem value="flexi">Dark</SelectItem>
                                        <SelectItem value="regular">Regular</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <DialogMenu
                                open={openDialog}
                                openDialog={() =>
                                    setOpenDialog(!openDialog)
                                }
                                trigger={
                                    <section className="flex gap-1 bg-baseYellow text-black items-center justify-right p-2 rounded-[10px] pl-3 pr-5">
                                        <File size={15} />
                                        Create Leave Order
                                    </section>
                                }
                                title="New Leave Order"
                                description="Add New Leave Order"
                            >
                                <OrderStore
                                    openDialog={() =>
                                        setOpenDialog(!openDialog,)
                                    }
                                />
                            </DialogMenu>
                        </section>
                    </section>
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

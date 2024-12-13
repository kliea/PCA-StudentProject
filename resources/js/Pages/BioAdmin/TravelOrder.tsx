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

} from "@tanstack/react-table";
import { File, MoreHorizontal } from "lucide-react";
import { DataTable } from "@/Components/DataTable";
import { Input } from "@/Components/ui/input";
import DialogMenu from "@/Components/Dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { addDays } from "date-fns";
import React, { useState } from "react";
import { DateRange } from "react-day-picker";

import {
    
    OrderRead,
    OrderStore,
    OrderUpdate,
} from "@/Components/CrudComponents/OrderCrud";
import { useTable } from "@/hooks/BioAdmin/useTable";
import DropdownDialog from "@/Components/DropdownDialog";
import { cn } from "@/lib/utils";

//  Set accepted column types
type columnTypes = {
    employee_code: string;
    // name: string;
    start_date: string;
    end_date: string;
    travel_order_type: string;
    venuedestination: string;
    travel_order_status: string;
};
// Generate the headers for the columns
const columns: ColumnDef<columnTypes>[] = [
    { accessorKey: "employee_code", header: "Employee ID" },
    // { accessorKey: "name", header: "Name" },
    { accessorKey: "start_date", header: "Start Date" },
    { accessorKey: "end_date", header: "End Date" },
    { accessorKey: "travel_order_type", header: "Purpose of Travel" },
    { accessorKey: "venuedestination", header: "Venue Destination" },
    { accessorKey: "travel_order_status", header: "Status" },
    {
        id: "actions",
        cell: ({ row }) => {
            const [openDialog, setOpenDialog] = useState<string | null>(null);
            const rowData = row.original;
            const dialogs = [
                {
                    tag: "1",
                    name: "View Details",
                    dialogtitle: cn("View Travel Order Details"),
                    dialogContent: <OrderRead RowData={rowData}></OrderRead>,
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


export default function TravelOrder() {
    const { travelOrderData } = usePage<{ travelOrderData: ColumnType[] }>().props
    const { table, globalFilter, setGlobalFilter } = useTable({
        data: travelOrderData,
        columns,
    });

    const [statusFilter, setStatusFilter] = useState<string>("all");

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

            <BodyContentLayout headerName={"Travel Order"}>


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
                                <Select value={statusFilter} onValueChange={setStatusFilter}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Travel Order Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All</SelectItem>
                                        <SelectItem value="pending">Pending</SelectItem>
                                        <SelectItem value="approved">Approved</SelectItem>
                                        <SelectItem value="declined">Declined</SelectItem>
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
                                        Create Travel Order
                                    </section>
                                }
                                title="New Travel Order"
                                description="Add New Travel Order"
                            >
                                <OrderStore
                                    openDialog={() =>
                                        setOpenDialog(!openDialog) 
                                        
                                    }
                                     formType="travel"
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

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
import { File, MoreHorizontal } from "lucide-react";
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
import React from "react";
import { DateRange } from "react-day-picker";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import { AdminLinks } from "@/lib/payrollData";
import { usePage } from "@inertiajs/react";

//  Set accepted column types

type payrollTypes = {
    name: string;
    rate: number;
    quantity: number;
    type: string;
    position: string;
    tardiness: number;
    compensation: number;
    deduction: number;
    gross_amount: number;
};

// Generate the headers for the columns
const columns: ColumnDef<payrollTypes>[] = [
    { accessorKey: "name", header: "Name" },
    { accessorKey: "rate", header: "Rate" },
    { accessorKey: "quantity", header: "Quantity" },
    { accessorKey: "type", header: "Type" },
    { accessorKey: "position", header: "Position" },
    { accessorKey: "tardiness", header: "Tardiness" },
    { accessorKey: "compensation", header: "Compensation" },
    { accessorKey: "deduction", header: "Deduction" },
    { accessorKey: "gross_amount", header: "Gross Amount" },
    {
        // Action button for table
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
                        <DropdownMenuItem>View Details</DropdownMenuItem>
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

export default function Payrolls() {
    const pageData = (usePage().props.data as payrollTypes[]) || [];
    const data: payrollTypes[] = pageData;

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

    const [date, setDate] = React.useState<DateRange | undefined>({
        from: new Date(),
        to: addDays(new Date(), 20),
    });
    return (
        <AuthenticatedLayoutAdmin title="Payrolls" links={AdminLinks}>
            <BodyContentLayout headerName={"Payrolls List"}>
                <div className="flex  mb-5 justify-between">
                    <section className="flex gap-5 w-full">
                        <div>
                            <Select>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="All" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All</SelectItem>
                                    <SelectItem value="flexi">Dark</SelectItem>
                                    <SelectItem value="regular">
                                        Regular
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Input
                            type="text"
                            placeholder="Search..."
                            className="w-1/4 rounded-pca"
                        />
                    </section>
                    <section className="flex gap-5 w-full justify-end">
                        <div>
                            <DatePickerWithRange
                                className=""
                                date={date}
                                setDate={setDate}
                            ></DatePickerWithRange>
                        </div>
                        <Dialog>
                            <DialogTrigger>
                                <section className="flex gap-1 bg-baseYellow text-black items-center justify-center p-2 rounded-pca pl-3 pr-3">
                                    <File size={15} />
                                    Print Payroll
                                </section>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>
                                        Feature Under Development
                                    </DialogTitle>
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>
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

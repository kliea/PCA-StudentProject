import AuthenticatedLayoutAdmin from "@/Layouts/AuthenticatedLayout";
import AuthenticatedLayoutEmployee from "@/Layouts/AuthenticatedLayoutEmployees";
import { Head, usePage } from "@inertiajs/react";
import StatusCard from "@/Components/StatusCard";
import {
    Banknote,
    CreditCard,
    MoreHorizontal,
    PhilippinePeso,
    TrendingDown,
    File,
} from "lucide-react";
import BodyContentLayout from "@/Layouts/BodyContentLayout";
import {
    ColumnDef,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { DataTable } from "@/Components/DataTable";
import { DatePickerWithRange } from "@/Components/DateRangePicker";

import payrollData from "@/Components/Constants/data3.json";
import loanData from "@/Components/Constants/data4.json";
import React from "react";
import { DateRange } from "react-day-picker";
import { addDays, format } from "date-fns";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { AdminLinks } from "@/lib/payrollData";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";


type recentPayrolls = {
    period: string;
    name: string;
    employee_id: string;
    position: string;
    deduction: number;
    compensation: number;
};

type recentRequest = {
    id: number;
    name: string;
    loan_details: string;
};

// Column definition for Recent Payroll Table
const rpcolumns: ColumnDef<recentPayrolls>[] = [
    {
        accessorKey: "period",
        header: "Period",
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "employee_id",
        header: "Employee Id",
    },
    {
        accessorKey: "position",
        header: "Position",
    },

    {
        accessorKey: "deduction",
        header: "Deduction",
    },
    {
        accessorKey: "compensation",
        header: "Compensation",
    },
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

const rlcolumns: ColumnDef<recentRequest>[] = [
    { accessorKey: "id", header: "No." },
    { accessorKey: "name", header: "Name" },
    { accessorKey: "loan_details", header: "Loan Details" },
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

export default function MyDTR() {
    const recentPayrollData = payrollData;
    const recentLoansData = loanData;
    const rpData: recentPayrolls[] = recentPayrollData;
    const rlData: recentRequest[] = recentLoansData;

    const rpTable = useReactTable({
        data: rpData,
        columns: rpcolumns,
        getPaginationRowModel: getPaginationRowModel(),
        // Adjust Limit content after database has beeen set
        initialState: {
            pagination: {
                pageSize: 7,
            },
        },
        getCoreRowModel: getCoreRowModel(),
    });

    const rlTable = useReactTable({
        data: rlData,
        columns: rlcolumns,
        getPaginationRowModel: getPaginationRowModel(),
        // Adjust Limit content after database has beeen set
        initialState: {
            pagination: {
                pageSize: 7,
            },
        },
        getCoreRowModel: getCoreRowModel(),
    });
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: new Date(),
        to: addDays(new Date(), 20),
    });
    return (
        <AuthenticatedLayoutEmployee>
            <Dialog >
                <div className="flex justify-between">
                    <DatePickerWithRange
                        className=""
                        date={date}
                        setDate={setDate}
                    />

                    <DialogTrigger>
                        <div className="rounded-sm overflow-hidden">
                            <section className="flex gap-1 bg-baseYellow text-black items-center justify-center p-2 rounded-pca pl-3 pr-3">
                                <File size={15} />
                                Generate Report
                            </section>
                        </div>
                    </DialogTrigger>
                </div>
            </Dialog>
            
            <></>
        </AuthenticatedLayoutEmployee>
    );
}
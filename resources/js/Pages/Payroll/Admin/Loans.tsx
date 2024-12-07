// TODO: BUHAT UG COMPONENT FOR ADDING LOAN TYPES
// TODO: TABLE NGA MU CHECK FOR LOAN REQEUST SA MGA EMPLOYEES -> FUNCTIONALITY DILI PA SURE UNSAY IPANG BUTANG

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import AuthenticatedLayoutAdmin from "@/Layouts/AuthenticatedLayout";
import BodyContentLayout from "@/Layouts/BodyContentLayout";
import { usePage } from "@inertiajs/react";
import {
    ColumnDef,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { MoreHorizontal, View } from "lucide-react";
import { DataTable } from "@/Components/DataTable";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { AdminLinks } from "@/lib/payrollData";

type loanTypes = {
    name: string;
    id: string;
    monthly_ammount: number;
    begin_balance: number;
    previous_paid: number;
    paid_amount: number;
};

const columns: ColumnDef<loanTypes>[] = [
    { accessorKey: "name", header: "Name" },
    { accessorKey: "id", header: "Id Number" },
    { accessorKey: "monthly_amount", header: "Monthly Amount" },
    { accessorKey: "begin_balance", header: "Begin Balance" },
    { accessorKey: "previous_paid", header: "Previous Paid" },
    { accessorKey: "paid_amount", header: "Paid Amount" },
    {
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
                        <DropdownMenuItem>Edit Loan</DropdownMenuItem>
                        <DropdownMenuItem>
                            View Paid Amount Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>View Loan History</DropdownMenuItem>
                        <DropdownMenuItem>Reloan</DropdownMenuItem>
                        <DropdownMenuItem>Refresh</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

export default function Loans() {
    const pageData = (usePage().props.data as loanTypes[]) || [];
    const data: loanTypes[] = pageData;

    console.log(usePage().props.employeeDetails);

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
        <AuthenticatedLayoutAdmin title="Loans" links={AdminLinks}>
            <BodyContentLayout headerName={"Loans"}>
                <div className="flex  mb-5 gap-3">
                    <Input
                        type="text"
                        placeholder="Search..."
                        className="w-1/4 rounded-pca"
                    />

                    <Button className="flex gap-1">
                        <View size={20} />
                        View Loan Types
                    </Button>
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

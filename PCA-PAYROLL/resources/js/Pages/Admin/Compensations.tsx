import AuthenticatedLayout from "@/Layouts/AdminAuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import BodyContentLayout from "@/Layouts/BodyContentLayout";
import Data from "@/Components/Constants/data.json";
import {
    ColumnDef,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
    getFilteredRowModel,
} from "@tanstack/react-table";
import { DataTable } from "@/Components/DataTable";
import { useState } from "react";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { PlusIcon } from "lucide-react";

type CompensationProfile = {
    name: string;
    amount: number;
    code: string;
    setting: string;
    shorthand: string;
};

// Define Columns for Table .
const columns: ColumnDef<CompensationProfile>[] = [
    {
        accessorKey: "name",
        header: "COMPENSATION NAME",
    },
    {
        accessorKey: "amount",
        header: "AMOUNT",
    },
    {
        accessorKey: "code",
        header: "CODE",
    },
    {
        accessorKey: "setting",
        header: "SETTING",
    },
    {
        accessorKey: "shorthand",
        header: "SHORTHAND",
    },
];

export default function Dashboard() {
    // Set the data that table will use
    const data: CompensationProfile[] = Data;

    // State For Filtering Table
    const [globalFilter, setGlobalFilter] = useState<any>([]);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
            pagination: {
                pageSize: 10,
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
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    {usePage().component}
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="w-full h-[calc(100vh-120px)] overflow-hidden ">
                <BodyContentLayout headerName="Compensation Profile List">
                    <div className="mb-5 flex gap-5">
                        <Input
                            type="search"
                            onChange={(e) => setGlobalFilter(e.target.value)}
                            className="w-1/4 rounded-[5px]"
                            placeholder="Search...."
                        />
                        <div>
                            <Button>
                                <PlusIcon className="mr-2 h-6 w-auto" />
                                ADD NEW COMPENSATION PROFILE
                            </Button>
                        </div>
                    </div>
                    <DataTable
                        columns={columns}
                        rowStyle="odd:bg-white even:bg-transparent"
                        disablePagination={false}
                        table={table}
                    ></DataTable>
                </BodyContentLayout>
            </div>
        </AuthenticatedLayout>
    );
}

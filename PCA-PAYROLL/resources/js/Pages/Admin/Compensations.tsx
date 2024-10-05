import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import BodyContentLayout from "@/Layouts/BodyContentLayout";
import Data from "@/Components/Constants/data.json";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/Components/DataTable";
import { useState } from "react";
import { Input } from "@/Components/ui/input";

type CompensationProfile = {
    name: string;
    amount: number;
    code: string;
    setting: string;
    shorthand: string;
};

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
    const data: CompensationProfile[] = Data;

    const [globalFilter, setGlobalFilter] = useState<any>([]);

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
                    <Input
                        type="search"
                        onChange={(e) => setGlobalFilter(e.target.value)}
                    />
                    <DataTable
                        columns={columns}
                        data={data}
                        rowStyle="odd:bg-white even:bg-transparent"
                        paginationSize={10}
                        disablePagination={false}
                    ></DataTable>
                </BodyContentLayout>
            </div>
        </AuthenticatedLayout>
    );
}

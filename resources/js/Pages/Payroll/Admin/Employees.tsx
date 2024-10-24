import { DataTable } from "@/Components/DataTable";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Input } from "@/Components/ui/input";
import AuthenticatedLayoutAdmin from "@/Layouts/AuthenticatedLayoutAdmin";
import BodyContentLayout from "@/Layouts/BodyContentLayout";
import { Head, usePage } from "@inertiajs/react";
import {
    ColumnDef,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Data from "@/Components/Constants/data7.json";
import { cn } from "@/lib/utils";
import Select from "@/Dialogs/Select";
import DropdownDialog from "@/Components/DropdownDialog";

type columnTypes = {
    name: string;
    id: string;
    official_station: string;
    position: string;
    appointment: string;
    sg: string;
    step: string;
};

const columns: ColumnDef<columnTypes>[] = [
    { accessorKey: "name", header: "Name" },
    { accessorKey: "id", header: "Id" },
    { accessorKey: "official_station", header: "Official Station" },
    { accessorKey: "position", header: "Position" },
    { accessorKey: "appointment", header: "appointment" },
    { accessorKey: "sg", header: "SG" },
    { accessorKey: "step", header: "Step" },
    {
        id: "action",
        cell: ({ row }) => {
            const values = row.original;
            const dialogs = [
                {
                    tag: "1",
                    name: "Edit",
                    dialogtitle: cn(
                        "Employee Profile",
                    ),
                    dialogContent: <Select ></Select>,
                },
                {
                    tag: "2",
                    name: "Delete",
                    dialogtitle: "Dialog 2",
                    dialogContent: <>Hello Dialog2</>,
                    style: "text-red-600",
                },
            ];
            return (
                <div>
                    <DropdownDialog
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

export default function Employees() {
    const data: columnTypes[] = Data;
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
        <AuthenticatedLayoutAdmin>
            <Head title="Employees" />

            <BodyContentLayout headerName={"Employee List"}>
                <div className="flex  mb-5 gap-3">
                    <Input
                        type="text"
                        placeholder="Search..."
                        className="w-1/4 rounded-[10px]"
                    />
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

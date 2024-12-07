import { DataTable } from "@/Components/DataTable";
import { Input } from "@/Components/ui/input";
import AuthenticatedLayoutAdmin from "@/Layouts/AuthenticatedLayout";
import BodyContentLayout from "@/Layouts/BodyContentLayout";
import { usePage } from "@inertiajs/react";
import {
    ColumnDef,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { AdminLinks } from "@/lib/payrollData";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import DropdownDialog from "@/Components/DropdownDialog";
import { EmployeeEdit } from "@/Components/CrudComponents/EmployeesCRUD";
import PaginationTable from "@/Components/Pagination";
import axios from "axios";

type employeeTypes = {
    employee_number: number;
    first_name: string;
    middle_name: string;
    last_name: string;
    name_extension: string;
    salary_type: number;
    salary_step: number;
};

const columns: ColumnDef<employeeTypes>[] = [
    { accessorKey: "employee_number", header: "ID" },
    { accessorKey: "first_name", header: "First Name" },
    { accessorKey: "middle_name", header: "Middle Name" },
    { accessorKey: "last_name", header: "Last Name" },
    { accessorKey: "name_extension", header: "Name Extension" },
    { accessorKey: "salary_type", header: "Salary Grade" },
    { accessorKey: "salary_step", header: "Salary Step" },
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
                        "Edit Employee: ",
                        rowData.last_name,
                        ",",
                        rowData.first_name
                    ),
                    dialogContent: (
                        <EmployeeEdit
                            RowData={rowData}
                            setOpenDialog={setOpenDialog}
                        ></EmployeeEdit>
                    ),
                },
            ];

            return (
                <div>
                    <DropdownDialog
                        dialogClassName="max-w-[1000px]"
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

export default function Employees() {
    const [employees, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // useEffect(() => {
    //     axios
    //         .get(route("admin.employee_data"))
    //         .then((response) => {
    //             setData(response.data.data);
    //             setLoading(false);
    //         })
    //         .catch((err) => {
    //             setError(err.message);
    //             setLoading(false);
    //         });
    // }, []);

    const data = employees;

    // const pageData = (usePage().props.data as employeeTypes[]) || [];
    // const data: employeeTypes[] = pageData;

    const [globalFilter, setGlobalFilter] = useState<any>([]);
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
        getFilteredRowModel: getFilteredRowModel(),
        globalFilterFn: "auto",
        state: {
            globalFilter,
        },
        onGlobalFilterChange: setGlobalFilter,
    });
    return (
        <AuthenticatedLayoutAdmin title="Employees" links={AdminLinks}>
            <BodyContentLayout headerName={"Employee List"}>
                <div className="flex  mb-5 gap-3">
                    <Input
                        onChange={(e) => setGlobalFilter(e.target.value || "")}
                        type="text"
                        placeholder="Search..."
                        className="w-1/4 rounded-pca"
                    />
                </div>
                <div>
                    <DataTable
                        columns={columns}
                        table={table}
                        rowStyle="odd:bg-white even:bg-transparent text-center"
                    ></DataTable>
                    {/* <PaginationTable table={table}></PaginationTable> */}
                </div>
            </BodyContentLayout>
        </AuthenticatedLayoutAdmin>
    );
}

import { usePage } from "@inertiajs/react";
import { Input } from "@/Components/ui/input";
import { DataTable } from "@/Components/DataTable";
import AuthenticatedLayoutAdmin from "@/Layouts/AuthenticatedLayoutBioAdmin";
import BodyContentLayout from "@/Layouts/BodyContentLayout";
import { Head } from "@inertiajs/react";
import { ColumnDef } from "@tanstack/react-table";
import { useTable } from "@/hooks/BioAdmin/useTable";



type EmployeeType = {
    appointment_code: number;
    created_at: string | null;
    device_bio_id: string;
    employee_code: number;
    employee_number: string;
    first_name: string;
    last_name: string;
    middle_name: string | null;
    name_extension: string | null;
    position: string | null;
    position_code: number;
    salary_step: number;
    salary_type: string;
    station_code: number;
};

const columns: ColumnDef<EmployeeType>[] = [
    { accessorKey: "employee_number", header: "Employee Number" },
    {
        accessorKey: "full_name",
        header: "Name",
        cell: ({ row }) =>
            `${row.original.first_name} ${row.original.middle_name ? row.original.middle_name + ' ' : ''}${row.original.last_name}${row.original.name_extension ? ' ' + row.original.name_extension : ''}`
    },
    { accessorKey: "position_code", header: "Position Code" },
    { accessorKey: "salary_type", header: "Salary Type" },
];

export default function ManageUsers() {
    const { employees } = usePage<{ employees: EmployeeType[] }>().props;
    const { table, globalFilter, setGlobalFilter } = useTable({
        data: employees,
        columns,
    });

    return (
        <AuthenticatedLayoutAdmin
            header={<h2>{usePage().component.split("/")[1]}</h2>}
        >
            <Head title="Manage Users" />

            <BodyContentLayout headerName={"Manage Users"}>
                <div className="flex mb-5 gap-3">
                    <Input
                        type="text"
                        placeholder="Search..."
                        onChange={(e) =>
                            setGlobalFilter(e.target.value || "")
                        }
                        className="w-1/4 rounded-[10px] ml-auto"
                    />
                </div>
                <div>
                    <DataTable
                        columns={columns}
                        table={table}
                        rowStyle="odd:bg-white even:bg-transparent text-center"
                    />
                </div>
            </BodyContentLayout>
        </AuthenticatedLayoutAdmin>
    );
}

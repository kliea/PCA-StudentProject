import AuthenticatedLayoutAdmin from "@/Layouts/AuthenticatedLayoutBioAdmin";
import BodyContentLayout from "@/Layouts/BodyContentLayout";
import { Head, usePage } from "@inertiajs/react";
import {
    ColumnDef,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { File } from "lucide-react";
import Data from "@/Components/Constants/data5.json";
import { DataTable } from "@/Components/DataTable";
import { Input } from "@/Components/ui/input";

import { useDateRange } from "@/hooks/BioAdmin/useDateRange";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import { DatePickerWithRange } from "@/Components/DateRangePicker";
import { useTable } from "@/hooks/BioAdmin/useTable";
import { useMemo, useState } from "react";

//  Set accepted column types
// type columnTypes = {
//     name: string;
//     rate: number;
//     quantity: number;
//     type: string;
//     position: string;
//     tardiness: number;
//     compensation: number;
//     deduction: number;
//     gross_amount: number;
// };
// // Generate the headers for the columns
// const columns: ColumnDef<columnTypes>[] = [
//     { accessorKey: "gross_amount", header: "No." },
//     { accessorKey: "name", header: "Name" },
//     { accessorKey: "rate", header: "AM Arrival" },
//     { accessorKey: "quantity", header: "AM Departure" },
//     { accessorKey: "type", header: "PM Arrival" },
//     { accessorKey: "position", header: "PM Departure" },
//     { accessorKey: "tardiness", header: "Tardiness" },
//     { accessorKey: "compensation", header: "Undertime" },
//     { accessorKey: "deduction", header: "Date" },

// ];
interface MyComponentProps {
    data: any; // Type this appropriately
}
type ColumnType = {
    date: string;
    employee_code: number;
    time_in_am: string;
    time_out_am: string;
    time_in_pm: string;
    time_out_pm: string;
    tardy_minutes: number;
    undertime_minutes: number;
    work_minutes: number;
};

// Generate the headers for the columns
const columns: ColumnDef<ColumnType>[] = [
    { accessorKey: "date", header: "Date" },
    { accessorKey: "employee_code", header: "Employee ID" },
    { accessorKey: "time_in_am", header: "AM Time in" },
    { accessorKey: "time_out_am", header: "AM Time out" },
    { accessorKey: "time_in_pm", header: "PM Time in" },
    { accessorKey: "time_out_pm", header: "PM Time out" },
    { accessorKey: "tardy_minutes", header: "Tardy Minutes" },
    { accessorKey: "undertime_minutes", header: "Undertime" },
    { accessorKey: "work_minutes", header: "Work Time" },

];


export default function AttendanceRecord() {
    const { tableData } = usePage<{ tableData: ColumnType[] }>().props

    const { table, globalFilter, setGlobalFilter } = useTable({
        data: tableData,
        columns,
    });

    const { dateRange, setDateRange } = useDateRange();

    // State to manage selected employee
    const [selectedEmployee, setSelectedEmployee] = useState<ColumnType | null>(null);

    // Filter data based on search input
    const filteredEmployee = useMemo(() => {
        if (!globalFilter) return null;
        return tableData.find((employee) =>
            employee.employee_code.toString().includes(globalFilter)
        );
    }, [globalFilter, tableData]);

    useMemo(() => {
        setSelectedEmployee(filteredEmployee || null);
    }, [filteredEmployee]);


    return (
        <AuthenticatedLayoutAdmin
            header={<h2>{usePage().component.split("/")[1]}</h2>}
        >
            <Head title="AttendanceRecord" />


            <BodyContentLayout headerName={"Employee Attendance Record"}>
                <div className="flex items-center justify-center h-full">
                    {selectedEmployee ? (
                        <BodyContentLayout headerName="Employee Information" className="mt-5 h-fit shadow-md lg:w-2/4">
                            <div className="p-5 bg-white rounded-lg shadow-md">
                                <div className="mb-4">
                                    <h3 className="text-lg font-bold mb-2">{selectedEmployee.date}</h3>
                                    <p className="text-sm text-gray-600">Employee ID: {selectedEmployee.employee_code}</p>
                                    <p className="text-sm text-gray-600">Work Hours: {selectedEmployee.work_minutes / 60} hrs</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex flex-col items-center bg-blue-100 p-3 rounded-md">
                                        <p className="text-lg font-bold">{selectedEmployee.work_minutes / 60} hrs</p>
                                        <p className="text-xs text-gray-600">Work Hours</p>
                                    </div>
                                    <div className="flex flex-col items-center bg-green-100 p-3 rounded-md">
                                        <p className="text-lg font-bold">{selectedEmployee.tardy_minutes} mins</p>
                                        <p className="text-xs text-gray-600">Tardiness</p>
                                    </div>
                                    <div className="flex flex-col items-center bg-yellow-100 p-3 rounded-md">
                                        <p className="text-lg font-bold">{selectedEmployee.undertime_minutes} mins</p>
                                        <p className="text-xs text-gray-600">Undertime</p>
                                    </div>
                                    <div className="flex flex-col items-center bg-red-100 p-3 rounded-md">
                                        <p className="text-lg font-bold">N/A</p>
                                        <p className="text-xs text-gray-600">Absences</p>
                                    </div>
                                </div>
                            </div>
                        </BodyContentLayout>
                    ) : (
                        <BodyContentLayout headerName="Employee Information" className="mt-5 h-fit shadow-md lg:w-2/4">
                            <div className="p-5 bg-white text-center">
                                <h1>No employee selected</h1>
                            </div>
                        </BodyContentLayout>
                    )}
                </div>



                <div className="flex mb-5 justify-between">
                    <section className="flex gap-7 mt-5 w-full justify-right">
                        <section className="flex gap-7 w-1/4 justify-left">
                            <Input
                                type="text"
                                value={globalFilter || ""}
                                onChange={(e) =>
                                    setGlobalFilter(e.target.value || "")
                                }
                                placeholder="Search..."
                                className="rounded-[10px]"
                            />
                        </section>
                        <div>
                            <DatePickerWithRange
                                className=""
                                date={dateRange}
                                setDate={setDateRange}
                            ></DatePickerWithRange>
                        </div>
                        <Dialog>
                            <DialogTrigger>
                                <section className="flex gap-1 bg-baseYellow text-black items-center justify-center p-2 rounded-[10px] pl-3 pr-5">
                                    <File size={15} />
                                    Generate Report
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
                    {selectedEmployee ? (
                        <DataTable
                            columns={columns}
                            table={table}
                            rowStyle="odd:bg-white even:bg-transparent text-center"
                        ></DataTable>
                    ) : (
                        <div className="text-center mt-5">No employee found or selected</div>
                    )}

                </div>
            </BodyContentLayout>
        </AuthenticatedLayoutAdmin>
    );
}

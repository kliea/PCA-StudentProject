
import AuthenticatedLayoutAdmin from "@/Layouts/AuthenticatedLayoutBioAdmin";
import BodyContentLayout from "@/Layouts/BodyContentLayout";
import { Head, usePage } from "@inertiajs/react";
import {
    ColumnDef
} from "@tanstack/react-table";
import { File, Globe, Import } from "lucide-react";
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
import { useDateRange } from "@/hooks/BioAdmin/useDateRange";
import { useTable } from "@/hooks/BioAdmin/useTable";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import { Button, buttonVariants } from "@/Components/ui/button";

//  Set accepted column types

// import { useState } from "react";
// import { usePage } from "@inertiajs/react";
// import { Input } from "@/Components/ui/input";
// import { DataTable } from "@/Components/DataTable";
// import AuthenticatedLayoutAdmin from "@/Layouts/AuthenticatedLayoutBioAdmin";
// import BodyContentLayout from "@/Layouts/BodyContentLayout";
// import { Head } from "@inertiajs/react";
// import { ColumnDef, useReactTable, getCoreRowModel, getPaginationRowModel } from "@tanstack/react-table";

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

export default function ShowAttendance() {
    const { allData } = usePage<{ allData: ColumnType[] }>().props

    const { table, globalFilter, setGlobalFilter } = useTable({
        data: allData,
        columns,
    });
    const { dateRange, setDateRange } = useDateRange();


    return (
        <AuthenticatedLayoutAdmin
            header={<h2>{usePage().component.split("/")[1]}</h2>}
        >
            <Head title="Employee Attendance Report" />

            <BodyContentLayout headerName={"Employee Attendance Report"}>


                <div className="flex  mb-5 justify-between">
                    <section className="flex gap-5 w-full justify-between">
                        <div className="flex gap-5"><div>
                            <DatePickerWithRange
                                className=""
                                date={dateRange}
                                setDate={setDateRange}
                            ></DatePickerWithRange>
                        </div>

                            <Dialog>
                                <DialogTrigger>
                                    <section className="flex gap-1 bg-secondaryGreen text-white items-center justify-center p-2 rounded-[10px] pl-3 pr-3">
                                        View List
                                    </section>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>
                                            Feature Under Development
                                        </DialogTitle>
                                    </DialogHeader>
                                </DialogContent>
                            </Dialog></div>
                        <div><Button variant="update">Update Log<Import /></Button></div>
                    </section>
                </div>
                <div>
                    <DataTable
                        columns={columns}
                        table={table}
                        rowStyle="odd:bg-white even:bg-transparent text-center"
                    ></DataTable>
                </div>
            </BodyContentLayout >
        </AuthenticatedLayoutAdmin >
    );
}

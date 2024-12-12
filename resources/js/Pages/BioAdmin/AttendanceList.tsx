import AuthenticatedLayoutAdmin from "@/Layouts/AuthenticatedLayoutBioAdmin";
import BodyContentLayout from "@/Layouts/BodyContentLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import { ColumnDef } from "@tanstack/react-table";
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
import { Button } from "@/Components/ui/button";
import { useState } from "react";

type ColumnType = {
    date: string;
    employee_code: number;
    time_in_am: string;
    time_out_am: string;
    time_in_pm: string;
    time_out_pm: string;
    overtime_in: string;
    overtime_out: string;
    tardy_minutes: number;
    undertime_minutes: number;
    overtime_minutes: number;
    work_minutes: number;
};

const columns: ColumnDef<ColumnType>[] = [
    { accessorKey: "date", header: "Date" },
    { accessorKey: "employee_code", header: "Employee ID" },
    { accessorKey: "time_in_am", header: "AM Time in" },
    { accessorKey: "time_out_am", header: "AM Time out" },
    { accessorKey: "time_in_pm", header: "PM Time in" },
    { accessorKey: "time_out_pm", header: "PM Time out" },
    { accessorKey: "overtime_in", header: "Overtime In" },
    { accessorKey: "overtime_out", header: "Overtime Out" },
    { accessorKey: "tardy_minutes", header: "Tardy Minutes" },
    { accessorKey: "undertime_minutes", header: "Undertime Minutes" },
    { accessorKey: "overtime_minutes", header: "Overtime Minutes" },
    { accessorKey: "work_minutes", header: "Work Time Minutes" },
];

export default function ShowAttendance() {
    const { allData: initialData } = usePage<{ allData: ColumnType[] }>().props;
    const [allData, setAllData] = useState(initialData);

    const { table, globalFilter, setGlobalFilter } = useTable({
        data: allData,
        columns,
    });
    const { dateRange, setDateRange } = useDateRange();


    const { get } = useForm({}); // Initialize properly with default form values if needed

    // Set action for the Form
    const fetchLogs = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();

        try {
            await get(route("bioadmin.fetchLogs"));
        } catch (error) {
            console.error("Error fetching logs:", error);
        }
    };


    return (
        <AuthenticatedLayoutAdmin
            header={<h2>{usePage().component.split("/")[1]}</h2>}
        >
            <Head title="Employee Attendance Report" />

            <BodyContentLayout headerName={"Employee Attendance Report"}>
                <div className="flex mb-5 justify-between">
                    <section className="flex gap-5 w-full justify-between">
                        <div className="flex gap-5">
                            <div>
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
                            </Dialog>
                        </div>
                        <Button onClick={fetchLogs} variant="update">
                            Update Log<Import />
                        </Button>
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

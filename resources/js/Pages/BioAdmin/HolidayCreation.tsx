
import AuthenticatedLayoutAdmin from "@/Layouts/AuthenticatedLayoutBioAdmin";
import BodyContentLayout from "@/Layouts/BodyContentLayout";
import { Head, usePage } from "@inertiajs/react";
import {
    ColumnDef,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { Calendar, File, FolderUp, MoreHorizontal } from "lucide-react";
import Data from "@/Components/Constants/data12.json";
import { DataTable } from "@/Components/DataTable";
import { Input } from "@/Components/ui/input";

import { DatePickerWithRange } from "@/Components/DateRangePicker";
import { addDays } from "date-fns";
import React, { useState } from "react";
import { DateRange } from "react-day-picker";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";

//  Set accepted column types
type columnTypes = {
    name: string;
    dayoftheweek: string;
    datestart: string;
    dateend: string;
};
// Generate the headers for the columns
const columns: ColumnDef<columnTypes>[] = [
    { accessorKey: "name", header: "Name" },
    { accessorKey: "dayoftheweek", header: "Day Of The Week" },
    { accessorKey: "datestart", header: "Date Start" },
    { accessorKey: "dateend", header: "Date End" },
    
   
];


export default function HolidayCreation() {
    const data: columnTypes[] = Data;
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

    const [date, setDate] = React.useState<DateRange | undefined>({
        from: new Date(),
        to: addDays(new Date(), 20),
    });
    return (
        <AuthenticatedLayoutAdmin
            header={<h2>{usePage().component.split("/")[1]}</h2>}
        >
            <Head title="AttendanceRecord" />

            <BodyContentLayout headerName={"Holiday Creation"}>
          
                
            <div className="flex mb-5 justify-between">
                <section className="flex gap-7 mt-5 w-full justify-right">
                    <section className="flex gap-7 w-1/4 justify-left">
                        <Input
                        type="text"
                        placeholder="Search..."
                        onChange={(e) =>
                            setGlobalFilter(e.target.value || "")
                        }
                        className="rounded-[10px]"
                        />
                        </section>
                        <Dialog>
                            <DialogTrigger>
                                <section className="flex gap-1 bg-baseYellow text-black items-center justify-right p-2 rounded-[10px] pl-3 pr-5">
                                    <Calendar size={15} />
                                    Add Holiday
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

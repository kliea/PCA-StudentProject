import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import AuthenticatedLayoutAdmin from "@/Layouts/AuthenticatedLayout";
import BodyContentLayout from "@/Layouts/BodyContentLayout";
import {
    ColumnDef,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { File, MoreHorizontal } from "lucide-react";
import { DataTable } from "@/Components/DataTable";
import { Input } from "@/Components/ui/input";
import dummyData from "@/Components/Constants/DataTest/payrollTestData.json";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
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
import { AdminLinks } from "@/lib/payrollData";
import { usePage } from "@inertiajs/react";
import DropdownDialog from "@/Components/DropdownDialog";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import PayrollProperties from "@/Components/CrudComponents/PayrollTabs/Properties";
import PaginationTable from "@/Components/Pagination";
import Signatories from "@/Components/CrudComponents/PayrollTabs/Signatories";
import CompensationTab from "@/Components/CrudComponents/PayrollTabs/CompensationTab";
import DeductionTab from "@/Components/CrudComponents/PayrollTabs/DeductionTab";
//  Set accepted column types

type payrollTypes = {
    refNumber: number;
    fundCluster: string;
    payrollName: string;
    payrollType: string;
    startDate: string;
    endDate: string;
    paidDate: string;
    compensation: number;
    gross: number;
    deduction: number;
    netAmount: number;
};

// Generate the headers for the columns
const columns: ColumnDef<payrollTypes>[] = [
    { accessorKey: "refNumber", header: "Ref No." },
    { accessorKey: "fundCluster", header: "Fund" },
    { accessorKey: "payrollName", header: "Name" },
    { accessorKey: "payrollType", header: "Type" },
    { accessorKey: "startDate", header: "Start Date" },
    { accessorKey: "endDate", header: "End Date" },
    { accessorKey: "compensation", header: "Compensation" },
    { accessorKey: "gross", header: "Gross" },
    { accessorKey: "deduction", header: "Deduction" },
    { accessorKey: "netAmount", header: "Net Amount" },
    {
        id: "actions",
        cell: ({ row }) => {
            const [openDialog, setOpenDialog] = useState<string | null>(null);
            const rowData = row.original;
            const dialogs = [
                {
                    tag: "1",
                    name: "Edit",
                    dialogtitle: cn("Edit Payroll"),
                    dialogContent: (
                        <Tabs defaultValue="properties" className="w-full">
                            <TabsList className="grid w-full grid-cols-4">
                                <TabsTrigger value="properties">
                                    Properties
                                </TabsTrigger>
                                <TabsTrigger value="signatories">
                                    Signatories
                                </TabsTrigger>
                                <TabsTrigger value="compensation">
                                    Compensation
                                </TabsTrigger>
                                <TabsTrigger value="deduction">
                                    Deduction
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value="properties">
                                <PayrollProperties
                                    setOpenDialog={setOpenDialog}
                                    RowData={rowData}
                                />
                            </TabsContent>
                            <TabsContent value="signatories">
                                <Signatories
                                    setOpenDialog={setOpenDialog}
                                ></Signatories>
                            </TabsContent>
                            <TabsContent value="compensation">
                                <CompensationTab
                                    setOpenDialog={setOpenDialog}
                                ></CompensationTab>
                            </TabsContent>
                            <TabsContent value="deduction">
                                <DeductionTab
                                    setOpenDialog={setOpenDialog}
                                ></DeductionTab>
                            </TabsContent>
                        </Tabs>
                    ),
                },
                {
                    tag: "2",
                    name: "View",
                    dialogtitle: cn(
                        "Payroll: ",
                        rowData.payrollType,
                        ":",
                        rowData.payrollName
                    ),
                    // dialogContent: (
                    //     <AppointmentDelete
                    //         rowId={rowData.appointment_code}
                    //         setOpenDialog={setOpenDialog}
                    //     ></AppointmentDelete>
                    // ),
                    // style: "text-red-600",
                },
            ];

            return (
                <div>
                    <DropdownDialog
                        dialogClassName="max-w-[800px] min-h-[500px]"
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

export default function Payrolls() {
    const pageData = (usePage().props.data as payrollTypes[]) || [];
    const data: payrollTypes[] = dummyData;

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

    const [date, setDate] = React.useState<DateRange | undefined>({
        from: new Date(),
        to: addDays(new Date(), 20),
    });
    return (
        <AuthenticatedLayoutAdmin title="Payrolls" links={AdminLinks}>
            <BodyContentLayout headerName={"Payrolls List"}>
                <div className="flex  mb-5 justify-between">
                    <section className="flex gap-5 w-full">
                        <div>
                            <Select>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="All" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All</SelectItem>
                                    <SelectItem value="flexi">Dark</SelectItem>
                                    <SelectItem value="regular">
                                        Regular
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Input
                            type="text"
                            placeholder="Search..."
                            className="w-1/4 rounded-pca"
                        />
                    </section>
                    <section className="flex gap-5 w-full justify-end">
                        <div>
                            <DatePickerWithRange
                                className=""
                                date={date}
                                setDate={setDate}
                            ></DatePickerWithRange>
                        </div>
                        <Dialog>
                            <DialogTrigger>
                                <section className="flex gap-1 bg-baseYellow text-black items-center justify-center p-2 rounded-pca pl-3 pr-3">
                                    <File size={15} />
                                    Print Payroll
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
                <PaginationTable table={table}></PaginationTable>
            </BodyContentLayout>
            <div></div>
        </AuthenticatedLayoutAdmin>
    );
}

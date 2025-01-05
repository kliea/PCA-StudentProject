import { Combobox } from "@/Components/ComboBox";
import { DataTable } from "@/Components/DataTable";
import { Button } from "@/Components/ui/button";
import { Label } from "@/Components/ui/label";
import { ScrollArea } from "@/Components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
    ColumnDef,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import IncludeExcludeBox from "@/Components/IncludeExcludeBox";

const EmployeesList = () => {
    const [data, setData] = useState<Array<EmployeesListTypes>>([
        {
            first_name: "John",
            last_name: "Doe",
            compensations: 5000,
            deductions: 1000,
        },
        {
            first_name: "Jane",
            last_name: "Smith",
            compensations: 6000,
            deductions: 1200,
        },
        {
            first_name: "Michael",
            last_name: "Johnson",
            compensations: 5500,
            deductions: 1100,
        },
        {
            first_name: "Emily",
            last_name: "Williams",
            compensations: 5200,
            deductions: 1050,
        },
        {
            first_name: "David",
            last_name: "Brown",
            compensations: 5800,
            deductions: 1150,
        },
        {
            first_name: "Sarah",
            last_name: "Jones",
            compensations: 5300,
            deductions: 1080,
        },
        {
            first_name: "Daniel",
            last_name: "Garcia",
            compensations: 5700,
            deductions: 1130,
        },
        {
            first_name: "Olivia",
            last_name: "Martinez",
            compensations: 5400,
            deductions: 1090,
        },
        {
            first_name: "Matthew",
            last_name: "Rodriguez",
            compensations: 5600,
            deductions: 1120,
        },
        {
            first_name: "Sophia",
            last_name: "Hernandez",
            compensations: 5500,
            deductions: 1100,
        },
    ]);

    const names = [
        {
            value: "Emma Johnson",
            label: "Emma Johnson",
        },
        {
            value: "Liam Smith",
            label: "Liam Smith",
        },
        {
            value: "Olivia Brown",
            label: "Olivia Brown",
        },
        {
            value: "Noah Williams",
            label: "Noah Williams",
        },
        {
            value: "Ava Jones",
            label: "Ava Jones",
        },
        {
            value: "Elijah Miller",
            label: "Elijah Miller",
        },
        {
            value: "Sophia Davis",
            label: "Sophia Davis",
        },
        {
            value: "James Garcia",
            label: "James Garcia",
        },
        {
            value: "Isabella Martinez",
            label: "Isabella Martinez",
        },
        {
            value: "Benjamin Hernandez",
            label: "Benjamin Hernandez",
        },
    ];

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    const [baseItems, setBaseItems] = useState<Array<string>>([]);
    const [selectedItems, setSelectedItems] = useState<Array<string>>([]);
    return (
        <div className="flex">
            <section className="w-full grid grid-cols-2 gap-5">
                <div>
                    <section className="flex justify-start my-2 gap-3">
                        <Combobox dataset={names} />
                        <Button type="button">Add Employee</Button>
                    </section>
                    <ScrollArea className="h-[calc(100%-20%)] border rounded-[10px]">
                        <DataTable
                            table={table}
                            rowStyle="bg-white"
                        ></DataTable>
                    </ScrollArea>
                </div>

                <div className="flex flex-col gap-3">
                    <Label className="text-xl my-2">Selected: </Label>

                    <section className="border rounded-[10px] w-full h-[calc(100%-20%)] grid grid-rows-2 p-2 gap-5">
                        <div>
                            <Tabs
                                defaultValue="compensations"
                                className="w-full"
                            >
                                <TabsList>
                                    <TabsTrigger value="compensations">
                                        Compensations
                                    </TabsTrigger>
                                    <TabsTrigger value="agencyshare">
                                        Agency Share
                                    </TabsTrigger>
                                </TabsList>
                                <TabsContent value="compensations">
                                    <IncludeExcludeBox
                                        baseItems={baseItems}
                                        selectedItems={selectedItems}
                                        setBaseItems={setBaseItems}
                                        setSelectedItems={setSelectedItems}
                                        selectedItemsName="Payroll Compensations"
                                        baseItemsName="Compensations"
                                        className="h-[200px] w-full"
                                    />
                                </TabsContent>
                                <TabsContent value="agencyshare">
                                    <IncludeExcludeBox
                                        baseItems={baseItems}
                                        selectedItems={selectedItems}
                                        setBaseItems={setBaseItems}
                                        setSelectedItems={setSelectedItems}
                                        selectedItemsName="Payroll Agency Shares"
                                        baseItemsName="Agency Shares"
                                        className="h-[200px] w-full"
                                    />
                                </TabsContent>
                            </Tabs>
                        </div>
                        <div>
                            <Tabs defaultValue="deductions" className="w-full">
                                <TabsList>
                                    <TabsTrigger value="deductions">
                                        Deductions
                                    </TabsTrigger>
                                </TabsList>
                                <TabsContent value="deductions">
                                    <IncludeExcludeBox
                                        baseItems={baseItems}
                                        selectedItems={selectedItems}
                                        setBaseItems={setBaseItems}
                                        setSelectedItems={setSelectedItems}
                                        selectedItemsName="Payroll Deductions"
                                        baseItemsName="Deductions"
                                        className="h-[200px] w-full"
                                    />
                                </TabsContent>
                            </Tabs>
                        </div>
                    </section>
                </div>
            </section>
        </div>
    );
};

export default EmployeesList;

interface EmployeesListTypes {
    first_name: string;
    last_name: string;
    compensations: number;
    deductions: number;
}

const columns: ColumnDef<EmployeesListTypes>[] = [
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => {
            return cn(row.original.last_name, ",", row.original.first_name);
        },
    },
    {
        accessorKey: "compensations",
        header: "Compensations",
    },
    {
        accessorKey: "deductions",
        header: "Deductions",
    },
];

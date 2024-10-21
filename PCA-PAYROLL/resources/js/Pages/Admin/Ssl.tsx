import AuthenticatedLayoutAdmin from "@/Layouts/AuthenticatedLayoutAdmin";
import { Head, usePage } from "@inertiajs/react";
import BodyContentLayout from "@/Layouts/BodyContentLayout";
import {
    ColumnDef,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
    getFilteredRowModel,
} from "@tanstack/react-table";
import { DataTable } from "@/Components/DataTable";
import { useState } from "react";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import {
    ChevronLeft,
    ChevronRight,
    FolderDown,
    FolderUp,
    MoreHorizontal,
    PlusIcon,
} from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
} from "@/Components/ui/pagination";
import { SslStore, SslUpdate } from "@/Components/CrudComponents/SslCrud";
import DialogMenu from "@/Components/Dialog";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";

type sslProfile = {
    salary_grade: string;
    step1: number;
    step2: number;
    step3: number;
    step4: number;
    step5: number;
    step6: number;
    step7: number;
    step8: number;
};

const columns: ColumnDef<sslProfile>[] = [
    {
        accessorKey: "salary_grade",
        header: "SG",
    },
    {
        accessorKey: "step1",
        header: "STEP 1",
    },
    {
        accessorKey: "step2",
        header: "STEP 2",
    },
    {
        accessorKey: "step3",
        header: "STEP 3",
    },
    {
        accessorKey: "step4",
        header: "STEP 4",
    },
    {
        accessorKey: "step5",
        header: "STEP 5",
    },
    {
        accessorKey: "step6",
        header: "STEP 6",
    },
    {
        accessorKey: "step7",
        header: "STEP 7",
    },
    {
        accessorKey: "step8",
        header: "STEP 8",
    },

    // Action Button for the Tables .
    {
        id: "actions",
        cell: ({ row }) => {
            const action = row.original;

            return (
                <div>
                    <Dialog>
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <section>
                                    <span className="sr-only">Open menu</span>
                                    <MoreHorizontal className="h-4 w-4" />
                                </section>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                {/* Apply Routes ug Create ug Function para mu accept ug entry */}
                                <DialogTrigger asChild>
                                    <DropdownMenuItem>
                                        Edit
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>
                                                    Are you absolutely sure?
                                                </DialogTitle>
                                                <DialogDescription>
                                                    This action cannot be
                                                    undone. Are you sure you
                                                    want to permanently delete
                                                    this file from our servers?
                                                </DialogDescription>
                                            </DialogHeader>
                                            <DialogFooter>
                                                <Button type="submit">
                                                    Confirm
                                                </Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </DropdownMenuItem>
                                </DialogTrigger>

                                {/* Create row delete function */}
                                <DropdownMenuItem className="text-red-600">
                                    Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </Dialog>
                </div>
            );
        },
    },
];

const Ssl = () => {
    const pageData = (usePage().props.data as sslProfile[]) || [];
    const data: sslProfile[] = pageData;
    const [globalFilter, setGlobalFilter] = useState<any>([]);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
            pagination: {
                pageSize: 10,
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
        <div>
            <AuthenticatedLayoutAdmin
                header={<h2>{usePage().component.split("/")[1]}</h2>}
            >
                <Head title="SSL" />
                <BodyContentLayout
                    headerName="SSL"
                    className="h-[800px]"
                    contentStyle="h-[650px]"
                >
                    <div className="h-full">
                        <div className="mb-5 flex gap-5 ">
                            <Input
                                type="search"
                                onChange={(e) =>
                                    setGlobalFilter(e.target.value || "")
                                }
                                className="w-1/4 rounded-[10px]"
                                placeholder="Search...."
                            />
                            <div>
                                {/* Dialog Component Usage : 
                                props : 
                                trigger (React Node type) required
                                title string optional
                                description string optional
                                children react node optional
                                  */}
                                <DialogMenu
                                    trigger={
                                        <section className="flex items-center justify-center bg-secondaryGreen p-2 text-white rounded-[10px] pl-3 pr-3">
                                            <PlusIcon className="mr-2 h-6 w-auto" />
                                            New SSL Profile
                                        </section>
                                    }
                                    title="New SSL Profile"
                                    description="Add New SSL Profile"
                                >
                                    <SslStore />
                                </DialogMenu>
                            </div>

                            <div>
                                <DialogMenu
                                    trigger={
                                        <section className="flex items-center justify-center bg-secondaryGreen p-2 text-white rounded-[10px] pl-3 pr-3">
                                            <FolderDown className="mr-2 h-6 w-auto" />
                                            Import SSL
                                        </section>
                                    }
                                    title="Feature Under Development"
                                />
                            </div>

                            <div>
                                <DialogMenu
                                    trigger={
                                        <section className="flex items-center justify-center bg-secondaryGreen p-2 text-white rounded-[10px] pl-3 pr-3">
                                            <FolderUp className="mr-2 h-6 w-auto" />
                                            Export SSL
                                        </section>
                                    }
                                    title="Feature Under Development"
                                />
                            </div>
                        </div>
                        <DataTable
                            columns={columns}
                            rowStyle="odd:bg-white even:bg-transparent text-center"
                            table={table}
                        ></DataTable>
                        <Pagination className="flex justify-end items-end">
                            <PaginationContent>
                                <PaginationItem>
                                    <Button
                                        onClick={table.previousPage}
                                        className="bg-transparent text-black hover:bg-transparent w-30 p-2"
                                        disabled={!table.getCanPreviousPage()}
                                    >
                                        <ChevronLeft className="pr-1" />
                                        Previous
                                    </Button>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationEllipsis />
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink>
                                        {table.getState().pagination.pageIndex +
                                            1}
                                    </PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationEllipsis />
                                </PaginationItem>
                                <Button
                                    onClick={table.nextPage}
                                    className="bg-transparent text-black hover:bg-transparent w-30 p-2"
                                    disabled={!table.getCanNextPage()}
                                >
                                    Next
                                    <ChevronRight className="pl-1" />
                                </Button>
                            </PaginationContent>
                        </Pagination>
                    </div>
                </BodyContentLayout>
            </AuthenticatedLayoutAdmin>
        </div>
    );
};

export default Ssl;

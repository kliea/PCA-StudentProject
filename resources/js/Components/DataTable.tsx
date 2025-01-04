import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { cn } from "@/lib/utils";

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/Components/ui/pagination";

import { ColumnDef, flexRender } from "@tanstack/react-table";
import { useEffect } from "react";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    headerStyle?: string;
    rowStyle?: string;
    table: any;
    className?: string;
    pageSize?: number;
}

export function DataTable<TData, TValue>({
    columns,
    headerStyle,
    rowStyle,
    table,
    className,
    pageSize = 10,
}: DataTableProps<TData, TValue>) {
    useEffect(() => {
        table.setPageSize(pageSize);
    }, [table, pageSize]);

    return (
        <div className="h-full flex flex-col">
            {/* Table Container */}
            <div className={cn("rounded-[5px] border shadow-md flex-grow overflow-hidden")}

            >
                <Table className={cn("bg-baseGrey h-full", className)}>
                    <TableHeader className={headerStyle}>
                        {table.getHeaderGroups().map((headerGroup: any) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header: any) => (
                                    <TableHead key={header.id} className="text-center">
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row: any) => (
                                <TableRow
                                    className={rowStyle}
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell: any) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between p-4">
                <Pagination>
                    {/* Previous Button */}
                    <PaginationPrevious
                        onClick={() => {
                            if (table.getCanPreviousPage()) {
                                table.previousPage();
                            }
                        }}
                        className={cn(
                            !table.getCanPreviousPage() ? "cursor-not-allowed opacity-50" : "",
                            "px-4 py-2"
                        )}
                    >
                        Previous
                    </PaginationPrevious>

                    {table.getPageCount() > 1 &&
                        Array.from({ length: table.getPageCount() }, (_, index) => (
                            <PaginationItem key={index}>
                                <PaginationLink
                                    onClick={() => table.setPageIndex(index)}
                                    className={cn(
                                        table.getState().pagination.pageIndex === index &&
                                        "font-bold bg-primary text-white"
                                    )}
                                >
                                    {index + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))}

                    {/* Next Button */}
                    <PaginationNext
                        onClick={() => {
                            if (table.getCanNextPage()) {
                                table.nextPage();
                            }
                        }}
                        className={cn(
                            !table.getCanNextPage() ? "cursor-not-allowed opacity-50" : "",
                            "px-4 py-2"
                        )}
                    >
                        Next
                    </PaginationNext>
                </Pagination>
            </div>

        </div>
    );
}

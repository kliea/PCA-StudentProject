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

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    headerStyle?: string;
    rowStyle?: string;
    disablePagination: boolean;
    table: any;
}

export function DataTable<TData, TValue>({
    columns,
    headerStyle,
    rowStyle,
    disablePagination,
    table,
}: DataTableProps<TData, TValue>) {
    return (
        // Fix Pagination : Moves with table . Prefereable if stay sa bottom
        // Style the Table
        // Pagination kay dapat naay pay lain number ug dapat naas tunga or naka highlight ang current page sa pagination
        // Disable Previous Button Page or Hide kung wanay prev page
        // Disable Next Button Page or Hide kung wanay next page
        // Link On Click for Add Button
        // Optimize Pagination : Possibly Use Manual Pagination
        <div className="h-full">
            <div
                className={cn("rounded-[5px] border shadow-md overflow-hidden")}
            >
                <Table className="bg-baseGrey">
                    <TableHeader className={headerStyle}>
                        {table.getHeaderGroups().map((headerGroup: any) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header: any) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext()
                                                  )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row: any) => (
                                <TableRow
                                    className={rowStyle}
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && "selected"
                                    }
                                >
                                    {row.getVisibleCells().map((cell: any) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            {!disablePagination && (
                <div className="m-5 flex justify-end">
                    <div>
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious
                                        onClick={table.previousPage}
                                    />
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
                                <PaginationItem>
                                    <PaginationNext onClick={table.nextPage} />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                </div>
            )}
        </div>
    );
}

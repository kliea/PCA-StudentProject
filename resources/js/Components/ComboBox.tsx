"use client";

import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/Components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/Components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/Components/ui/popover";
import { useState } from "react";

export function EmployeeListComboBox({
    dataset,
    setSelectedEmployee,
    value,
    setValue,
}: {
    dataset: any;
    setSelectedEmployee: any;
    value: any;
    setValue: any;
}) {
    const [open, setOpen] = useState(false);
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[300px] justify-between"
                >
                    {value
                        ? cn(
                              dataset.find(
                                  (data: any) =>
                                      cn(data.first_name, data.last_name) ===
                                      value
                              )?.first_name,
                              dataset.find(
                                  (data: any) =>
                                      cn(data.first_name, data.last_name) ===
                                      value
                              )?.last_name
                          )
                        : "Select Employee..."}
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0">
                <Command>
                    <CommandInput
                        placeholder="Search Employee..."
                        className="h-5 my-2"
                    />
                    <CommandList>
                        <CommandEmpty>No data found.</CommandEmpty>
                        <CommandGroup>
                            {dataset.map((data: any) => (
                                <CommandItem
                                    key={data.employee_code}
                                    onSelect={(currentValue) => {
                                        setValue(
                                            currentValue === value
                                                ? ""
                                                : currentValue
                                        );
                                        setSelectedEmployee(
                                            currentValue === value
                                                ? undefined
                                                : data.employee_code
                                        );
                                        setOpen(false);
                                    }}
                                >
                                    {cn(data.first_name, data.last_name)}
                                    <Check
                                        className={cn(
                                            "ml-auto",
                                            value ===
                                                cn(
                                                    data.first_name,
                                                    data.last_name
                                                )
                                                ? "opacity-100"
                                                : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}

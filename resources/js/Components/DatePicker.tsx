"use client";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/Components/ui/button";
import { Calendar } from "@/Components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/Components/ui/popover";

export function DatePicker({
    date,
    setDate,
    disabled,
    dateTag,
}: {
    date: Date | undefined;
    setDate: any;
    disabled?: boolean;
    dateTag: string;
}) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    disabled={disabled}
                    variant={"outline"}
                    className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                    )}
                >
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(e) => setDate(dateTag, e)}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    );
}

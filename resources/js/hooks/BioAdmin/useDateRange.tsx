import { useState } from "react";
import { addDays } from "date-fns";
import { DateRange } from "react-day-picker";

export function useDateRange(initialRange: DateRange = { from: new Date(), to: addDays(new Date(), 20) }) {
    const [dateRange, setDateRange] = useState<DateRange | undefined>(initialRange);
    return { dateRange, setDateRange };
}
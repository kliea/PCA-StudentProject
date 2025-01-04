import { useState } from "react";

const useDatePicker = <TDatePicker extends Record<string, Date | undefined>>(
    initialState: TDatePicker = {} as TDatePicker
) => {
    const [dates, setState] = useState<TDatePicker>(initialState);

    function setDate(dateTag: keyof TDatePicker, date: Date | undefined) {
        setState((prev) => ({ ...prev, [dateTag]: date }));
    }

    return { dates, setDate };
};

export default useDatePicker;

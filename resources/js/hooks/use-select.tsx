import { useState } from "react";

const useSelect = <Tselect extends Record<string, string | undefined>>(
    initialState: Tselect = {} as Tselect
) => {
    const [selects, setState] = useState<Tselect>(initialState);

    function setSelected(selected: keyof Tselect, value: string | undefined) {
        setState((prev) => ({
            ...prev,
            [selected]: value,
        }));
    }
    return { selects, setSelected };
};

export default useSelect;

import { useForm } from "@inertiajs/react";
import { CircleAlert, CircleCheck } from "lucide-react";
import { FormEventHandler, useState } from "react";
import { toast } from "sonner";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import InputError from "../InputError";
import { RadioGroup, RadioGroupItem } from "@/Components/ui/radio-group";
import { Switch } from "../ui/switch";
import { Button } from "../ui/button";

export function AgencyShareStore({ openDialog }: { openDialog: any }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        agency_share_name: "",
        shorthand: "",
        amount: "",
        is_mandatory: false,
        deductionType: "",
        remittance_percent: "",
        ceiling_amount: "",
        compensation_links: ["Hello", "On"],
    });
    const changeDeductionType = (value: string) => {
        setData("deductionType", value);
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (data.deductionType === "Fixed") {
            (data.remittance_percent = "0"), (data.ceiling_amount = "0");
        } else {
            data.amount = "0";
        }

        post(route("store.governmentshare"), {
            onSuccess: () => {
                toast(
                    <div className=" text-green-600 flex-col">
                        <div className="flex items-center">
                            <CircleCheck className="h-4" />
                            <span className="text-base">Success!</span>
                        </div>
                        <div className="flex">
                            <span className="pl-6">
                                Agency Share {data.agency_share_name} has been
                                Added
                            </span>
                        </div>
                    </div>,
                    { duration: 2000 }
                );
                reset(
                    "agency_share_name",
                    "shorthand",
                    "amount",
                    "is_mandatory",
                    "remittance_percent",
                    "ceiling_amount"
                );
                openDialog(false);
            },
            onError: () => {
                console.log(errors);
                toast(
                    <div className=" text-red-600 flex-col">
                        <div className="flex items-center">
                            <CircleAlert className="h-4" />
                            <span className="text-base">Error!</span>
                        </div>
                        <div className="flex">
                            <span className="pl-6">Please try again...</span>
                        </div>
                    </div>,
                    {
                        duration: 2000,
                    }
                );
            },
        });
    };

    return (
        <div className="flex flex-col gap-3 ">
            <form onSubmit={submit}>
                <div>
                    <Label
                        htmlFor="agency_share_name"
                        className={errors.agency_share_name && "text-red-600"}
                    >
                        AGENCY SHARE NAME
                    </Label>
                    <Input
                        min={0}
                        id="agency_share_name"
                        type="text"
                        name="agency_share_name"
                        value={data.agency_share_name}
                        onChange={(e) =>
                            setData(
                                "agency_share_name",
                                e.target.value.toLocaleUpperCase()
                            )
                        }
                    />
                    <InputError
                        message={errors.agency_share_name}
                        className="mt-2"
                    />
                </div>

                <div>
                    <Label
                        htmlFor="shorthand"
                        className={errors.shorthand && "text-red-600"}
                    >
                        SHORTHAND
                    </Label>
                    <Input
                        min={0}
                        id="shorthand"
                        type="text"
                        name="shorthand"
                        value={data.shorthand}
                        onChange={(e) =>
                            setData(
                                "shorthand",
                                e.target.value.toLocaleUpperCase()
                            )
                        }
                    />
                    <InputError message={errors.shorthand} className="mt-2" />
                </div>

                <div>
                    <Label
                        htmlFor="deduction"
                        className={errors.shorthand && "text-red-600"}
                    >
                        Deduction Type
                    </Label>
                    <RadioGroup required onValueChange={changeDeductionType}>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Fixed" id="r1" />
                            <Label
                                htmlFor="r1"
                                className={errors.shorthand && "text-red-600"}
                            >
                                Fixed Amount
                            </Label>
                            <Input
                                disabled={
                                    data.deductionType == "Fixed" ? false : true
                                }
                                min={0}
                                id="amount"
                                type="number"
                                step="any"
                                name="amount"
                                value={data.amount}
                                onChange={(e) =>
                                    setData(
                                        "amount",
                                        e.target.value.toLocaleUpperCase()
                                    )
                                }
                            />
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Remittance" id="r2" />
                            <Label
                                htmlFor="r2"
                                className={errors.shorthand && "text-red-600"}
                            >
                                Remittance%
                            </Label>
                            <Input
                                disabled={
                                    data.deductionType == "Remittance"
                                        ? false
                                        : true
                                }
                                min={0}
                                id="remittance_percent"
                                type="number"
                                step="any"
                                name="remittance_percent"
                                value={data.remittance_percent}
                                onChange={(e) =>
                                    setData(
                                        "remittance_percent",
                                        e.target.value.toLocaleUpperCase()
                                    )
                                }
                            />

                            <Label
                                htmlFor="r2"
                                className={errors.shorthand && "text-red-600"}
                            >
                                Ceiling Amount
                            </Label>
                            <Input
                                disabled={
                                    data.deductionType == "Remittance"
                                        ? false
                                        : true
                                }
                                min={0}
                                id="ceiling_amount"
                                type="number"
                                step="any"
                                name="ceiling_amount"
                                value={data.ceiling_amount}
                                onChange={(e) =>
                                    setData(
                                        "ceiling_amount",
                                        e.target.value.toLocaleUpperCase()
                                    )
                                }
                            />
                        </div>
                    </RadioGroup>
                </div>

                <div className="flex items-center gap-3">
                    <Label htmlFor="has_mandatory_deduction">Mandatory</Label>
                    <Switch
                        id="has_mandatory_deduction"
                        onCheckedChange={() => {
                            data.is_mandatory = !data.is_mandatory;
                        }}
                    />
                </div>

                <div className="flex gap-3 justify-end pl-5">
                    <Button
                        variant="ghost"
                        className="mt-5 w-full max-w-32"
                        disabled={processing}
                        type="button"
                        onClick={() => openDialog(false)}
                    >
                        Cancel
                    </Button>

                    <Button
                        className="mt-5 w-full max-w-32"
                        disabled={processing}
                        type="submit"
                    >
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    );
}

// UPDATE FUNCTION

export function AgencyShareUpdate({
    RowData,
    setOpenDialog,
}: {
    RowData: any;
    setOpenDialog: any;
}) {
    const { data, setData, put, processing, errors, reset } = useForm({
        agency_share_name: RowData.agency_share_name,
        shorthand: RowData.shorthand,
        amount: RowData.amount,
        is_mandatory: RowData.is_mandatory,
        deductionType: RowData.deduction_type,
        remittance_percent: RowData.remittance_percent,
        ceiling_amount: RowData.ceiling_amount,
    });

    const changeDeductionType = (value: string) => {
        setData("deductionType", value);
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (data.deductionType === "Fixed") {
            (data.remittance_percent = "0"), (data.ceiling_amount = "0");
        } else {
            data.amount = "0";
        }

        put(route("update.governmentshare", RowData), {
            onSuccess: () => {
                toast(
                    <div className=" text-green-600 flex-col">
                        <div className="flex items-center">
                            <CircleCheck className="h-4" />
                            <span className="text-base">Success!</span>
                        </div>
                        <div className="flex">
                            <span className="pl-6">
                                Successfully Edited {data.agency_share_name}
                            </span>
                        </div>
                    </div>,
                    { duration: 2000 }
                );
                reset(
                    "agency_share_name",
                    "shorthand",
                    "amount",
                    "is_mandatory",
                    "remittance_percent",
                    "ceiling_amount"
                );
                setOpenDialog(false);
            },
            onError: () => {
                console.log(errors);
                toast(
                    <div className=" text-red-600 flex-col">
                        <div className="flex items-center">
                            <CircleAlert className="h-4" />
                            <span className="text-base">Error!</span>
                        </div>
                        <div className="flex">
                            <span className="pl-6">Please try again...</span>
                        </div>
                    </div>,
                    {
                        duration: 2000,
                    }
                );
            },
        });
    };

    return (
        <div className="flex flex-col gap-3 ">
            <form onSubmit={submit}>
                <div>
                    <Label
                        htmlFor="shorthand"
                        className={errors.shorthand && "text-red-600"}
                    >
                        SHORTHAND
                    </Label>
                    <Input
                        min={0}
                        id="shorthand"
                        type="text"
                        name="shorthand"
                        value={data.shorthand}
                        onChange={(e) =>
                            setData(
                                "shorthand",
                                e.target.value.toLocaleUpperCase()
                            )
                        }
                    />
                    <InputError message={errors.shorthand} className="mt-2" />
                </div>

                <div>
                    <Label
                        htmlFor="deduction"
                        className={errors.shorthand && "text-red-600"}
                    >
                        Deduction Type
                    </Label>
                    <RadioGroup required onValueChange={changeDeductionType}>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Fixed" id="r1" />
                            <Label htmlFor="r1">Fixed Amount</Label>
                            <Input
                                disabled={
                                    data.deductionType == "Fixed" ? false : true
                                }
                                min={0}
                                id="amount"
                                type="number"
                                step="any"
                                name="amount"
                                value={data.amount}
                                onChange={(e) =>
                                    setData(
                                        "amount",
                                        e.target.value.toLocaleUpperCase()
                                    )
                                }
                            />
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Remittance" id="r2" />
                            <Label htmlFor="r2">Remittance%</Label>
                            <Input
                                disabled={
                                    data.deductionType == "Remittance"
                                        ? false
                                        : true
                                }
                                min={0}
                                id="remittance_percent"
                                type="number"
                                step="any"
                                name="remittance_percent"
                                value={data.remittance_percent}
                                onChange={(e) =>
                                    setData(
                                        "remittance_percent",
                                        e.target.value.toLocaleUpperCase()
                                    )
                                }
                            />

                            <Label htmlFor="r2">Ceiling Amount</Label>
                            <Input
                                disabled={
                                    data.deductionType == "Remittance"
                                        ? false
                                        : true
                                }
                                min={0}
                                id="ceiling_amount"
                                type="number"
                                step="any"
                                name="ceiling_amount"
                                value={data.ceiling_amount}
                                onChange={(e) =>
                                    setData(
                                        "ceiling_amount",
                                        e.target.value.toLocaleUpperCase()
                                    )
                                }
                            />
                        </div>
                    </RadioGroup>

                    <InputError message={errors.shorthand} className="mt-2" />
                </div>

                <div className="flex items-center gap-3">
                    <Label htmlFor="has_mandatory_deduction">Mandatory</Label>
                    <Switch
                        id="has_mandatory_deduction"
                        onCheckedChange={() => {
                            data.is_mandatory = !data.is_mandatory;
                        }}
                    />
                </div>
                <div className="flex gap-3 justify-end pl-5">
                    <Button
                        className="mt-5 w-full max-w-32"
                        type="button"
                        onClick={() => setOpenDialog(false)}
                        variant="ghost"
                    >
                        Cancel
                    </Button>
                    <Button
                        className="mt-5 w-full max-w-32"
                        disabled={processing}
                        type="submit"
                    >
                        Confirm
                    </Button>
                </div>
            </form>
        </div>
    );
}

export function AgencyShareDelete({
    rowId,
    setOpenDialog,
}: {
    rowId: number;
    setOpenDialog: any;
}) {
    const { delete: destroy } = useForm();

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route("delete.governmentshare", rowId), {
            onSuccess: () => {
                toast(
                    <div className=" text-green-600 flex-col">
                        <div className="flex items-center">
                            <CircleCheck className="h-4" />
                            <span className="text-base">Success!</span>
                        </div>
                        <div className="flex">
                            <span className="pl-6">
                                Government Share Profile has been succesfully
                                deleted.
                            </span>
                        </div>
                    </div>,
                    { duration: 2000 }
                );
                setOpenDialog(false);
            },
            onError: () => {
                toast(
                    <div className=" text-red-600 flex-col">
                        <div className="flex items-center">
                            <CircleAlert className="h-4" />
                            <span className="text-base">Error!</span>
                        </div>
                        <div className="flex">
                            <span className="pl-6">Please try again...</span>
                        </div>
                    </div>,
                    {
                        duration: 2000,
                    }
                );
            },
        });
    };
    return (
        <>
            <form onSubmit={submit}>
                <div className="flex gap-3 w-full justify-end">
                    <Button
                        type="button"
                        onClick={() => setOpenDialog(false)}
                        variant="ghost"
                    >
                        Cancel
                    </Button>
                    <Button type="submit" variant="destructive">
                        Confirm
                    </Button>
                </div>
            </form>
        </>
    );
}

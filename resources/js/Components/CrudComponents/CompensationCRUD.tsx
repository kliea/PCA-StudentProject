import { useForm } from "@inertiajs/react";
import { CircleAlert, CircleCheck } from "lucide-react";
import { FormEventHandler } from "react";
import { toast } from "sonner";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import InputError from "../InputError";
import { Switch } from "../ui/switch";
import {
    Select,
    SelectContent,
    SelectTrigger,
    SelectValue,
    SelectItem,
} from "../ui/select";
import { Button } from "../ui/button";

export function CompensationStore({ openDialog }: { openDialog: any }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        compensation_name: "",
        shorthand: "",
        amount: "",
        is_taxable: false,
        is_fixed: false,
        compesation_variant: "",
        ceiling_amount: "",
    });

    const changeCompensationSettings = (value: string) => {
        setData("compesation_variant", value);
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("store.compensations"), {
            onSuccess: () => {
                toast(
                    <div className=" text-green-600 flex-col">
                        <div className="flex items-center">
                            <CircleCheck className="h-4" />
                            <span className="text-base">Success!</span>
                        </div>
                        <div className="flex">
                            <span className="pl-6">
                                Compensation Type {data.compensation_name} has
                                been added!
                            </span>
                        </div>
                    </div>,
                    { duration: 2000 }
                );
                reset(
                    "compensation_name",
                    "shorthand",
                    "amount",
                    "is_taxable",
                    "compesation_variant",
                    "ceiling_amount"
                );
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
        <div>
            <form onSubmit={submit} className="flex gap-3 flex-col">
                <div>
                    <div className="flex gap-3 pl-10">
                        <div>
                            <Label
                                htmlFor="compensation_name"
                                className={
                                    errors.compensation_name && "text-red-600"
                                }
                            >
                                COMPENSATION NAME
                            </Label>
                            <Input
                                id="compensation_name"
                                type="text"
                                name="compensation_name"
                                value={data.compensation_name}
                                onChange={(e) =>
                                    setData("compensation_name", e.target.value)
                                }
                            />
                            <InputError
                                message={errors.compensation_name}
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
                                id="shorthand"
                                type="text"
                                name="shorthand"
                                value={data.shorthand}
                                onChange={(e) =>
                                    setData("shorthand", e.target.value)
                                }
                            />
                            <InputError
                                message={errors.shorthand}
                                className="mt-2"
                            />
                        </div>
                    </div>
                </div>

                <div className="pl-10">
                    <Label
                        className={
                            (errors.compesation_variant || errors.amount) &&
                            "text-red-600"
                        }
                    >
                        COMPENSATION TYPE
                    </Label>
                    <div className="flex max-w-96">
                        <Select onValueChange={changeCompensationSettings}>
                            <SelectTrigger>
                                <SelectValue placeholder="SELECT COMPENSATION TYPE" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="UNDERTIME">
                                    BASIC PAY
                                </SelectItem>
                                <SelectItem value="FIXED AMOUNT">
                                    FIXED AMOUNT
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    {data.compesation_variant == "FIXED AMOUNT" && (
                        <div className="max-w-96">
                            <Label className={errors.amount && "text-red-600"}>
                                AMOUNT
                            </Label>
                            <Input
                                min={0}
                                id="amount"
                                type="number"
                                name="amount"
                                step="any"
                                value={data.amount}
                                onChange={(e) =>
                                    setData("amount", e.target.value)
                                }
                            />
                            <InputError
                                message={errors.amount}
                                className="mt-2"
                            />
                        </div>
                    )}
                </div>

                <div className="flex gap-3 pl-10">
                    <div>
                        <Label>COMPENSATION SETTINGS</Label>
                        <div className="flex items-center gap-3 pt-2">
                            <Label htmlFor="is_mandatory">TAXABLE</Label>
                            <Switch
                                id="is_mandatory"
                                onCheckedChange={() => {
                                    data.is_taxable = !data.is_taxable;
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex gap-3 justify-end pl-5">
                    <Button
                        className="mt-5 w-full max-w-32"
                        type="button"
                        onClick={() => openDialog(false)}
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

export function CompensationUpdate({
    RowData,
    setOpenDialog,
}: {
    RowData: any;
    setOpenDialog: any;
}) {
    return <div>{/* <form onSubmit={submit }></form> */}</div>;
}

export function CompensationDelete({
    rowId,
    setOpenDialog,
}: {
    rowId: number;
    setOpenDialog: any;
}) {
    const { delete: destroy } = useForm();

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route("delete.compensations", rowId), {
            onSuccess: () => {
                toast(
                    <div className=" text-green-600 flex-col">
                        <div className="flex items-center">
                            <CircleCheck className="h-4" />
                            <span className="text-base">Success!</span>
                        </div>
                        <div className="flex">
                            <span className="pl-6">
                                Compensation has been succesfully deleted.
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

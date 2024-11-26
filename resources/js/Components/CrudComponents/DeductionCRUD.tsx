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

export function DeductionStore({ openDialog }: { openDialog: any }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        deduction_name: "",
        shorthand: "",
        amount: "",
        is_mandatory: false,
        remittance_percent: "",
        ceiling_amount: "",
        deductionType: "",
    });

    const changeDeductionType = (value: string) => {
        setData("deductionType", value);
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("store.deduction"), {
            onSuccess: () => {
                toast(
                    <div className=" text-green-600 flex-col">
                        <div className="flex items-center">
                            <CircleCheck className="h-4" />
                            <span className="text-base">Success!</span>
                        </div>
                        <div className="flex">
                            <span className="pl-6">
                                Deduction Type {data.deduction_name} has been
                                added!
                            </span>
                        </div>
                    </div>,
                    { duration: 2000 }
                );
                reset(
                    "deduction_name",
                    "shorthand",
                    "amount",
                    "is_mandatory",
                    "remittance_percent",
                    "ceiling_amount",
                    "deductionType"
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
            <form onSubmit={submit}>
                <div>
                    <div className="flex gap-3 pl-10">
                        <div>
                            <Label
                                htmlFor="deduction_name"
                                className={
                                    errors.deduction_name && "text-red-600"
                                }
                            >
                                DEDUCTION NAME
                            </Label>
                            <Input
                                id="deduction_name"
                                type="text"
                                name="deduction_name"
                                value={data.deduction_name}
                                onChange={(e) =>
                                    setData("deduction_name", e.target.value)
                                }
                            />
                            <InputError
                                message={errors.deduction_name}
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
                            (errors.remittance_percent || errors.amount) &&
                            "text-red-600"
                        }
                    >
                        DEDUCTION TYPE
                    </Label>
                    <div className="flex max-w-96">
                        <Select onValueChange={changeDeductionType}>
                            <SelectTrigger>
                                <SelectValue placeholder="SELECT DEDUCTION TYPE" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="UNDERTIME">
                                    UNDERTIME
                                </SelectItem>
                                <SelectItem value="FIXED AMOUNT">
                                    FIXED AMOUNT
                                </SelectItem>
                                <SelectItem value="LOAN PAYMENT">
                                    LOAN PAYMENT
                                </SelectItem>
                                <SelectItem value="REMITTANCE">
                                    REMITTANCE %
                                </SelectItem>
                                <SelectItem value="TAX">TAX</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    {data.deductionType == "FIXED AMOUNT" && (
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

                    {data.deductionType == "REMITTANCE" && (
                        <div className="flex gap-3">
                            <div className="max-w-96">
                                <Label
                                    className={
                                        errors.remittance_percent &&
                                        "text-red-600"
                                    }
                                >
                                    REMITTANCE %
                                </Label>

                                <Input
                                    min={0}
                                    id="remittance"
                                    type="number"
                                    name="remittance"
                                    step="any"
                                    value={data.remittance_percent}
                                    onChange={(e) =>
                                        setData(
                                            "remittance_percent",
                                            e.target.value
                                        )
                                    }
                                />

                                <InputError
                                    message={errors.remittance_percent}
                                    className="mt-2"
                                />
                            </div>

                            <div className="max-w-96">
                                <Label
                                    className={
                                        errors.ceiling_amount && "text-red-600"
                                    }
                                >
                                    CIELING AMOUNT
                                </Label>
                                <Input
                                    min={0}
                                    id="ceiling_amount"
                                    type="number"
                                    name="ceiling_amount"
                                    step="any"
                                    value={data.ceiling_amount}
                                    onChange={(e) =>
                                        setData(
                                            "ceiling_amount",
                                            e.target.value
                                        )
                                    }
                                />
                                <InputError
                                    message={errors.ceiling_amount}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex gap-3 pl-10">
                    <div>
                        <Label>DEDUCTION SETTINGS</Label>
                        <div className="flex items-center gap-3 pt-2">
                            <Label htmlFor="is_mandatory">Mandatory</Label>
                            <Switch
                                id="is_mandatory"
                                onCheckedChange={() => {
                                    data.is_mandatory = !data.is_mandatory;
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

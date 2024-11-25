import { useForm } from "@inertiajs/react";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { CircleAlert, CircleCheck } from "lucide-react";
import { toast } from "sonner";
import { FormEventHandler, useState } from "react";
import InputError from "../InputError";
import { Input } from "../ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { Button } from "../ui/button";

export function AppointmentStore() {
    const { data, setData, post, processing, errors, reset } = useForm({
        appointment_type: "",
        has_mandatory_deduction: false,
        basic_pay_type: "",
        tax_type: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("store.ssl"), {
            onSuccess: () => {
                toast(
                    <div className=" text-green-600 flex-col">
                        <div className="flex items-center">
                            <CircleCheck className="h-4" />
                            <span className="text-base">Succes</span>
                        </div>
                        <div className="flex">
                            <span className="pl-6">JHK</span>
                        </div>
                    </div>,
                    { duration: 2000 }
                );
                reset(
                    "appointment_type",
                    "has_mandatory_deduction",
                    "basic_pay_type",
                    "tax_type"
                );
            },
            onError: () => {
                toast(
                    <div className=" text-red-600 flex-col">
                        <div className="flex items-center">
                            <CircleAlert className="h-4" />
                            <span className="text-base">Error</span>
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
    const changeTaxType = (value: string) => {
        data.tax_type = value;
    };
    const changeBasicPayType = (value: string) => {
        data.basic_pay_type = value;
    };
    return (
        <div>
            <form onSubmit={submit}>
                <div>
                    <Label
                        htmlFor="appointment_type"
                        className={errors.appointment_type && "text-red-600"}
                    >
                        Appointment Type Name
                    </Label>
                    <Input
                        min={0}
                        id="appointment_type"
                        type="text"
                        name="appointment_type"
                        value={data.appointment_type}
                        onChange={(e) =>
                            setData("appointment_type", e.target.value)
                        }
                    />
                    <InputError
                        message={errors.appointment_type}
                        className="mt-2"
                    />
                </div>

                <div>
                    <Label
                        htmlFor="basic_pay_type"
                        className={errors.basic_pay_type && "text-red-600"}
                    >
                        Basic Pay Type
                    </Label>
                    <Select onValueChange={changeBasicPayType}>
                        <SelectTrigger>
                            <SelectValue placeholder="SELECT BASIC PAY TYPE" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="BASIC SALARY-CASUAL">
                                BASIC SALARY-CASUAL
                            </SelectItem>
                            <SelectItem value="WAGES-JOB ORDER">
                                WAGES-JOB ORDER
                            </SelectItem>
                            <SelectItem value="BASIC SALARY-REGULAR">
                                BASIC SALARY-REGULAR
                            </SelectItem>
                        </SelectContent>
                    </Select>
                    <InputError
                        message={errors.basic_pay_type}
                        className="mt-2"
                    />
                </div>

                <div>
                    <Label
                        htmlFor="tax_type"
                        className={errors.tax_type && "text-red-600"}
                    >
                        Tax Type
                    </Label>

                    <Select onValueChange={changeTaxType}>
                        <SelectTrigger>
                            <SelectValue placeholder="SELECT TAX TYPE" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="WITHHOLDING TAX 1">
                                WITHHOLDING TAX 1
                            </SelectItem>
                            <SelectItem value="WITHHOLDING TAX 2">
                                WITHHOLDING TAX 2
                            </SelectItem>
                            <SelectItem value="BASIC SALARY-REGULAR">
                                WITHHOLDING TAX 3
                            </SelectItem>
                        </SelectContent>
                    </Select>
                    <InputError message={errors.tax_type} className="mt-2" />
                </div>

                <div className="flex items-center gap-3">
                    <Label htmlFor="has_mandatory_deduction">
                        Mandatory Deduction
                    </Label>
                    <Switch
                        id="has_mandatory_deduction"
                        onCheckedChange={() => {
                            data.has_mandatory_deduction =
                                !data.has_mandatory_deduction;
                        }}
                    />
                </div>
                <Button
                    className="mt-5 w-full"
                    disabled={processing}
                    type="submit"
                >
                    Submit
                </Button>

                <Button
                    className="mt-5 w-full"
                    disabled={processing}
                    onClick={() => reset()}
                >
                    Cancel
                </Button>
            </form>
        </div>
    );
}

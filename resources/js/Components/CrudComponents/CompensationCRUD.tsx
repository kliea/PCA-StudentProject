import { useForm } from "@inertiajs/react";
import { CircleAlert, CircleCheck } from "lucide-react";
import { FormEventHandler } from "react";
import { toast } from "sonner";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import InputError from "../InputError";
import { Switch } from "../ui/switch";

export function CompensationStore() {
    const { data, setData, post, processing, errors, reset } = useForm({
        compensation_name: "",
        shorthand: "",
        amount: "",
        is_taxable: false,
        is_fixed: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("store.appointment"), {
            onSuccess: () => {
                toast(
                    <div className=" text-green-600 flex-col">
                        <div className="flex items-center">
                            <CircleCheck className="h-4" />
                            <span className="text-base">Success!</span>
                        </div>
                        <div className="flex">
                            <span className="pl-6">JHK</span>
                        </div>
                    </div>,
                    { duration: 2000 }
                );
                reset(
                    "compensation_name",
                    "shorthand",
                    "amount",
                    "is_taxable",
                    "is_fixed"
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
                    <Label
                        htmlFor="compensation_name"
                        className={errors.compensation_name && "text-red-600"}
                    >
                        COMPENSATION NAME
                    </Label>
                    <Input
                        min={0}
                        id="compensation_name"
                        type="text"
                        name="compensation_name"
                        value={data.compensation_name}
                        onChange={(e) =>
                            setData(
                                "compensation_name",
                                e.target.value.toLocaleUpperCase()
                            )
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

                <div className="flex items-center gap-3">
                    <Label htmlFor="is_taxable">Taxable</Label>
                    <Switch
                        id="is_taxable"
                        onCheckedChange={() => {
                            data.is_taxable = !data.is_taxable;
                        }}
                    />
                </div>
            </form>
        </div>
    );
}

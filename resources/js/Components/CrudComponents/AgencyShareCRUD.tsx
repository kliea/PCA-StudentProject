import { useForm } from "@inertiajs/react";
import { CircleAlert, CircleCheck } from "lucide-react";
import { FormEventHandler } from "react";
import { toast } from "sonner";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import InputError from "../InputError";

const deductionTypes = ["Fixed", "Remmitance"];

export function AgencyShareStore() {
    const { data, setData, post, processing, errors, reset } = useForm({
        agency_share_name: "",
        shorthand: "",
        amount: "",
        is_mandatory: false,
        remittance_percent: "",
        ceiling_amount: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("store.appointment"), {
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
                    "agency_share_name",
                    "shorthand",
                    "amount",
                    "is_mandatory",
                    "remittance_percent",
                    "ceiling_amount"
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

    return (
        <div>
            <form onSubmit={submit}></form>
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
                        setData("shorthand", e.target.value.toLocaleUpperCase())
                    }
                />
                <InputError message={errors.shorthand} className="mt-2" />
            </div>
        </div>
    );
}

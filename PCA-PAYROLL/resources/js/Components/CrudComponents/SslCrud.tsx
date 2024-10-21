import { useForm, usePage } from "@inertiajs/react";
import { CircleAlert, CircleCheck } from "lucide-react";
import { FormEventHandler } from "react";
import { toast } from "sonner";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import InputError from "../InputError";
import { Button } from "../ui/button";

// Component for Storing SSL Data
export function SslStore() {
    const { data, setData, post, processing, errors, reset } = useForm({
        salary_grade: "",
        step1: "",
        step2: "",
        step3: "",
        step4: "",
        step5: "",
        step6: "",
        step7: "",
        step8: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("ssl.store"), {
            onFinish: () => {
                reset(
                    "salary_grade",
                    "step1",
                    "step2",
                    "step3",
                    "step4",
                    "step5",
                    "step6",
                    "step7",
                    "step8"
                );
            },
            onSuccess: () => {
                toast(
                    <div className=" text-green-600 flex-col">
                        <div className="flex items-center">
                            <CircleCheck className="h-4" />
                            <span className="text-base">Succes</span>
                        </div>
                        <div className="flex">
                            <span className="pl-6">
                                SSL {data.salary_grade} has been succesfully
                                added.
                            </span>
                        </div>
                    </div>,
                    { duration: 2000 }
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
                        duration: 20000000,
                    }
                );
            },
        });
    };
    console.log(usePage());
    return (
        <div>
            <form onSubmit={submit}>
                <div>
                    <Label htmlFor="salary_grade">Salary Grade</Label>
                    <Input
                        min={0}
                        id="salary_grade"
                        type="number"
                        name="salary_grade"
                        value={data.salary_grade}
                        onChange={(e) =>
                            setData("salary_grade", e.target.value)
                        }
                    />

                    <InputError
                        message={errors.salary_grade}
                        className="mt-2"
                    />
                </div>
                <div>
                    <Label htmlFor="step1">Step 1</Label>
                    <Input
                        min={0}
                        id="step1"
                        type="number"
                        name="step1"
                        value={data.step1}
                        onChange={(e) => setData("step1", e.target.value)}
                    />

                    <InputError message={errors.step1} className="mt-2" />
                </div>
                <div>
                    <Label htmlFor="step2">Step 2</Label>
                    <Input
                        min={0}
                        id="step2"
                        type="number"
                        name="step2"
                        value={data.step2}
                        onChange={(e) => setData("step2", e.target.value)}
                    />
                    <InputError message={errors.step2} className="mt-2" />
                </div>
                <div>
                    <Label htmlFor="step3">Step 3</Label>
                    <Input
                        min={0}
                        id="step3"
                        type="number"
                        name="step3"
                        value={data.step3}
                        onChange={(e) => setData("step3", e.target.value)}
                    />
                    <InputError message={errors.step3} className="mt-2" />
                </div>
                <div>
                    <Label htmlFor="step4">Step 4</Label>
                    <Input
                        min={0}
                        id="step4"
                        type="number"
                        name="step4"
                        value={data.step4}
                        onChange={(e) => setData("step4", e.target.value)}
                    />
                    <InputError message={errors.step4} className="mt-2" />
                </div>
                <div>
                    <Label htmlFor="step5">Step 5</Label>
                    <Input
                        min={0}
                        id="step5"
                        type="number"
                        name="step5"
                        value={data.step5}
                        onChange={(e) => setData("step5", e.target.value)}
                    />
                    <InputError message={errors.step5} className="mt-2" />
                </div>
                <div>
                    <Label htmlFor="step6">Step 6</Label>
                    <Input
                        min={0}
                        id="step6"
                        type="number"
                        name="step6"
                        value={data.step6}
                        onChange={(e) => setData("step6", e.target.value)}
                    />
                    <InputError message={errors.step6} className="mt-2" />
                </div>
                <div>
                    <Label htmlFor="step7">Step 7</Label>
                    <Input
                        min={0}
                        id="step7"
                        type="number"
                        name="step7"
                        value={data.step7}
                        onChange={(e) => setData("step7", e.target.value)}
                    />
                    <InputError message={errors.step7} className="mt-2" />
                </div>
                <div>
                    <Label htmlFor="step8">Step 8</Label>
                    <Input
                        min={0}
                        id="step8"
                        type="number"
                        name="step8"
                        value={data.step8}
                        onChange={(e) => setData("step8", e.target.value)}
                    />
                    <InputError message={errors.step8} className="mt-2" />
                </div>
                <Button className="mt-5 w-full" disabled={processing}>
                    Submit
                </Button>
            </form>
        </div>
    );
}

export function SslUpdate({ RowData }: { RowData: any }) {
    const { data, setData, put, processing, errors, reset } = useForm({
        salary_grade: RowData.salary_grade,
        step1: RowData.step1,
        step2: RowData.step2,
        step3: RowData.step3,
        step4: RowData.step4,
        step5: RowData.step5,
        step6: RowData.step6,
        step7: RowData.step7,
        step8: RowData.step8,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        put(route("ssl.store"), {
            onSuccess: () => {
                toast(
                    <div className=" text-green-600 flex-col">
                        <div className="flex items-center">
                            <CircleCheck className="h-4" />
                            <span className="text-base">Succes</span>
                        </div>
                        <div className="flex">
                            <span className="pl-6">
                                SSL {data.salary_grade} has been succesfully
                                edited.
                            </span>
                        </div>
                    </div>,
                    { duration: 2000 }
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
            <form onSubmit={submit}>
                <div>
                    <Label htmlFor="step1">Step 1</Label>
                    <Input
                        min={0}
                        id="step1"
                        type="number"
                        name="step1"
                        value={data.step1}
                        onChange={(e) => setData("step1", e.target.value)}
                    />

                    <InputError message={errors.step1} className="mt-2" />
                </div>
                <div>
                    <Label htmlFor="step2">Step 2</Label>
                    <Input
                        min={0}
                        id="step2"
                        type="number"
                        name="step2"
                        value={data.step2}
                        onChange={(e) => setData("step2", e.target.value)}
                    />
                    <InputError message={errors.step2} className="mt-2" />
                </div>
                <div>
                    <Label htmlFor="step3">Step 3</Label>
                    <Input
                        min={0}
                        id="step3"
                        type="number"
                        name="step3"
                        value={data.step3}
                        onChange={(e) => setData("step3", e.target.value)}
                    />
                    <InputError message={errors.step3} className="mt-2" />
                </div>
                <div>
                    <Label htmlFor="step4">Step 4</Label>
                    <Input
                        min={0}
                        id="step4"
                        type="number"
                        name="step4"
                        value={data.step4}
                        onChange={(e) => setData("step4", e.target.value)}
                    />
                    <InputError message={errors.step4} className="mt-2" />
                </div>
                <div>
                    <Label htmlFor="step5">Step 5</Label>
                    <Input
                        min={0}
                        id="step5"
                        type="number"
                        name="step5"
                        value={data.step5}
                        onChange={(e) => setData("step5", e.target.value)}
                    />
                    <InputError message={errors.step5} className="mt-2" />
                </div>
                <div>
                    <Label htmlFor="step6">Step 6</Label>
                    <Input
                        min={0}
                        id="step6"
                        type="number"
                        name="step6"
                        value={data.step6}
                        onChange={(e) => setData("step6", e.target.value)}
                    />
                    <InputError message={errors.step6} className="mt-2" />
                </div>
                <div>
                    <Label htmlFor="step7">Step 7</Label>
                    <Input
                        min={0}
                        id="step7"
                        type="number"
                        name="step7"
                        value={data.step7}
                        onChange={(e) => setData("step7", e.target.value)}
                    />
                    <InputError message={errors.step7} className="mt-2" />
                </div>
                <div>
                    <Label htmlFor="step8">Step 8</Label>
                    <Input
                        min={0}
                        id="step8"
                        type="number"
                        name="step8"
                        value={data.step8}
                        onChange={(e) => setData("step8", e.target.value)}
                    />
                    <InputError message={errors.step8} className="mt-2" />
                </div>
                <Button className="mt-5 w-full" disabled={processing}>
                    Submit
                </Button>
            </form>
        </div>
    );
}

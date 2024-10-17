import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import Data from "@/Components/Constants/data2.json";
import BodyContentLayout from "@/Layouts/BodyContentLayout";
import {
    ColumnDef,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
    getFilteredRowModel,
} from "@tanstack/react-table";
import { DataTable } from "@/Components/DataTable";
import { FormEventHandler, useState } from "react";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { PlusIcon } from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";

type sslProfile = {
    salaryGrade: string;
    step1: number;
    step2: number;
    step3: number;
    step4: number;
    step5: number;
    step6: number;
    step7: number;
    step8: number;
};

const columns: ColumnDef<sslProfile>[] = [
    {
        accessorKey: "salary_grade",
        header: "SG",
    },
    {
        accessorKey: "step1",
        header: "STEP 1",
    },
    {
        accessorKey: "step2",
        header: "STEP 2",
    },
    {
        accessorKey: "step3",
        header: "STEP 3",
    },
    {
        accessorKey: "step4",
        header: "STEP 4",
    },
    {
        accessorKey: "step5",
        header: "STEP 5",
    },
    {
        accessorKey: "step6",
        header: "STEP 6",
    },
    {
        accessorKey: "step7",
        header: "STEP 7",
    },
    {
        accessorKey: "step8",
        header: "STEP 8",
    },
];

function addSSL() {
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

        post(route("store.ssl"), {
            onSuccess: () => {
                alert("Success!");
            },
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
        });
    };

    console.log(data.salary_grade);

    return (
        <div>
            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="salary_grade" value="Salary Grade" />
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
                    <InputLabel htmlFor="step1" value="Step 1" />
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
                    <InputLabel htmlFor="step2" value="Step 2" />
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
                    <InputLabel htmlFor="step3" value="Step 3" />
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
                    <InputLabel htmlFor="step4" value="Step 4" />
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
                    <InputLabel htmlFor="step5" value="Step 5" />
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
                    <InputLabel htmlFor="step6" value="Step 6" />
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
                    <InputLabel htmlFor="step7" value="Step 7" />
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
                    <InputLabel htmlFor="step8" value="Step 8" />
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

const Ssl = () => {
    const pageData = usePage().props.data as sslProfile[];
    const data: sslProfile[] = pageData;
    console.log(data);
    console.log(Data);
    const [globalFilter, setGlobalFilter] = useState<any>([]);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
            pagination: {
                pageSize: 10,
            },
        },
        getFilteredRowModel: getFilteredRowModel(),
        globalFilterFn: "auto",
        state: {
            globalFilter,
        },
        onGlobalFilterChange: setGlobalFilter,
    });

    // const { data , setData, post, processing, errors, reset } = useForm({});
    return (
        <div>
            <AuthenticatedLayout
                header={
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        {usePage().component}
                    </h2>
                }
            >
                <Head title="SSL" />
                <BodyContentLayout headerName="SSL">
                    <div className="mb-5 flex gap-5">
                        <Input
                            type="search"
                            onChange={(e) => setGlobalFilter(e.target.value)}
                            className="w-1/4 rounded-[5px]"
                            placeholder="Search...."
                        />
                        <div>
                            <Dialog>
                                <DialogTrigger>
                                    <div className="flex p-2 bg-secondaryGreen text-white rounded-[5px ]">
                                        <PlusIcon className="mr-2 h-6 w-auto" />
                                        NEW SSL PROFILE
                                    </div>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>
                                            New SSL profile
                                        </DialogTitle>
                                        <DialogDescription>
                                            Add New SSL Profile
                                        </DialogDescription>
                                        <div className="mt-5">{addSSL()}</div>
                                        <div></div>
                                    </DialogHeader>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                    <DataTable
                        columns={columns}
                        rowStyle="odd:bg-white even:bg-transparent"
                        disablePagination={false}
                        table={table}
                    ></DataTable>
                </BodyContentLayout>
            </AuthenticatedLayout>
        </div>
    );
};

export default Ssl;

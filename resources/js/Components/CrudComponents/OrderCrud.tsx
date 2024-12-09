import { useForm, usePage } from "@inertiajs/react";
import { FormEventHandler, useState } from "react";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import InputError from "../InputError";
import { Button } from "../ui/button";

export function OrderStore({ openDialog }: { openDialog: any }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        startingdate:"",
        enddate:"",
        purposeoftravel:"",
        venue:"",
        organizedby:"",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

    };

    return (
        <div>
          
            <form onSubmit={submit}>
          
                <div className=" justify-center h-full bg-slate-200 rounded-[10px] p-5">
                      <h3 className="text-lg font-bold ">Name: Charls Mcklein P. Gulle</h3>
                      <p className="text-sm text-gray-600">Job Title: Manager</p>
                      <p className="text-sm text-gray-600">Employee ID: 221-01212</p>
                      <p className="text-sm text-gray-600">Leave Credits: 212</p>
                </div>
                        <div>
                            <Label
                            htmlFor="search"
                            className={errors.startingdate && "text-red-600"}
                            >
                            Find Employee
                            </Label>
                            <Input
                                type="text"
                                placeholder="Search Employee ID..."
                                className="rounded-[10px]"
                            />
                        </div>
                  <div>
                    <Label
                        htmlFor="startingdate"
                        className={errors.startingdate && "text-red-600"}
                    >
                        Starting Date
                    </Label>
                    <Input
                        min={0}
                        id="startingdate"
                        type="date"
                        name="startingdate"
                    />
                    <InputError message={errors.startingdate} className="mt-2" />
                </div>
                <div>
                    <Label
                        htmlFor="enddate"
                        className={errors.enddate && "text-red-600"}
                    >
                        End Date
                    </Label>
                    <Input
                        min={0}
                        id="enddate"
                        type="date"
                        name="enddate"
                    />
                    <InputError message={errors.enddate} className="mt-2" />
                </div>
                <div>
                    <Label
                        htmlFor="purposeoftravel"
                        className={errors.purposeoftravel && "text-red-600"}
                    >
                        Purpose of travel
                    </Label>
                    <Input
                        min={0}
                        id="purposeoftravel"
                        type="string"
                        name="purposeoftravel"
                    />
                    <InputError message={errors.venue} className="mt-2" />
                </div>
                <div>
                    <Label
                        htmlFor="venue"
                        className={errors.venue && "text-red-600"}
                    >
                        Venue/Destination
                    </Label>
                    <Input
                        min={0}
                        id="venue"
                        type="string"
                        name="venue"
                    />
                    <InputError message={errors.venue} className="mt-2" />
                </div>
                <div>
                    <Label
                        htmlFor="organizedby  "
                        className={errors.venue && "text-red-600"}
                    >
                        Organized by
                    </Label>
                    <Input
                        min={0}
                        id="organizedby"
                        type="string"
                        name="organizedby"
                    />
                    <InputError message={errors.organizedby} className="mt-2" />
                </div>
                <Button
                    className="mt-5 w-full"
                    type="submit">
                    Submit
                </Button>
                <Button
                    className="mt-5 w-full"
                    type="button"
                    onClick={() => openDialog(false)}>
                    Cancel
                </Button>
            </form>
        </div>
    );
}

export function OrderUpdate({ RowData }: { RowData: any }) {
  
}

export function OrderDelete() {
    
}

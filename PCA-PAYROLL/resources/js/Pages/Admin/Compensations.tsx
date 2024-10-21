import AuthenticatedLayoutAdmin from "@/Layouts/AuthenticatedLayoutAdmin";
import BodyContentLayout from "@/Layouts/BodyContentLayout";
import { Head, usePage } from "@inertiajs/react";
import { SslStore } from "@/Components/CrudComponents/SslCrud";

import { useState } from "react";
import DropdownDialog from "./DropdownDialog";
import { MoreHorizontal } from "lucide-react";

export default function Compensations() {
    const dialogs = [
        {
            tag: "1",
            name: "Edit",
            dialogtitle: "Dialog 1",
            dialogContent: <SslStore></SslStore>,
            style: "text-red-600",
        },
        {
            tag: "2",
            name: "Delete",
            dialogtitle: "Dialog 2",
            dialogContent: <>Hello Dialog2</>,
        },
    ];
    return (
        <AuthenticatedLayoutAdmin
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    {usePage().component}
                </h2>
            }
        >
            <Head title="Compensations" />

            <BodyContentLayout headerName={"Compensations"}>
                <DropdownDialog
                    dialogs={dialogs}
                    trigger={
                        <>
                            <section>
                                <MoreHorizontal className="h-4 w-4" />
                            </section>
                        </>
                    }
                ></DropdownDialog>
            </BodyContentLayout>
        </AuthenticatedLayoutAdmin>
    );
}

import AuthenticatedLayoutAdmin from "@/Layouts/AuthenticatedLayoutAdmin";
import BodyContentLayout from "@/Layouts/BodyContentLayout";
import { Head, usePage } from "@inertiajs/react";

export default function Dashboard() {
    return (
        <AuthenticatedLayoutAdmin
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    {usePage().component.split("/")[1]}
                </h2>
            }
        >
            <Head title="Dashboard" />
        </AuthenticatedLayoutAdmin>
    );
}

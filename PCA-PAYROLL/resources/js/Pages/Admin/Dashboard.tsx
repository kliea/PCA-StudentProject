import AuthenticatedLayoutAdmin from "@/Layouts/AuthenticatedLayoutAdmin";
import { Link } from "@inertiajs/react";
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
            <div>
                <Link href="/logout" method="post" as="button">
                    {" "}
                    Logout
                </Link>
            </div>
        </AuthenticatedLayoutAdmin>
    );
}

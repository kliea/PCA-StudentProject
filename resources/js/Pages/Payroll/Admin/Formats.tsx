import { Button } from "@/Components/ui/button";
import AuthenticatedLayoutAdmin from "@/Layouts/AuthenticatedLayout";

import { AdminLinks } from "@/lib/payrollData";

import { useForm } from "@inertiajs/react";

export default function Formats() {
    const { get } = useForm();

    const fetchLoans = () => {
        get(route("admin.loans"), {
            onSuccess: (page) => {
                console.log(page);
            },
        });
    };
    return (
        <AuthenticatedLayoutAdmin title="Test" links={AdminLinks}>
            <Button onClick={fetchLoans}>Fetch</Button>
        </AuthenticatedLayoutAdmin>
    );
}

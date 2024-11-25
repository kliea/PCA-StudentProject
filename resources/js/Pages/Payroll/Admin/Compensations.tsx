import AuthenticatedLayoutAdmin from "@/Layouts/AuthenticatedLayout";
import { usePage } from "@inertiajs/react";
import { AdminLinks } from "@/lib/payrollData";
import { AppointmentStore } from "@/Components/CrudComponents/AppointmentCRUD";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <AuthenticatedLayoutAdmin title="Dashboard" links={AdminLinks}>
            <AppointmentStore>
            </AppointmentStore>
        </AuthenticatedLayoutAdmin>
    );
}

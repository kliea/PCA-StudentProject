import AuthenticatedLayoutAdmin from "@/Layouts/AuthenticatedLayout";
import { usePage } from "@inertiajs/react";
import { AdminLinks } from "@/lib/payrollData";
import { AppointmentStore } from "@/Components/CrudComponents/AppointmentCRUD";

import Select from "@/Dialogs/Select"

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <AuthenticatedLayoutAdmin title="Dashboard" links={AdminLinks}>
            {/* <AppointmentStore>
            </AppointmentStore> */}
        <div className="w-full bg-gray-400 flex justify-center items h-full">
            <Select></Select>
        </div>
        </AuthenticatedLayoutAdmin>
    );
}

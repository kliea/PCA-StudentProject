import AuthenticatedLayoutAdmin from "@/Layouts/AuthenticatedLayout";
import { usePage } from "@inertiajs/react";
import { AdminLinks } from "@/lib/payrollData";
import { AgencyShareStore } from "@/Components/CrudComponents/AgencyShareCRUD";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <AuthenticatedLayoutAdmin title="Dashboard" links={AdminLinks}>
            <AgencyShareStore></AgencyShareStore>
        </AuthenticatedLayoutAdmin>
    );
}

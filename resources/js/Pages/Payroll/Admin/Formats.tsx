import { CompensationStore } from "@/Components/CrudComponents/CompensationCRUD";
import AuthenticatedLayoutAdmin from "@/Layouts/AuthenticatedLayout";

import { AdminLinks } from "@/lib/payrollData";

export default function Formats() {
    return (
        <AuthenticatedLayoutAdmin title="Test" links={AdminLinks}>
            <div>
                <CompensationStore></CompensationStore>
            </div>
        </AuthenticatedLayoutAdmin>
    );
}

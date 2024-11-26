import { DeductionStore } from "@/Components/CrudComponents/DeductionCRUD";
import AuthenticatedLayoutAdmin from "@/Layouts/AuthenticatedLayout";
import { EmployeeView } from "@/Components/CrudComponents/EmployeesCRUD";

import { AdminLinks } from "@/lib/payrollData";

export default function Formats() {
    return (
        <AuthenticatedLayoutAdmin title="Test" links={AdminLinks}>
            <div></div>
        </AuthenticatedLayoutAdmin>
    );
}

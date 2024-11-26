import AuthenticatedLayoutAdmin from "@/Layouts/AuthenticatedLayout";
import { EmployeeEdit } from "@/Components/CrudComponents/EmployeesCRUD";
import { AdminLinks } from "@/lib/payrollData";
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "@/Components/ui/context-menu";

export default function Formats() {
    return (
        <AuthenticatedLayoutAdmin title="Test" links={AdminLinks}>
            <div>{/* <EmployeeEdit></EmployeeEdit> */}</div>
        </AuthenticatedLayoutAdmin>
    );
}

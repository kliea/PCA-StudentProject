import AuthenticatedLayoutEmployees from "@/Layouts/AuthenticatedLayoutEmployees";
import { usePage } from "@inertiajs/react";
// import SelectEmployee from "@/Components/ui/selectEmployee";

import Select from "@/Dialogs/Select"

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <AuthenticatedLayoutEmployees>
            <div className="w-full bg-gray-400 flex justify-center items h-full">
                 <Select></Select>
            </div>
        </AuthenticatedLayoutEmployees>
    );
}

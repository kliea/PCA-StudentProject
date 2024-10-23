import AuthenticatedLayoutEmployees from "@/Layouts/AuthenticatedLayoutEmployees";
import { usePage } from "@inertiajs/react";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <AuthenticatedLayoutEmployees>
            <div className="w-full bg-red-400 flex justify-end h-full">
                asdsad
            </div>
        </AuthenticatedLayoutEmployees>
    );
}

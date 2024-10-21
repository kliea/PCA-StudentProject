import Dialog from "@/Components/Dialog";
import AuthenticatedLayoutAdmin from "@/Layouts/AuthenticatedLayoutAdmin";
import BodyContentLayout from "@/Layouts/BodyContentLayout";
import { Head, usePage } from "@inertiajs/react";
import { toast } from "sonner";

export default function Compensations() {
    return (
        <AuthenticatedLayoutAdmin
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    {usePage().component}
                </h2>
            }
        >
            <Head title="Compensations" />

            <BodyContentLayout headerName={"Compensations"}>
                <button
                    className="bg-red-400"
                    onClick={() => toast(<>hello</>)}
                >
                    click
                </button>
                <Dialog trigger={<>Open Dialog</>} title="Hello">
                    <h1>Hola</h1>
                </Dialog>
            </BodyContentLayout>
        </AuthenticatedLayoutAdmin>
    );
}

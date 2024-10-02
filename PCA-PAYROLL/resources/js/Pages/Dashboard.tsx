import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="outline w-full h-screen overflow-hidden absolute top-0 left-0 pl-[380px] pt-[100px]">
            <Link href={route('logout')} method="post" as="button">Button</Link>

            </div>
        </AuthenticatedLayout>
    );
}


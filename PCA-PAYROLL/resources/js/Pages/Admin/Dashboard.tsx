import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import StatusCard from '@/Components/StatusCard';
import { DatePickerWithRange } from '@/Components/DateRangePicker';

export default function Dashboard() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    {usePage().component}
                </h2>
            }
        >
            <Head title="Dashboard"/>

            <div className="w-full h-[calc(100vh-120px)] overflow-hidden">
                <div>
                    <DatePickerWithRange></DatePickerWithRange>
                </div>
                <div className='grid grid-cols-4 gap-5 p-5 bg-white rounded-[3px] shadow-md mt-5'>
                    <StatusCard />
                    <StatusCard />
                    <StatusCard />
                    <StatusCard />
                </div>

                <div className='bg-white w-full h-full shadow-md'>
                    <div className='mt-5 bg-secondaryGreen p-3 text-white font-bold text-xl w-screen flex rounded-[3px]'>
                        <h1>Header Name:</h1>
                    </div>
                    <div>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}


import AuthenticatedLayoutAdmin from "@/Layouts/AuthenticatedLayoutAdmin";
import { Head, usePage } from "@inertiajs/react";
import StatusCard from "@/Components/StatusCard";
import {
    Banknote,
    CreditCard,
    MinusCircle,
    PhilippinePeso,
    TrendingDown,
} from "lucide-react";

export default function Dashboard() {
    return (
        <AuthenticatedLayoutAdmin
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    {usePage().component.split("/")[1]}
                </h2>
            }
        >
            <Head title="Dashboard" />
            <div className="lg:bg-white lg:shadow-md w-full h-full rounded-[10px] overflow-x-auto lg:block lg:overflow-hidden">
                <div className="flex gap-5 justify-between py-2 sm:p-5">
                    {/* Status Card Props need Backend Data Retrieval */}
                    {/* Need pag adjustments sa design sa Mobile view */}
                    <StatusCard
                        cardPercent={95.6}
                        cardPeriod="Month"
                        cardQuantity={99999}
                        cardTitle="Payroll Cost"
                        Icon={PhilippinePeso}
                    />
                    <StatusCard
                        cardPercent={95.6}
                        cardPeriod="Month"
                        cardQuantity={99999}
                        cardTitle="Statury Pay"
                        Icon={Banknote}
                    />
                    <StatusCard
                        cardPercent={95.6}
                        cardPeriod="Month"
                        cardQuantity={99999}
                        cardTitle="Deductions"
                        Icon={TrendingDown}
                    />
                    <StatusCard
                        cardPercent={95.6}
                        cardPeriod="Month"
                        cardQuantity={99999}
                        cardTitle="Net Salary"
                        Icon={CreditCard}
                    />
                </div>
            </div>
        </AuthenticatedLayoutAdmin>
    );
}

import { PropsWithChildren, ReactNode } from "react";
import {
    Sidenavbar,
    Sidenavbargroup,
    Sidenavbarlinks,
} from "@/Components/Sidenavbar";
import {
    FlagIcon,
    LayoutDashboard,
    PhilippinePeso,
    HandCoins,
    UserCog,
    Wallet,
    TrendingDown,
    HeartHandshake,
    Wrench,
    Shield,
    Fingerprint,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { usePage } from "@inertiajs/react";
import { LucideProps } from "lucide-react";

export default function Authenticated({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const currentPage = usePage();

    interface Item {
        label: string;
        url: string;
        icon: React.ComponentType<LucideProps>;
    }

    interface link {
        title: string;
        items: Item[];
    }

    const links: link[] = [
        {
            title: "PAYROLL SYSTEM",
            items: [
                { label: "Dashboard", url: "dashboard", icon: LayoutDashboard },
                { label: "Payrolls", url: "dashboard", icon: PhilippinePeso },
            ],
        },

        {
            title: "REQUESTS",
            items: [{ label: "Loans", url: "dashboard", icon: HandCoins }],
        },

        {
            title: "CONFIGURATION",
            items: [
                { label: "Employees", url: "salary", icon: UserCog },
                { label: "Compensations", url: "benefits", icon: Wallet },
                { label: "Deductions", url: "loans", icon: TrendingDown },
                {
                    label: "Government Share",
                    url: "loans",
                    icon: HeartHandshake,
                },
                { label: "Appointment", url: "loans", icon: Wrench },
                { label: "SSL", url: "loans", icon: Shield },
                { label: "Format", url: "loans", icon: Fingerprint },
            ],
        },
    ];

    return (
        <div className="min-h-screen bg-gray-100">
            {header && (
                <header className="bg-white shadow">
                    <Sidenavbar
                        className={cn(" items-center py-5 px-10 w-[350px]")}
                    >
                        <img src="https://placehold.co/280x100" alt="LOGO" />
                        {links.map((link) => (
                            <Sidenavbargroup
                                key={link.title}
                                title={link.title}
                                className="mt-7"
                            >
                                <Sidenavbarlinks
                                    links={link.items}
                                    activePage={currentPage.url}
                                />
                            </Sidenavbargroup>
                        ))}
                    </Sidenavbar>
                    <div
                        className={cn(
                            "ml-[350px] max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex"
                        )}
                    >
                        {header}
                    </div>
                </header>
            )}
            <main className={cn("ml-[350px] px-10 pt-5")}>{children}</main>
        </div>
    );
}

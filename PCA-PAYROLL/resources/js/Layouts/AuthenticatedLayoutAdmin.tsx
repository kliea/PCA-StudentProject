import { PropsWithChildren, ReactNode } from "react";
import {
    Sidenavbar,
    Sidenavbargroup,
    Sidenavbarlinks,
} from "@/Components/Sidenavbar";
import {
    History,
    LayoutDashboard,
    ListCollapse,
    Package,
    Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { usePage } from "@inertiajs/react";
import { LucideProps } from "lucide-react";

export default function Authenticated({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const currentPage = usePage();

    console.log(currentPage);

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
                {
                    label: "Dashboard",
                    url: "admin.dashboard",
                    icon: LayoutDashboard,
                },
                {
                    label: "Payrolls",
                    url: "admin.payrolls",
                    icon: LayoutDashboard,
                },
            ],
        },
        {
            title: "REQUESTS",
            items: [{ label: "Loans", url: "admin.loans", icon: Package }],
        },
        {
            title: "CONFIGURATIONS",
            items: [
                { label: "Employees", url: "admin.dashboard", icon: History },
                {
                    label: "Compensations",
                    url: "admin.dashboard",
                    icon: Users,
                },
                {
                    label: "Deductions",
                    url: "admin.dashboard",
                    icon: Users,
                },
                {
                    label: "Government Share",
                    url: "admin.dashboard",
                    icon: Users,
                },
                {
                    label: "Appointment",
                    url: "admin.dashboard",
                    icon: Users,
                },
                {
                    label: "SSL",
                    url: "admin.dashboard",
                    icon: Users,
                },
                {
                    label: "Format",
                    url: "admin.dashboard",
                    icon: Users,
                },
            ],
        },
    ];

    return (
        <div className="min-h-screen bg-gray-100">
            {header && (
                <header className="bg-white shadow">
                    <nav>
                        <Sidenavbar
                            className="w-16 sm:w-64"
                            logoSrc="https://placehold.co/200x100"
                        >
                            {links.map((link) => (
                                <Sidenavbargroup
                                    className="mt-7"
                                    key={link.title}
                                >
                                    <h1 className="text-white font-bold text-xl hidden sm:block">
                                        {link.title}
                                    </h1>
                                    <Sidenavbarlinks
                                        links={link.items}
                                        activePage={currentPage.url}
                                    />
                                </Sidenavbargroup>
                            ))}
                        </Sidenavbar>
                    </nav>
                    <div
                        className={cn(
                            "ml-[350px] max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex gap-3 z-40"
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

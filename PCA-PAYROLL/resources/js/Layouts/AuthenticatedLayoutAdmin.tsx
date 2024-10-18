import { PropsWithChildren, ReactNode, useState } from "react";
import {
    Sidenavbar,
    Sidenavbargroup,
    Sidenavbarlinks,
} from "@/Components/Sidenavbar";
import {
    History,
    LayoutDashboard,
    Package,
    PanelLeft,
    Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { usePage } from "@inertiajs/react";
import { LucideProps } from "lucide-react";
import { Separator } from "@/Components/ui/separator";

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

    // Links for the Navigation Bar : title attribute kay para sa mga header sa each navigation group
    // Items kay para sa mga links na sa nav bar
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

    // State para sa collapsabe navbar

    const [navStatus, setnavStatus] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100">
            {header && (
                <header className="bg-white shadow">
                    <nav>
                        <Sidenavbar
                            className={cn(
                                "transition-all duration-100",
                                navStatus ? "w-64 sm:w-16" : "w-16 sm:w-64"
                            )}
                        >
                            <img src="#" alt="LOGO" className="p-5" />

                            <div className="overflow-y-auto overflow-x-hidden pl-5">
                                {/* Diri mag generate ug mga groups sa navagation bar. Mao ni nga map mag generate sa mga title*/}
                                {links.map((link) => (
                                    <Sidenavbargroup
                                        className="mt-7"
                                        key={link.title}
                                    >
                                        <h1
                                            className={cn(
                                                "text-white font-bold text-xl hidden sm:block",
                                                navStatus
                                                    ? "block sm:hidden"
                                                    : "hidden sm:block"
                                            )}
                                        >
                                            {link.title}
                                        </h1>

                                        {/* Diri nga component mag generate ug mga links para sa navbar .  walay className nga props kay wanako na apilan sulod nalng sa component*/}
                                        <Sidenavbarlinks
                                            navStatus={navStatus}
                                            links={link.items}
                                            activePage={currentPage.url}
                                        />
                                    </Sidenavbargroup>
                                ))}
                            </div>
                        </Sidenavbar>
                    </nav>

                    {/* Mao ni ang pag generate sa header */}
                    <div
                        className={cn(
                            " transition-all duration-200 ease-in-out max-w-7xl py-6 px-6 sm:px-6 flex gap-3 z-40",
                            navStatus ? "ml-64 sm:ml-16" : "ml-16 sm:ml-64"
                        )}
                    >
                        <div className="flex items-center gap-3">
                            <PanelLeft
                                onClick={() => setnavStatus(!navStatus)}
                            />
                            <Separator orientation="vertical" />
                            <span
                                className={
                                    navStatus ? "hidden md:block" : "block"
                                }
                            >
                                {header}
                            </span>
                        </div>
                    </div>
                </header>
            )}
            <main
                className={cn(
                    "transition-all duration-100 px-10 pt-5",
                    navStatus ? "sm:ml-16" : "ml-16 sm:ml-64"
                )}
            >
                {children}
            </main>
        </div>
    );
}

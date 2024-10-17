import { PropsWithChildren, ReactNode, useState } from "react";
import {
    Sidenavbar,
    Sidenavbargroup,
    Sidenavbarlinks,
} from "@/Components/Sidenavbar";
import {
    FlagIcon,
    History,
    LayoutDashboard,
    ListCollapse,
    Package,
    ThumbsUp,
    TrendingDown,
    TrendingUp,
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
        // {title: 'PAYROLL SYSTEM',
        //     items : [
        //         {label: 'Dashboard', url: 'admin.dashboard', icon: LayoutDashboard}
        //     ]},
        // {title: 'EMPLOYEES',
        //     items : [
        //         {label: 'Salary', url: 'admin.salary' , icon: Package},
        //         {label: 'Benefits', url: 'admin.benefits' , icon: ThumbsUp},
        //         {label: 'Loans', url: 'admin.loans' , icon: FlagIcon},
        //     ]},
        // {title: 'MANAGEMENT',
        //     items : [
        //         {label: 'Records', url: 'admin.records' , icon: History},
        //         {label: 'Designations', url: 'admin.designations' , icon: Users},
        //         {label: 'Compensations', url: 'admin.compensations' , icon: TrendingUp},
        //         {label: 'Deductions', url: 'admin.deductions' , icon: TrendingDown},
        //     ]},
    ];

    return (
        <div className="min-h-screen bg-gray-100">
            {header && (
                <header className="bg-white shadow">
                    <nav>
                        <Sidenavbar
                            className={cn("flex flex-col items-center p-5")}
                        >
                            <img
                                src="https://placehold.co/280x100"
                                alt="LOGO"
                            />
                            {links.map((link) => (
                                <Sidenavbargroup
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
                    </nav>
                    <div
                        className={cn(
                            "ml-[350px] max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex gap-3 z-40"
                        )}
                    >
                        <ListCollapse
                            onClick={() => console.log("hello")}
                        ></ListCollapse>
                        {header}
                    </div>
                </header>
            )}
            <main className={cn("ml-[350px] px-10 pt-5")}>{children}</main>
        </div>
    );
}

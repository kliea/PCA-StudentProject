import { cn } from "@/lib/utils";
import { Separator } from "./ui/separator";
import { Link } from "@inertiajs/react";
import NavLink from "./NavLink";
import { LucideProps } from "lucide-react";

interface Link {
    label: string;
    url: string;
    icon: React.ComponentType<LucideProps>;
}

interface SidenavbarlinksProps {
    links: Link[];
    activePage?: string;
    navStatus: boolean;
}

export function Sidenavbarlinks({
    links,
    activePage,
    navStatus,
}: SidenavbarlinksProps) {
    return (
        <>
            <ul className="flex flex-col gap-3">
                {links.map((link) => (
                    <li key={link.label}>
                        <div
                            className={cn(
                                "hover:border-l-[1px]",
                                navStatus ? "px-3 sm:px-0 " : "px-0 sm:px-3"
                            )}
                        >
                            <NavLink
                                href={route(link.url)}
                                active={activePage === "/" + link.url}
                            >
                                <link.icon />
                                <span
                                    className={cn(
                                        "px-2 text-base",
                                        navStatus
                                            ? "block sm:hidden"
                                            : "hidden sm:block"
                                    )}
                                >
                                    {link.label}
                                </span>
                            </NavLink>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    );
}

export function Sidenavbargroup({
    className,
    children,
}: {
    className?: String;
    children: React.ReactNode;
}) {
    return (
        <>
            <section className={cn("w-full flex flex-col gap-4 ", className)}>
                {children}
                <div className="pr-6">
                    <Separator></Separator>
                </div>
            </section>
        </>
    );
}

export function Sidenavbar({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <aside
            className={cn(
                "fixed bg-baseGreen h-full flex flex-col z-50",
                className
            )}
        >
            {children}
        </aside>
    );
}

import { cn } from "@/lib/utils";
import { Separator } from "./ui/separator";
import { Link } from "@inertiajs/react";
import NavLink from "./NavLink";
import { ListCollapse, LucideProps } from "lucide-react";
import { useState } from "react";

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
            className={cn("fixed bg-baseGreen h-full flex flex-col", className)}
        >
            {children}
        </aside>
    );
}

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
}

export function Sidenavbarlinks({ links, activePage }: SidenavbarlinksProps) {
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
                            <span className="px-2 text-base hidden sm:block">
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
                <Separator />
            </section>
        </>
    );
}

export function Sidenavbar({
    children,
    className,
    logoSrc,
}: {
    children: React.ReactNode;
    className?: string;
    logoSrc: string;
}) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <aside
            className={cn(
                "fixed bg-baseGreen h-full flex flex-col items-center p-5",
                className
            )}
        >
            <img src={logoSrc} alt="LOGO" className="hidden sm:block" />
            <ListCollapse color="white" onClick={() => setIsOpen(!isOpen)} />

            {children}
        </aside>
    );
}

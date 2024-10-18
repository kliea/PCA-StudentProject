import { InertiaLinkProps, Link } from "@inertiajs/react";

export default function NavLink({
    active = false,
    className = "",
    children,
    ...props
}: InertiaLinkProps & { active: boolean }) {
    return (
        <Link
            {...props}
            className={
                "inline-flex items-center px-0 h-10 pt-1 text-xl font-medium leading-5 transition duration-150 ease-in-out focus:outline-none " +
                (active ? "border-l-4 text-white" : "text-white ") +
                className
            }
        >
            {children}
        </Link>
    );
}

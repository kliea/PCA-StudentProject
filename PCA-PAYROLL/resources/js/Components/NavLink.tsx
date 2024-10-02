import { InertiaLinkProps, Link } from '@inertiajs/react';

export default function NavLink({
    active = false,
    className = '',
    children,
    ...props
}: InertiaLinkProps & { active: boolean }) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center h-10 px-3 pt-1 text-xl font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? 'border-l-4 text-white'
                    : 'text-white hover:border-l-[1px]') +
                className
            }
        >
            {children}
        </Link>
    );
}

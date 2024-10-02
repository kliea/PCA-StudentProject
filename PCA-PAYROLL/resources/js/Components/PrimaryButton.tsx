import { ButtonHTMLAttributes } from 'react';

export default function PrimaryButton({
    className = '',
    disabled,
    children,
    ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center rounded-md border border-transparent bg-baseGreen px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-white hover:text-black hover:outline-1 hover:outline hover:outline-baseGreen focus:text-white focus:bg-baseGreen focus:outline-none focus:ring-2 focus:ring-baseGreen focus:ring-offset-2 active:bg-baseGreen ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}

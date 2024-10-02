import { PropsWithChildren, ReactNode, useState } from 'react';
import {Sidenavbar, Sidenavbargroup, Sidenavbarlinks} from '@/Components/Sidenavbar';
import { ListCollapse } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Authenticated({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    // const user = usePage().props.auth.user;

    const links = [
        { label: 'Home', url: '/' },
        { label: 'About', url: '/about' },
        { label: 'Contact', url: '/contact' },
    ];
    return (
        <div className="min-h-screen bg-gray-100">
            {header && (
                <header className="bg-white shadow">
                    <Sidenavbar className={cn("flex flex-col items-center p-5")}>
                        <img src="https://placehold.co/280x100" alt="LOGO" />
                        <Sidenavbargroup title="PAYROLL SYSTEM" className="mt-7">
                            <Sidenavbarlinks links={links}/>
                        </Sidenavbargroup>
                    </ Sidenavbar >
                    <div className={cn("ml-[350px] max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex gap-3")}>
                        <ListCollapse onClick={()=>console.log()}></ListCollapse>
                        {header}
                    </div>
                </header>
            )}
            <main className={cn("ml-[350px] px-10 pt-5 ")}>{children}</main>
        </div>
    );
}

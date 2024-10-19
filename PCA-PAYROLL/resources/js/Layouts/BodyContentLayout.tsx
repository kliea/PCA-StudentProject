import { cn } from "@/lib/utils";

export default function ({
    headerName,
    children,
    className,
}: {
    headerName: string;
    children?: React.ReactNode;
    className?: string;
}) {
    return (
        <div
            className={cn(
                "relative bg-white rounded-[10px] overflow-hidden",
                className
            )}
        >
            <div className="w-full h-[44px] bg-secondaryGreen flex items-center px-5">
                <h1 className="text-white font-bold">{headerName}</h1>
            </div>
            <div className="p-5 flex flex-col">{children}</div>
        </div>
    );
}

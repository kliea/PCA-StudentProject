import { cn } from "@/lib/utils";

export default function ({
    headerName,
    children,
    className,
    contentStyle,
}: {
    headerName: string;
    children?: React.ReactNode;
    className?: string;
    contentStyle?: string;
}) {
    return (
        <div className={cn("relative bg-white rounded-pca", className)}>
            <div className="w-full h-[44px] bg-secondaryGreen flex items-center px-5 rounded-t-[10px]">
                <h1 className="text-white font-bold">{headerName}</h1>
            </div>
            <div className={cn("p-5 flex flex-col", contentStyle)}>
                {children}
            </div>
        </div>
    );
}

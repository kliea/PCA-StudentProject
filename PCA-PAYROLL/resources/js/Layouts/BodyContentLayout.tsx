export default function ({
    headerName,
    children,
}: {
    headerName: string;
    children?: React.ReactNode;
}) {
    return (
        <div className="relative h-full bg-white rounded-t-[3px] overflow-hidden">
            <div className="w-full h-[44px] bg-secondaryGreen flex items-center px-5">
                <h1 className="text-white font-bold">{headerName}</h1>
            </div>
            <div className="p-5 h-[785px] flex flex-col">{children}</div>
        </div>
    );
}

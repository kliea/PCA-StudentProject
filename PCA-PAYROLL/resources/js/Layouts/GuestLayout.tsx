import { PropsWithChildren } from "react";

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-baseGreen pt-6 justify-center overflow-clip">
            <div className="m-6 overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:min-w-96 rounded-lg">
                {children}
            </div>
        </div>
    );
}

import { PropsWithChildren } from "react";


export default function Payroll_LoginLayout({ children }: PropsWithChildren) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-baseGreen justify-center overflow-clip">
            <div className="drop-shadow-customized rounded-lg overflow-hidden sm:max-w-md sm:min-w-96">
                <div>
                    <div className="w-full h-16 bg-baseGreen flex justify-center items-center ">
                        <h1 className="font-extrabold text-2xl font-poppins text-white">PAYROLL SYSTEM</h1>
                    </div>
                </div>
                <div className=" bg-white    ">
                    <div className="px-6 pb-2 ">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}

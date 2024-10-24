import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import { ReactNode } from "react";

{
    /* Dialog Component Usage : 
                                props : 
                                trigger (React Node type) required
                                title string optional
                                description string optional
                                children react node optional
                                  */
}

export default function ({
    children,
    title,
    trigger,
    description,
    open,
    openDialog,
}: {
    children?: ReactNode;
    title?: string;
    trigger?: ReactNode;
    description?: string;
    open?: boolean;
    openDialog?: any;
}) {
    return (
        <Dialog  open={open} onOpenChange={openDialog}>
            <DialogTrigger>{trigger}</DialogTrigger>
            <DialogContent className="max-w-fit bg-secondaryGreen overflow-hidden  ">
                <DialogHeader className="">
                    <DialogTitle className=" text-white h-[40px] pt-2 flex items-center px-6 ">{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                    {children}
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}

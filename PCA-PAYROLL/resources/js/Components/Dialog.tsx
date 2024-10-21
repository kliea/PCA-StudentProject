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
}: {
    children?: ReactNode;
    title?: string;
    trigger: ReactNode;
    description?: string;
}) {
    return (
        <Dialog>
            <DialogTrigger>{trigger}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    {title && <DialogTitle>{title}</DialogTitle>}
                    {description && (
                        <DialogDescription>{description}</DialogDescription>
                    )}
                    {children}
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}

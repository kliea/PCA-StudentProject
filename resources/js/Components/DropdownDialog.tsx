import Dialog from "@/Components/Dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { ReactNode, useState } from "react";

/*
USAGE : 

Sa Component nga mu gamit ani kinahanglan ug:: 

1.) dialogs: list of objects nga naay

TODO: Mag Add ug TYPE para naay guide ang pag buhat sa items

tag : required -> string
name : required -> string
dialogtitle : optional -> string
dialogContent : required  -> ReactNode or Html
style : optional -> string -> tailwind format . Walay outformatting . Antos Antos nalng

2. trigger : ReactNode

*/

const DropdownDialog = ({
    dialogs,
    trigger,
}: {
    dialogs: any;
    trigger: ReactNode;
}) => {
    const [openDialog, setOpenDialog] = useState<string | null>(null);
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger>{trigger}</DropdownMenuTrigger>
                <DropdownMenuContent >
                    {dialogs.map((dialog: any) => (
                        <DropdownMenuItem
                            key={dialog.tag}
                            onSelect={() => setOpenDialog(dialog.tag)}
                            className={dialog.style}
                        >
                            {dialog.name}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
            {dialogs.map((dialog: any) => (
                <Dialog
                    key={dialog.tag}
                    title={dialog.dialogtitle}
                    open={openDialog === dialog.tag}
                    openDialog={(e: any) => setOpenDialog(null)}
                >
                    {dialog.dialogContent}
                </Dialog>
            ))}
        </>
    );
};

export default DropdownDialog;

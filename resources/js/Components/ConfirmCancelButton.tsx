import { Button } from "./ui/button";

export default function ({
    setOpenDialog,
    processing,
}: {
    setOpenDialog: any;
    processing: any;
}) {
    return (
        <div>
            <div className="flex gap-3 justify-end pl-5">
                <Button
                    className="mt-5 w-full max-w-32"
                    type="button"
                    onClick={() => setOpenDialog(false)}
                    variant="ghost"
                >
                    Cancel
                </Button>
                <Button
                    className="mt-5 w-full max-w-32"
                    disabled={processing}
                    type="submit"
                >
                    Confirm
                </Button>
            </div>
        </div>
    );
}

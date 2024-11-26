import { useForm } from "@inertiajs/react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export function EmployeeView({
    RowData,
    setOpenDialog,
}: {
    RowData: any;
    setOpenDialog: any;
})
{

    const {data , setData , processing , put , reset , errors } = useForm({
        
    })
    return (
        <div>
            <form action="">
                <div className="flex gap-3">
                    <div className="w-full">
                        <Label>LAST NAME</Label>
                        <Input disabled></Input>
                    </div>

                    <div className="w-full">
                        <Label>FIRST NAME</Label>
                        <Input disabled></Input>
                    </div>

                    <div className="w-full">
                        <Label>MIDDLE NAME</Label>
                        <Input disabled></Input>
                    </div>

                    <div className="w-full">
                        <Label>EXT. NAME</Label>
                        <Input disabled></Input>
                    </div>
                </div>
                <div className="flex gap-3">
                    <div className="w-full">
                        <Label>OFFICIAL STATION</Label>
                        <Input></Input>
                    </div>

                    <div className="w-full">
                        <Label>APPOINTMENT</Label>
                        <Input></Input>
                    </div>

                    <div className="w-full">
                        <Label>POSITION</Label>
                        <Input></Input>
                    </div>

                    <div className="w-full">
                        <Label>EMPLOYEE NUMBER</Label>
                        <Input></Input>
                    </div>
                </div>

                <div className="flex gap-3">
                    <div className="w-full">
                        <Label>SALARY GRADE</Label>
                        <Input></Input>
                    </div>

                    <div className="w-full">
                        <Label>STEP</Label>
                        <Input></Input>
                    </div>

                    <div className="w-full">
                        <Label>SALARY</Label>
                        <Input></Input>
                    </div>
                </div>

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
            </form>
        </div>
    );
}

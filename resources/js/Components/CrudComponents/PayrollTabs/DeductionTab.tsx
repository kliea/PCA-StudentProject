import ConfirmCancelButton from "@/Components/ConfirmCancelButton";
import { Label } from "@/Components/ui/label";

const DeductionTab = ({ setOpenDialog }: { setOpenDialog: any }) => {
    return (
        <div>
            <div className="grid grid-cols-2">
                <div>
                    <Label>Applied Deduction Types:</Label>
                </div>

                <div>
                    <Label>Available Deduction Types:</Label>
                </div>
            </div>
            <ConfirmCancelButton
                processing={false}
                setOpenDialog={setOpenDialog}
            ></ConfirmCancelButton>
        </div>
    );
};

export default DeductionTab;

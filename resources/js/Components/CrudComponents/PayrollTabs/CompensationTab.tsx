import ConfirmCancelButton from "@/Components/ConfirmCancelButton";
import { Label } from "@/Components/ui/label";

const CompensationTab = ({ setOpenDialog }: { setOpenDialog: any }) => {
    return (
        <div>
            <div className="grid grid-cols-2">
                <div>
                    <Label>Applied Compensation Types:</Label>
                </div>

                <div>
                    <Label>Available Compensation Types:</Label>
                </div>
            </div>
            <ConfirmCancelButton
                processing={false}
                setOpenDialog={setOpenDialog}
            ></ConfirmCancelButton>
        </div>
    );
};

export default CompensationTab;

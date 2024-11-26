import { Label } from "@/Components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import signatoryData from "@/Components/Constants/DataTest/signatories.json";
import { Separator } from "@/Components/ui/separator";
import ConfirmCancelButton from "@/Components/ConfirmCancelButton";

const Signatories = ({ setOpenDialog }: { setOpenDialog: any }) => {
    const data = signatoryData;
    return (
        <div>
            <div className="flex flex-col gap-3">
                <Label>Signatory:</Label>
                <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="Select Signatory Template" />
                    </SelectTrigger>
                    <SelectContent>
                        {data.map((type) => (
                            <SelectItem
                                value={type.SignatoryID}
                                key={type.SignatoryID}
                            >
                                {type.SignatoryID}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <div className="grid grid-cols-2">
                    <div className="flex flex-col gap-2 mb-2">
                        <Label>A. Certified :</Label>
                        <div className="w-full flex justify-center">
                            <p>Joshua Libando</p>
                        </div>
                        <div className="w-full flex justify-center">
                            <Separator className="max-w-60"></Separator>
                        </div>
                        <div className="w-full flex justify-center">
                            <p className="text-sm">FrontEnd Developer</p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 mb-2">
                        <Label>B. Certified :</Label>
                        <div className="w-full flex justify-center">
                            <p>Joash Antonio</p>
                        </div>
                        <div className="w-full flex justify-center">
                            <Separator className="max-w-60"></Separator>
                        </div>
                        <div className="w-full flex justify-center">
                            <p className="text-sm">BackEnd Developer</p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 mb-2">
                        <Label>C. Approved For Payment :</Label>
                        <div className="w-full flex justify-center">
                            <p>Lyndon Obenza</p>
                        </div>
                        <div className="w-full flex justify-center">
                            <Separator className="max-w-60"></Separator>
                        </div>
                        <div className="w-full flex justify-center">
                            <p className="text-sm">BackEnd Developer</p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 mb-2">
                        <Label>D. Certified :</Label>
                        <div className="w-full flex justify-center">
                            <p>Renie Maglinte</p>
                        </div>
                        <div className="w-full flex justify-center">
                            <Separator className="max-w-60"></Separator>
                        </div>
                        <div className="w-full flex justify-center">
                            <p className="text-sm">FrontEnd Developer</p>
                        </div>
                    </div>
                </div>
            </div>
            <ConfirmCancelButton
                processing={false}
                setOpenDialog={setOpenDialog}
            ></ConfirmCancelButton>
        </div>
    );
};

export default Signatories;

import { useForm } from "@inertiajs/react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";

const officialStation = ["Surigao", "Agusan", "Del", "Sur"];
const Appointments = ["Worker", "Tigtrabaho", "Tighugas Plato"];
const positions = ["Pos1", "Pos2", "Pos3", "Pos4", "Pos5"];
const salaryGrade = ["SG1", "SG2", "SG3", "SG4", "SG5"];
const step = ["Step1", "Step2", "Step3", "Step4", "Step5"];
const salary_type = ["Per Month", "Bi-Monthly", "Quarterly", "Annually"];
export function EmployeeEdit({
    RowData,
    setOpenDialog,
}: {
    RowData: any;
    setOpenDialog: any;
}) {
    const { data, setData, processing, put, reset, errors } = useForm({
        employee_number: RowData.employee_number,
        first_name: RowData.first_name,
        middle_name: RowData.middle_name,
        last_name: RowData.last_name,
        name_extension: RowData.name_extension,
        salary_type: RowData.salary_type,
        salary_step: RowData.salary_step,
    });

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
                        <Label>EMPLOYEE NUMBER</Label>
                        <Input></Input>
                    </div>

                    <div className="w-full">
                        <Label>OFFICIAL STATION</Label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="SELECT STATION " />
                            </SelectTrigger>
                            <SelectContent>
                                {officialStation.map((station) => (
                                    <SelectItem value={station} key={station}>
                                        {station}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="w-full">
                        <Label>APPOINTMENT</Label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="SELECT APPOINTMENT " />
                            </SelectTrigger>
                            <SelectContent>
                                {Appointments.map((Appointment) => (
                                    <SelectItem
                                        value={Appointment}
                                        key={Appointment}
                                    >
                                        {Appointment}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="w-full">
                        <Label>POSITION</Label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="SELECT POSITION " />
                            </SelectTrigger>
                            <SelectContent>
                                {positions.map((pos) => (
                                    <SelectItem value={pos} key={pos}>
                                        {pos}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="flex gap-3">
                    <div className="w-full">
                        <Label>SALARY TYPE</Label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="SELECT SALARY TYPE" />
                            </SelectTrigger>
                            <SelectContent>
                                {salary_type.map((st) => (
                                    <SelectItem value={st} key={st}>
                                        {st}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="w-full">
                        <Label>SALARY GRADE</Label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="SELECT SALARY GRADE" />
                            </SelectTrigger>
                            <SelectContent>
                                {salaryGrade.map((sg) => (
                                    <SelectItem value={sg} key={sg}>
                                        {sg}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="w-full">
                        <Label>STEP</Label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="SELECT STEP" />
                            </SelectTrigger>
                            <SelectContent>
                                {step.map((sg) => (
                                    <SelectItem value={sg} key={sg}>
                                        {sg}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="w-full">
                        <Label>SALARY</Label>
                        <Input></Input>
                    </div>
                </div>

                {/* <div className="flex gap-3 justify-end pl-5">
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
                </div> */}
            </form>
        </div>
    );
}

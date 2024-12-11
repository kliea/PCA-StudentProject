import fundData from "@/Components/Constants/DataTest/fundClusyer.json";
import { Label } from "@/Components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";

import { useState } from "react";
import { DatePicker } from "@/Components/DatePicker";
import { Checkbox } from "@/Components/ui/checkbox";
import ConfirmCancelButton from "@/Components/ConfirmCancelButton";
import { Switch } from "@/Components/ui/switch";

// CONSTANTS FOR NOW > MIGHT NEED TABLES LATER

const PayrollTypes = ["General", "Separate", "Honorarium"];
export default function PayrollProperties({
    RowData,
    setOpenDialog,
}: {
    RowData: any;
    setOpenDialog: React.Dispatch<React.SetStateAction<string | null>>;
}) {
    const fundSources = fundData;
    const [startdate, setStartDate] = useState<Date>();
    const [enddate, setEndDate] = useState<Date>();
    const [posted, setPosted] = useState<boolean>(false);
    const [postedDate, setPostedDate] = useState<Date>();
    const [paid, setPaid] = useState<boolean>(false);
    const [paidDate, setPaidDate] = useState<Date>();
    return (
        <div>
            <form action="" className="flex flex-col gap-3">
                <div className="grid w-full grid-cols-2 gap-5">
                    <div className="w-full">
                        <Label>Fund Cluster:</Label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue
                                    placeholder={RowData.fundCluster}
                                />
                            </SelectTrigger>
                            <SelectContent>
                                {fundSources.map((sources) => (
                                    <SelectItem
                                        value={sources.fundCode}
                                        key={sources.fundCode}
                                    >
                                        {sources.fundCode} -{" "}
                                        {sources.description}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="w-full">
                        <Label>Payroll Type:</Label>

                        <Select defaultValue={RowData.payrollType}>
                            <SelectTrigger>
                                <SelectValue
                                    placeholder={RowData.payrollType}
                                />
                            </SelectTrigger>
                            <SelectContent>
                                {PayrollTypes.map((type) => (
                                    <SelectItem value={type} key={type}>
                                        {type}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="w-full">
                        <Label>Starting Date:</Label>
                        <DatePicker date={startdate} setDate={setStartDate} />
                    </div>

                    <div className="w-full">
                        <Label>Ending Date:</Label>
                        <DatePicker date={enddate} setDate={setEndDate} />
                    </div>

                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <Checkbox
                                defaultChecked={posted}
                                onCheckedChange={() => setPosted(!posted)}
                            />
                            <Label>Date Posted:</Label>
                        </div>
                        <DatePicker
                            disabled={!posted}
                            date={postedDate}
                            setDate={setPostedDate}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <Checkbox
                                defaultChecked={paid}
                                onCheckedChange={() => setPaid(!paid)}
                            />
                            <Label>Date Paid:</Label>
                        </div>
                        <DatePicker
                            disabled={!paid}
                            date={paidDate}
                            setDate={setPaidDate}
                        />
                    </div>
                </div>
                <div className="flex gap-3 items-center">
                    <Switch />
                    <Label>Include Mandatory and Other Deductions</Label>
                </div>
            </form>
            <ConfirmCancelButton
                processing={false}
                setOpenDialog={setOpenDialog}
            ></ConfirmCancelButton>
        </div>
    );
}

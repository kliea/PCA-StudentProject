import ConfirmCancelButton from "@/Components/ConfirmCancelButton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { useForm } from "@inertiajs/react";
import PayrollProperties from "./PayrollProperties";
import SignatoriesProperty from "./SignatoriesProperties";
import EmployeesList from "./EmployeesList";

export const PayrollsIndexStore = ({ openDialog }: { openDialog: any }) => {
    const { data, setData, errors, processing } = useForm({});
    return (
        <form action="">
            <Tabs defaultValue="Properties" className="w-full">
                <TabsList className="w-full grid grid-cols-2">
                    <TabsTrigger value="Properties">Properties</TabsTrigger>
                    <TabsTrigger value="Employees">Employees List</TabsTrigger>
                </TabsList>
                <TabsContent value="Properties">
                    <PayrollProperties />
                    <SignatoriesProperty />
                </TabsContent>
                <TabsContent value="Employees">
                    <EmployeesList></EmployeesList>
                </TabsContent>
            </Tabs>
            <ConfirmCancelButton
                processing={processing}
                setOpenDialog={openDialog}
            ></ConfirmCancelButton>
        </form>
    );
};

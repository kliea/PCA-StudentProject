import AuthenticatedLayout from "@/Components/Layouts/Common/AuthenticatedLayout";
import { Input } from "@/Components/ui/input";

const EmployeesPage = () => {
    return (
        <AuthenticatedLayout
            pageTitle="Employees"
            navigationType="payrollAdmin"
        >
            <div className="h-full flex flex-col">
                <div className="mb-5 flex flex-row gap-5">
                    <Input
                        type="search"
                        // onChange={(e) => setGlobalFilter(e.target.value || "")}
                        className="w-1/4 rounded-pca"
                        placeholder="Search...."
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default EmployeesPage;

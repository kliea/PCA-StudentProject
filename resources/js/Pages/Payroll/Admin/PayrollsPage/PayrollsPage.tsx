import AuthenticatedLayout from "@/Components/Layouts/Common/AuthenticatedLayout";
import { RowData } from "@tanstack/react-table";


const PayrollsPage = () => {


    return (
        <AuthenticatedLayout
            pageTitle="Payrolls Index"
            navigationType="payrollAdmin"
        >
            <div></div>
        </AuthenticatedLayout>
    );
};

export default PayrollsPage;

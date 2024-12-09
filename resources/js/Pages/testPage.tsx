import AuthenticatedLayout from "@/Components/Layouts/Common/AuthenticatedLayout";

const TestingPage = () => {
    return (
        <AuthenticatedLayout
            pageTitle="Testing Page"
            navigationType="payrollAdmin"
        >
            <div></div>
        </AuthenticatedLayout>
    );
};

export default TestingPage;

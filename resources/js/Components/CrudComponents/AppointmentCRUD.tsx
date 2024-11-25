import { useForm } from "@inertiajs/react";
export function AppointmentStore() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        mandatoryDeduction: "",
        step2: "",
        step3: "",
        step4: "",
        step5: "",
        step6: "",
        step7: "",
        step8: "",
    });

    return (
        <div>
            <div></div>
        </div>
    );
}

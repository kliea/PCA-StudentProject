import { Button } from "@/Components/ui/button";
import AuthenticatedLayoutAdmin from "@/Layouts/AuthenticatedLayout";

import { AdminLinks } from "@/lib/payrollData";

import { useForm } from "@inertiajs/react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Formats() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios
            .get(route("admin.employee"))
            .then((response) => {
                setData(response.data);
                setLoading(false);
                console.log("Fin");
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    console.log(data);

    return (
        <AuthenticatedLayoutAdmin title="Test" links={AdminLinks}>
            {/* <Button onClick={fetchLoans}>Fetch</Button> */}
            <div></div>
        </AuthenticatedLayoutAdmin>
    );
}

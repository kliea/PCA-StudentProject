import { Combobox } from "@/Components/ComboBox";
import AuthenticatedLayout from "@/Components/Layouts/Common/AuthenticatedLayout";

const Formats = () => {

    const frameworks = [
        {
          value: "next.js",
          label: "Next.js",
        },
        {
          value: "sveltekit",
          label: "SvelteKit",
        },
        {
          value: "nuxt.js",
          label: "Nuxt.js",
        },
        {
          value: "remix",
          label: "Remix",
        },
        {
          value: "astro",
          label: "Astro",
        },
      ]


    return (
        <AuthenticatedLayout
            pageTitle="Salary Standard Law"
            navigationType="payrollAdmin"
        >
            <Combobox dataset={frameworks}></Combobox>
        </AuthenticatedLayout>
    );
};

export default Formats;

import Breadcrumbs from "@/app/ui/users/breadcrumbs";
import Form from "@/app/ui/users/create-form";

export default function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Users", href: "/dashboard/users" },
          {
            label: "Create User",
            href: "/dashboard/users/create",
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}

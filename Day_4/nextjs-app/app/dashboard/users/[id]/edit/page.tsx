import Form from "@/app/ui/users/edit-form";
import Breadcrumbs from "@/app/ui/users/breadcrumbs";
import { fetchUserById } from "@/app/lib/data";
export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const [user] = await Promise.all([fetchUserById(id)]);

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Users", href: "/dashboard/users" },
          {
            label: "Edit User",
            href: `/dashboard/users/${params.id}/edit`,
            active: true,
          },
        ]}
      />
      <Form user={user} />
    </main>
  );
}

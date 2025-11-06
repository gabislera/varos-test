import { notFound } from "next/navigation";
import { getUsers } from "@/app/dashboard/actions";
import { getClients } from "../actions";
import UserForm from "../components/user-form";

export default async function EditUsersPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const users = await getUsers();
  const user = users.find((u) => u.id === id);

  if (!user) {
    notFound();
  }

  const clientsResult = await getClients();
  const clients = clientsResult.success ? clientsResult.data : [];

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <UserForm user={user} clients={clients} />
    </div>
  );
}

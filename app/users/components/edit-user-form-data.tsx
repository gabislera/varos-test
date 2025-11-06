import { notFound } from "next/navigation";
import { getUsers } from "@/app/dashboard/actions";
import { getClients } from "../actions";
import UserForm from "./user-form";

interface EditUserFormDataProps {
  userId: string;
}

export async function EditUserFormData({ userId }: EditUserFormDataProps) {
  const users = await getUsers();
  const user = users.find((u) => u.id === userId);

  if (!user) {
    notFound();
  }

  const clientsResult = await getClients();
  const clients = clientsResult.success ? clientsResult.data : [];

  return <UserForm user={user} clients={clients} />;
}

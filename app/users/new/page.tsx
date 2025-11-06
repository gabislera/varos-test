import { getClients } from "../actions";
import UserForm from "../components/user-form";

export default async function NewUserPage() {
  const clientsResult = await getClients();
  const clients = clientsResult.success ? clientsResult.data : [];

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <UserForm clients={clients} />
    </div>
  );
}

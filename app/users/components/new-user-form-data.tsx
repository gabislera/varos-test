import { getClients } from "../actions";
import UserForm from "./user-form";

export async function NewUserFormData() {
  const clientsResult = await getClients();
  const clients = clientsResult.success ? clientsResult.data : [];

  return <UserForm clients={clients} />;
}

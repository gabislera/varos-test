import { getUsers } from "../actions";
import { UsersTable } from "./users-table";

interface UsersDataProps {
  filters: {
    consultantId?: string;
    consultantEmail?: string;
    startDate?: Date;
    endDate?: Date;
  };
}

export async function UsersData({ filters }: UsersDataProps) {
  const users = await getUsers(filters);
  return <UsersTable users={users} />;
}

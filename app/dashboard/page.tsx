import type { UserRole } from "@prisma/client";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getUsers } from "./actions";
import { FilterBar } from "./components/filter-bar";
import { StatsCard } from "./components/stats-card";
import { UsersTable } from "./components/users-table";

export interface User {
  id: string;
  role: UserRole;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  age: number | null;
  zipCode: string;
  state: string;
  street: string;
  number: number;
  consultant: {
    name: string;
    email: string;
  } | null;
  clients: {
    id: string;
    name: string;
    email: string;
  }[];
  createdAt: Date | string;
  updatedAt: Date | string;
}

type SearchParams = {
  consultantId: string;
  consultantEmail?: string;
  startDate?: string;
  endDate?: string;
};

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const filters = {
    consultantId: searchParams.consultantId,
    consultantEmail: searchParams.consultantEmail,
    startDate: searchParams.startDate
      ? new Date(searchParams.startDate)
      : undefined,
    endDate: searchParams.endDate ? new Date(searchParams.endDate) : undefined,
  };

  const users = await getUsers(filters);

  return (
    <main className="flex-1 p-16 flex-col flex gap-6">
      <h2 className="text-2xl font-bold">Dashboard</h2>

      <div className="flex items-center justify-between">
        <StatsCard
          title="Total de clientes"
          value="128"
          period="nos ultimos 7 dias"
        />

        <div className="flex flex-col items-end gap-2">
          <Link href="/users">
            <Button
              type="button"
              className="rounded-xs flex items-center gap-4"
            >
              Criar usuario
              <PlusIcon className="w-4 h-4" color="#00F700" />
            </Button>
          </Link>
          <FilterBar />
        </div>
      </div>

      <div>
        <UsersTable users={users} />
      </div>
    </main>
  );
}

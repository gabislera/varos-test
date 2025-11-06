import type { UserRole } from "@prisma/client";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getClientsByDays, getConsultants, getUsers } from "./actions";
import { FilterBar } from "./components/filter-bar";
import { MobileFilterDrawer } from "./components/mobile-filter-drawer";
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
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;

  const filters = {
    consultantId: params.consultantId,
    consultantEmail: params.consultantEmail,
    startDate: params.startDate ? new Date(params.startDate) : undefined,
    endDate: params.endDate ? new Date(params.endDate) : undefined,
  };

  const users = await getUsers(filters);

  const STATS_DAYS = 7;
  const clientsCount = await getClientsByDays(STATS_DAYS);

  const consultants = await getConsultants();

  return (
    <main className="flex-1 p-4 lg:p-16 flex-col flex gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <div className="flex items-center gap-2 lg:hidden">
          <MobileFilterDrawer consultants={consultants} />
          <Link href="/users/new">
            <Button
              type="button"
              className="rounded-xs items-center gap-4 flex"
            >
              Criar usuario
              <PlusIcon className="w-4 h-4" color="#00F700" />
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <StatsCard
          title="Total de clientes"
          value={clientsCount}
          period={`nos ultimos ${STATS_DAYS} dias`}
        />

        <div className=" flex-col items-end gap-2 hidden lg:flex">
          <Link href="/users/new">
            <Button
              type="button"
              className="rounded-xs flex items-center gap-4"
            >
              Criar usuario
              <PlusIcon className="w-4 h-4" color="#00F700" />
            </Button>
          </Link>
          <FilterBar consultants={consultants} />
        </div>
      </div>

      <div>
        <UsersTable users={users} />
      </div>
    </main>
  );
}

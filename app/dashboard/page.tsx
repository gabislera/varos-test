import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FilterBar } from "./components/filter-bar";
import { StatsCard } from "./components/stats-card";
import { UsersTable } from "./components/users-table";

export interface User {
  name: string;
  email: string;
  phone: string;
  cpf: string;
  age: number;
  address: string;
  createdAt: string;
  updatedAt: string;
}

const users: User[] = [
  {
    name: "Jhon Doe",
    email: "jhon.doe@gmail.com",
    phone: "1234567890",
    cpf: "1234567890",
    age: 25,
    address: "1234567890",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-01",
  },
  {
    name: "Jane Doe",
    email: "jane.doe@gmail.com",
    phone: "1234567890",
    cpf: "1234567890",
    age: 25,
    address: "1234567890",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-01",
  },
  {
    name: "Jim Beam",
    email: "jim.beam@gmail.com",
    phone: "1234567890",
    cpf: "1234567890",
    age: 25,
    address: "1234567890",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-01",
  },
];

export default function DashboardPage() {
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

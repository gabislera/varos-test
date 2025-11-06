import type { UserRole } from "@prisma/client";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { FiltersData } from "./components/filters-data";
import { StatsData } from "./components/stats-data";
import { UsersData } from "./components/users-data";
import { FilterBarSkeleton } from "./components/skeletons/filter-bar-skeleton";
import { MobileFilterSkeleton } from "./components/skeletons/mobile-filter-skeleton";
import { StatsCardSkeleton } from "./components/skeletons/stats-card-skeleton";
import { UsersTableSkeleton } from "./components/skeletons/users-table-skeleton";

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

  return (
    <main className="flex-1 p-4 lg:p-16 flex-col flex gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <div className="flex items-center gap-2 lg:hidden">
          <Suspense fallback={<MobileFilterSkeleton />}>
            <FiltersData />
          </Suspense>
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
        <Suspense fallback={<StatsCardSkeleton />}>
          <StatsData />
        </Suspense>

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
          <Suspense fallback={<FilterBarSkeleton />}>
            <FiltersData />
          </Suspense>
        </div>
      </div>

      <div>
        <Suspense fallback={<UsersTableSkeleton />}>
          <UsersData filters={filters} />
        </Suspense>
      </div>
    </main>
  );
}

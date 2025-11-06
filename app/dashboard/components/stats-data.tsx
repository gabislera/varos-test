import { getClientsByDays } from "../actions";
import { StatsCard } from "./stats-card";

interface StatsDataProps {
  filters: {
    consultantId?: string;
    consultantEmail?: string;
    startDate?: Date;
    endDate?: Date;
  };
}

export async function StatsData({ filters }: StatsDataProps) {
  const STATS_DAYS = 7;
  const clientsCount = await getClientsByDays(STATS_DAYS, filters);

  return (
    <StatsCard
      title="Total de clientes"
      value={clientsCount}
      period={`nos ultimos ${STATS_DAYS} dias`}
    />
  );
}

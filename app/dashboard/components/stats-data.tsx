import { getClientsByDays } from "../actions";
import { StatsCard } from "./stats-card";

export async function StatsData() {
  const STATS_DAYS = 7;
  const clientsCount = await getClientsByDays(STATS_DAYS);

  return (
    <StatsCard
      title="Total de clientes"
      value={clientsCount}
      period={`nos ultimos ${STATS_DAYS} dias`}
    />
  );
}

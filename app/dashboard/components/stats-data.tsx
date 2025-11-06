import { getUsers } from "../actions";
import { StatsCard } from "./stats-card";

export async function StatsData() {
  const STATS_DAYS = 7;
  const users = await getUsers({});

  return (
    <StatsCard
      title="Total de clientes"
      value={users.length}
      period={`nos ultimos ${STATS_DAYS} dias`}
    />
  );
}

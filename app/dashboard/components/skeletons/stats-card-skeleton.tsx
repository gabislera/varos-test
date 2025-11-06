import { TrendingUp } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export function StatsCardSkeleton() {
  return (
    <div className="flex flex-row lg:flex-col items-center lg:items-start gap-2 p-4 border border-[#222729] bg-[#131516] text-[#B0B7BE] w-full lg:max-w-[212px] justify-center lg:justify-start">
      <h3 className="text-sm">Total de clientes</h3>
      <div className="flex items-center gap-2">
        <Skeleton className="h-8 w-12" />
        <TrendingUp className="w-4 h-4 text-[#19C819]" />
      </div>
      <span className="text-sm">nos ultimos 7 dias</span>
    </div>
  );
}

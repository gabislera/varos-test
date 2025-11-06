import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";

export function FilterBarSkeleton() {
  return (
    <div className="lg:border border-[#222729] rounded-lg p-2 md:p-4 flex flex-col lg:flex-row items-center gap-6">
      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-2 w-full lg:w-auto">
        <Label className="text-xs">Nome do consultor</Label>
        <Skeleton className="h-10 w-full lg:w-[140px]" />
      </div>
      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-2 w-full lg:w-auto">
        <Label className="text-xs">Email do consultor</Label>
        <Skeleton className="h-10 w-full lg:w-[140px]" />
      </div>
      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-2 w-full lg:w-auto">
        <Label className="text-xs whitespace-nowrap">Periodo</Label>
        <Skeleton className="h-9 w-full lg:w-[240px]" />
      </div>
    </div>
  );
}

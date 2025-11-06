import { TrendingUp } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  period: string;
  trend?: boolean;
}

export function StatsCard({
  title,
  value,
  period,
  trend = true,
}: StatsCardProps) {
  return (
    <div className="flex flex-row lg:flex-col items-center lg:items-start gap-2 p-4 border border-[#222729] bg-[#131516] text-[#B0B7BE] w-full lg:max-w-[212px] justify-center lg:justify-start">
      <h3 className="text-sm">{title}</h3>
      <div className="flex items-center gap-2">
        <p className="text-2xl font-bold">{value}</p>
        {trend && <TrendingUp className="w-4 h-4 text-[#19C819]" />}
      </div>
      <span className="text-sm">{period}</span>
    </div>
  );
}

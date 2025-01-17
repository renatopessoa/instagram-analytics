import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  icon: LucideIcon;
  title: string;
  value: string | number;
  subValue?: string;
  trend?: "up" | "down";
  className?: string;
}

export function StatsCard({
  icon: Icon,
  title,
  value,
  subValue,
  trend,
  className,
}: StatsCardProps) {
  return (
    <div
      className={cn(
        "gradient-card stats-card text-white",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Icon className="h-4 w-4" />
            <p className="text-sm font-medium">{title}</p>
          </div>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-bold">{value}</h3>
            {subValue && (
              <p className="text-sm opacity-80">{subValue}</p>
            )}
          </div>
        </div>
        {trend && (
          <div className="h-12 w-12">
            <div className={cn(
              "h-1 w-full rounded-full bg-white/20",
              trend === "up" ? "rotate-45" : "-rotate-45"
            )} />
          </div>
        )}
      </div>
    </div>
  );
}
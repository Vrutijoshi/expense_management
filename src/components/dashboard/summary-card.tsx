import { formatCurrency } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SummaryCardProps {
  title: string;
  amount: number;
  percentChange?: number;
  icon: React.ReactNode;
}

export function SummaryCard({
  title,
  amount,
  percentChange,
  icon,
}: SummaryCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-4 w-4 text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{formatCurrency(amount)}</div>
        {percentChange !== undefined && (
          <p className={`text-xs ${percentChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {percentChange >= 0 ? "+" : ""}
            {percentChange.toFixed(1)}% from last month
          </p>
        )}
      </CardContent>
    </Card>
  );
}
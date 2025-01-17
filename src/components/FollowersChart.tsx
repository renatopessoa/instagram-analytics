import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { fetchFollowersHistory } from '@/services/instagramApi';
import { Button } from '@/components/ui/button';

export function FollowersChart() {
  const token = localStorage.getItem('instagram_access_token') || '';
  const [selectedDays, setSelectedDays] = useState(7);
  
  const { data = [] } = useQuery({
    queryKey: ['followers-history', token, selectedDays],
    queryFn: () => fetchFollowersHistory(token, selectedDays),
    enabled: !!token,
  });

  const timeFilters = [
    { label: 'Last 365 days', days: 365 },
    { label: 'Last 30 days', days: 30 },
    { label: 'Last 7 days', days: 7 },
    { label: 'Last 24 hours', days: 1 },
  ];

  return (
    <div className="chart-container">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-semibold">Followers Growth</h3>
        <div className="flex gap-4">
          {timeFilters.map((filter) => (
            <Button
              key={filter.days}
              variant="ghost"
              size="sm"
              className={selectedDays === filter.days ? "font-medium" : "text-muted-foreground"}
              onClick={() => setSelectedDays(filter.days)}
            >
              {filter.label}
            </Button>
          ))}
        </div>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="followers"
              stroke="#9b87f5"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
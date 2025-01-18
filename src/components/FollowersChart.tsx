import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { fetchFollowersHistory } from '@/services/instagramApi';
import { Button } from '@/components/ui/button';
import { useLocation } from 'react-router-dom';

export function FollowersChart() {
  const token = localStorage.getItem('instagram_access_token') || '';
  const [selectedDays, setSelectedDays] = useState(7);
  const location = useLocation();
  
  const { data = [] } = useQuery({
    queryKey: ['followers-history', token, selectedDays, location.pathname],
    queryFn: () => fetchFollowersHistory(token, selectedDays),
    enabled: !!token,
  });

  const timeFilters = [
    { label: 'Last 365 days', days: 365 },
    { label: 'Last 30 days', days: 30 },
    { label: 'Last 7 days', days: 7 },
    { label: 'Last 24 hours', days: 1 },
  ];

  const getMetricTitle = () => {
    switch (location.pathname) {
      case '/followers':
        return 'Followers Growth';
      case '/likes':
        return 'Likes Overview';
      case '/comments':
        return 'Comments Analysis';
      case '/promotions':
        return 'Promotions Performance';
      default:
        return 'Followers Growth';
    }
  };

  const getMetricLine = () => {
    const lines = [];
    
    if (location.pathname === '/followers' || location.pathname === '/') {
      lines.push(
        <Line
          key="followers"
          type="monotone"
          dataKey="followers"
          stroke="#9b87f5"
          strokeWidth={2}
          dot={false}
          name="Followers"
        />
      );
    }
    
    if (location.pathname === '/likes') {
      lines.push(
        <Line
          key="likes"
          type="monotone"
          dataKey="likes"
          stroke="#f87171"
          strokeWidth={2}
          dot={false}
          name="Likes"
        />
      );
    }

    if (location.pathname === '/comments') {
      lines.push(
        <Line
          key="comments"
          type="monotone"
          dataKey="comments"
          stroke="#4ade80"
          strokeWidth={2}
          dot={false}
          name="Comments"
        />
      );
    }
    
    if (location.pathname === '/promotions') {
      lines.push(
        <Line
          key="promotions"
          type="monotone"
          dataKey="promotions"
          stroke="#60a5fa"
          strokeWidth={2}
          dot={false}
          name="Engagement"
        />
      );
    }
    
    return lines;
  };

  return (
    <div className="chart-container">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-semibold">{getMetricTitle()}</h3>
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
            <Legend />
            {getMetricLine()}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
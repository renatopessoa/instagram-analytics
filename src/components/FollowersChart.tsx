import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Sun', followers: 10 },
  { name: 'Mon', followers: 15 },
  { name: 'Tue', followers: 15 },
  { name: 'Wed', followers: 20 },
  { name: 'Thu', followers: 20 },
  { name: 'Fri', followers: 30 },
  { name: 'Sat', followers: 40 },
];

export function FollowersChart() {
  return (
    <div className="chart-container">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-semibold">New Followers</h3>
        <div className="flex gap-4">
          <button className="text-sm text-muted-foreground hover:text-foreground">Last 365 days</button>
          <button className="text-sm text-muted-foreground hover:text-foreground">Last 30 days</button>
          <button className="text-sm font-medium">Last 7 days</button>
          <button className="text-sm text-muted-foreground hover:text-foreground">Last 24 hours</button>
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
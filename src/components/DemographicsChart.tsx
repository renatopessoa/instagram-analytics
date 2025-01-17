import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const ageData = [
  { name: '13-17', value: 15 },
  { name: '18-24', value: 35 },
  { name: '25-34', value: 25 },
  { name: '35-44', value: 15 },
  { name: '45+', value: 10 },
];

const genderData = [
  { name: 'Female', value: 65 },
  { name: 'Male', value: 32 },
  { name: 'Other', value: 3 },
];

const COLORS = ['#9b87f5', '#F97316', '#7E69AB', '#FEC6A1', '#4C1D95'];

export function DemographicsChart() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="chart-container">
        <h3 className="text-lg font-semibold mb-4">Age Distribution</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={ageData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {ageData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="chart-container">
        <h3 className="text-lg font-semibold mb-4">Gender Distribution</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={genderData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {genderData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
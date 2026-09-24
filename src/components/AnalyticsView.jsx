import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend, AreaChart, Area
} from 'recharts';
import { Cpu, DollarSign, TrendingUp, Award, Layers } from 'lucide-react';

export default function AnalyticsView({ agents }) {
  // Aggregate tokens by Business Line
  const lineStats = agents.reduce((acc, agent) => {
    const line = agent.businessLine || 'Other';
    if (!acc[line]) {
      acc[line] = { name: line, tokens: 0, credits: 0, count: 0 };
    }
    acc[line].tokens += agent.tokensUsed || 0;
    acc[line].credits += agent.creditsUsed || 0;
    acc[line].count += 1;
    return acc;
  }, {});

  const lineChartData = Object.values(lineStats).map(item => ({
    ...item,
    tokensM: Number((item.tokens / 1_000_000).toFixed(1))
  }));

  // Color Palette for Pie & Bar Charts
  const COLORS = ['#6366f1', '#06b6d4', '#10b981', '#a855f7', '#f59e0b', '#ec4899', '#3b82f6', '#84cc16'];

  // Aggregate monthly token consumption across all agents
  const monthlyAgg = [
    { month: 'Apr 26', tokens: 178, cost: 3560 },
    { month: 'May 26', tokens: 202, cost: 4040 },
    { month: 'Jun 26', tokens: 233, cost: 4660 },
    { month: 'Jul 26', tokens: 231, cost: 4620 },
    { month: 'Aug 26', tokens: 257, cost: 5140 },
    { month: 'Sep 26', tokens: 263, cost: 5260 }
  ];

  // Top agents sorted by cost
  const topCostAgents = [...agents].sort((a, b) => b.creditsUsed - a.creditsUsed).slice(0, 5);

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val || 0);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div className="analytics-grid">
        {/* Token Consumption by Business Line */}
        <div className="chart-card">
          <h3>
            <Layers size={18} style={{ color: 'var(--primary)' }} />
            Token Usage by Business Line (Millions)
          </h3>
          <div style={{ height: '260px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={lineChartData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <XAxis dataKey="name" stroke="#6b7280" fontSize={10} interval={0} angle={-25} textAnchor="end" />
                <YAxis stroke="#6b7280" fontSize={11} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', borderRadius: '8px', color: '#fff' }}
                  formatter={(value) => [`${value} Million Tokens`, 'Tokens']}
                />
                <Bar dataKey="tokensM" radius={[4, 4, 0, 0]}>
                  {lineChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Enterprise Spend Distribution Pie */}
        <div className="chart-card">
          <h3>
            <DollarSign size={18} style={{ color: 'var(--accent-emerald)' }} />
            Enterprise Credit Spend Distribution ($ USD)
          </h3>
          <div style={{ height: '260px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={lineChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="credits"
                  nameKey="name"
                >
                  {lineChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', borderRadius: '8px', color: '#fff' }}
                  formatter={(val) => [formatCurrency(val), 'Credits Spent']}
                />
                <Legend layout="horizontal" verticalAlign="bottom" align="center" wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Monthly Enterprise Run Rate Trend */}
      <div className="chart-card">
        <h3>
          <TrendingUp size={18} style={{ color: 'var(--secondary)' }} />
          Monthly Enterprise Token Burn Rate & Projected Run Rate (Millions of Tokens)
        </h3>
        <div style={{ height: '220px', width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyAgg} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorMonthly" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="month" stroke="#6b7280" fontSize={11} />
              <YAxis stroke="#6b7280" fontSize={11} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', borderRadius: '8px', color: '#fff' }} 
                formatter={(value, name) => [name === 'tokens' ? `${value}M Tokens` : formatCurrency(value), name === 'tokens' ? 'Tokens' : 'Cost']}
              />
              <Area type="monotone" dataKey="tokens" stroke="#6366f1" fillOpacity={1} fill="url(#colorMonthly)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Cost Driver Table */}
      <div className="chart-card">
        <h3>
          <Award size={18} style={{ color: 'var(--accent-amber)' }} />
          Top Cost Driving Enterprise Agents
        </h3>
        <div className="table-container" style={{ border: 'none' }}>
          <table className="agents-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Agent Name</th>
                <th>Business Line</th>
                <th>Version & Model</th>
                <th>Tokens Used</th>
                <th>Total Credits Spent</th>
                <th>Monthly Budget Cap Utilization</th>
              </tr>
            </thead>
            <tbody>
              {topCostAgents.map((agent, i) => {
                const util = agent.monthlyBudgetCap ? Math.round((agent.creditsUsed / agent.monthlyBudgetCap) * 100) : 0;
                return (
                  <tr key={agent.id}>
                    <td style={{ fontWeight: 700, color: 'var(--primary)', fontFamily: 'var(--font-mono)' }}>#{i + 1}</td>
                    <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{agent.name}</td>
                    <td>{agent.businessLine}</td>
                    <td><span className="version-pill">{agent.version}</span> {agent.model}</td>
                    <td style={{ fontFamily: 'var(--font-mono)' }}>{(agent.tokensUsed / 1_000_000).toFixed(1)}M</td>
                    <td style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-emerald)', fontWeight: 600 }}>{formatCurrency(agent.creditsUsed)}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div className="progress-bar-bg" style={{ width: '80px' }}>
                          <div className="progress-bar-fill" style={{ width: `${Math.min(util, 100)}%` }}></div>
                        </div>
                        <span style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)' }}>{util}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { Cpu, DollarSign, Layers, Activity, CalendarCheck } from 'lucide-react';

export default function MetricCards({ agents }) {
  const totalAgents = agents.length;
  const publishedAgents = agents.filter(a => a.status === 'Published').length;
  const totalTokens = agents.reduce((acc, a) => acc + (a.tokensUsed || 0), 0);
  const totalCredits = agents.reduce((acc, a) => acc + (a.creditsUsed || 0), 0);
  
  // Calculate average days since last revision
  const now = new Date();
  const daysSinceRevision = agents.map(a => {
    if (!a.revisionDate) return 0;
    const rev = new Date(a.revisionDate);
    const diffTime = Math.abs(now - rev);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  });
  const avgRevisionDays = daysSinceRevision.length > 0 
    ? Math.round(daysSinceRevision.reduce((a, b) => a + b, 0) / daysSinceRevision.length)
    : 0;

  const formatTokens = (tokens) => {
    if (tokens >= 1_000_000_000) return (tokens / 1_000_000_000).toFixed(2) + 'B';
    if (tokens >= 1_000_000) return (tokens / 1_000_000).toFixed(1) + 'M';
    if (tokens >= 1_000) return (tokens / 1_000).toFixed(1) + 'K';
    return tokens.toLocaleString();
  };

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
  };

  return (
    <div className="metrics-grid">
      <div className="metric-card" style={{ '--accent-color': '#6366f1' }}>
        <div className="metric-info">
          <p>Total Published Agents</p>
          <div className="metric-value">{totalAgents}</div>
          <div className="metric-sub">
            <Activity size={14} />
            <span>{publishedAgents} Active in Prod ({Math.round((publishedAgents/totalAgents)*100)}%)</span>
          </div>
        </div>
        <div className="metric-icon-box" style={{ '--icon-bg': 'rgba(99, 102, 241, 0.12)', '--accent-color': '#6366f1' }}>
          <Layers size={22} />
        </div>
      </div>

      <div className="metric-card" style={{ '--accent-color': '#06b6d4' }}>
        <div className="metric-info">
          <p>Tokens Used So Far</p>
          <div className="metric-value">{formatTokens(totalTokens)}</div>
          <div className="metric-sub" style={{ color: '#06b6d4' }}>
            <span>Across {new Set(agents.map(a => a.businessLine)).size} Business Lines</span>
          </div>
        </div>
        <div className="metric-icon-box" style={{ '--icon-bg': 'rgba(6, 182, 212, 0.12)', '--accent-color': '#06b6d4' }}>
          <Cpu size={22} />
        </div>
      </div>

      <div className="metric-card" style={{ '--accent-color': '#10b981' }}>
        <div className="metric-info">
          <p>Credits / USD Consumption</p>
          <div className="metric-value">{formatCurrency(totalCredits)}</div>
          <div className="metric-sub" style={{ color: '#10b981' }}>
            <span>Avg ${ (totalCredits / (totalAgents || 1)).toFixed(2) } per agent</span>
          </div>
        </div>
        <div className="metric-icon-box" style={{ '--icon-bg': 'rgba(16, 185, 129, 0.12)', '--accent-color': '#10b981' }}>
          <DollarSign size={22} />
        </div>
      </div>

      <div className="metric-card" style={{ '--accent-color': '#a855f7' }}>
        <div className="metric-info">
          <p>Revision Recency</p>
          <div className="metric-value">{avgRevisionDays} days</div>
          <div className="metric-sub" style={{ color: '#a855f7' }}>
            <CalendarCheck size={14} />
            <span>Avg revision cadence</span>
          </div>
        </div>
        <div className="metric-icon-box" style={{ '--icon-bg': 'rgba(168, 85, 247, 0.12)', '--accent-color': '#a855f7' }}>
          <CalendarCheck size={22} />
        </div>
      </div>
    </div>
  );
}

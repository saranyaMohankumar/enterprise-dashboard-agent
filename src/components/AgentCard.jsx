import React from 'react';
import { 
  ShieldCheck, Server, FileText, Users, Headphones, Code2, Truck, Megaphone, Bot,
  Calendar, Clock, DollarSign, Cpu, ArrowUpRight, Play, Edit3, History
} from 'lucide-react';

const ICON_MAP = {
  ShieldCheck,
  Server,
  FileText,
  Users,
  Headphones,
  Code2,
  Truck,
  Megaphone
};

export default function AgentCard({ agent, onViewDetails, onTestSandbox, onReviseVersion }) {
  const IconComponent = ICON_MAP[agent.icon] || Bot;

  const formatTokens = (num) => {
    if (!num) return '0';
    if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(2) + 'B';
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + 'M';
    if (num >= 1_000) return (num / 1_000).toFixed(1) + 'K';
    return num.toLocaleString();
  };

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val || 0);
  };

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'published': return 'badge-published';
      case 'staging': return 'badge-staging';
      case 'deprecated': return 'badge-deprecated';
      default: return 'badge-archived';
    }
  };

  const usagePercent = agent.monthlyBudgetCap 
    ? Math.min(Math.round((agent.creditsUsed / agent.monthlyBudgetCap) * 100), 100)
    : 0;

  return (
    <div className="agent-card">
      <div>
        <div className="card-top">
          <div className="agent-identity">
            <div className="agent-avatar">
              <IconComponent size={24} />
            </div>
            <div className="agent-name-group">
              <h3>
                {agent.name}
                <span className="version-pill">{agent.version}</span>
              </h3>
              <div className="agent-id-tag">{agent.id} • {agent.model}</div>
            </div>
          </div>

          <span className={`badge ${getStatusClass(agent.status)}`}>
            <span className="dot-indicator"></span>
            {agent.status}
          </span>
        </div>

        <div className="business-chip">
          🏢 {agent.businessLine}
        </div>

        {/* Use Case Description */}
        <p className="usecase-text" title={agent.useCase}>
          <strong>Use Case:</strong> {agent.useCase}
        </p>

        {/* Persona Box */}
        <div className="persona-box">
          <div className="persona-title">🎭 Persona:</div>
          <p>{agent.persona}</p>
        </div>

        {/* Publish Date & Revision Date Grid */}
        <div className="meta-grid">
          <div className="meta-item">
            <p>Publish Date</p>
            <p><Calendar size={12} style={{ display: 'inline', marginRight: '4px' }} />{agent.publishDate}</p>
          </div>
          <div className="meta-item">
            <p>Last Revision Date</p>
            <p><Clock size={12} style={{ display: 'inline', marginRight: '4px' }} />{agent.revisionDate}</p>
          </div>
        </div>

        {/* Token & Credit Usage */}
        <div className="usage-section">
          <div className="usage-header">
            <span className="usage-title">Credits / Token Usage</span>
            <span className="usage-amount">
              {formatTokens(agent.tokensUsed)} ({formatCurrency(agent.creditsUsed)})
            </span>
          </div>
          <div className="progress-bar-bg" title={`Used $${agent.creditsUsed} of $${agent.monthlyBudgetCap} cap`}>
            <div 
              className="progress-bar-fill" 
              style={{ 
                width: `${usagePercent}%`,
                background: usagePercent > 85 ? 'linear-gradient(90deg, #f59e0b, #ef4444)' : undefined
              }}
            ></div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            <span>Monthly Cap: ${agent.monthlyBudgetCap}</span>
            <span>{usagePercent}% Cap Used</span>
          </div>
        </div>
      </div>

      {/* Quick Action Footer */}
      <div className="card-actions">
        <button className="btn btn-secondary" style={{ flex: 1, fontSize: '0.8rem', padding: '0.5rem' }} onClick={() => onViewDetails(agent)}>
          <History size={14} />
          <span>Details & Revisions</span>
        </button>

        <button className="btn btn-secondary" style={{ padding: '0.5rem' }} title="Revise Metadata or Bump Version" onClick={() => onReviseVersion(agent)}>
          <Edit3 size={14} />
        </button>

        <button className="btn btn-primary" style={{ padding: '0.5rem 0.85rem', fontSize: '0.8rem' }} onClick={() => onTestSandbox(agent)}>
          <Play size={14} />
          <span>Sandbox</span>
        </button>
      </div>
    </div>
  );
}

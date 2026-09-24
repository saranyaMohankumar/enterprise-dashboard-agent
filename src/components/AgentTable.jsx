import React from 'react';
import { Bot, History, Edit3, Play, Calendar, Clock, Cpu } from 'lucide-react';

export default function AgentTable({ agents, onViewDetails, onTestSandbox, onReviseVersion }) {
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

  return (
    <div className="table-container">
      <table className="agents-table">
        <thead>
          <tr>
            <th>Agent Name & ID</th>
            <th>Business Line</th>
            <th>Version</th>
            <th>Publish Date</th>
            <th>Revision Date</th>
            <th>Persona Summary</th>
            <th>Use Case (Description)</th>
            <th>Token & Credit Usage</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {agents.map((agent) => (
            <tr key={agent.id}>
              <td>
                <div className="cell-agent-info">
                  <div>
                    <div className="cell-agent-name">{agent.name}</div>
                    <div className="agent-id-tag">{agent.id} • {agent.model}</div>
                  </div>
                </div>
              </td>

              <td>
                <span className="business-chip" style={{ margin: 0 }}>
                  {agent.businessLine}
                </span>
              </td>

              <td>
                <span className="version-pill">{agent.version}</span>
              </td>

              <td className="cell-date">
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Calendar size={13} style={{ color: 'var(--text-muted)' }} />
                  {agent.publishDate}
                </span>
              </td>

              <td className="cell-date">
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--accent-purple)' }}>
                  <Clock size={13} />
                  {agent.revisionDate}
                </span>
              </td>

              <td>
                <div style={{ maxWidth: '180px', fontSize: '0.8rem', color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={agent.persona}>
                  🎭 {agent.persona}
                </div>
              </td>

              <td>
                <div className="cell-usecase" title={agent.useCase}>
                  {agent.useCase}
                </div>
              </td>

              <td>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  {formatTokens(agent.tokensUsed)}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)' }}>
                  {formatCurrency(agent.creditsUsed)}
                </div>
              </td>

              <td>
                <span className={`badge ${getStatusClass(agent.status)}`}>
                  <span className="dot-indicator"></span>
                  {agent.status}
                </span>
              </td>

              <td>
                <div style={{ display: 'flex', gap: '0.35rem' }}>
                  <button className="btn-icon-only" title="View Details & Revision History" onClick={() => onViewDetails(agent)}>
                    <History size={15} />
                  </button>
                  <button className="btn-icon-only" title="Revise Metadata / Bump Version" onClick={() => onReviseVersion(agent)}>
                    <Edit3 size={15} />
                  </button>
                  <button className="btn-icon-only" title="Test in Sandbox" onClick={() => onTestSandbox(agent)}>
                    <Play size={15} style={{ color: 'var(--primary)' }} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

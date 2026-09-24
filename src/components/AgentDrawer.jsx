import React from 'react';
import { X, Calendar, Clock, Cpu, DollarSign, Shield, User, FileText, History, CheckCircle2 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function AgentDrawer({ agent, onClose, onReviseVersion, onTestSandbox }) {
  if (!agent) return null;

  const formatTokens = (num) => {
    if (!num) return '0';
    if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(2) + 'B';
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + 'M';
    if (num >= 1_000) return (num / 1_000).toFixed(1) + 'K';
    return num.toLocaleString();
  };

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val || 0);
  };

  return (
    <div className="overlay" onClick={onClose}>
      <div className="drawer-container" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <span className="version-pill">{agent.version}</span>
              <span className="agent-id-tag">{agent.id}</span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: 700 }}>
              {agent.name}
            </h2>
          </div>
          <button className="btn-icon-only" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="drawer-body">
          {/* Top Dates & Line of Business Overview */}
          <div className="meta-grid" style={{ gridTemplateColumns: '1fr 1fr 1fr', padding: '1rem' }}>
            <div className="meta-item">
              <p>Business Line</p>
              <p style={{ color: 'var(--primary)', fontFamily: 'var(--font-body)' }}>{agent.businessLine}</p>
            </div>
            <div className="meta-item">
              <p>Publish Date</p>
              <p><Calendar size={13} style={{ display: 'inline', marginRight: '4px' }} />{agent.publishDate}</p>
            </div>
            <div className="meta-item">
              <p>Revision Date</p>
              <p style={{ color: 'var(--accent-purple)' }}>
                <Clock size={13} style={{ display: 'inline', marginRight: '4px' }} />{agent.revisionDate}
              </p>
            </div>
          </div>

          {/* Quick Actions Bar */}
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => onTestSandbox(agent)}>
              Test Agent in Sandbox
            </button>
            <button className="btn btn-secondary" style={{ flex: 1 }} onClick={() => onReviseVersion(agent)}>
              Revise / Bump Version
            </button>
          </div>

          {/* Agent Persona & Description */}
          <div>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <FileText size={16} style={{ color: 'var(--primary)' }} />
              Agent Use Case (Description)
            </h3>
            <div style={{ backgroundColor: 'var(--bg-surface)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', fontSize: '0.88rem', lineHeight: 1.5, color: 'var(--text-secondary)' }}>
              {agent.useCase}
            </div>
          </div>

          <div>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              🎭 Agent Persona Specification
            </h3>
            <div style={{ backgroundColor: 'var(--bg-surface)', borderLeft: '3px solid var(--secondary)', padding: '1rem', borderRadius: '0 var(--radius-md) var(--radius-md) 0', fontSize: '0.88rem', color: 'var(--text-primary)' }}>
              {agent.persona}
            </div>
          </div>

          {/* Governance & Owner details */}
          <div className="meta-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
            <div className="meta-item">
              <p>Enterprise Owner</p>
              <p style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}>{agent.owner}</p>
            </div>
            <div className="meta-item">
              <p>Model Architecture</p>
              <p>{agent.model}</p>
            </div>
            <div className="meta-item">
              <p>Data Classification</p>
              <p style={{ color: 'var(--accent-amber)', fontFamily: 'var(--font-body)' }}>{agent.dataClassification || 'Internal'}</p>
            </div>
            <div className="meta-item">
              <p>Current Status</p>
              <p style={{ color: 'var(--accent-emerald)', fontFamily: 'var(--font-body)' }}>{agent.status}</p>
            </div>
          </div>

          {/* Attached Guardrails */}
          {agent.guardrails && agent.guardrails.length > 0 && (
            <div>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Shield size={16} style={{ color: 'var(--accent-emerald)' }} />
                Active Enterprise Guardrails
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {agent.guardrails.map((g, i) => (
                  <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#34d399', border: '1px solid rgba(16, 185, 129, 0.25)', padding: '0.3rem 0.65rem', borderRadius: 'var(--radius-sm)', fontSize: '0.78rem', fontWeight: 500 }}>
                    <CheckCircle2 size={12} />
                    {g}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Token & Credit Usage Graph */}
          <div>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Cpu size={16} style={{ color: 'var(--secondary)' }} />
              Token Consumption & Credit Spend History
            </h3>
            <div style={{ backgroundColor: 'var(--bg-surface)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '0.85rem' }}>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Tokens Used: </span>
                  <strong style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>{formatTokens(agent.tokensUsed)}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Credits Spent: </span>
                  <strong style={{ color: 'var(--accent-emerald)', fontFamily: 'var(--font-mono)' }}>{formatCurrency(agent.creditsUsed)}</strong>
                </div>
              </div>

              {agent.usageTrend && agent.usageTrend.length > 0 && (
                <div style={{ height: '180px', width: '100%' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={agent.usageTrend}>
                      <defs>
                        <linearGradient id="colorTokens" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="month" stroke="#6b7280" fontSize={11} />
                      <YAxis stroke="#6b7280" fontSize={11} tickFormatter={(val) => `${(val/1000000).toFixed(0)}M`} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', borderRadius: '8px', color: '#fff' }} 
                        formatter={(val) => [`${(val/1000000).toFixed(1)}M Tokens`, 'Tokens']}
                      />
                      <Area type="monotone" dataKey="tokens" stroke="#06b6d4" fillOpacity={1} fill="url(#colorTokens)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>
          </div>

          {/* Version Revision History Timeline */}
          <div>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <History size={16} style={{ color: 'var(--accent-purple)' }} />
              Publish & Revision History
            </h3>
            <div className="timeline">
              {agent.revisions && agent.revisions.length > 0 ? (
                agent.revisions.map((rev, index) => (
                  <div className="timeline-item" key={index}>
                    <div className="timeline-dot"></div>
                    <div className="timeline-content">
                      <div className="timeline-header">
                        <span className="timeline-version">{rev.version}</span>
                        <span className="timeline-date">{rev.date}</span>
                      </div>
                      <div className="timeline-author">Released by: {rev.author}</div>
                      <div className="timeline-notes">{rev.notes}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="timeline-item">
                  <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <div className="timeline-header">
                      <span className="timeline-version">{agent.version}</span>
                      <span className="timeline-date">{agent.publishDate}</span>
                    </div>
                    <div className="timeline-notes">Initial release version.</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

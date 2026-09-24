import React from 'react';
import { ShieldCheck, Lock, FileCheck, RefreshCw, AlertTriangle, CheckCircle } from 'lucide-react';

export default function GovernanceView() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div className="chart-card">
        <h3>
          <ShieldCheck size={20} style={{ color: 'var(--accent-emerald)' }} />
          Enterprise AI Lifecycle Governance Policy & Compliance Matrix
        </h3>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
          All enterprise agents published within the organization must comply with automated security guardrails, data classification protocols, and strict semantic versioning standards prior to production promotion.
        </p>

        <div className="analytics-grid">
          <div style={{ backgroundColor: 'var(--bg-surface)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <h4 style={{ color: 'var(--text-primary)', fontSize: '0.95rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Lock size={16} style={{ color: 'var(--primary)' }} />
              Data Classification Standards
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                <CheckCircle size={14} style={{ color: 'var(--accent-emerald)', marginTop: '2px', flexShrink: 0 }} />
                <span><strong>Public:</strong> Allowed for general marketing and external customer facing tools. No internal credentials required.</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                <CheckCircle size={14} style={{ color: 'var(--accent-emerald)', marginTop: '2px', flexShrink: 0 }} />
                <span><strong>Internal Operations:</strong> Restricted to authenticated employees. Sanitized before LLM inference.</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                <CheckCircle size={14} style={{ color: 'var(--accent-emerald)', marginTop: '2px', flexShrink: 0 }} />
                <span><strong>Confidential / Financial:</strong> Requires automated PII redaction and zero-data-retention LLM endpoint.</span>
              </li>
            </ul>
          </div>

          <div style={{ backgroundColor: 'var(--bg-surface)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <h4 style={{ color: 'var(--text-primary)', fontSize: '0.95rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <RefreshCw size={16} style={{ color: 'var(--accent-purple)' }} />
              Lifecycle Stage Definitions
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                <span className="badge badge-staging" style={{ fontSize: '0.65rem' }}>Staging</span>
                <span>Pre-production sandbox validation. Evaluated against enterprise benchmark dataset.</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                <span className="badge badge-published" style={{ fontSize: '0.65rem' }}>Published</span>
                <span>Active in production environment with live token monitoring and quota caps.</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                <span className="badge badge-deprecated" style={{ fontSize: '0.65rem' }}>Deprecated</span>
                <span>Phased out version. API key endpoints restricted; traffic redirected to newer major revision.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

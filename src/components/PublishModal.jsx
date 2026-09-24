import React, { useState, useEffect } from 'react';
import { X, Plus, Edit3, Shield, Bot } from 'lucide-react';
import { BUSINESS_LINES, LIFECYCLE_STATUSES, AVAILABLE_MODELS } from '../data/mockAgents';

export default function PublishModal({ isOpen, onClose, onSave, editingAgent }) {
  if (!isOpen) return null;

  const isRevisionMode = Boolean(editingAgent);
  const currentDateStr = new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    name: '',
    icon: 'Bot',
    businessLine: BUSINESS_LINES[1] || 'Finance & Accounting',
    useCase: '',
    persona: '',
    version: 'v1.0.0',
    publishDate: currentDateStr,
    revisionDate: currentDateStr,
    status: 'Published',
    owner: '',
    model: AVAILABLE_MODELS[0],
    monthlyBudgetCap: 3000,
    revisionAuthor: '',
    revisionNotes: '',
    dataClassification: 'Internal Operations'
  });

  useEffect(() => {
    if (editingAgent) {
      setFormData({
        ...editingAgent,
        revisionDate: currentDateStr,
        revisionAuthor: '',
        revisionNotes: `Revision update to ${editingAgent.version}`
      });
    } else {
      setFormData({
        name: '',
        icon: 'Bot',
        businessLine: BUSINESS_LINES[1] || 'Finance & Accounting',
        useCase: '',
        persona: '',
        version: 'v1.0.0',
        publishDate: currentDateStr,
        revisionDate: currentDateStr,
        status: 'Published',
        owner: '',
        model: AVAILABLE_MODELS[0],
        monthlyBudgetCap: 3000,
        revisionAuthor: '',
        revisionNotes: 'Initial published release.',
        dataClassification: 'Internal Operations'
      });
    }
  }, [editingAgent]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.useCase.trim()) return;

    let updatedRevisions = editingAgent?.revisions ? [...editingAgent.revisions] : [];

    if (isRevisionMode) {
      // Add new revision entry at top of revisions array
      updatedRevisions.unshift({
        version: formData.version,
        date: formData.revisionDate,
        author: formData.revisionAuthor.trim() || formData.owner || 'Enterprise Admin',
        notes: formData.revisionNotes.trim() || 'Metadata update & revision release.'
      });
    } else {
      // Initial release revision
      updatedRevisions = [{
        version: formData.version,
        date: formData.publishDate,
        author: formData.owner || 'Enterprise Architect',
        notes: formData.revisionNotes || 'Initial published release.'
      }];
    }

    const payload = {
      ...formData,
      id: editingAgent?.id || `AGT-${formData.businessLine.substring(0,3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`,
      tokensUsed: editingAgent?.tokensUsed || 0,
      creditsUsed: editingAgent?.creditsUsed || 0,
      monthlyBudgetCap: Number(formData.monthlyBudgetCap) || 3000,
      revisions: updatedRevisions,
      guardrails: editingAgent?.guardrails || ["PII Protection", "Audit Logging"],
      usageTrend: editingAgent?.usageTrend || [
        { month: 'Jul 26', tokens: 1000000, cost: 20 },
        { month: 'Aug 26', tokens: 2500000, cost: 50 },
        { month: 'Sep 26', tokens: 4000000, cost: 80 }
      ]
    };

    onSave(payload);
    onClose();
  };

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>
            {isRevisionMode ? `Revise Agent: ${editingAgent.name}` : '🚀 Publish New Enterprise Agent'}
          </h2>
          <button className="btn-icon-only" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {/* Basic Identity */}
            <div className="form-row">
              <div className="form-group">
                <label>Agent Name *</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g., FinAudit Sentinel" 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Business Line *</label>
                <select 
                  value={formData.businessLine}
                  onChange={(e) => setFormData({ ...formData, businessLine: e.target.value })}
                >
                  {BUSINESS_LINES.filter(b => b !== 'All Business Lines').map((b, i) => (
                    <option key={i} value={b}>{b}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Versioning & Dates */}
            <div className="form-row">
              <div className="form-group">
                <label>Version *</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g., v2.4.0" 
                  value={formData.version}
                  onChange={(e) => setFormData({ ...formData, version: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>{isRevisionMode ? 'Revision Date' : 'Publish Date'}</label>
                <input 
                  type="date" 
                  value={isRevisionMode ? formData.revisionDate : formData.publishDate}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    [isRevisionMode ? 'revisionDate' : 'publishDate']: e.target.value 
                  })}
                />
              </div>
            </div>

            {/* Persona & Description */}
            <div className="form-group">
              <label>Agent Persona Specification *</label>
              <textarea 
                rows="2" 
                required
                placeholder="Describe tone, domain expertise, role (e.g., Senior Forensic Accountant with conservative risk appetite...)"
                value={formData.persona}
                onChange={(e) => setFormData({ ...formData, persona: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Agent Use Case (Description) *</label>
              <textarea 
                rows="3" 
                required
                placeholder="Detail business problem solved, operational workflow, and input/output targets..."
                value={formData.useCase}
                onChange={(e) => setFormData({ ...formData, useCase: e.target.value })}
              />
            </div>

            {/* Owner & Model & Status */}
            <div className="form-row">
              <div className="form-group">
                <label>Department Owner / Lead</label>
                <input 
                  type="text" 
                  placeholder="e.g., Sarah Chen (VP Finance)" 
                  value={formData.owner}
                  onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Model Architecture</label>
                <select 
                  value={formData.model}
                  onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                >
                  {AVAILABLE_MODELS.map((m, i) => (
                    <option key={i} value={m}>{m}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Lifecycle Status</label>
                <select 
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  {LIFECYCLE_STATUSES.filter(s => s !== 'All Statuses').map((s, i) => (
                    <option key={i} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Monthly Budget Cap ($ USD)</label>
                <input 
                  type="number" 
                  placeholder="5000" 
                  value={formData.monthlyBudgetCap}
                  onChange={(e) => setFormData({ ...formData, monthlyBudgetCap: e.target.value })}
                />
              </div>
            </div>

            {/* Revision Changelog Notes */}
            <div className="form-group" style={{ backgroundColor: 'var(--bg-surface)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <label style={{ color: 'var(--accent-purple)' }}>📝 Revision Changelog Notes</label>
              <div className="form-row" style={{ marginTop: '0.5rem' }}>
                <input 
                  type="text" 
                  placeholder="Revision Author (e.g. Alex Rivera)"
                  value={formData.revisionAuthor}
                  onChange={(e) => setFormData({ ...formData, revisionAuthor: e.target.value })}
                />
                <input 
                  type="text" 
                  placeholder="What changed in this revision?"
                  value={formData.revisionNotes}
                  onChange={(e) => setFormData({ ...formData, revisionNotes: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {isRevisionMode ? 'Save Revision & Update' : 'Publish Agent'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { X, Send, Bot, User, Sparkles, ShieldAlert, Cpu } from 'lucide-react';

export default function SandboxModal({ agent, onClose }) {
  if (!agent) return null;

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      sender: 'agent',
      text: `Hello! I am ${agent.name} (${agent.version}), configured with the "${agent.persona}" persona. How can I assist with ${agent.businessLine} operations today?`
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsg = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { sender: 'user', text: userMsg }]);
    setIsTyping(true);

    setTimeout(() => {
      let botResponse = `[${agent.name} - ${agent.version} Response]\n\n`;

      if (agent.businessLine.includes('Finance')) {
        botResponse += `Based on standard GAAP/SOX guidelines, I have analyzed your request regarding "${userMsg.substring(0, 30)}...". No variance or anomaly detected in the general ledger stream. Audit trail entry logged under ID #${Math.floor(100000 + Math.random() * 900000)}.`;
      } else if (agent.businessLine.includes('IT')) {
        botResponse += `I've checked the telemetry logs for "${userMsg.substring(0, 30)}...". Standard L1 remediation executed: DNS cached flushed, Okta auth token renewed. Status code: 200 OK. Escalation required? Negative.`;
      } else if (agent.businessLine.includes('Legal')) {
        botResponse += `Legal risk assessment for request: Risk Score 2/10 (Low). Clause matches enterprise MSA playbook v4. Recommended redline: None required.`;
      } else {
        botResponse += `Under my operational scope for ${agent.useCase.substring(0, 50)}..., I have processed your input. All guardrails (${agent.guardrails?.join(', ') || 'PII Protection'}) passed successfully.`;
      }

      setMessages((prev) => [...prev, { sender: 'agent', text: botResponse }]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '720px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div className="agent-avatar" style={{ width: '38px', height: '38px' }}>
              <Bot size={20} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.15rem' }}>Agent Sandbox: {agent.name}</h2>
              <div className="agent-id-tag">{agent.id} • {agent.version} • {agent.model}</div>
            </div>
          </div>
          <button className="btn-icon-only" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body" style={{ gap: '0.85rem' }}>
          {/* Persona Header Info */}
          <div className="persona-box" style={{ margin: 0, fontSize: '0.82rem' }}>
            <strong>Active Persona:</strong> {agent.persona}
          </div>

          {/* Chat Window */}
          <div className="chat-window">
            <div className="chat-messages">
              {messages.map((m, idx) => (
                <div key={idx} className={`chat-bubble ${m.sender}`}>
                  {m.text}
                </div>
              ))}
              {isTyping && (
                <div className="chat-bubble agent" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
                  <Sparkles size={14} className="spin" />
                  <span>Generating response using {agent.model}...</span>
                </div>
              )}
            </div>

            <form onSubmit={handleSend} className="chat-input-row">
              <input 
                type="text" 
                placeholder={`Test ${agent.name} with a sample enterprise prompt...`}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                style={{ flex: 1 }}
              />
              <button type="submit" className="btn btn-primary" disabled={isTyping || !input.trim()}>
                <Send size={16} />
              </button>
            </form>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            <span>🔒 Enterprise Guardrails: PII Scrubbing Active</span>
            <span>Est. Prompt Cost: ~120 Input Tokens</span>
          </div>
        </div>
      </div>
    </div>
  );
}

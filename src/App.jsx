import React, { useState, useEffect } from 'react';
import { 
  Bot, Search, Plus, Download, Moon, Sun, LayoutGrid, Table, 
  BarChart3, ShieldCheck, Layers, RotateCcw, Filter
} from 'lucide-react';
import { INITIAL_AGENTS, BUSINESS_LINES, LIFECYCLE_STATUSES } from './data/mockAgents';
import MetricCards from './components/MetricCards';
import AgentCard from './components/AgentCard';
import AgentTable from './components/AgentTable';
import AgentDrawer from './components/AgentDrawer';
import PublishModal from './components/PublishModal';
import SandboxModal from './components/SandboxModal';
import AnalyticsView from './components/AnalyticsView';
import GovernanceView from './components/GovernanceView';

export default function App() {
  // Local storage state initialization
  const [agents, setAgents] = useState(() => {
    const saved = localStorage.getItem('enterprise_agents_db');
    return saved ? JSON.parse(saved) : INITIAL_AGENTS;
  });

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('app_theme') || 'dark';
  });

  const [activeTab, setActiveTab] = useState('catalog'); // 'catalog' | 'analytics' | 'governance'
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'

  // Filter & Search Controls
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBusinessLine, setSelectedBusinessLine] = useState('All Business Lines');
  const [selectedStatus, setSelectedStatus] = useState('All Statuses');
  const [sortBy, setSortBy] = useState('revisionDate'); // 'revisionDate' | 'publishDate' | 'tokensUsed' | 'name'

  // Modals & Drawers State
  const [selectedAgent, setSelectedAgent] = useState(null); // Drawer
  const [sandboxAgent, setSandboxAgent] = useState(null); // Sandbox Modal
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [editingAgent, setEditingAgent] = useState(null); // Publish/Edit Modal target

  // Persist agents to localStorage
  useEffect(() => {
    localStorage.setItem('enterprise_agents_db', JSON.stringify(agents));
  }, [agents]);

  // Apply theme dataset attribute
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('app_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Reset to demo data
  const handleResetData = () => {
    if (window.confirm('Reset agent registry back to default enterprise demo dataset?')) {
      setAgents(INITIAL_AGENTS);
      localStorage.removeItem('enterprise_agents_db');
    }
  };

  // Handle Save (Create or Edit)
  const handleSaveAgent = (agentData) => {
    setAgents((prev) => {
      const existingIdx = prev.findIndex((a) => a.id === agentData.id);
      if (existingIdx >= 0) {
        const copy = [...prev];
        copy[existingIdx] = agentData;
        return copy;
      }
      return [agentData, ...prev];
    });

    // If active drawer is open for this agent, update it
    if (selectedAgent && selectedAgent.id === agentData.id) {
      setSelectedAgent(agentData);
    }
  };

  // Export JSON Report
  const handleExportReport = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(agents, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `Enterprise_Agent_Registry_Report_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Filtering & Sorting Logic
  const filteredAgents = agents.filter((agent) => {
    const matchesSearch = 
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.persona.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.useCase.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesLine = selectedBusinessLine === 'All Business Lines' || agent.businessLine === selectedBusinessLine;
    const matchesStatus = selectedStatus === 'All Statuses' || agent.status === selectedStatus;

    return matchesSearch && matchesLine && matchesStatus;
  }).sort((a, b) => {
    if (sortBy === 'revisionDate') {
      return new Date(b.revisionDate || '1970-01-01') - new Date(a.revisionDate || '1970-01-01');
    }
    if (sortBy === 'publishDate') {
      return new Date(b.publishDate || '1970-01-01') - new Date(a.publishDate || '1970-01-01');
    }
    if (sortBy === 'tokensUsed') {
      return (b.tokensUsed || 0) - (a.tokensUsed || 0);
    }
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    }
    return 0;
  });

  return (
    <div className="app-container">
      {/* App Header */}
      <header className="app-header">
        <div className="brand-section">
          <div className="brand-logo">
            <Bot size={28} />
          </div>
          <div className="brand-title-group">
            <h1>Enterprise Agent Matrix</h1>
            <p className="brand-subtitle">Lifecycle Governance, Versioning & Token Consumption Dashboard</p>
          </div>
        </div>

        <div className="header-actions">
          <button className="btn btn-secondary" onClick={handleExportReport} title="Export Agent Registry JSON Report">
            <Download size={16} />
            <span>Export Registry</span>
          </button>

          <button className="btn btn-secondary" onClick={handleResetData} title="Reset Demo Data">
            <RotateCcw size={16} />
          </button>

          <button className="btn-icon-only" onClick={toggleTheme} title="Toggle Dark/Light Mode">
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button 
            className="btn btn-primary" 
            onClick={() => {
              setEditingAgent(null);
              setIsPublishModalOpen(true);
            }}
          >
            <Plus size={18} />
            <span>Publish Agent</span>
          </button>
        </div>
      </header>

      {/* Metric Cards Banner */}
      <MetricCards agents={agents} />

      {/* Navigation Tabs */}
      <nav className="nav-tabs">
        <button 
          className={`tab-btn ${activeTab === 'catalog' ? 'active' : ''}`}
          onClick={() => setActiveTab('catalog')}
        >
          <Layers size={18} />
          <span>Agent Catalog & Lifecycle Matrix ({filteredAgents.length})</span>
        </button>

        <button 
          className={`tab-btn ${activeTab === 'analytics' ? 'active' : ''}`}
          onClick={() => setActiveTab('analytics')}
        >
          <BarChart3 size={18} />
          <span>Cost & Token Consumption Analytics</span>
        </button>

        <button 
          className={`tab-btn ${activeTab === 'governance' ? 'active' : ''}`}
          onClick={() => setActiveTab('governance')}
        >
          <ShieldCheck size={18} />
          <span>Governance & Policy Compliance</span>
        </button>
      </nav>

      {/* Tab Content 1: Catalog */}
      {activeTab === 'catalog' && (
        <>
          {/* Controls Toolbar */}
          <div className="toolbar">
            <div className="search-box">
              <Search size={16} className="search-icon" />
              <input 
                type="text" 
                placeholder="Search agents by name, ID, persona, or use case..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="filters-group">
              {/* Business Line Filter */}
              <select 
                className="filter-select"
                value={selectedBusinessLine}
                onChange={(e) => setSelectedBusinessLine(e.target.value)}
              >
                {BUSINESS_LINES.map((b, i) => (
                  <option key={i} value={b}>{b}</option>
                ))}
              </select>

              {/* Status Filter */}
              <select 
                className="filter-select"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                {LIFECYCLE_STATUSES.map((s, i) => (
                  <option key={i} value={s}>{s}</option>
                ))}
              </select>

              {/* Sort By Selector */}
              <select 
                className="filter-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="revisionDate">Sort: Last Revision Date</option>
                <option value="publishDate">Sort: Publish Date</option>
                <option value="tokensUsed">Sort: Highest Token Usage</option>
                <option value="name">Sort: Agent Name</option>
              </select>

              {/* View Toggle */}
              <div className="view-toggle">
                <button 
                  className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                  title="Card Grid View"
                >
                  <LayoutGrid size={16} />
                </button>
                <button 
                  className={`view-btn ${viewMode === 'table' ? 'active' : ''}`}
                  onClick={() => setViewMode('table')}
                  title="Tabular Matrix View"
                >
                  <Table size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Agents List Display */}
          {filteredAgents.length === 0 ? (
            <div className="empty-state">
              <Bot size={48} style={{ color: 'var(--text-muted)' }} />
              <h3>No Enterprise Agents Found</h3>
              <p>Try adjusting your search criteria or filter selections.</p>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="agents-grid">
              {filteredAgents.map((agent) => (
                <AgentCard 
                  key={agent.id}
                  agent={agent}
                  onViewDetails={setSelectedAgent}
                  onTestSandbox={setSandboxAgent}
                  onReviseVersion={(agt) => {
                    setEditingAgent(agt);
                    setIsPublishModalOpen(true);
                  }}
                />
              ))}
            </div>
          ) : (
            <AgentTable 
              agents={filteredAgents}
              onViewDetails={setSelectedAgent}
              onTestSandbox={setSandboxAgent}
              onReviseVersion={(agt) => {
                setEditingAgent(agt);
                setIsPublishModalOpen(true);
              }}
            />
          )}
        </>
      )}

      {/* Tab Content 2: Analytics */}
      {activeTab === 'analytics' && <AnalyticsView agents={agents} />}

      {/* Tab Content 3: Governance */}
      {activeTab === 'governance' && <GovernanceView />}

      {/* Side Drawer for Agent Details & Version History */}
      {selectedAgent && (
        <AgentDrawer 
          agent={selectedAgent}
          onClose={() => setSelectedAgent(null)}
          onTestSandbox={(agt) => {
            setSelectedAgent(null);
            setSandboxAgent(agt);
          }}
          onReviseVersion={(agt) => {
            setSelectedAgent(null);
            setEditingAgent(agt);
            setIsPublishModalOpen(true);
          }}
        />
      )}

      {/* Modal for Publishing / Editing Agent */}
      <PublishModal 
        isOpen={isPublishModalOpen}
        onClose={() => {
          setIsPublishModalOpen(false);
          setEditingAgent(null);
        }}
        onSave={handleSaveAgent}
        editingAgent={editingAgent}
      />

      {/* Modal for Testing Sandbox Playground */}
      {sandboxAgent && (
        <SandboxModal 
          agent={sandboxAgent}
          onClose={() => setSandboxAgent(null)}
        />
      )}
    </div>
  );
}

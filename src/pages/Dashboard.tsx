import React, { useState } from 'react';
import { 
  Users, UserCheck, Plane, Award
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, PieChart, Pie, Cell
} from 'recharts';
import { Plus } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { mockLeads } from '../MockData';
import Modal from '../components/Modal';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const kpis = [
    { title: 'Total Leads', value: mockLeads.length, icon: Users, color: 'var(--primary)', trend: '+12%' },
    { title: 'Active Students', value: mockLeads.filter(l => l.stage !== 'New Enquiry' && l.stage !== 'Closed/Lost').length, icon: UserCheck, color: 'var(--success)', trend: '+5%' },
    { title: 'Visa Processing', value: mockLeads.filter(l => l.stage === 'Visa Processing').length, icon: Plane, color: 'var(--warning)', trend: '+18%' },
    { title: 'Placement Success', value: mockLeads.filter(l => l.stage === 'Successfully Reached Abroad').length, icon: Award, color: 'var(--teal)', trend: '+2%' },
  ];

  const funnelData = [
    { name: 'Enquiry', value: 500 },
    { name: 'OET Training', value: 320 },
    { name: 'Documentation', value: 210 },
    { name: 'Visa Process', value: 150 },
    { name: 'Reached Abroad', value: 85 },
  ];

  const branchData = [
    { name: 'Kottayam HQ', leads: 400, success: 80 },
    { name: 'Kochi Branch', leads: 300, success: 65 },
    { name: 'Trivandrum', leads: 250, success: 40 },
  ];

  const oetData = [
    { name: 'Passed', value: 65 },
    { name: 'Pending', value: 25 },
    { name: 'Failed', value: 10 },
  ];
  const COLORS = ['var(--success)', 'var(--warning)', 'var(--danger)'];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(false);
    alert('Quick Lead Successfully Created!');
  };

  return (
    <div className="dashboard animate-fade-in mt-4">
      <div className="dashboard-header">
        <div>
          <h1 className="page-title">Welcome back, {user?.name.split(' ')[0]} 👋</h1>
          <p className="page-subtitle">Here is what's happening with your leads today.</p>
        </div>
        <div className="header-actions flex gap-2">
          <select className="input-field" style={{ padding: '0.5rem', width: 'auto', border: '1px solid var(--card-border)', background: 'var(--card-bg)' }}>
            <option>This Month</option>
            <option>Last 3 Months</option>
            <option>This Year</option>
          </select>
          <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
            <Plus size={16} /> Quick Lead
          </button>
        </div>
      </div>

      <div className="kpi-grid">
        {kpis.map((kpi, index) => (
          <div key={index} className="kpi-card glass-card">
            <div className="kpi-icon" style={{ backgroundColor: `${kpi.color}20`, color: kpi.color }}>
              <kpi.icon size={24} />
            </div>
            <div className="kpi-content">
              <p className="kpi-title">{kpi.title}</p>
              <div className="kpi-value-row">
                <h3 className="kpi-value">{kpi.value}</h3>
                <span className="kpi-trend positive">{kpi.trend}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="charts-grid">
        <div className="chart-card glass-card">
          <h3 className="card-title">Lead Conversion Funnel</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={funnelData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--card-border)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--text-muted)' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--text-muted)' }} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: 'var(--shadow-md)', background: 'var(--card-bg)', backdropFilter: 'blur(10px)' }} />
                <Area type="monotone" dataKey="value" stroke="var(--primary)" fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-card glass-card">
          <h3 className="card-title">OET Success Rate</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={oetData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {oetData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: 'var(--shadow-md)', background: 'var(--card-bg)' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="pie-legend">
              {oetData.map((entry, index) => (
                <div key={index} className="legend-item">
                  <span className="legend-color" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                  <span className="legend-label">{entry.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="chart-card glass-card full-width">
          <h3 className="card-title">Branch Performance Comparison</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={branchData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--card-border)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--text-muted)' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--text-muted)' }} />
                <Tooltip cursor={{ fill: 'rgba(0,0,0,0.05)' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: 'var(--shadow-md)', background: 'var(--card-bg)' }} />
                <Bar dataKey="leads" name="Total Leads" fill="var(--primary-light)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="success" name="Successful Placements" fill="var(--teal)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create Quick Lead">
        <form onSubmit={handleSave}>
          <div className="form-group-modal">
            <label>Student Full Name</label>
            <input type="text" placeholder="e.g. John Doe" required />
          </div>
          <div className="form-group-modal">
            <label>Phone Number</label>
            <input type="tel" placeholder="+91 9876543210" required />
          </div>
          <div className="form-group-modal">
            <label>Lead Source</label>
            <select required>
              <option value="walkin">Walk-in</option>
              <option value="whatsapp">WhatsApp</option>
              <option value="website">Website</option>
              <option value="referral">Referral</option>
            </select>
          </div>
          <div className="modal-actions">
            <button type="button" className="btn btn-outline" onClick={() => setIsModalOpen(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">Save Lead</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Dashboard;

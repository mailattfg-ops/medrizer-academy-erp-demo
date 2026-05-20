import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { mockActivities, mockUsers } from '../MockData';
import { ShieldCheck, Activity, Clock, Search, Plus } from 'lucide-react';
import Modal from '../components/Modal';
import './Dashboard.css'; // Reusing dashboard styles for grid

const StaffMonitoring: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (user?.role === 'Junior Staff') {
    return (
      <div className="glass-card p-8 text-center mt-8">
        <ShieldCheck size={48} className="text-danger mx-auto mb-4" />
        <h2>Access Denied</h2>
        <p className="text-muted">You do not have permission to view staff monitoring.</p>
      </div>
    );
  }

  const staffStats = [
    { name: 'Admin User', role: 'Super Admin', leads: 150, conversion: '12%', calls: 450, oet: 45 },
    { name: 'Senior Staff', role: 'Senior Staff', leads: 120, conversion: '10%', calls: 320, oet: 30 },
    { name: 'Junior Staff', role: 'Junior Staff', leads: 230, conversion: '5%', calls: 890, oet: 20 },
  ];

  const filteredStaff = staffStats.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'All' || s.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(false);
    alert('Leads successfully assigned to staff!');
  };

  return (
    <div className="animate-fade-in mt-4">
      <div className="dashboard-header">
        <div>
          <h1 className="page-title">Staff Monitoring</h1>
          <p className="page-subtitle">Track KPIs, conversions, and activity logs.</p>
        </div>
        <div className="flex gap-2">
          <select 
            className="input-field"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            style={{ padding: '0.5rem', border: '1px solid var(--card-border)', background: 'var(--card-bg)' }}
          >
            <option value="All">All Roles</option>
            <option value="Super Admin">Super Admin</option>
            <option value="Branch Admin">Branch Admin</option>
            <option value="Senior Staff">Senior Staff</option>
            <option value="Junior Staff">Junior Staff</option>
          </select>
          <div className="search-box" style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)' }}>
            <Search size={16} className="text-muted ml-2" />
            <input 
              type="text" 
              placeholder="Search staff name..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="ml-2 bg-transparent border-none outline-none text-sm p-2 w-48"
            />
          </div>
          <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
            <Plus size={16} /> Assign Leads
          </button>
        </div>
      </div>

      <div className="charts-grid mb-6">
        <div className="chart-card glass-card full-width">
          <h3 className="card-title">Staff KPIs</h3>
          <div className="overflow-x-auto">
            <table className="crm-table w-full text-left">
              <thead>
                <tr>
                  <th>Staff Member</th>
                  <th>Role</th>
                  <th>Assigned Leads</th>
                  <th>Calls Made</th>
                  <th>OET Admissions</th>
                  <th>Conversion Rate</th>
                </tr>
              </thead>
              <tbody>
                {filteredStaff.map((staff, i) => (
                  <tr key={i}>
                    <td className="font-semibold">{staff.name}</td>
                    <td><span className="badge badge-info">{staff.role}</span></td>
                    <td>{staff.leads}</td>
                    <td>{staff.calls}</td>
                    <td>{staff.oet}</td>
                    <td className="text-success font-semibold">{staff.conversion}</td>
                  </tr>
                ))}
                {filteredStaff.length === 0 && (
                  <tr><td colSpan={6} className="text-center p-8 text-muted">No staff found matching your search.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-card glass-card full-width">
          <h3 className="card-title flex items-center gap-2"><Activity size={18} /> Global Activity Timeline</h3>
          <div className="timeline mt-4 pl-4">
            {mockActivities.map(act => {
              const staff = mockUsers.find(u => u.id === act.userId);
              return (
                <div key={act.id} className="timeline-item mb-4">
                  <div className="timeline-icon bg-primary"><Clock size={12} color="white" /></div>
                  <div className="timeline-content">
                    <p>
                      <strong>{staff?.name}</strong> {act.action} on <strong>{act.entityId}</strong>
                    </p>
                    <p className="text-sm text-muted mt-1">{act.details}</p>
                    <span className="time mt-2"><Clock size={10} /> {new Date(act.timestamp).toLocaleString()}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Assign Leads to Staff">
        <form onSubmit={handleSave}>
          <div className="form-group-modal">
            <label>Select Staff Member</label>
            <select required>
              <option value="">-- Select Staff --</option>
              {staffStats.map((s, i) => (
                <option key={i} value={s.name}>{s.name} ({s.role})</option>
              ))}
            </select>
          </div>
          <div className="form-group-modal">
            <label>Number of Leads to Assign</label>
            <input type="number" min="1" max="100" placeholder="e.g. 10" required />
          </div>
          <div className="form-group-modal">
            <label>Lead Source Preference</label>
            <select>
              <option value="any">Any Source</option>
              <option value="website">Website Forms</option>
              <option value="whatsapp">WhatsApp Inquiries</option>
            </select>
          </div>
          <div className="modal-actions">
            <button type="button" className="btn btn-outline" onClick={() => setIsModalOpen(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">Assign Leads</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default StaffMonitoring;

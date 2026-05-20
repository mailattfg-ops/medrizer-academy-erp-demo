import React, { useState } from 'react';
import { Activity, Search, Clock, ArrowRightLeft, Plus } from 'lucide-react';
import { mockActivities, mockUsers } from '../MockData';
import { useAuth } from '../contexts/AuthContext';
import Modal from '../components/Modal';

const EnquiryTracking: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAction, setSelectedAction] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  if (user?.role === 'Junior Staff') {
    return (
      <div className="glass-card text-center p-8 mt-8">
        <h2>Access Restricted</h2>
        <p className="text-muted">You do not have clearance to view global tracking logs.</p>
      </div>
    );
  }

  const filteredLogs = mockActivities.filter(act => {
    const staff = mockUsers.find(u => u.id === act.userId);
    const staffMatch = staff?.name.toLowerCase().includes(searchTerm.toLowerCase());
    const leadMatch = act.entityId?.toLowerCase().includes(searchTerm.toLowerCase());
    const actionMatch = selectedAction === 'All' || act.action === selectedAction;
    return (staffMatch || leadMatch) && actionMatch;
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(false);
    alert('Activity Logged Successfully!');
  };

  return (
    <div className="animate-fade-in mt-4">
      <div className="dashboard-header">
        <div>
          <h1 className="page-title">Enquiry Tracking & Audit Log</h1>
          <p className="page-subtitle">Track lead transfers, status changes, and global activities.</p>
        </div>
        <div className="flex gap-2">
          <select 
            className="input-field"
            value={selectedAction}
            onChange={(e) => setSelectedAction(e.target.value)}
            style={{ padding: '0.5rem', border: '1px solid var(--card-border)', background: 'var(--card-bg)' }}
          >
            <option value="All">All Actions</option>
            <option value="Status Update">Status Update</option>
            <option value="Call Logged">Call Logged</option>
            <option value="WhatsApp Sent">WhatsApp Sent</option>
            <option value="Document Uploaded">Document Uploaded</option>
          </select>
          <div className="search-box" style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)' }}>
            <Search size={16} className="text-muted ml-2" />
            <input 
              type="text" 
              placeholder="Search Lead ID or Staff..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="ml-2 bg-transparent border-none outline-none text-sm p-2 w-48"
            />
          </div>
          <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
            <Plus size={16} /> Log Activity
          </button>
        </div>
      </div>

      <div className="glass-card p-6">
        <h3 className="font-semibold mb-4 flex items-center gap-2"><Activity size={18} /> Global System Logs</h3>
        
        <table className="crm-table w-full">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Action / Event</th>
              <th>Staff Member</th>
              <th>Lead Ref.</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-[rgba(0,119,182,0.02)]">
              <td className="text-sm text-muted whitespace-nowrap"><Clock size={12} className="inline mr-1"/> Just now</td>
              <td><span className="badge badge-warning flex items-center gap-1 w-max"><ArrowRightLeft size={12}/> Transferred</span></td>
              <td className="font-semibold">Super Admin</td>
              <td className="text-primary font-mono text-xs">L-1049</td>
              <td className="text-sm">Reassigned from <strong>Senior Staff</strong> to <strong>Junior Staff</strong></td>
            </tr>
            {filteredLogs.map(act => {
              const staff = mockUsers.find(u => u.id === act.userId);
              return (
                <tr key={act.id}>
                  <td className="text-sm text-muted whitespace-nowrap"><Clock size={12} className="inline mr-1"/> {new Date(act.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</td>
                  <td><span className="badge badge-info">{act.action}</span></td>
                  <td className="font-semibold">{staff?.name}</td>
                  <td className="text-primary font-mono text-xs">{act.entityId}</td>
                  <td className="text-sm">{act.details}</td>
                </tr>
              );
            })}
            {filteredLogs.length === 0 && (
              <tr><td colSpan={5} className="text-center p-8 text-muted">No logs found matching your search.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Log Manual Activity">
        <form onSubmit={handleSave}>
          <div className="form-group-modal">
            <label>Lead Reference ID</label>
            <input type="text" placeholder="e.g. L-1050" required />
          </div>
          <div className="form-group-modal">
            <label>Action Category</label>
            <select required>
              <option value="call">Phone Call</option>
              <option value="meeting">In-Person Meeting</option>
              <option value="note">Administrative Note</option>
            </select>
          </div>
          <div className="form-group-modal">
            <label>Activity Details</label>
            <textarea rows={3} placeholder="Describe the activity..." required></textarea>
          </div>
          <div className="modal-actions">
            <button type="button" className="btn btn-outline" onClick={() => setIsModalOpen(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">Save Log</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default EnquiryTracking;

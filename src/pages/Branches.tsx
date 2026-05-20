import React, { useState } from 'react';
import { Building, MapPin, Users, Search, Plus } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Modal from '../components/Modal';

const Branches: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (user?.role !== 'Super Admin') {
    return (
      <div className="glass-card text-center p-8 mt-8">
        <h2>Access Restricted</h2>
        <p className="text-muted">Only Super Admin can manage branches.</p>
      </div>
    );
  }

  const allBranches = [
    { name: 'Kottayam HQ', leads: 450, staff: 5, revenue: '₹4.5M', manager: 'Admin User' },
    { name: 'Kochi Branch', leads: 320, staff: 3, revenue: '₹2.8M', manager: 'Branch Admin' },
    { name: 'Trivandrum', leads: 150, staff: 2, revenue: '₹1.2M', manager: 'To be assigned' },
  ];

  const filteredBranches = allBranches.filter(b => b.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(false);
    alert('New Branch Added!');
  };

  return (
    <div className="animate-fade-in mt-4">
      <div className="dashboard-header">
        <div>
          <h1 className="page-title">Branch Management</h1>
          <p className="page-subtitle">Manage multi-branch operations and view branch KPIs.</p>
        </div>
        <div className="flex gap-2">
          <div className="search-box" style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)' }}>
            <Search size={16} className="text-muted ml-2" />
            <input 
              type="text" 
              placeholder="Search branches..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="ml-2 bg-transparent border-none outline-none text-sm p-2 w-48"
            />
          </div>
          <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
            <Plus size={16} /> Add Branch
          </button>
        </div>
      </div>

      <div className="charts-grid">
        {filteredBranches.map(b => (
          <div key={b.name} className="chart-card glass-card">
            <h3 className="card-title flex items-center gap-2 mb-2"><Building size={18} /> {b.name}</h3>
            <p className="text-sm text-muted mb-4"><MapPin size={12} className="inline mr-1" /> Kerala, India</p>
            
            <div className="flex flex-col gap-3">
              <div className="flex justify-between border-b border-[var(--card-border)] pb-2">
                <span className="text-sm text-muted">Manager</span>
                <span className="font-semibold text-sm">{b.manager}</span>
              </div>
              <div className="flex justify-between border-b border-[var(--card-border)] pb-2">
                <span className="text-sm text-muted">Total Leads</span>
                <span className="font-semibold text-sm">{b.leads}</span>
              </div>
              <div className="flex justify-between border-b border-[var(--card-border)] pb-2">
                <span className="text-sm text-muted">Total Staff</span>
                <span className="font-semibold text-sm flex items-center gap-1"><Users size={14}/> {b.staff}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted">Est. Revenue</span>
                <span className="font-semibold text-sm text-success">{b.revenue}</span>
              </div>
            </div>
            
            <button className="btn btn-outline w-full mt-6">View Detailed Report</button>
          </div>
        ))}
        {filteredBranches.length === 0 && (
          <div className="col-span-full text-center p-8 text-muted">No branches found matching your search.</div>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Branch">
        <form onSubmit={handleSave}>
          <div className="form-group-modal">
            <label>Branch Name</label>
            <input type="text" placeholder="e.g. Dubai Office" required />
          </div>
          <div className="form-group-modal">
            <label>Location / City</label>
            <input type="text" placeholder="e.g. Dubai, UAE" required />
          </div>
          <div className="form-group-modal">
            <label>Assign Branch Admin</label>
            <select required>
              <option value="">-- Select Staff --</option>
              <option value="admin">Current Admin</option>
              <option value="unassigned">To be assigned</option>
            </select>
          </div>
          <div className="modal-actions">
            <button type="button" className="btn btn-outline" onClick={() => setIsModalOpen(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">Create Branch</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Branches;

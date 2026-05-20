import React, { useState } from 'react';
import { FileText, Download, Eye, ShieldAlert, Folder, Search, Plus } from 'lucide-react';
import { mockLeads } from '../MockData';
import { useAuth } from '../contexts/AuthContext';
import Modal from '../components/Modal';

const Documents: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const leadsWithDocs = mockLeads.slice(0, 5);
  // We mock the documents since they are static in UI. We will just render them conditionally based on selectedType.
  const filteredDocs = leadsWithDocs.filter(lead => 
    lead.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(false);
    alert('Document Uploaded Successfully!');
  };

  return (
    <div className="animate-fade-in mt-4">
      <div className="dashboard-header">
        <div>
          <h1 className="page-title">Document Vault</h1>
          <p className="page-subtitle">Centralized secure storage for passports, certificates, and visas.</p>
        </div>
        <div className="flex gap-2">
          <select 
            className="input-field"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            style={{ padding: '0.5rem', border: '1px solid var(--card-border)', background: 'var(--card-bg)' }}
          >
            <option value="All">All Types</option>
            <option value="ID Proof">ID Proof</option>
            <option value="Education">Education</option>
          </select>
          <div className="search-box" style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)' }}>
            <Search size={16} className="text-muted ml-2" />
            <input 
              type="text" 
              placeholder="Search student name..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="ml-2 bg-transparent border-none outline-none text-sm p-2 w-48"
            />
          </div>
          <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
            <Plus size={16} /> Upload Document
          </button>
        </div>
      </div>

      {user?.role === 'Junior Staff' && (
        <div className="security-alert mb-6">
          <ShieldAlert size={18} /> You are in view-only mode. Downloading documents is restricted for Junior Staff.
        </div>
      )}

      <div className="charts-grid">
        <div className="chart-card glass-card full-width">
          <h3 className="card-title flex items-center gap-2"><Folder size={18} /> Recent Uploads</h3>
          <table className="crm-table w-full">
            <thead>
              <tr>
                <th>Document Name</th>
                <th>Student</th>
                <th>Type</th>
                <th>Upload Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocs.map((lead) => (
                <React.Fragment key={lead.id}>
                  {(selectedType === 'All' || selectedType === 'ID Proof') && (
                    <tr>
                      <td className="font-semibold flex items-center gap-2"><FileText size={16} className="text-primary"/> Passport_Copy.pdf</td>
                      <td>{lead.name}</td>
                      <td><span className="badge badge-info">ID Proof</span></td>
                      <td className="text-muted text-sm">Today</td>
                      <td>
                        <div className="flex gap-2">
                          <button className="btn btn-outline p-1"><Eye size={14}/></button>
                          {user?.role !== 'Junior Staff' && <button className="btn btn-primary p-1"><Download size={14}/></button>}
                        </div>
                      </td>
                    </tr>
                  )}
                  {(selectedType === 'All' || selectedType === 'Education') && (
                    <tr>
                      <td className="font-semibold flex items-center gap-2"><FileText size={16} className="text-primary"/> BSc_Nursing.pdf</td>
                      <td>{lead.name}</td>
                      <td><span className="badge badge-warning">Education</span></td>
                      <td className="text-muted text-sm">Yesterday</td>
                      <td>
                        <div className="flex gap-2">
                          <button className="btn btn-outline p-1"><Eye size={14}/></button>
                          {user?.role !== 'Junior Staff' && <button className="btn btn-primary p-1"><Download size={14}/></button>}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
              {filteredDocs.length === 0 && (
                <tr><td colSpan={5} className="text-center p-8 text-muted">No documents found matching your search.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Upload Document">
        <form onSubmit={handleSave}>
          <div className="form-group-modal">
            <label>Select Student</label>
            <select required>
              <option value="">-- Select Student --</option>
              {mockLeads.map(l => (
                <option key={l.id} value={l.id}>{l.name} ({l.id})</option>
              ))}
            </select>
          </div>
          <div className="form-group-modal">
            <label>Document Type</label>
            <select required>
              <option value="passport">Passport / ID</option>
              <option value="education">Educational Certificate</option>
              <option value="medical">Medical Report</option>
              <option value="resume">Resume / CV</option>
            </select>
          </div>
          <div className="form-group-modal">
            <label>Upload File</label>
            <input type="file" required className="p-2 border border-[var(--card-border)] rounded w-full" />
          </div>
          <div className="modal-actions">
            <button type="button" className="btn btn-outline" onClick={() => setIsModalOpen(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">Upload Securely</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Documents;

import React, { useState } from 'react';
import { Plane, CheckCircle, Clock, Search, Plus } from 'lucide-react';
import { mockLeads } from '../MockData';
import Modal from '../components/Modal';

const Visa: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const visaStudents = mockLeads.filter(l => l.stage === 'Visa Processing' || l.stage === 'Successfully Reached Abroad');
  
  const filteredStudents = visaStudents.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          student.countryPreference[0].toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || 
                          (selectedStatus === 'Approved' && student.stage === 'Successfully Reached Abroad') ||
                          (selectedStatus === 'Pending' && student.stage !== 'Successfully Reached Abroad');
    return matchesSearch && matchesStatus;
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(false);
    alert('New Visa Application Saved!');
  };

  return (
    <div className="animate-fade-in mt-4">
      <div className="dashboard-header">
        <div>
          <h1 className="page-title">Visa & Migration Tracking</h1>
          <p className="page-subtitle">Track Dataflow, Embassy appointments, and travel itineraries.</p>
        </div>
        <div className="flex gap-2">
          <select 
            className="input-field"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            style={{ padding: '0.5rem', border: '1px solid var(--card-border)', background: 'var(--card-bg)' }}
          >
            <option value="All">All Statuses</option>
            <option value="Approved">Visa Approved</option>
            <option value="Pending">Processing / Pending</option>
          </select>
          <div className="search-box" style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)' }}>
            <Search size={16} className="text-muted ml-2" />
            <input 
              type="text" 
              placeholder="Search name or destination..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="ml-2 bg-transparent border-none outline-none text-sm p-2 w-48"
            />
          </div>
          <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
            <Plus size={16} /> New Visa Application
          </button>
        </div>
      </div>

      <div className="glass-card p-6">
        <h3 className="font-semibold mb-4 flex items-center gap-2"><Plane size={18} /> Active Visa Applications</h3>
        <table className="crm-table w-full">
          <thead>
            <tr>
              <th>Student</th>
              <th>Destination</th>
              <th>Dataflow</th>
              <th>Embassy Status</th>
              <th>Ticket/Travel</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student, i) => (
              <tr key={student.id}>
                <td className="font-semibold">{student.name}</td>
                <td>{student.countryPreference[0]}</td>
                <td>
                  {i % 2 === 0 ? <span className="badge badge-success flex items-center w-max gap-1"><CheckCircle size={12}/> Verified</span> : <span className="badge badge-warning flex items-center w-max gap-1"><Clock size={12}/> Pending</span>}
                </td>
                <td>
                  {student.stage === 'Successfully Reached Abroad' ? <span className="badge badge-success">Approved</span> : <span className="badge badge-info">Appt. Booked</span>}
                </td>
                <td className="text-sm">
                  {student.stage === 'Successfully Reached Abroad' ? 'Flight Completed' : 'Pending Approval'}
                </td>
                <td><button className="btn btn-outline text-xs">Update Status</button></td>
              </tr>
            ))}
            {filteredStudents.length === 0 && (
              <tr><td colSpan={6} className="text-center p-8 text-muted">No visa applications found matching your search.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="New Visa Application">
        <form onSubmit={handleSave}>
          <div className="form-group-modal">
            <label>Select Student</label>
            <select required>
              <option value="">-- Select Student --</option>
              {mockLeads.filter(l => l.stage !== 'Visa Processing').map(l => (
                <option key={l.id} value={l.id}>{l.name} ({l.id})</option>
              ))}
            </select>
          </div>
          <div className="form-group-modal">
            <label>Target Destination</label>
            <select required>
              <option value="UK">United Kingdom</option>
              <option value="Germany">Germany</option>
              <option value="Ireland">Ireland</option>
              <option value="Norway">Norway</option>
              <option value="Sweden">Sweden</option>
            </select>
          </div>
          <div className="form-group-modal">
            <label>Current Status</label>
            <select required>
              <option value="dataflow">Dataflow Initiation</option>
              <option value="embassy">Embassy Appointment</option>
              <option value="approved">Visa Approved</option>
            </select>
          </div>
          <div className="modal-actions">
            <button type="button" className="btn btn-outline" onClick={() => setIsModalOpen(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">Start Processing</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Visa;

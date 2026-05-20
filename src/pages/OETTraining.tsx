import React, { useState } from 'react';
import { GraduationCap, Users, BookOpen, Search, Plus } from 'lucide-react';
import { mockLeads } from '../MockData';
import Modal from '../components/Modal';

const OETTraining: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const oetStudents = mockLeads.filter(l => l.stage === 'OET Training' || l.stage === 'OET Passed');
  
  const filteredStudents = oetStudents.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || student.stage === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(false);
    alert('New Batch Created!');
  };

  return (
    <div className="animate-fade-in mt-4">
      <div className="dashboard-header">
        <div>
          <h1 className="page-title">OET Training Management</h1>
          <p className="page-subtitle">Manage batches, attendance, and mock test scores.</p>
        </div>
        <div className="flex gap-2">
          <select 
            className="input-field"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            style={{ padding: '0.5rem', border: '1px solid var(--card-border)', background: 'var(--card-bg)' }}
          >
            <option value="All">All Statuses</option>
            <option value="OET Passed">Passed</option>
            <option value="OET Training">In Training</option>
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
            <Plus size={16} /> New Batch
          </button>
        </div>
      </div>

      <div className="kpi-grid mb-6">
        <div className="kpi-card glass-card">
          <div className="kpi-icon bg-[rgba(32,201,151,0.1)] text-success">
            <Users size={24} />
          </div>
          <div>
            <p className="text-muted text-sm">Active Students</p>
            <h3 className="font-bold text-2xl">{oetStudents.filter(s => s.stage === 'OET Training').length}</h3>
          </div>
        </div>
        <div className="kpi-card glass-card">
          <div className="kpi-icon bg-[rgba(0,119,182,0.1)] text-primary">
            <GraduationCap size={24} />
          </div>
          <div>
            <p className="text-muted text-sm">Total Passed</p>
            <h3 className="font-bold text-2xl">{oetStudents.filter(s => s.stage === 'OET Passed').length}</h3>
          </div>
        </div>
      </div>

      <div className="glass-card p-6">
        <h3 className="font-semibold mb-4 flex items-center gap-2"><BookOpen size={18} /> Active Batch: B-42</h3>
        <table className="crm-table w-full">
          <thead>
            <tr>
              <th>Student</th>
              <th>Status</th>
              <th>Last Mock Test</th>
              <th>Attendance</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.slice(0, 10).map((student, i) => (
              <tr key={student.id}>
                <td className="font-semibold">{student.name}</td>
                <td><span className={`badge ${student.stage === 'OET Passed' ? 'badge-success' : 'badge-warning'}`}>{student.stage}</span></td>
                <td>{student.stage === 'OET Passed' ? 'Grade B (Pass)' : ['Grade C (Fail)', 'Pending', 'Grade B (Pass)'][i % 3]}</td>
                <td>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div className="bg-primary h-2.5 rounded-full" style={{ width: `${80 + (i * 2)}%` }}></div>
                  </div>
                  <span className="text-xs text-muted mt-1 inline-block">{80 + (i * 2)}%</span>
                </td>
                <td><button className="btn btn-outline text-xs">Update Score</button></td>
              </tr>
            ))}
            {filteredStudents.length === 0 && (
              <tr><td colSpan={5} className="text-center p-8 text-muted">No students found matching your search.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create New Batch">
        <form onSubmit={handleSave}>
          <div className="form-group-modal">
            <label>Batch Name</label>
            <input type="text" placeholder="e.g. B-43" required />
          </div>
          <div className="form-group-modal">
            <label>Trainer</label>
            <select required>
              <option value="">-- Select Trainer --</option>
              <option value="t1">Sarah Jenkins</option>
              <option value="t2">Michael Ross</option>
            </select>
          </div>
          <div className="form-group-modal">
            <label>Start Date</label>
            <input type="date" required />
          </div>
          <div className="modal-actions">
            <button type="button" className="btn btn-outline" onClick={() => setIsModalOpen(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">Create Batch</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default OETTraining;

import React, { useState, useMemo } from 'react';
import { 
  Search, Plus, Phone, MessageCircle, FileText, 
  Eye, Download, ShieldAlert, Clock, Sparkles, Bot
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { mockLeads } from '../MockData';
import type { Lead } from '../types';
import Modal from '../components/Modal';
import './CRM.css';

const CRM: React.FC = () => {
  const { user } = useAuth();
  const [leadsData, setLeadsData] = useState(mockLeads);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStage, setSelectedStage] = useState('All');
  const [selectedCountry, setSelectedCountry] = useState('All');
  const [selectedSource, setSelectedSource] = useState('All');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const stages = ['All', 'New Enquiry', 'Contacted', 'Interested', 'OET Training', 'Visa Processing', 'Successfully Reached Abroad'];

  // Filter based on role and branch
  const filteredLeads = useMemo(() => {
    let leads = [...leadsData];
    
    // Role based filtering
    if (user?.role === 'Branch Admin') {
      leads = leads.filter(l => l.branch === user.branch);
    } else if (user?.role === 'Senior Staff' || user?.role === 'Junior Staff') {
      if (user.role === 'Junior Staff') {
        leads = leads.filter(l => l.assignedTo === user.id);
      } else {
        leads = leads.filter(l => l.branch === user.branch);
      }
    }

    // Search and Stage filtering
    if (selectedStage !== 'All') {
      leads = leads.filter(l => l.stage === selectedStage);
    }
    // Dropdown filtering
    if (selectedCountry !== 'All') {
      leads = leads.filter(l => l.countryPreference.includes(selectedCountry));
    }
    if (selectedSource !== 'All') {
      leads = leads.filter(l => l.source === selectedSource);
    }

    if (searchTerm) {
      leads = leads.filter(l => 
        l.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        l.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return leads;
  }, [searchTerm, selectedStage, selectedCountry, selectedSource, user, leadsData]);

  const maskSensitiveInfo = (info: string, type: 'phone' | 'email') => {
    if (user?.role === 'Super Admin' || user?.role === 'Branch Admin' || user?.role === 'Senior Staff') return info;
    if (type === 'phone') {
      return info.substring(0, 5) + 'XXXXXX';
    }
    if (type === 'email') {
      const parts = info.split('@');
      return parts[0].substring(0, 3) + '...@' + parts[1];
    }
    return info;
  };

  const getStageColor = (stage: string) => {
    switch(stage) {
      case 'New Enquiry': return 'badge-info';
      case 'Successfully Reached Abroad': return 'badge-success';
      case 'Visa Processing': return 'badge-warning';
      case 'Closed/Lost': return 'badge-danger';
      default: return 'badge-info';
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(false);
    alert('New Lead Successfully Created in CRM!');
  };

  const handleContactAction = (actionType: string) => {
    if (!selectedLead) return;
    
    alert(`Initiating ${actionType} communication via Enterprise API...`);
    
    if (selectedLead.stage === 'New Enquiry') {
      const updatedLeads = leadsData.map(l => {
        if (l.id === selectedLead.id) {
          return { ...l, stage: 'Contacted' as any };
        }
        return l;
      });
      setLeadsData(updatedLeads);
      setSelectedLead({ ...selectedLead, stage: 'Contacted' as any });
      
      setTimeout(() => {
        alert("AI Automation: Lead status automatically updated from 'New Enquiry' to 'Contacted'.");
      }, 500);
    }
  };

  return (
    <div className="crm-container animate-fade-in">
      <div className="crm-header">
        <div>
          <h1 className="page-title">CRM & Leads</h1>
          <p className="page-subtitle">Manage student enquiries and migration lifecycle.</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
            <Plus size={18} /> New Lead
          </button>
        </div>
      </div>

      <div className="crm-filters glass-card">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="search-box flex-1 min-w-[200px]">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search name or email..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select 
            className="input-field max-w-[200px]" 
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            style={{ padding: '0.5rem', border: '1px solid var(--card-border)', background: 'var(--bg-color)', borderRadius: '8px' }}
          >
            <option value="All">All Countries</option>
            <option value="UK">UK</option>
            <option value="Germany">Germany</option>
            <option value="Ireland">Ireland</option>
            <option value="Norway">Norway</option>
            <option value="Sweden">Sweden</option>
          </select>
          <select 
            className="input-field max-w-[200px]" 
            value={selectedSource}
            onChange={(e) => setSelectedSource(e.target.value)}
            style={{ padding: '0.5rem', border: '1px solid var(--card-border)', background: 'var(--bg-color)', borderRadius: '8px' }}
          >
            <option value="All">All Sources</option>
            <option value="Website">Website</option>
            <option value="WhatsApp">WhatsApp</option>
            <option value="Walk-in">Walk-in</option>
            <option value="Referral">Referral</option>
          </select>
        </div>
        <div className="filter-scroll mt-4">
          {stages.map(stage => (
            <button 
              key={stage}
              className={`filter-btn ${selectedStage === stage ? 'active' : ''}`}
              onClick={() => setSelectedStage(stage)}
            >
              {stage}
            </button>
          ))}
        </div>
      </div>

      <div className="crm-content">
        {/* Leads Table */}
        <div className="leads-list glass-card">
          <table className="crm-table">
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Contact</th>
                <th>Stage</th>
                <th>Source</th>
                <th>Pref. Country</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map(lead => (
                <tr key={lead.id} onClick={() => setSelectedLead(lead)} className={selectedLead?.id === lead.id ? 'selected-row' : ''}>
                  <td>
                    <div className="lead-name-cell">
                      <div className="avatar-sm">{lead.name.charAt(0)}</div>
                      <div>
                        <div className="lead-name">{lead.name}</div>
                        <div className="lead-id">{lead.id}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="contact-cell">
                      <span>{maskSensitiveInfo(lead.phone, 'phone')}</span>
                      <span className="email-hint">{maskSensitiveInfo(lead.email, 'email')}</span>
                    </div>
                  </td>
                  <td>
                    <span className={`badge ${getStageColor(lead.stage)}`}>{lead.stage}</span>
                  </td>
                  <td>{lead.source}</td>
                  <td>
                    <div className="country-tags">
                      {lead.countryPreference.map(c => <span key={c} className="country-tag">{c}</span>)}
                    </div>
                  </td>
                  <td>
                    <button className="action-btn" onClick={(e) => { e.stopPropagation(); setSelectedLead(lead); }}>
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredLeads.length === 0 && (
                <tr>
                  <td colSpan={6} className="empty-state">No leads found matching your search.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* 360 Degree Profile Sidebar */}
        {selectedLead && (
          <div className="lead-profile glass-card animate-fade-in">
            <div className="profile-header">
              <h3>Student Profile</h3>
              <button className="close-btn" onClick={() => setSelectedLead(null)}>×</button>
            </div>
            
            <div className="profile-scroll-area">
              <div className="profile-top">
                <div className="profile-avatar">{selectedLead.name.charAt(0)}</div>
                <h2 className="profile-name">{selectedLead.name}</h2>
                <p className="profile-id">{selectedLead.id} • {selectedLead.branch}</p>
                <span className={`badge ${getStageColor(selectedLead.stage)} mt-2`}>{selectedLead.stage}</span>
              </div>

              <div className="quick-actions">
                <button className="btn btn-outline quick-btn" title="Call" onClick={() => handleContactAction('Phone Call')}>
                  <Phone size={16} /> Call
                </button>
                <button className="btn btn-teal quick-btn" title="WhatsApp" onClick={() => handleContactAction('WhatsApp Message')}>
                  <MessageCircle size={16} /> WhatsApp
                </button>
                <button className="btn btn-outline quick-btn" title="Email" onClick={() => handleContactAction('Email')}>
                  @ Email
                </button>
              </div>

              <div className="profile-section">
                <h4>Contact Details</h4>
                {user?.role === 'Junior Staff' && (
                  <div className="security-alert">
                    <ShieldAlert size={14} /> Contact details are partially hidden for security.
                  </div>
                )}
                <div className="detail-row">
                  <span className="label">Phone:</span>
                  <span className="value">{maskSensitiveInfo(selectedLead.phone, 'phone')}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Email:</span>
                  <span className="value">{maskSensitiveInfo(selectedLead.email, 'email')}</span>
                </div>
              </div>

              <div className="profile-section">
                <h4>Qualification & Preferences</h4>
                <div className="detail-row">
                  <span className="label">Qualification:</span>
                  <span className="value">{selectedLead.qualification}</span>
                </div>
                <div className="detail-row">
                  <span className="label">OET Status:</span>
                  <span className="value">{selectedLead.oetMarks}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Budget:</span>
                  <span className="value">{selectedLead.budget}</span>
                </div>
              </div>

              <div className="profile-section">
                <h4>Documents</h4>
                {user?.role === 'Junior Staff' ? (
                  <div className="security-alert">
                    <ShieldAlert size={14} /> You don't have permission to download resumes. Watermarked view only.
                  </div>
                ) : null}
                <div className="document-list">
                  <div className="document-item">
                    <div className="doc-info">
                      <FileText size={16} className="text-primary" />
                      <span>Resume.pdf</span>
                    </div>
                    <div className="doc-actions">
                      <button className="icon-btn-sm" title="View"><Eye size={14}/></button>
                      {user?.role !== 'Junior Staff' && (
                        <button className="icon-btn-sm" title="Download"><Download size={14}/></button>
                      )}
                    </div>
                  </div>
                  <div className="document-item">
                    <div className="doc-info">
                      <FileText size={16} className="text-primary" />
                      <span>Passport_Front.jpg</span>
                    </div>
                    <div className="doc-actions">
                      <button className="icon-btn-sm" title="View"><Eye size={14}/></button>
                      {user?.role !== 'Junior Staff' && (
                        <button className="icon-btn-sm" title="Download"><Download size={14}/></button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="profile-section">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="flex items-center gap-2 text-[var(--primary)] m-0"><Sparkles size={16} /> AI Lead Intelligence</h4>
                  <div className="flex items-center gap-2 text-xs font-semibold">
                    <span className="w-2 h-2 rounded-full bg-success animate-pulse"></span> Auto-Pilot Active
                  </div>
                </div>
                
                <div className="p-3 bg-[rgba(0,119,182,0.05)] border border-[var(--primary-light)] rounded-lg mb-3">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-sm font-semibold">Conversion Probability</span>
                    <span className="text-lg font-bold text-success">
                      {selectedLead.stage === 'Successfully Reached Abroad' ? '100%' : 
                       selectedLead.stage === 'Visa Processing' ? '92%' : 
                       selectedLead.stage === 'OET Training' ? '75%' : 
                       selectedLead.stage === 'Interested' ? '68%' : '35%'}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
                    <div className="bg-success h-1.5 rounded-full" style={{ width: 
                      selectedLead.stage === 'Successfully Reached Abroad' ? '100%' : 
                      selectedLead.stage === 'Visa Processing' ? '92%' : 
                      selectedLead.stage === 'OET Training' ? '75%' : 
                      selectedLead.stage === 'Interested' ? '68%' : '35%'
                    }}></div>
                  </div>
                </div>

                <div className="p-3 bg-[rgba(255,193,7,0.1)] border border-[var(--warning)] rounded-lg">
                  <h5 className="flex items-center gap-1 text-sm font-semibold mb-1 text-[var(--warning)]"><Bot size={14}/> AI Suggested Action:</h5>
                  <p className="text-xs text-muted leading-relaxed">
                    {selectedLead.stage === 'New Enquiry' ? 'High intent detected from Meta Ads. AI recommends an immediate introductory WhatsApp call.' :
                     selectedLead.stage === 'Interested' ? `Student prefers ${selectedLead.countryPreference[0]}. AI suggests sending the OET brochure for nurses.` :
                     selectedLead.stage === 'OET Training' ? 'Monitor attendance closely. AI predicts readiness for exam in 2 weeks.' :
                     'Follow standard protocol. AI is monitoring document expiration dates automatically.'}
                  </p>
                  <button className="btn btn-primary w-full mt-2 text-xs py-1.5 flex items-center justify-center gap-1">
                    <Sparkles size={12}/> Auto-Execute Action
                  </button>
                </div>
              </div>

              <div className="profile-section timeline-section">
                <h4>Activity Timeline</h4>
                <div className="timeline">
                  <div className="timeline-item">
                    <div className="timeline-icon bg-teal"><MessageCircle size={12} color="white" /></div>
                    <div className="timeline-content">
                      <p><strong>WhatsApp Sent:</strong> OET brochure</p>
                      <span className="time"><Clock size={10} /> 2 hours ago</span>
                    </div>
                  </div>
                  <div className="timeline-item">
                    <div className="timeline-icon bg-primary"><Phone size={12} color="white" /></div>
                    <div className="timeline-content">
                      <p><strong>Call:</strong> Discussed budget</p>
                      <span className="time"><Clock size={10} /> 1 day ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Lead">
        <form onSubmit={handleSave}>
          <div className="form-group-modal">
            <label>Full Name</label>
            <input type="text" required placeholder="Enter full name" />
          </div>
          <div className="flex gap-4">
            <div className="form-group-modal w-full">
              <label>Email Address</label>
              <input type="email" required placeholder="Email" />
            </div>
            <div className="form-group-modal w-full">
              <label>Phone Number</label>
              <input type="tel" required placeholder="Phone" />
            </div>
          </div>
          <div className="form-group-modal">
            <label>Destination Country Preference</label>
            <select required>
              <option value="UK">United Kingdom</option>
              <option value="Germany">Germany</option>
              <option value="Ireland">Ireland</option>
              <option value="Norway">Norway</option>
            </select>
          </div>
          <div className="form-group-modal">
            <label>Current Qualification</label>
            <select required>
              <option value="bsc">BSc Nursing</option>
              <option value="gnm">GNM</option>
              <option value="post_bsc">Post Basic BSc Nursing</option>
            </select>
          </div>
          <div className="form-group-modal">
            <label>Initial Notes</label>
            <textarea rows={2} placeholder="Any specific requirements..."></textarea>
          </div>
          <div className="modal-actions">
            <button type="button" className="btn btn-outline" onClick={() => setIsModalOpen(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">Create Lead</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default CRM;

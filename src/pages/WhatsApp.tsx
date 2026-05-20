import React, { useState } from 'react';
import { Search, Send, CheckCheck, Phone, Video, MoreVertical } from 'lucide-react';
import { mockLeads } from '../MockData';
import './WhatsApp.css';

const WhatsApp: React.FC = () => {
  const [activeChat, setActiveChat] = useState(mockLeads[0]);
  const [message, setMessage] = useState('');

  const chatLeads = mockLeads.slice(0, 8);

  const mockMessages = [
    { text: 'Hi, I am interested in the OET training program.', sender: 'user', time: '10:00 AM', status: 'read' },
    { text: 'Hello! Thank you for reaching out to Medrizer Academy. We have new batches starting next week. May I know your current qualification?', sender: 'agent', time: '10:05 AM', status: 'read' },
    { text: 'I have a BSc in Nursing.', sender: 'user', time: '10:15 AM', status: 'read' },
    { text: 'Great! I will send you the brochure with the batch timings and fee structure.', sender: 'agent', time: '10:16 AM', status: 'read' },
  ];

  return (
    <div className="whatsapp-container animate-fade-in">
      <div className="wa-sidebar glass-card">
        <div className="wa-sidebar-header">
          <h2>WhatsApp Chats</h2>
          <div className="search-box">
            <Search size={16} className="search-icon" />
            <input type="text" placeholder="Search chats..." />
          </div>
        </div>
        <div className="wa-chat-list">
          {chatLeads.map(lead => (
            <div 
              key={lead.id} 
              onClick={() => setActiveChat(lead)}
              className={`wa-chat-item ${activeChat.id === lead.id ? 'active' : ''}`}
            >
              <div className="avatar-sm">{lead.name.charAt(0)}</div>
              <div className="wa-chat-info">
                <div className="wa-chat-title">
                  <h4>{lead.name}</h4>
                  <span className="wa-time">10:15 AM</span>
                </div>
                <p className="wa-preview">I have a BSc in Nursing.</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="wa-main glass-card">
        <div className="wa-header">
          <div className="wa-user-info">
            <div className="avatar-sm">{activeChat.name.charAt(0)}</div>
            <div>
              <h3>{activeChat.name}</h3>
              <p className="wa-status"><span className="online-dot"></span> Online</p>
            </div>
          </div>
          <div className="wa-actions">
            <button><Phone size={18} /></button>
            <button><Video size={18} /></button>
            <button><MoreVertical size={18} /></button>
          </div>
        </div>

        <div className="wa-messages">
          <div className="wa-date-divider"><span>Today</span></div>
          {mockMessages.map((msg, i) => (
            <div key={i} className={`wa-message-row ${msg.sender === 'agent' ? 'sent' : 'received'}`}>
              <div className="wa-bubble">
                <p>{msg.text}</p>
                <div className="wa-msg-meta">
                  <span>{msg.time}</span>
                  {msg.sender === 'agent' && <CheckCheck size={14} className="read-ticks" />}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="wa-input-area">
          <button className="btn btn-outline wa-template-btn">Templates</button>
          <input 
            type="text" 
            placeholder="Type a message..." 
            className="input-field wa-input"
            value={message}
            onChange={e => setMessage(e.target.value)}
          />
          <button className="btn btn-teal wa-send-btn">
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WhatsApp;

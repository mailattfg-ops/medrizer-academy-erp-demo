import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  MessageSquare, 
  Activity, 
  FileText, 
  GraduationCap, 
  Plane, 
  Building, 
  BarChart, 
  ShieldCheck,
  LogOut
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import './Sidebar.css';

const Sidebar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { path: '/', icon: LayoutDashboard, label: 'Dashboard', roles: ['Super Admin', 'Branch Admin', 'Senior Staff', 'Junior Staff'] },
    { path: '/crm', icon: Users, label: 'CRM & Leads', roles: ['Super Admin', 'Branch Admin', 'Senior Staff', 'Junior Staff'] },
    { path: '/whatsapp', icon: MessageSquare, label: 'WhatsApp', roles: ['Super Admin', 'Branch Admin', 'Senior Staff', 'Junior Staff'] },
    { path: '/tracking', icon: Activity, label: 'Enquiry Tracking', roles: ['Super Admin', 'Branch Admin', 'Senior Staff'] },
    { path: '/staff', icon: ShieldCheck, label: 'Staff Monitoring', roles: ['Super Admin', 'Branch Admin', 'Senior Staff'] },
    { path: '/oet', icon: GraduationCap, label: 'OET Training', roles: ['Super Admin', 'Branch Admin', 'Senior Staff', 'Junior Staff'] },
    { path: '/documents', icon: FileText, label: 'Documents', roles: ['Super Admin', 'Branch Admin', 'Senior Staff', 'Junior Staff'] },
    { path: '/visa', icon: Plane, label: 'Visa & Migration', roles: ['Super Admin', 'Branch Admin', 'Senior Staff', 'Junior Staff'] },
    { path: '/branches', icon: Building, label: 'Branches', roles: ['Super Admin'] },
    { path: '/reports', icon: BarChart, label: 'Reports', roles: ['Super Admin', 'Branch Admin'] },
  ];

  const visibleMenuItems = menuItems.filter(item => user && item.roles.includes(user.role));

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <GraduationCap size={28} className="logo-icon-main" />
          <div>
            <h2>Medrizer</h2>
            <p>Academy ERP</p>
          </div>
        </div>
      </div>
      
      <div className="sidebar-menu">
        <p className="menu-label">Main Menu</p>
        <nav>
          {visibleMenuItems.map((item) => (
            <NavLink 
              key={item.path} 
              to={item.path} 
              className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="sidebar-footer">
        <div className="user-profile">
          <div className="avatar">{user?.name.charAt(0)}</div>
          <div className="user-info">
            <p className="user-name">{user?.name}</p>
            <p className="user-role">{user?.role}</p>
          </div>
        </div>
        <button onClick={handleLogout} className="logout-btn">
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

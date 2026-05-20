import React from 'react';
import { Search, Bell, Menu, Moon, Sun } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import './Header.css';

interface HeaderProps {
  toggleSidebar: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, isDarkMode, toggleDarkMode }) => {
  const { user } = useAuth();

  return (
    <header className="top-header glass">
      <div className="header-left">
        <button className="mobile-menu-btn" onClick={toggleSidebar}>
          <Menu size={24} />
        </button>
        <div className="search-bar">
          <Search size={18} className="search-icon" />
          <input type="text" placeholder="Global search leads, students, staff..." />
        </div>
      </div>
      
      <div className="header-right">
        <button className="icon-btn" onClick={toggleDarkMode}>
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <div className="notification-wrapper">
          <button className="icon-btn">
            <Bell size={20} />
            <span className="notification-badge">3</span>
          </button>
        </div>
        <div className="header-profile">
          <div className="avatar-sm">{user?.name.charAt(0)}</div>
          <span className="user-name-sm">{user?.name.split(' ')[0]}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;

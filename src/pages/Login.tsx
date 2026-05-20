import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, GraduationCap, Globe, Stethoscope } from 'lucide-react';
import './Login.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      login(email);
      navigate('/');
    }
  };

  const autofillAndLogin = (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setTimeout(() => {
      login(demoEmail);
      navigate('/');
    }, 500);
  };

  return (
    <div className="login-container">
      <div className="animated-background">
        <div className="bg-shape shape1"></div>
        <div className="bg-shape shape2"></div>
        <div className="bg-shape shape3"></div>
      </div>
      
      <div className="login-content animate-fade-in">
        <div className="glass-card login-card">
          <div className="login-header">
            <div className="logo-icon">
              <Stethoscope size={24} color="var(--primary)" />
              <GraduationCap size={24} color="var(--teal)" />
              <Globe size={24} color="var(--primary-dark)" />
            </div>
            <h2>Medrizer Academy</h2>
            <p>Premium ERP & CRM Portal</p>
          </div>

          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <label className="label">Email Address</label>
              <input 
                type="email" 
                className="input-field" 
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="form-group">
              <label className="label">Password</label>
              <div className="password-input-wrapper">
                <input 
                  type={showPassword ? "text" : "password"} 
                  className="input-field" 
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button 
                  type="button" 
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="form-actions">
              <label className="remember-me">
                <input type="checkbox" /> Remember me
              </label>
              <a href="#" className="forgot-password">Forgot password?</a>
            </div>

            <button type="submit" className="btn btn-primary w-full login-btn">
              Secure Login
            </button>
          </form>

          <div className="demo-credentials">
            <p className="demo-title">Demo Credentials</p>
            <div className="demo-buttons">
              <button className="btn btn-outline demo-btn" onClick={() => autofillAndLogin('admin@medrizeracademy.com', 'Admin@123')}>
                Super Admin
              </button>
              <button className="btn btn-outline demo-btn" onClick={() => autofillAndLogin('senior@medrizeracademy.com', 'Senior@123')}>
                Senior Staff
              </button>
              <button className="btn btn-outline demo-btn" onClick={() => autofillAndLogin('junior@medrizeracademy.com', 'Junior@123')}>
                Junior Staff
              </button>
              <button className="btn btn-outline demo-btn" onClick={() => autofillAndLogin('branch@medrizeracademy.com', 'Branch@123')}>
                Branch Admin
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

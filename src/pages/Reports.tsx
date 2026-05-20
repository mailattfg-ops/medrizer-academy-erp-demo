import React, { useState } from 'react';
import { BarChart as BarChartIcon, Download, Filter, PieChart as PieChartIcon, Users } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, PieChart, Pie, Cell } from 'recharts';

type ReportType = 'staff' | 'source' | 'oet';

const Reports: React.FC = () => {
  const { user } = useAuth();
  const [activeReport, setActiveReport] = useState<ReportType>('staff');

  if (user?.role === 'Junior Staff' || user?.role === 'Senior Staff') {
    return (
      <div className="glass-card text-center p-8 mt-8">
        <h2>Access Restricted</h2>
        <p className="text-muted">You do not have permission to view financial and global reports.</p>
      </div>
    );
  }

  const revenueData = [
    { name: 'Jan', revenue: 4000 },
    { name: 'Feb', revenue: 3000 },
    { name: 'Mar', revenue: 5000 },
    { name: 'Apr', revenue: 4500 },
    { name: 'May', revenue: 6000 },
    { name: 'Jun', revenue: 7000 },
  ];

  const sourceData = [
    { name: 'Website', value: 45 },
    { name: 'Meta Ads', value: 30 },
    { name: 'Referrals', value: 15 },
    { name: 'Walk-ins', value: 10 },
  ];
  const COLORS = ['var(--primary)', 'var(--teal)', 'var(--warning)', 'var(--danger)'];

  return (
    <div className="animate-fade-in mt-4">
      <div className="dashboard-header">
        <div>
          <h1 className="page-title">Advanced Analytics & Reports</h1>
          <p className="page-subtitle">Generate branch, staff, and financial reports.</p>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-outline"><Filter size={16} /> Filters</button>
          <button className="btn btn-primary"><Download size={16} /> Export PDF</button>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-card glass-card full-width">
          <h3 className="card-title flex items-center gap-2"><BarChartIcon size={18} /> Revenue Forecast (Last 6 Months)</h3>
          <div className="chart-container" style={{ height: '350px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--card-border)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} tickFormatter={(val) => `$${val}`} />
                <Tooltip cursor={{ fill: 'rgba(0,0,0,0.05)' }} contentStyle={{ borderRadius: '8px', border: 'none', background: 'var(--card-bg)' }} />
                <Bar dataKey="revenue" fill="var(--teal)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      <div className="glass-card p-6 mt-6">
        <h3 className="font-semibold mb-4">Available Reports</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div 
            className={`p-4 border rounded-lg cursor-pointer transition-colors ${activeReport === 'staff' ? 'border-primary bg-[rgba(0,119,182,0.05)]' : 'border-[var(--card-border)] hover:border-primary'}`}
            onClick={() => setActiveReport('staff')}
          >
            <h4 className="font-semibold mb-2">Staff Performance Report</h4>
            <p className="text-sm text-muted mb-4">Conversion rates, calls made, and leads handled by each staff member.</p>
            <button className="text-primary text-sm font-semibold">{activeReport === 'staff' ? 'Viewing Report' : 'Generate →'}</button>
          </div>
          <div 
            className={`p-4 border rounded-lg cursor-pointer transition-colors ${activeReport === 'source' ? 'border-primary bg-[rgba(0,119,182,0.05)]' : 'border-[var(--card-border)] hover:border-primary'}`}
            onClick={() => setActiveReport('source')}
          >
            <h4 className="font-semibold mb-2">Lead Source Analysis</h4>
            <p className="text-sm text-muted mb-4">Breakdown of leads generated from Website, Meta Ads, and Referrals.</p>
            <button className="text-primary text-sm font-semibold">{activeReport === 'source' ? 'Viewing Report' : 'Generate →'}</button>
          </div>
          <div 
            className={`p-4 border rounded-lg cursor-pointer transition-colors ${activeReport === 'oet' ? 'border-primary bg-[rgba(0,119,182,0.05)]' : 'border-[var(--card-border)] hover:border-primary'}`}
            onClick={() => setActiveReport('oet')}
          >
            <h4 className="font-semibold mb-2">OET Pass/Fail Matrix</h4>
            <p className="text-sm text-muted mb-4">Success rates based on batches and individual trainers.</p>
            <button className="text-primary text-sm font-semibold">{activeReport === 'oet' ? 'Viewing Report' : 'Generate →'}</button>
          </div>
        </div>
      </div>

      <div className="glass-card p-6 mt-6 animate-fade-in">
        {activeReport === 'staff' && (
          <>
            <h3 className="font-semibold mb-4 flex items-center gap-2"><Users size={18}/> Generated Report: Staff Performance Matrix</h3>
            <table className="crm-table w-full">
              <thead>
                <tr>
                  <th>Staff Name</th>
                  <th>Total Assigned</th>
                  <th>Contacted</th>
                  <th>Converted</th>
                  <th>Conversion Rate</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="font-semibold">Admin User</td><td>150</td><td>142</td><td>18</td><td className="text-success font-semibold">12.0%</td></tr>
                <tr><td className="font-semibold">Senior Staff</td><td>120</td><td>115</td><td>12</td><td className="text-success font-semibold">10.0%</td></tr>
                <tr><td className="font-semibold">Junior Staff</td><td>230</td><td>190</td><td>11</td><td className="text-warning font-semibold">4.8%</td></tr>
              </tbody>
            </table>
          </>
        )}

        {activeReport === 'source' && (
          <>
            <h3 className="font-semibold mb-4 flex items-center gap-2"><PieChartIcon size={18}/> Generated Report: Lead Source Analysis</h3>
            <div className="flex gap-8 items-center justify-center" style={{ height: '300px' }}>
              <ResponsiveContainer width="50%" height="100%">
                <PieChart>
                  <Pie data={sourceData} innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                    {sourceData.map((_, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', background: 'var(--card-bg)' }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-col gap-4">
                {sourceData.map((entry, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                    <span className="text-sm font-semibold">{entry.name}</span>
                    <span className="text-sm text-muted">({entry.value}%)</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {activeReport === 'oet' && (
          <>
            <h3 className="font-semibold mb-4 flex items-center gap-2"><BarChartIcon size={18}/> Generated Report: OET Pass/Fail Matrix</h3>
            <table className="crm-table w-full">
              <thead>
                <tr>
                  <th>Batch ID</th>
                  <th>Trainer</th>
                  <th>Total Students</th>
                  <th>Pass Rate</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="font-mono">B-40</td><td>Sarah Jenkins</td><td>25</td><td className="text-success font-semibold">88%</td><td><span className="badge badge-success">Completed</span></td></tr>
                <tr><td className="font-mono">B-41</td><td>Michael Ross</td><td>30</td><td className="text-warning font-semibold">65%</td><td><span className="badge badge-success">Completed</span></td></tr>
                <tr><td className="font-mono">B-42</td><td>Sarah Jenkins</td><td>28</td><td className="text-muted font-semibold">TBD</td><td><span className="badge badge-info">Ongoing</span></td></tr>
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
};

export default Reports;

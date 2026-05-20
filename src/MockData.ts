import type { Lead, User, ActivityLog } from './types';

export const mockUsers: User[] = [
  { id: 'u1', name: 'Admin User', email: 'admin@medrizeracademy.com', role: 'Super Admin', branch: 'Kottayam HQ' },
  { id: 'u2', name: 'Senior Staff', email: 'senior@medrizeracademy.com', role: 'Senior Staff', branch: 'Kottayam HQ' },
  { id: 'u3', name: 'Junior Staff', email: 'junior@medrizeracademy.com', role: 'Junior Staff', branch: 'Kochi Branch' },
  { id: 'u4', name: 'Branch Admin', email: 'branch@medrizeracademy.com', role: 'Branch Admin', branch: 'Kochi Branch' },
];

export const mockLeads: Lead[] = Array.from({ length: 50 }).map((_, i) => ({
  id: `L-${1000 + i}`,
  name: ['John Doe', 'Jane Smith', 'Alice Johnson', 'Robert Brown', 'Emily Davis'][i % 5] + ` ${i}`,
  email: `student${i}@example.com`,
  phone: `+91 9876543${i.toString().padStart(3, '0')}`,
  source: ['Website', 'WhatsApp', 'Facebook', 'Instagram', 'Referral'][i % 5],
  stage: ['New Enquiry', 'Contacted', 'Interested', 'OET Training', 'Visa Processing', 'Successfully Reached Abroad'][i % 6] as any,
  assignedTo: i % 2 === 0 ? 'u3' : 'u2',
  branch: i % 3 === 0 ? 'Kochi Branch' : 'Kottayam HQ',
  countryPreference: [['Germany'], ['UK'], ['Ireland', 'UK'], ['Norway'], ['Sweden']][i % 5],
  createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
  lastContacted: new Date(Date.now() - Math.random() * 100000000).toISOString(),
  whatsappHistory: [],
  documents: [],
  notes: [],
  budget: ['10L - 15L', '15L - 20L', '20L+'][i % 3],
  qualification: ['BSc Nursing', 'GNM', 'Post Basic BSc Nursing'][i % 3],
  oetMarks: i % 4 === 0 ? 'Passed (B Grade)' : 'Pending',
}));

export const mockActivities: ActivityLog[] = [
  { id: 'a1', userId: 'u2', action: 'Called student', entityId: 'L-1000', timestamp: new Date(Date.now() - 3600000).toISOString(), details: 'Discussed OET training details.' },
  { id: 'a2', userId: 'u2', action: 'Sent WhatsApp', entityId: 'L-1000', timestamp: new Date(Date.now() - 3000000).toISOString(), details: 'Sent brochure.' },
  { id: 'a3', userId: 'u3', action: 'Viewed Document', entityId: 'L-1001', timestamp: new Date(Date.now() - 1000000).toISOString(), details: 'Viewed Resume.pdf (Watermarked)' },
];

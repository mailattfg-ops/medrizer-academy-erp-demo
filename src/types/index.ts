export type Role = 'Super Admin' | 'Branch Admin' | 'Senior Staff' | 'Junior Staff';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  branch: string;
  avatar?: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  source: string;
  stage: LeadStage;
  assignedTo: string; // Staff ID
  branch: string;
  countryPreference: string[];
  createdAt: string;
  lastContacted: string;
  whatsappHistory: WhatsappMessage[];
  documents: Document[];
  notes: Note[];
  budget: string;
  oetMarks?: string;
  visaStatus?: string;
  passportDetails?: string;
  qualification: string;
}

export type LeadStage = 'New Enquiry' | 'Contacted' | 'Interested' | 'OET Training' | 'OET Passed' | 'Documentation' | 'Dataflow' | 'Visa Processing' | 'Job Assistance' | 'Accommodation' | 'Travel Process' | 'Successfully Reached Abroad' | 'Closed/Lost';

export interface WhatsappMessage {
  id: string;
  direction: 'inbound' | 'outbound';
  content: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
}

export interface Document {
  id: string;
  name: string;
  type: string;
  url: string;
  uploadedAt: string;
  status: 'pending' | 'verified' | 'rejected';
  isSensitive: boolean;
}

export interface Note {
  id: string;
  content: string;
  authorId: string;
  createdAt: string;
}

export interface ActivityLog {
  id: string;
  userId: string;
  action: string;
  entityId?: string;
  entityType?: string;
  timestamp: string;
  details: string;
}

export const API_BASE_URL = 'http://localhost:5000/api';

export const LEAD_STATUS_OPTIONS = [
  { value: 'new', label: 'New' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'qualified', label: 'Qualified' },
  { value: 'converted', label: 'Converted' },
  { value: 'closed', label: 'Closed' }
];

export const ROUTES = {
  LOGIN: '/login',
  REGISTER: '/register',
  LEADS: '/leads',
  HOME: '/'
};
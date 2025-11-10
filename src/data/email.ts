import { Email } from '../types';

export const mockEmails: Email[] = [
  { id: '1', sender: 'Alice', subject: 'Report Ready', body: 'Here is the report...', date: new Date().toISOString(), isRead: false },
  { id: '2', sender: 'Bob', subject: 'Lunch?', body: 'Are we meeting for lunch?', date: new Date().toISOString(), isRead: true }
];

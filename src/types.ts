export type PartnerConfig = {
  id: string;
  name: string;
  showSnippet: boolean;
  allowMarkSpam: boolean;
  bulkActionsEnabled: boolean;
  theme: { accentColor: string; logoText: string };
};

export type Email = {
  id: string;
  sender: string;
  subject: string;
  body: string;
  date: string;
  isRead: boolean;
  isSpam?: boolean;
  read: boolean;
  spam: boolean;
};

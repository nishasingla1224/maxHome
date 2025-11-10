import React, { useState } from "react";
import { Email } from "../types";
import "./EmailDetail.css";

interface EmailDetailProps {
  email: Email | null;
  onMarkUnread: (id: string) => void;
  onMarkSpam?: (id: string) => void;
  onToggleRead: (id: string, value: boolean) => void;
  showSnippet?: boolean; // optional flag
}

export const EmailDetail: React.FC<EmailDetailProps> = ({
  email,
  onMarkUnread,
  onMarkSpam,
  onToggleRead,
}) => {
  const [replyOpen, setReplyOpen] = useState(false);

  if (!email) {
    return <div className="no-email">Select an email to view details</div>;
  }

  const handleMarkUnread = () => {
    if (email?.id) onMarkUnread(email.id);
  };

  const handleMarkSpam = () => {
    if (email?.id && onMarkSpam) onMarkSpam(email.id);
  };

  return (
    <div className="email-detail-container">
      <div className="email-header">
        <h2 className="email-subject">{email.subject}</h2>
        <div className="email-sender-date">
          From: {email.sender} | {new Date(email.date).toLocaleString()}
        </div>
      </div>

      <div className="email-body">{email.body}</div>

      <div className="email-actions">
        <button className="btn unread" onClick={handleMarkUnread}>
          Mark Unread
        </button>
        {onMarkSpam && (
          <button className="btn spam" onClick={handleMarkSpam}>
            Mark Spam
          </button>
        )}
        <button className="btn reply" onClick={() => setReplyOpen(!replyOpen)}>
          {replyOpen ? "Cancel" : "Reply"}
        </button>
      </div>

      {replyOpen && (
        <div className="reply-section">
          <textarea
            className="reply-textarea"
            placeholder="Type your reply..."
          />
          <div className="reply-actions">
            <button className="btn cancel" onClick={() => setReplyOpen(false)}>
              Cancel
            </button>
            <button className="btn send" onClick={() => setReplyOpen(false)}>
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

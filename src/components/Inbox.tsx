import React from "react";
import { Email } from "../types";
import "./Inbox.css";

interface InboxProps {
  emails: Email[];
  onOpen: (id: string) => void;
  setEmails: React.Dispatch<React.SetStateAction<Email[]>>;
  openedId: string | null;
  showSnippet: boolean;
}

export const Inbox: React.FC<InboxProps> = ({
  emails,
  onOpen,
  setEmails,
  openedId,
  showSnippet,
}) => {
  const toggleSelect = (id: string, checked: boolean) => {
    setEmails((prev) =>
      prev.map((email) =>
        email.id === id ? { ...email, selected: checked } : email
      )
    );
  };

  return (
    <div className="inbox-container">
      {emails.map((email) => (
        <div
          key={email.id}
          className={`email-item ${openedId === email?.id ? "opened" : ""}`}
          onClick={() => onOpen(email.id)}
        >
          <input
            type="checkbox"
            checked={email.selected || false}
            onChange={(e) => {
              e.stopPropagation();
              toggleSelect(email.id, e.target.checked);
            }}
          />
          <div className="email-content">
            <div className="email-header">
              <span className="email-sender">{email.sender}</span>
              <span className="email-date">
                {new Date(email.date).toLocaleDateString()}
              </span>
            </div>
            <div className="email-subject">{email.subject}</div>
            {showSnippet && (
              <div className="email-body">{email.body.slice(0, 50)}...</div>
            )}
            {email.isSpam && <div className="spam-tag">SPAM</div>}
          </div>
        </div>
      ))}
    </div>
  );
};

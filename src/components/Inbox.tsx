import React from "react";
import type { Email } from "../types";
import "./Inbox.css";

type Props = {
  emails: Email[];
  openedId: string | null;
  showSnippet: boolean;
  onOpen: (id: string) => void;
  setEmails: React.Dispatch<React.SetStateAction<Email[]>>;
};

const Inbox: React.FC<Props> = ({
  emails,
  openedId,
  showSnippet,
  onOpen,
  setEmails,
}) => {
  const handleSelect = (id: string, isChecked: boolean) => {
    setEmails((prev) =>
      prev.map((mail) =>
        mail.id === id ? { ...mail, selected: isChecked } : mail
      )
    );
  };

  const openMail = (id: string) => {
    setEmails((prev) =>
      prev.map((mail) => (mail.id === id ? { ...mail, isRead: true } : mail))
    );
    onOpen(id);
  };

  return (
    <div className="inbox-container">
      {emails.map((mail) => {
        const { id, sender, date, subject, body, selected, isRead, isSpam } =
          mail;

        const classNames = [
          "email-item",
          openedId === id ? "opened" : "",
          isRead ? "read" : "unread",
          isSpam ? "spam" : "",
        ]
          .filter(Boolean)
          .join(" ");

        return (
          <div key={id} className={classNames} onClick={() => openMail(id)}>
            <input
              type="checkbox"
              checked={!!selected}
              onChange={(e) => handleSelect(id, e.target.checked)}
              onClick={(e) => e.stopPropagation()}
            />
            <div className="email-content">
              <div className="email-header">
                <span className="email-sender">{sender}</span>
                <span className="email-date">
                  {new Date(date).toLocaleDateString()}
                </span>
              </div>

              <div className="email-subject">{subject}</div>

              {showSnippet && (
                <div className="email-body">{body.slice(0, 50)}...</div>
              )}

              {isSpam && <div className="spam-tag">SPAM</div>}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Inbox;

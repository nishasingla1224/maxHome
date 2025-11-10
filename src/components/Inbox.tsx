import React from "react";
import { Email } from "../types";

interface InboxProps {
  emails: Email[];
  onOpen: (id: string) => void;
  openedId: string | null;
  setEmails: React.Dispatch<React.SetStateAction<Email[]>>;
}

export const Inbox: React.FC<InboxProps> = ({ emails, onOpen, openedId }) => {
  return (
    <div className="space-y-2">
      {emails.map((email) => (
        <div
          key={email.id}
          className={`p-3 rounded-lg cursor-pointer border hover:bg-blue-50 transition ${
            openedId === email?.id
              ? "border-blue-400 bg-blue-50"
              : "border-gray-200"
          }`}
          onClick={() => onOpen(email.id)}
        >
          <div className="flex justify-between">
            <span className="font-medium text-gray-800">{email.sender}</span>
            <span className="text-xs text-gray-400">
              {new Date(email.date).toLocaleDateString()}
            </span>
          </div>
          <div className="text-sm text-gray-700 truncate">{email.subject}</div>
          <div className="text-xs text-gray-500 truncate">
            {email.body.slice(0, 50)}...
          </div>
        </div>
      ))}
    </div>
  );
};

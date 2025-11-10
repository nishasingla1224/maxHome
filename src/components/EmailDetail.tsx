import React, { useState } from "react";
import { Email } from "../types";

interface EmailDetailProps {
  email: Email | null;
  onMarkUnread: (id: string) => void;
  onMarkSpam?: (id: string) => void; // optional
  onToggleRead: (id: string, value: boolean) => void;
}

export const EmailDetail: React.FC<EmailDetailProps> = ({
  email,
  onMarkUnread,
  onMarkSpam,
  onToggleRead,
}) => {
  const [replyOpen, setReplyOpen] = useState(false);

  // Handle the null case safely
  if (!email) {
    return (
      <div className="text-gray-400 text-center mt-20">
        Select an email to view details
      </div>
    );
  }

  const handleMarkUnread = () => {
    if (email?.id) onMarkUnread(email.id);
  };

  const handleMarkSpam = () => {
    if (email?.id && onMarkSpam) onMarkSpam(email.id);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="border-b pb-2 mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          {email.subject}
        </h2>
        <div className="text-sm text-gray-500">
          From: {email.sender} | {new Date(email.date).toLocaleString()}
        </div>
      </div>

      <div className="flex-1 text-gray-700 mb-6 whitespace-pre-line">
        {email.body}
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleMarkUnread}
          className="bg-yellow-100 hover:bg-yellow-200 text-yellow-800 px-3 py-1 rounded"
        >
          Mark Unread
        </button>

        {onMarkSpam && (
          <button
            onClick={handleMarkSpam}
            className="bg-red-100 hover:bg-red-200 text-red-800 px-3 py-1 rounded"
          >
            Mark Spam
          </button>
        )}

        <button
          onClick={() => setReplyOpen(!replyOpen)}
          className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-3 py-1 rounded"
        >
          {replyOpen ? "Cancel" : "Reply"}
        </button>
      </div>

      {replyOpen && (
        <div className="mt-4">
          <textarea
            className="w-full h-24 border rounded p-2 focus:ring focus:ring-blue-200"
            placeholder="Type your reply..."
          />
          <div className="flex justify-end mt-2 gap-2">
            <button
              className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
              onClick={() => setReplyOpen(false)}
            >
              Cancel
            </button>
            <button
              className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
              onClick={() => setReplyOpen(false)}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

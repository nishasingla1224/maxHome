import React, { useState } from "react";
import "./index.css";
import { mockEmails } from "./data/emails";
import { Email } from "./types";
import { PartnerProvider, usePartner } from "./context/PartnerConfigContext";
import { Inbox } from "./components/Inbox";
import { EmailDetail } from "./components/EmailDetail";

const MainApp: React.FC = () => {
  const [emails, setEmails] = useState<Email[]>(mockEmails);
  const [openedId, setOpenedId] = useState<string | null>(
    emails[0]?.id ?? null
  );
  const { config, available, setPartner } = usePartner();

  // Open email
  const openEmail = (id: string) => {
    setOpenedId(id);
    setEmails((prev) =>
      prev.map((e) => (e.id === id ? { ...e, read: true } : e))
    );
  };

  // Mark as Spam
  const markAsSpam = () => {
    setEmails((prev) =>
      prev.map((email) =>
        email.selected ? { ...email, isSpam: true, selected: false } : email
      )
    );
  };

  // Mark as Read
  const markAsRead = () => {
    setEmails((prev) =>
      prev.map((email) =>
        email.selected ? { ...email, read: true, selected: false } : email
      )
    );
  };

  // Mark as Unread
  const markAsUnread = () => {
    setEmails((prev) =>
      prev.map((email) =>
        email.selected ? { ...email, read: false, selected: false } : email
      )
    );
  };

  // Delete selected emails
  const deleteSelected = () => {
    setEmails((prev) => prev.filter((email) => !email.selected));
    setOpenedId(null);
  };

  // Are any emails selected?
  const anySelected = emails.some((email) => email.selected);

  // Currently opened email
  const currentEmail = emails.find((e) => e.id === openedId) ?? null;

  // Reset openedId when partner changes
  React.useEffect(() => {
    setOpenedId(null);
  }, [config.id]);

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div>
          <h1 className="app-title">Mail Client</h1>
          <div className="label">Partner</div>
          <select
            value={config.id}
            onChange={(e) => setPartner(e.target.value)}
            className="partner-select"
          >
            {available.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
        <div className="config-text">
          Config: {config.allowMarkSpam ? "Spam Enabled" : "No Spam"} |{" "}
          {config.emailSnippet ? "Snippet On" : "Snippet Off"}
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Toolbar */}

        <div className="toolbar">
          <button onClick={markAsRead}>Mark as Read</button>
          <button onClick={markAsUnread}>Mark as Unread</button>
          {config.allowMarkSpam && (
            <button onClick={markAsSpam}>Mark as Spam</button>
          )}
          <button onClick={deleteSelected}>Delete</button>
        </div>

        {/* Inbox and Detail */}
        <div className="content-split">
          <section className="inbox-section">
            <Inbox
              emails={emails}
              setEmails={setEmails}
              onOpen={openEmail}
              openedId={openedId}
              showSnippet={config.emailSnippet}
            />
          </section>

          <section className="detail-section">
            <EmailDetail
              email={currentEmail}
              onMarkUnread={(id) =>
                setEmails((prev) =>
                  prev.map((e) => (e.id === id ? { ...e, read: false } : e))
                )
              }
              onMarkSpam={
                config.allowMarkSpam
                  ? (id) =>
                      setEmails((prev) =>
                        prev.map((e) =>
                          e.id === id ? { ...e, isSpam: true } : e
                        )
                      )
                  : undefined
              }
              onToggleRead={(id, value) =>
                setEmails((prev) =>
                  prev.map((e) => (e.id === id ? { ...e, read: value } : e))
                )
              }
            />
          </section>
        </div>
      </main>
    </div>
  );
};

function App() {
  return (
    <PartnerProvider>
      <MainApp />
    </PartnerProvider>
  );
}

export default App;

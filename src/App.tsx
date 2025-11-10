import React, { useState, useEffect } from "react";
import "./index.css";
import { mockEmails } from "./data/emails";
import type { Email } from "./types";
import { PartnerProvider, usePartner } from "./context/PartnerConfigContext";
import Inbox from "./components/Inbox";
import { EmailDetail } from "./components/EmailDetail";

const MainApp: React.FC = () => {
  const [emails, setEmails] = useState<Email[]>(mockEmails);
  const [activeId, setActiveId] = useState<string | null>(
    emails[0]?.id || null
  );

  const { config, available, setPartner } = usePartner();

  const openMail = (id: string) => {
    setActiveId(id);
    setEmails((prev) =>
      prev.map((mail) => (mail.id === id ? { ...mail, read: true } : mail))
    );
  };

  const updateSelected = (callback: (mail: Email) => Email) => {
    setEmails((prev) =>
      prev.map((mail) => (mail.selected ? callback(mail) : mail))
    );
  };

  const markAsSpam = () =>
    updateSelected((mail) => ({ ...mail, isSpam: true, selected: false }));

  const markAsRead = () =>
    updateSelected((mail) => ({ ...mail, read: true, selected: false }));

  const markAsUnread = () =>
    updateSelected((mail) => ({ ...mail, read: false, selected: false }));

  const deleteSelected = () => {
    setEmails((prev) => prev.filter((mail) => !mail.selected));
    setActiveId(null);
  };

  const hasSelection = emails.some((mail) => mail.selected);
  const openedMail = emails.find((mail) => mail.id === activeId) || null;

  // Reset open mail when partner changes
  useEffect(() => {
    setActiveId(null);
  }, [config.id]);

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div>
          <h1 className="app-title">Mail Client</h1>
          <div className="label">Partner</div>
          <select
            className="partner-select"
            value={config.id}
            onChange={(e) => setPartner(e.target.value)}
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

        {/* Inbox & Detail */}
        <div className="content-split">
          <section className="inbox-section">
            <Inbox
              emails={emails}
              setEmails={setEmails}
              onOpen={openMail}
              openedId={activeId}
              showSnippet={config.emailSnippet}
            />
          </section>

          <section className="detail-section">
            <EmailDetail
              email={openedMail}
              onMarkUnread={(id) =>
                setEmails((prev) =>
                  prev.map((mail) =>
                    mail.id === id ? { ...mail, read: false } : mail
                  )
                )
              }
              onMarkSpam={
                config.allowMarkSpam
                  ? (id) =>
                      setEmails((prev) =>
                        prev.map((mail) =>
                          mail.id === id ? { ...mail, isSpam: true } : mail
                        )
                      )
                  : undefined
              }
              onToggleRead={(id, value) =>
                setEmails((prev) =>
                  prev.map((mail) =>
                    mail.id === id ? { ...mail, read: value } : mail
                  )
                )
              }
            />
          </section>
        </div>
      </main>
    </div>
  );
};

const App: React.FC = () => (
  <PartnerProvider>
    <MainApp />
  </PartnerProvider>
);

export default App;

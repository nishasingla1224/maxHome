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

  const openEmail = (id: string) => {
    setOpenedId(id);
    setEmails((prev) =>
      prev.map((e) => (e.id === id ? { ...e, read: true } : e))
    );
  };

  const markSpamFromDetail = (id: string) => {
    setEmails((prev) =>
      prev.map((e) => (e.id === id ? { ...e, isSpam: true } : e))
    );
  };

  const toggleRead = (id: string, value: boolean) => {
    setEmails((prev) =>
      prev.map((e) => (e.id === id ? { ...e, read: value } : e))
    );
  };

  const currentEmail = emails.find((e) => e.id === openedId) ?? null;

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r p-4 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-6 text-blue-600">Mail Client</h1>
          <div className="mb-3 text-gray-600 font-medium">Partner</div>
          <select
            value={config.id}
            onChange={(e) => setPartner(e.target.value)}
            className="w-full border rounded p-2 text-gray-700 focus:outline-none focus:ring focus:ring-blue-200"
          >
            {available.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
        <div className="text-sm text-gray-400 text-center mt-6">
          Config: {config.allowMarkSpam ? "Spam Enabled" : "No Spam"}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex flex-1 overflow-hidden">
        {/* Inbox */}
        <section className="w-1/3 border-r overflow-y-auto p-4 bg-white">
          <Inbox
            emails={emails}
            setEmails={setEmails}
            onOpen={openEmail}
            openedId={openedId}
          />
        </section>

        {/* Email Detail */}
        <section className="flex-1 p-6 overflow-y-auto">
          <EmailDetail
            email={currentEmail}
            onMarkUnread={(id) => toggleRead(id, false)}
            onMarkSpam={config.allowMarkSpam ? markSpamFromDetail : undefined}
            onToggleRead={toggleRead}
          />
        </section>
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

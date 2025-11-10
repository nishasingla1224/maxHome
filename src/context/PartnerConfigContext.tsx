=import React, { createContext, useContext, useState } from "react";

interface PartnerConfig {
  id: string;
  name: string;
  themeColor: string;
  allowMarkSpam: boolean;
  emailSnippet: boolean;
}

interface PartnerContextType {
  partner: PartnerConfig;
  config: PartnerConfig;
  available: PartnerConfig[];
  setPartner: (id: string) => void;
}

const partnerConfigs: PartnerConfig[] = [
  {
    id: "partnerA",
    name: "Partner A",
    themeColor: "#2563eb", // blue
    allowMarkSpam: false,
    emailSnippet: true,
  },
  {
    id: "partnerB",
    name: "Partner B",
    themeColor: "#16a34a", // green
    allowMarkSpam: true,
    emailSnippet: false,
  },
];

const PartnerConfigContext = createContext<PartnerContextType | undefined>(
  undefined
);

export const PartnerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [partner, setPartnerState] = useState<PartnerConfig>(partnerConfigs[0]);

  const setPartner = (id: string) => {
    const found = partnerConfigs.find((p) => p.id === id);
    if (found) setPartnerState(found);
  };

  const value: PartnerContextType = {
    partner,
    config: partner,
    available: partnerConfigs,
    setPartner,
  };

  return (
    <PartnerConfigContext.Provider value={value}>
      {children}
    </PartnerConfigContext.Provider>
  );
};

export const usePartner = (): PartnerContextType => {
  const context = useContext(PartnerConfigContext);
  if (!context) {
    throw new Error("usePartner must be used within a PartnerProvider");
  }
  return context;
};

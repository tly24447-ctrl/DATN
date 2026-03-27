'use client';
import { LanguageCode, LanguageResource, resources } from "@/src/domain/entity/language.entity";
import { createContext, ReactNode, useContext, useState } from "react";

// --- Context Definition ---
interface LanguageContextProps {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: LanguageResource; // "t" stands for translate
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

// --- Provider Component ---
export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<LanguageCode>('vi');

  const value = {
    language,
    setLanguage,
    t: resources[language],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

// --- Custom Hook for easy access ---
export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};
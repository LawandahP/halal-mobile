import { createContext, useContext } from "react";

export type LocalizationContextValue = {
  t(key: string): string;
  selectedLanguage: string;
  changeLanguage(lang: string): void;
};

export const LocalizationContext = createContext<LocalizationContextValue>({
  t: (key: string) => key,
  selectedLanguage: "en",
  changeLanguage: () => {},
});

export const useTranslation = () => useContext(LocalizationContext);

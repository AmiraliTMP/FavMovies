import en from "./en";
import fa from "./fa";
import fr from "./fr";

export const authMessages = {
  en,
  fr,
  fa,
};

export type AuthLocale = keyof typeof authMessages;
export type AuthMessageKey = keyof typeof en;

export function getAuthMessages(locale: string) {
  return authMessages[locale as AuthLocale] ?? authMessages.en;
}

import { createContext, useContext, useState } from "react";

// context 기본값 설정
export const LocaleContext = createContext();

export function LocaleProvider({ defaultValue = "ko", children }) {
  const [locale, setLocale] = useState(defaultValue);
  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

// 매번 useContext LocaleContext 값 사용하기 번거로움 => 커스텀 Hook 만들어
// useLocale Hook 은 Locale 값 전달, useSetLocale Hook 은 setLocale 값 전달

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("Provider 확인");
  }
  return context.locale;
}
// LocaleContext 가 전달하는 값이 없을 때 에러 발생. 이 훅은 반드시 provider 안에서 사용되어야 함

export function useSetLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("Provider 확인");
  }
  return context.setLocale;
}

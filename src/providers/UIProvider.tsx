import { useEffect, createContext, useContext, useMemo } from "react";
import useTheme from "@Hooks/useTheme";
import useDirection from "@Hooks/useDirection";
import useLanguage from "@Hooks/useLanguage";
import ConfigProvider from "@Providers/ConfigProvider";
import useWindowDimensions from "@Hooks/useWindowDimensions";
import useClientSettings from "@Hooks/useClientSettings";
import { useClientSettingsOptionState } from "@State/useSettingsConfigState";

interface UIContext {
  width: number;
  height: number;
  companyLogoUrl: string;
  companyBackgroundUrl: string;
  theme: string;
  setTheme: (theme: string | number) => void;
  themeVariables: any;
  colors: { primaryColor: string; secondaryColor: string };
  showLanguageSwitcher: boolean;
  language: string;
  setLanguage: (language: string | number) => void;
  languages: Array<{ value: string | number; icon: string }>;
  direction: "rtl" | "ltr";
  setDirection: (direction) => void;
  applyingTheme: boolean;
  dateFormat: string;
}

export const UIContext = createContext<Partial<UIContext>>({
  width: null,
  height: null,
  companyLogoUrl: "",
  companyBackgroundUrl: "",
  theme: "light",
  setTheme: (theme) => {},
  themeVariables: "",
  colors: {
    primaryColor: "",
    secondaryColor: "",
  },
  showLanguageSwitcher: false,
  language: "en",
  setLanguage: (language) => {},
  languages: [{ value: "en", icon: "src" }],
  direction: "rtl",
  setDirection: (direction) => {},
  applyingTheme: false,
  dateFormat: "DD/MM/YYYY",
});

export const useUI: () => Partial<UIContext> = () => useContext(UIContext);
export interface IUIProvider {
  children: any;
  additionalValues?: Object;
}

const UIProvider = ({ children, additionalValues }: IUIProvider) => {
  const { theme, setTheme, themeVariables, applyingTheme } = useTheme();
  const { language, setLanguage, languages } = useLanguage();
  const { direction, setDirection } = useDirection();
  const { width, height } = useWindowDimensions();
  const {
    companyLogoUrl,
    companyBackgroundUrl,
    showLanguageSwitcher,
  } = useClientSettings();
  const { data: dateFormatData } = useClientSettingsOptionState("default_date_format");

  useEffect(() => {
    setDirection(language === "he" ? "rtl" : "ltr");
  }, [language]);

  useEffect(() => {
    document.documentElement.dir = direction;
  }, [direction]);

  const primaryColor = themeVariables?.["@primary-color"];
  const secondaryColor = themeVariables?.["@secondary-color"];
  const dateFormat = dateFormatData?.stringValue;

  const colors = useMemo(() => {
    if (primaryColor && secondaryColor) {
      return {
        primaryColor,
        secondaryColor,
      };
    } else {
      return {
        primaryColor: "#204079",
        secondaryColor: "#3f8cff",
      };
    }
  }, [primaryColor, secondaryColor]);

  return (
    <UIContext.Provider
      value={{
        width,
        height,
        companyLogoUrl,
        companyBackgroundUrl,
        setTheme,
        colors,
        theme,
        themeVariables,
        showLanguageSwitcher,
        setLanguage,
        language,
        languages,
        direction,
        setDirection,
        applyingTheme,
        dateFormat,
        ...(additionalValues || {}),
      }}
    >
      <ConfigProvider direction={direction}>
        <div className={direction === "rtl" ? " rtl" : ""}>{children}</div>
      </ConfigProvider>
    </UIContext.Provider>
  );
};

export default UIProvider;

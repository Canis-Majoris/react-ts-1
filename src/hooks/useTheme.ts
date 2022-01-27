import useLocalStorage from "./useLocalStorage";
import { useCallback, useEffect, useState } from "react";
import { getResource } from "@Tools/utils";
import { getPublicSettingsQuery } from "@Queries/public";

const useTheme = () => {
  const [theme, setTheme] = useLocalStorage("theme", "theme");
  const [themeVariables, setThemeVariables] = useState({});
  const [applyingTheme, setApplyingTheme] = useState(false);

  useEffect(() => {
    if (theme) {
      applyThemeVars(theme);
    }
    return () => {};
  }, [theme]);

  const applyThemeVars = useCallback(
    async (themeName) => {
      try {
        setApplyingTheme(true);
        const { default: themeVars } = await import(
          `../styles/themes/generated/${themeName}.json`
        );

        const res = await getPublicSettingsQuery();
        if (res?.success) {
          const newThemeVariables = {
            ...themeVars,
            "@primary-color": res?.data?.primaryColor,
            "@secondary-color": res?.data?.secondaryColor,
          };
          setThemeVariables(newThemeVariables);
        }
      } catch (e) {
        console.error(e?.message);
      }
      setApplyingTheme(false);
    },
    [getResource]
  );

  return { theme, setTheme, themeVariables, applyingTheme };
};

export default useTheme;

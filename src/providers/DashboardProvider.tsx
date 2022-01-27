import { useClientSettingsOptionState } from "@State/useSettingsConfigState";
import { useEffect } from "react";
import { createContext, useContext, useMemo, useReducer } from "react";
interface DashboardContext {
  state: DashboardState;
  isSystemCurrencyLoading: boolean;
  isSystemCurrencyError: boolean;
}

interface DashboardState {
  loading: boolean;
  systemCurrency: string;
}

export const DashboardContext = createContext<Partial<DashboardContext>>({});
export const useDashboard = (): Partial<DashboardContext> =>
  useContext(DashboardContext);

const DashboardProvider = ({ children }) => {
  const [state, setState] = useReducer(
    (oldState: DashboardState, newState: Partial<DashboardState>) => ({
      ...oldState,
      ...newState,
    }),
    {
      loading: false,
      systemCurrency: "",
    }
  );

  const {
    isLoading: isSystemCurrencyLoading,
    isError: isSystemCurrencyError,
    data: systemCurrencyData,
  } = useClientSettingsOptionState("system_currency");

  useEffect(() => {
    setState({ systemCurrency: systemCurrencyData?.stringValue });
  }, [systemCurrencyData]);

  const api = useMemo(
    () => ({
      state,
      isSystemCurrencyLoading,
      isSystemCurrencyError,
    }),
    [state, isSystemCurrencyLoading, isSystemCurrencyError]
  );

  return (
    <DashboardContext.Provider value={api}>
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardProvider;

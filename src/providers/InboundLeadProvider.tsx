import useCompanyLogoState from "@State/useCompayLogoState";
import { useEffect } from "react";
import { createContext, useContext, useMemo, useReducer } from "react";

interface InboundLeadState {
  step: 1 | 2;
  companyLogoUrl: string;
  isAutomaticActivate: boolean;
}

interface InboundLeadContext {
  state: InboundLeadState;
  handleChangeStep: (step: 1 | 2) => void;
  handleAutomaticActivate: (isAutomatic: boolean) => void;
}

export const InboundLeadContext = createContext<Partial<InboundLeadContext>>(
  {}
);

export const useInboundLead: () => Partial<InboundLeadContext> = () =>
  useContext(InboundLeadContext);

const InboundLeadProvider = ({ children }) => {
  const [state, setState] = useReducer(
    (oldState: InboundLeadState, newState: Partial<InboundLeadState>) => ({
      ...oldState,
      ...newState,
    }),
    {
      step: 1,
      companyLogoUrl: "",
      isAutomaticActivate: false,
    }
  );
  const companyLogoData = useCompanyLogoState();

  useEffect(() => {
    const { url } = companyLogoData?.data || {};
    if (url) {
      setState({ companyLogoUrl: url });
    }
  }, [companyLogoData]);

  const handleChangeStep = (step: 1 | 2) => {
    setState({ step });
  };

  const handleAutomaticActivate = (isAutomatic: boolean) => {
    setState({isAutomaticActivate: isAutomatic});
  }

  const api = useMemo(
    () => ({
      state,
      handleChangeStep,
      handleAutomaticActivate,
    }),
    [state, handleChangeStep, handleAutomaticActivate]
  );

  return (
    <InboundLeadContext.Provider value={api}>
      {children}
    </InboundLeadContext.Provider>
  );
};

export default InboundLeadProvider;

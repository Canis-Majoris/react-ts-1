import { Suspense } from "react";
import { HashRouter as Router } from "react-router-dom";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { queryClientSetup } from "@Modules/api/config/react-query";
import useClientSettings from "@Hooks/useClientSettings";
import UIProvider, { useUI } from "@Providers/UIProvider";
import AuthProvider from "@Providers/AuthProvider";
import RoutesGenerator from "@Components/containers/routes/RoutesGenerator";
import AppLoading from "@Components/UI/organisms/AppLoading";
import useFonts from "@Hooks/useFonts";

const App = () => {
  useClientSettings();
  useFonts();

  return (
    <div className="app">
      <QueryClientProvider
        client={queryClientSetup({
          queryCahceOnError: (error: any, query) => {},
        })}
      >
        <UIProvider>
          <Router>
            <Suspense fallback={<AppLoading />}>
              <AuthProvider>
                <RoutesGenerator />
              </AuthProvider>
            </Suspense>
          </Router>
        </UIProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </div>
  );
};

export default App;

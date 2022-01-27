import { Route, Switch, Redirect } from 'react-router-dom';
import { useAuth } from '@Providers/AuthProvider';
import AppProvider from '@Providers/AppProvider';
import {
  auth_routes,
  public_routes,
  routes,
  select_account_routes,
} from '@Routes/index';
import AppLayoutTemplate from '@Components/templates/layout/AppLayoutTemplate';
import AuthLayoutTemplate from '@Components/templates/layout/AuthLayoutTemplate';
import PublicRoute from './PublicRoute';
import AuthRoute from './AuthRoute';
import PrivateRoute from './PrivateRoute';
import SelectAccountRoute from './SelectAccountRoute';
import useAnalytics from '@Hooks/useAnalytics';
import { useUI } from '@Providers/UIProvider';
import AppLoading from '@Components/UI/organisms/AppLoading';

export const RoutesGenerator = ({ loginLoading, status, previewMode }: any) => {
  useAnalytics();
  const { applyingTheme } = useUI();

  if (applyingTheme)
    return (
      <div style={{ height: '100vh' }}>
        <AppLoading />
      </div>
    );

  return (
    <Switch>
      <Route exact path={[...new Set(public_routes.map(({ url }) => url))]}>
        {public_routes.map((route: any, index: number) => (
          <PublicRoute key={`publicRoute-${index}`} route={route} />
        ))}
      </Route>
      <Route exact path={[...new Set(routes.map(({ url }) => url))]}>
        <AppProvider>
          <AppLayoutTemplate showPreviewBanner={previewMode}>
            {routes.map((route: any, index: number) => (
              <PrivateRoute
                key={`privateRoute-${index}`}
                route={route}
                loading={loginLoading}
                isAuthenticated={status}
              />
            ))}
          </AppLayoutTemplate>
        </AppProvider>
      </Route>
      <Route exact path={[...new Set(auth_routes.map(({ url }) => url))]}>
        <AuthLayoutTemplate>
          {auth_routes.map((route: any, index: number) => (
            <AuthRoute
              key={`authRoute-${index}`}
              route={route}
              loading={loginLoading}
              isAuthenticated={status}
            />
          ))}
        </AuthLayoutTemplate>
      </Route>
      <Route path='*' component={() => <Redirect to={{ pathname: '/' }} />} />
    </Switch>
  );
};

export default (props: any) => {
  const api = useAuth();

  if (!api) {
    throw new Error('No Provider detected');
  }

  return (
    <RoutesGenerator
      loginLoading={api.state.loginLoading}
      status={api.state.status}
      portalUserType={api.state.portalUserType}
      investorSelected={api.state.investorSelected}
      previewMode={api.state.previewMode}
      onChangeView={api.handleChangeView}
      contactRelatedAccounts={api.state.contactRelatedAccounts}
      {...props}
    />
  );
};

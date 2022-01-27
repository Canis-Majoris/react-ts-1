import { Route, Switch, useLocation } from 'react-router-dom';
import { routes } from '@Routes/index';
import AppLayoutTemplate from '@Components/templates/layout/AppLayoutTemplate';

const PrivateRoutes = ({ showPreviewBanner }: any) => {
  const location = useLocation();

  return (
    <AppLayoutTemplate showPreviewBanner={showPreviewBanner} >
      <Switch>
        {routes.map((route: any, index: number) => {
          return (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              render={(props) => {
                const Component = route.component;
                return route.render ? (
                  route.render(props)
                ) : (
                  <Component {...props} search={location.search} />
                );
              }}
            />
          );
        })}
      </Switch>
    </AppLayoutTemplate>
  );
};

export default PrivateRoutes;

import { Route, Switch, useLocation, withRouter } from 'react-router-dom';
import { auth_routes } from '@Routes/index';
import AuthLayoutTemplate from '@Components/templates/layout/AuthLayoutTemplate';

const AuthRoutes = () => {
  const location = useLocation();

  return (
    <AuthLayoutTemplate>
      <Switch>
        {auth_routes.map((route: any, index: number) => {
          return (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              render={(props: any) => {
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
    </AuthLayoutTemplate>
  );
};

export default withRouter(AuthRoutes);

import { Route, Switch, useLocation } from 'react-router-dom';
import { public_routes } from '@Routes/index';

const PublicRoutes = () => {
  const location = useLocation();

  return (
    <Switch>
      {public_routes.map((route: any, index: number) => (
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
      ))}
    </Switch>
  );
};

export default PublicRoutes;

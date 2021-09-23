import { Route, Redirect } from "react-router-dom";

const PublicRoute = ({ component: Component, ...rest }) => {
  return (
    // restricted = false meaning public route
    // restricted = true meaning restricted route
    <Route
      {...rest}
      render={(props) =>
        rest.wallet ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};

export default PublicRoute;

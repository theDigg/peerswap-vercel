import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      rest.wallet !== null ? (
        <Component {...props} {...rest} />
      ) : (
        <Redirect
          to={{
            pathname: '/welcome',
            state: { from: props.location },
          }}
        />
      )
    }
  />
)

export default PrivateRoute
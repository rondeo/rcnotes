// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import routes from 'routes';


const AuthRoute = ({ isLoggined, exact, path, component }) => {
  console.log('---- AuthRoute', path, isLoggined);
  if (!isLoggined) return <Redirect to={routes.auth.path} />;
  if (path === routes.auth.path) return <Redirect to={routes.list.path} />;
  return <Route exact={exact} path={path} component={component} />;
};

const mapStateToProps = ({
  user: { isLoggined },
}) => ({
  isLoggined,
});

export default connect(mapStateToProps)(AuthRoute);

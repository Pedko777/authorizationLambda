import React, { Component, Suspense } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Layout from './Layout';
import routes from '../routes';
import { authOperations } from '../redux/auth';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
class App extends Component {
  componentDidMount() {
    this.props.onGetCurrentUser();
  }

  render() {
    return (
      <BrowserRouter>
        <Layout>
          <Suspense fallback={<h1>Loading...</h1>}>
            <Switch>
              {routes.map(route => {
                return route.private ? (
                  <PrivateRoute key={route.label} {...route} />
                ) : (
                  <PublicRoute
                    key={route.label}
                    {...route}
                    restricted={route.restricted}
                  />
                );
              })}
            </Switch>
          </Suspense>
        </Layout>
      </BrowserRouter>
    );
  }
}

// export default App;
export default connect(null, {
  onGetCurrentUser: authOperations.getCurrentUser,
})(App);

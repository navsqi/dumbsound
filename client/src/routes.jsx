import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from './components/Header';

import Home from './containers/Home';

import Pay from './containers/Pay';
import Transaction from './containers/Transaction';

import AddMusic from './containers/AddMusic';
import AddArtist from './containers/AddArtist';
import P404 from './error-pages/P404';

const PrivateRoute = ({ children, roles, user, isLogin, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLogin && roles.includes(user) ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

const Routes = (props) => {
  const { user, isLogin } = props;

  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/detail/:idMusic" component={Home} />
          {/* <Route path="/detail/:idFilm/:title/:idEp" component={Detail} /> */}
          <PrivateRoute isLogin={isLogin} roles={['admin', 'user']} user={user.role} path="/admin/transactions">
            <Transaction />
          </PrivateRoute>
          <PrivateRoute isLogin={isLogin} roles={['admin', 'user']} user={user.role} path="/pay/:userId">
            <Pay />
          </PrivateRoute>
          <PrivateRoute isLogin={isLogin} roles={['admin']} user={user.role} path="/admin/add-music">
            <AddMusic />
          </PrivateRoute>
          <PrivateRoute isLogin={isLogin} roles={['admin']} user={user.role} path="/admin/add-artist">
            <AddArtist />
          </PrivateRoute>
          <Route path="*" component={P404} />
        </Switch>
      </div>
    </Router>
  );
};

const mapStateToProps = (state) => {
  return {
    isLogin: state.authReducer.isLogin,
    user: state.authReducer.user,
  };
};

export default connect(mapStateToProps)(Routes);

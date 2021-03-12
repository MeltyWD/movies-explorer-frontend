import React from 'react';
import './app.css';
import {
  Route, Switch, Redirect, withRouter, useHistory, useRouteMatch,
} from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Login from '../ComponentsWithForm/Login';
import Profile from '../Profile/Profile';
import Registration from '../ComponentsWithForm/Registration';
import Movies from '../Movies/Movies';
import SavedMovies from '../Movies/SavedMovies/SavedMovies';
import NotFound from '../NotFound/NotFound';
import logo from '../../images/logo.svg';

function App() {
  const [loginIn, setLoginIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({
    name: 'Имя',
    email: 'email',
  });
  const history = useHistory();

  function authorize(data) {
    console.log(data);
    setCurrentUser({
      name: 'Имя',
      email: data.email,
    });
    setLoginIn(true);
    history.push('/movies');
  }

  function logout() {
    setLoginIn(false);
  }

  const routesPathsHeaderArray = [
    '/signin',
    '/signup',
    '/404',
  ];

  const routesPathsFooterArray = [
    '/signin',
    '/signup',
    '/profile',
    '/404',
  ];

  return (
    <>
      {useRouteMatch(routesPathsHeaderArray) ? null : <Header
        loginIn={loginIn}
        logo={logo}
      /> }
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route exact path="/movies">
          <Movies />
        </Route>
        <Route exact path="/saved-movies">
          <SavedMovies />
        </Route>
        <Route exact path="/signin">
          <Login
            logo={logo}
            login={authorize}
            />
        </Route>
        <Route exact path="/signup">
          <Registration
            logo={logo}
            login={authorize}
          />
        </Route>
        <Route exact path="/profile">
          <Profile currentUser={currentUser} logout={logout} />
        </Route>
        <Route exact path="/404">
          <NotFound />
        </Route>
        <Route exact path="*">
          <Redirect to="/404" />
        </Route>
      </Switch>
      {useRouteMatch(routesPathsFooterArray) ? null : <Footer />}
    </>
  );
}

export default withRouter(App);

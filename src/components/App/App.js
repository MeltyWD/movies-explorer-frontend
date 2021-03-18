import React from 'react';
import './app.css';
import {
  Route, Switch, Redirect, withRouter, useRouteMatch,
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
import CurrentUserContext from '../../contexts/CurrentUserContext';
import MovieContext from '../../contexts/MovieContext';
import Preloader from '../Preloader/Preloader';
import InfoTooltip from '../InfoToolTip/InfoTooltip';
import mainApi from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [infoToolsTipText, setInfoToolsTipText] = React.useState({
    text: 'Что-то пошло не так! Попробуйте ещё раз.',
    status: false,
  });
  const [savedMovieList, setSavedMovieList] = React.useState([]);
  const [movieList, setMovieList] = React.useState([]);
  const [initialization, setInitialization] = React.useState(false);

  function handleFail(message, res) {
    if (res === true) {
      setInfoToolsTipText({
        text: message.message,
        status: true,
      });
    } else {
      setInfoToolsTipText({
        text: message.message,
        status: false,
      });
    }
    setIsInfoTooltipOpen(true);
  }

  function checkToken() {
    if (localStorage.getItem('logginIn')) {
    // проверяем токен пользователя
      mainApi.checkToken().then((res) => {
        if (res._id) {
          setCurrentUser(res);
          setLoggedIn(true);
        } else {
          handleFail(res);
        }
        setInitialization(true);
      }).catch((err) => handleFail(err));
    } else {
      setInitialization(true);
    }
  }

  React.useEffect(() => {
    if (loggedIn === true) {
      Promise.all([
        mainApi.getSavedMovies(),
        moviesApi.getInitialMovies(),
      ])
        .then(([savedMoviesList, moviesList]) => {
          setSavedMovieList(savedMoviesList);
          setMovieList(moviesList);
        })
        .catch((err) => handleFail(err));
    } else {
      checkToken();
    }
  }, [loggedIn]);

  function handleUpdateUser(data) {
    return (
      mainApi.patchProfileEdit(data)
        .then((result) => {
          setCurrentUser(result);
          const message = { message: 'Изменение данных прошло успешно' };
          handleFail(message, true);
        })
        .catch((err) => handleFail(err))
    );
  }

  function logout() {
    mainApi.logout()
      .then(() => {
        localStorage.removeItem('logginIn');
        setLoggedIn(false);
      });
  }

  function infotooltipclose() {
    setIsInfoTooltipOpen(false);
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
        loginIn={loggedIn}
        logo={logo}
      /> }
      {
        !initialization
          ? <Preloader />
          : <>
          <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
          <MovieContext.Provider value={{
            handleFail,
            movieList,
            savedMovieList,
            setSavedMovieList,
          }}>
          <Switch>
            <Route exact path="/">
              <Main />
            </Route>
            <ProtectedRoute
              exact
              path="/movies"
              loggedIn={loggedIn}
              component={Movies}
            />
            <ProtectedRoute
              exact
              path="/saved-movies"
              loggedIn={loggedIn}
              component={SavedMovies}
            />
            <Route exact path="/signin">
              {
                loggedIn
                  ? <Redirect to="/movies" />
                  : <Login
                    logo={logo}
                    login={checkToken}
                    onFail={handleFail}
                  />
              }
            </Route>
            <Route exact path="/signup">
            {
                loggedIn
                  ? <Redirect to="/movies" />
                  : <Registration
                  logo={logo}
                  login={checkToken}
                  onFail={handleFail}
                />
            }
            </Route>
            <ProtectedRoute
              exact
              path="/profile"
              loggedIn={loggedIn}
              component={Profile}
              logout={logout}
              patch={handleUpdateUser}
            />
            <Route exact path="/404">
              <NotFound />
            </Route>
            <Route exact path="*">
              <Redirect to="/404" />
            </Route>
          </Switch>
          </MovieContext.Provider>
          </CurrentUserContext.Provider>
        </>
      }
      <InfoTooltip
        isOpen={isInfoTooltipOpen}
        onClose={infotooltipclose}
        infoContent={infoToolsTipText}
      />
      {useRouteMatch(routesPathsFooterArray) ? null : <Footer />}
    </>
  );
}

export default withRouter(App);

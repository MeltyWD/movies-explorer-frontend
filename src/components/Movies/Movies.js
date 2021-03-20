import React from 'react';
import './movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import MoviesCard from './MoviesCard/MoviesCard';
import MovieContext from '../../contexts/MovieContext';
import Preloader from '../Preloader/Preloader';
import { shortFilmDuration } from '../../utils/constants';

function Movie() {
  const [currentMovieList, setCurrentMovieList] = React.useState([]);
  const [checked, setChecked] = React.useState(true);
  const { movieList, initializationMovie } = React.useContext(MovieContext);

  React.useEffect(() => {
    setCurrentMovieList(movieList);
  }, [movieList]);

  function searchFilter(searchText) {
    setCurrentMovieList(movieList.filter((movie) => movie
      .nameRU.toUpperCase()
      .indexOf(searchText.toUpperCase()) > -1));
  }

  function checkboxFilter(movies) {
    if (!checked) {
      return movies.filter((movie) => movie.duration > shortFilmDuration);
    }
    return movies;
  }

  return (
    <section className="movies">
      <SearchForm
        title="Фильмы"
        searchFilter={searchFilter}
        checked={checked}
        setChecked={setChecked}
      />
      {
        !initializationMovie
          ? <Preloader />
          : <>{
            checkboxFilter(currentMovieList).length === 0
              ? <p className="movies__notfound">Ничего не найдено</p>
              : <MoviesCardList
            movieList={checkboxFilter(currentMovieList)}
            component={MoviesCard}
          />
          }
      </>
      }
    </section>
  );
}

export default Movie;

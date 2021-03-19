import React from 'react';
import '../movies.css';
import SearchForm from '../../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SavedMoviesCard from '../MoviesCard/SavedMoviesCard';
import MovieContext from '../../../contexts/MovieContext';
import Preloader from '../../Preloader/Preloader';
import { shortFilmDuration } from '../../../utils/constants';

function SavedMovies() {
  const { savedMovieList, initializationSavedMovie } = React.useContext(MovieContext);
  const [checked, setChecked] = React.useState(true);
  const [currentMovieList, setCurrentMovieList] = React.useState(savedMovieList);

  function searchFilter(searchText) {
    setCurrentMovieList(savedMovieList.filter((movie) => movie
      .nameRU.toUpperCase()
      .indexOf(searchText.toUpperCase()) > -1));
  }

  React.useEffect(() => {
    setCurrentMovieList(savedMovieList);
  }, [savedMovieList]);

  function checkboxFilter(movies) {
    if (!checked) {
      return movies.filter((movie) => movie.duration > shortFilmDuration);
    }
    return movies;
  }

  return (
    <section className="movies">
      <SearchForm
        title="Сохранённые фильмы"
        searchFilter={searchFilter}
        checked={checked}
        setChecked={setChecked}
      />
      {
        !initializationSavedMovie
          ? <Preloader />
          : <>{
            currentMovieList.length === 0
              ? <p className="movies__notfound">Ничего не найдено</p>
              : <MoviesCardList
              movieList={checkboxFilter(currentMovieList)}
              component={SavedMoviesCard}
            />
          }
          </>
      }
    </section>
  );
}

export default SavedMovies;

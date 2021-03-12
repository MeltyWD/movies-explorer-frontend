import React from 'react';
import './movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import movieList from '../../utils/Movies.json';
import MoviesCard from './MoviesCard/MoviesCard';

function Movie() {
  const [currentMovieList, setCurrentMovieList] = React.useState(movieList);
  function searchFilter(searchText) {
    setCurrentMovieList(movieList.filter((movie) => movie
      .nameRU.toUpperCase()
      .indexOf(searchText.toUpperCase()) > -1));
  }

  return (
    <section className="movies">
      <SearchForm
        title="Фильмы"
        search={searchFilter}
      />
      <MoviesCardList
        movieList={currentMovieList}
        component={MoviesCard}
      />
    </section>
  );
}

export default Movie;

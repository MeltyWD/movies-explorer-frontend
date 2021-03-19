import React from 'react';
import './movies__card-list.css';
import classnames from 'classnames';
import { gridCount, elemCount } from '../../../utils/constants';

function MoviesCardList(props) {
  const Component = props.component;

  const [currentMovieCount, setCurrentMovieCount] = React.useState(elemCount);

  function addMovie() {
    setCurrentMovieCount(currentMovieCount + (gridCount === 1 ? 2 : gridCount));
  }

  const buttonClass = classnames({
    movies__addbutton: true,
    movies__addbutton_active: props.movieList.slice(currentMovieCount).length !== 0,
  });

  return (
    <>
      <div className="movies__card-list">
        {props.movieList.slice(0, currentMovieCount).map((movie) => (
            <Component
              data={movie}
              key={movie.id || movie.movieId}
            />
        ))}
      </div>
      <button className={buttonClass} onClick={addMovie}>Ещё</button>
    </>
  );
}

export default MoviesCardList;

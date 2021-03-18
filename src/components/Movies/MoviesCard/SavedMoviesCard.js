import React from 'react';
import './card.css';
import deleteSVG from '../../../images/delete.svg';
import mainApi from '../../../utils/MainApi';
import MovieContext from '../../../contexts/MovieContext';
import noImage from '../../../images/no__image.png';

function SavedMoviesCard(props) {
  const { savedMovieList, setSavedMovieList } = React.useContext(MovieContext);

  function removeClick() {
    mainApi.postDeleteSavedMovies({ movieId: props.data.movieId })
      .then((res) => {
        setSavedMovieList(savedMovieList.filter((item) => item.movieId !== res.movieId));
      });
  }

  function duration(timeInSeconds) {
    const hours = Math.floor(timeInSeconds / 60);
    const minutes = Math.floor(timeInSeconds) % 60;

    return `${hours}ч ${minutes}м`;
  }

  function imageUrlFix() {
    if (props.data.image === null) {
      return noImage;
    }
    return `${props.data.image}`;
  }

  return (
    <div className="card">
      <img className="card__image" src={imageUrlFix()} alt={`фото ${props.data.nameRU}`} />
      <div className="card__text-box">
        <p className="card__text">{props.data.nameRU}</p>
        <div className="card__like-container" onClick={removeClick}>
          <img className="card__delete" src={deleteSVG} alt="удаление" />
        </div>
      </div>
      <p className="card__duration">{duration(props.data.duration)}</p>
    </div>
  );
}

export default SavedMoviesCard;

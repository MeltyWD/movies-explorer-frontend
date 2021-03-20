import React from 'react';
import './card.css';
import classnames from 'classnames';
import likeSVG from '../../../images/like.svg';
import mainApi from '../../../utils/MainApi';
import MovieContext from '../../../contexts/MovieContext';
import noImage from '../../../images/no__image.png';

function MoviesCard(props) {
  const { handleFail, savedMovieList, setSavedMovieList } = React.useContext(MovieContext);
  const [liked, setLiked] = React.useState(
    savedMovieList.some((item) => item.movieId === String(props.data.id)),
  );
  const likeClass = classnames({
    card__like: true,
    card__like_active: liked,
  });

  function likeClick() {
    setLiked(!liked);
    if (!liked) {
      mainApi.postSavedMovies({
        image: `https://api.nomoreparties.co${props.data.image.url}`,
        country: props.data.country || 'не указано',
        director: props.data.director || 'не указано',
        duration: props.data.duration || 'не указано',
        year: props.data.year || 'не указано',
        description: props.data.description || 'не указано',
        trailer: props.data.trailerLink || 'не указано',
        thumbnail: `https://api.nomoreparties.co${props.data.image.formats.thumbnail.url}`,
        movieId: props.data.id || 'не указано',
        nameRU: props.data.nameRU || 'не указано',
        nameEN: props.data.nameEN || 'не указано',
      })
        .then((res) => {
          setSavedMovieList(savedMovieList.concat(res));
          localStorage.setItem('savedMovieList', JSON.stringify(savedMovieList.concat(res)));
        })
        .catch((err) => handleFail(err));
    } else {
      mainApi.postDeleteSavedMovies({ movieId: props.data.id })
        .then((res) => {
          setSavedMovieList(savedMovieList.filter((item) => item.movieId !== res.movieId));
          localStorage.setItem('savedMovieList', JSON.stringify(
            savedMovieList.filter((item) => item.movieId !== res.movieId),
          ));
        });
    }
  }

  function duration(timeInMinutes) {
    const hours = Math.floor(timeInMinutes / 60);
    const minutes = Math.floor(timeInMinutes) % 60;

    return `${hours}ч ${minutes}м`;
  }

  function imageUrlFix() {
    if (props.data.image === null) {
      return noImage;
    }
    return `https://api.nomoreparties.co${props.data.image.url}`;
  }

  return (
    <div className="card">
      <a href={props.data.trailerLink} rel="noreferrer" target='_blank'><img className="card__image" src={imageUrlFix()} alt={`фото ${props.data.nameRU}`} /></a>
      <div className="card__text-box">
        <p className="card__text">{props.data.nameRU}</p>
        <div className="card__like-container" onClick={likeClick}>
          <img className={likeClass} src={likeSVG} alt="like" />
        </div>
      </div>
      <p className="card__duration">{duration(props.data.duration)}</p>
    </div>
  );
}

export default MoviesCard;

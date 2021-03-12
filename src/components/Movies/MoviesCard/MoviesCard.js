import React from 'react';
import './card.css';
import classnames from 'classnames';
import likeSVG from '../../../images/like.svg';

function MoviesCard(props) {
  const [liked, setLiked] = React.useState(false);
  const likeClass = classnames({
    card__like: true,
    card__like_active: liked,
  });

  function likeClick() {
    setLiked(!liked);
  }

  function duration(timeInSeconds) {
    const hours = Math.floor(timeInSeconds / 60 / 60);
    const minutes = Math.floor(timeInSeconds / 60) % 60;

    return `${hours}ч ${minutes}м`;
  }

  return (
    <div className="card">
      <img className="card__image" src={props.data.image} alt={`фото ${props.data.nameRU}`} />
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

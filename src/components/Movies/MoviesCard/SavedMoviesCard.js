import React from 'react';
import './card.css';
import deleteSVG from '../../../images/delete.svg';

function SavedMoviesCard(props) {
  function likeClick() {
    console.log('remove');
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
          <img className="card__delete" src={deleteSVG} alt="delete" />
        </div>
      </div>
      <p className="card__duration">{duration(props.data.duration)}</p>
    </div>
  );
}

export default SavedMoviesCard;

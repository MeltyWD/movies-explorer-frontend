import React from 'react';
import './promo.css';
import image from '../../../images/intro__image.png';

function Promo() {
  return (
    <section className="promo">
      <div className="promo__textbox">
        <h1 className="promo__title">Учебный проект студента факультета <span className="promo__title_nobr">Веб-разработки.</span></h1>
        <p className="promo__text">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
        <a href="#aboutProject" className="promo__button">Узнать больше</a>
      </div>
      <img className="promo__image" src={image} alt='promo' />
    </section>
  );
}

export default Promo;

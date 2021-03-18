import React from 'react';
import './student.css';
import photo from '../../../images/student__image.jpg';

function Student() {
  return (
    <section className="student">
      <h2 className="title">Студент</h2>
      <div className="student__textbox">
        <div>
          <h2 className="student__title">Андрей</h2>
          <h4 className="student__subtitle">Фронтенд-разработчик, 28 лет</h4>
          <p className="student__text">
            Я родился и живу в Якутии, закончил университет СВФУ, по ИТ специальности.
            Я увлекаюсь мобильными играми и сноубордом. с 2019 Год прожил в Японии изучая
             японский язык. Недавно начал изучать веб-разработку.
            С 2015 года работал в компании «РОС», с сентября 2020 года, перешел на
             позицию младшего программиста фронтенд разработки.
          </p>
          <a
            className="student__link"
            href="https://github.com/MeltyWD"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
        </div>
        <img className="student__image" src={photo} alt="фото"></img>
      </div>
      <h5 className="student__portfolio-title">Портфолио</h5>
      <ul className="student__portfolio-list">
        <li className="student__portfolio-list-element">
          <a
            className="student__portfolio-link"
            href="https://github.com/MeltyWD/russian-travel"
          >
            <p>Статичный сайт</p>
            <span>&#8599;</span>
          </a>
        </li>
        <li className="student__portfolio-list-element">
          <a
            className="student__portfolio-link"
            href="https://github.com/MeltyWD/russian-travel"
          >
            <p>Адаптивный сайт</p>
            <span>&#8599;</span>
          </a>
        </li>
        <li className="student__portfolio-list-element">
          <a
            className="student__portfolio-link"
            href="https://github.com/MeltyWD/russian-travel"
          >
            <p>Одностраничное приложение</p>
            <span>&#8599;</span>
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Student;

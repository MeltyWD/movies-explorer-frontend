import React from 'react';
import './technology.css';

function Technology() {
  return (
    <section className="technology">
      <h2 className="title">Технологии</h2>
      <h4 className="technology__title">7 технологий</h4>
      <p className="technology__text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
      <ul className="technology__list">
        <li className="technology__list-element">HTML</li>
        <li className="technology__list-element">CSS</li>
        <li className="technology__list-element">JS</li>
        <li className="technology__list-element">React</li>
        <li className="technology__list-element">Git</li>
        <li className="technology__list-element">Express.js</li>
        <li className="technology__list-element">MongoDB</li>
      </ul>
    </section>
  );
}

export default Technology;

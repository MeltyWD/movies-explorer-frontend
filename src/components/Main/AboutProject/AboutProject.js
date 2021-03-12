import React from 'react';
import './aboutProject.css';

function AboutProject() {
  return (
    <section className="aboutProject" id="aboutProject">
      <h2 className="title">О проекте</h2>
      <div className="aboutProject__textbox">
        <div>
          <h4 className="aboutProject__textbox-title">Дипломный проект включал 5 этапов</h4>
          <p className='aboutProject__text'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </div>
        <div>
          <h4 className="aboutProject__textbox-title">На выполнение диплома ушло 5 недель</h4>
          <p className='aboutProject__text'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>
      <div className="aboutProject__grid">
        <p className="aboutProject__grid-element aboutProject__grid-element_green">1 неделя</p>
        <p className="aboutProject__grid-element">4 недели</p>
        <p className="aboutProject__grid_text">Back-end</p>
        <p className="aboutProject__grid_text">Front-end</p>
      </div>
    </section>
  );
}

export default AboutProject;

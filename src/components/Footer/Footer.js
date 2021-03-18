import React from 'react';
import './footer.css';

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="footer__main-block">
        <p className="footer__copyright">&copy; 2021</p>
        <ul className="footer__links">
          <li className="footer__list-element"><a className="footer__link" href="https://praktikum.yandex.ru/web/">Яндекс.Практикум</a></li>
          <li className="footer__list-element"><a className="footer__link" href="https://github.com/MeltyWD">Github</a></li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;

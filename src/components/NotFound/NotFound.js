import React from 'react';
import './notfound.css';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <section className="notfound">
    <h1 className="notfound__title">404</h1>
    <p className="notfound__text">Страница не найдена</p>
    <Link className="noutfound__back" to="/">Назад</Link>
    </section>
  );
}

export default NotFound;

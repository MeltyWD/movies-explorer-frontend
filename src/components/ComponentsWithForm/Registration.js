import React from 'react';
import './auth.css';
import './form.css';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import * as yup from 'yup';

function Registration(props) {
  const validationSchema = yup.object().shape({
    name: yup.string()
      .required('Обязательное поле'),
    email: yup.string()
      .email('Неверный формат email')
      .required('Обязательное поле'),
    password: yup.string()
      .required('Обязательное поле')
      .min(8, 'Минимум 8 символов'),
  });

  return (
    <section className="auth">
      <Link to="/" className="auth__link-logo"><img className="auth__logo" src={props.logo} alt="logo" /></Link>
      <h1 className="auth__title">Добро пожаловать!</h1>
      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
        }}
        validateOnBlur
        onSubmit={(values) => {
          props.login(values);
        } }
        validationSchema={validationSchema}
      >
        {({
          values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty,
        }) => (
          <form className="form">
            <label
              className="form__label"
              htmlFor="name"
            >Имя</label>
            <input
              className={`form__input ${touched.name && errors.name && 'form__input_error'}`}
              type="text"
              name="name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
              id="name"
              placeholder="Введите имя"
            />
            {
              <p className={`form__error
                ${touched.name
                && errors.name
                && 'form__error_active'}`}
              >{errors.name}</p>
            }
            <label
              className="form__label"
              htmlFor="email"
            >E-mail</label>
            <input
              className={`form__input ${touched.email && errors.email && 'form__input_error'}`}
              type="text"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              id="email"
              placeholder="Введите e-mail"
            />
            {
              <p className={`form__error
                ${touched.email
                && errors.email
                && 'form__error_active'}`}
              >{errors.email}</p>
            }
            <label
              className="form__label"
              htmlFor="password"
            >Пароль</label>
            <input
              className={`form__input ${touched.password && errors.password && 'form__input_error'}`}
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              id="password"
              placeholder="Введите пароль"
            />
            {
              <p className={`form__error
                ${touched.password
                && errors.password
                && 'form__error_active'}`}
              >{errors.password}</p>
            }
            <button
              className="form__button"
              disabled={!isValid || !dirty}
              onClick={handleSubmit}
              type="submit"
            >Войти</button>
          </form>
        )}
      </Formik>
      <p className="auth__text">Уже зарегистрированы? <Link to="/signin" className="auth__link">Войти</Link></p>
    </section>
  );
}

export default Registration;

import React from 'react';
import './auth.css';
import './form.css';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import * as yup from 'yup';
import mainApi from '../../utils/MainApi';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function Login(props) {
  const validationSchema = yup.object().shape({
    email: yup.string()
      .email('Неверный формат email')
      .required('Обязательное поле'),
    password: yup.string()
      .required('Обязательное поле')
      .min(8, 'Минимум 8 символов'),
  });

  const { setCurrentUser } = React.useContext(CurrentUserContext);

  return (
    <section className="auth">
      <Link to="/" className="auth__link-logo"><img className="auth__logo" src={props.logo} alt="logo" /></Link>
      <h1 className="auth__title">Рады видеть!</h1>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validateOnBlur
        onSubmit={(values) => {
          mainApi.authorize(values)
            .then((res) => {
              localStorage.setItem('logginIn', 'true');
              setCurrentUser({
                name: res.name,
                email: res.email,
              });
              props.login();
            })
            .catch((err) => props.onFail(err));
        } }
        validationSchema={validationSchema}
      >
        {({
          values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty,
        }) => (
          <form className="form">
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
      <p className="auth__text">Ещё не зарегистрированы? <Link to="/signup" className="auth__link">Регистрация</Link></p>
    </section>
  );
}

export default Login;

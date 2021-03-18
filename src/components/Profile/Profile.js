import React from 'react';
import './profile.css';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import * as yup from 'yup';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function Profile(props) {
  const validationSchema = yup.object().shape({
    name: yup.string()
      .required('Обязательное поле'),
    email: yup.string()
      .email('Неверный формат email')
      .required('Обязательное поле'),
  });
  const { currentUser } = React.useContext(CurrentUserContext);

  return (
    <section className="profile">
      <h1 className="profile__title">Привет, {currentUser.name}</h1>
      <Formik
        enableReinitialize
        initialValues={{
          name: currentUser.name,
          email: currentUser.email,
        }}
        validateOnBlur
        onSubmit={(values) => {
          props.patch(values);
          console.log('ok');
        } }
        validationSchema={validationSchema}
      >
        {({
          values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty,
        }) => (
          <form className="profile__form">
            <fieldset className="profile__fieldset">
              <label
                className="profile__label"
                htmlFor="name"
              >Имя</label>
              <input
                className={`profile__input ${touched.name && errors.name && 'form__input_error'}`}
                type="text"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                id="name"
              />
            </fieldset>
            {
              <p className={`profile__error
                ${touched.name
                && errors.name
                && 'profile__error_active'}`}
              >{errors.name}</p>
            }
            <div className="profile__hr" />
            <fieldset className="profile__fieldset">
              <label
                className="profile__label"
                htmlFor="email"
              >Почта</label>
              <input
                className={`profile__input ${touched.email && errors.email && 'form__input_error'}`}
                type="text"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                id="email"
              />
            </fieldset>
            {
              <p className={`profile__error
                ${touched.email
                && errors.email
                && 'profile__error_active'}`}
              >{errors.email}</p>
            }
            <button
              className="profile__button"
              disabled={!isValid || !dirty}
              onClick={handleSubmit}
              type="submit"
            >Редактировать</button>
          </form>
        )}
      </Formik>
      <Link to="/" onClick={props.logout} className="profile__logout">Выйти из аккаунта</Link>
    </section>
  );
}

export default Profile;

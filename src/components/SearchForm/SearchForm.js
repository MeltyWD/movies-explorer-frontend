import React, { useEffect } from 'react';
import './search.css';
import './checkbox.css';
import classnames from 'classnames';

function SearchForm(props) {
  const [searchClicked, setSearchClicked] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');
  const textInput = React.createRef();

  function search(e) {
    e.preventDefault();
    setSearchClicked(!searchClicked);
    textInput.current.focus();
  }

  function handleSearchInput(e) {
    setSearchValue(e.target.value);
  }
  useEffect(() => {
    props.search(searchValue);
  }, [searchValue]);

  const inputClass = classnames({
    search__input: true,
    search__input_active: searchClicked,
  });

  return (
    <>
      <div className="search">
        <h2 className="search__title">{props.title}</h2>
        <form className="search__form">
          <input value={searchValue} onChange={handleSearchInput} className={inputClass} ref={textInput} type="text" />
          <button className="search__button" onClick={search} />
        </form>
      </div>
      <div className="checkbox">
        <div className="checkbox__container">
          <input id="switch" type="checkbox" className="checkbox__input" defaultChecked />
          <label htmlFor="switch" className="checkbox__label">Switch</label>
        </div>
        <label htmlFor="switch" className="checkbox__text">Короткометражки</label>
      </div>
    </>
  );
}

export default SearchForm;

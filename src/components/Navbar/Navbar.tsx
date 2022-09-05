import React from 'react';


function Navbar() {
  return (
    <header className="header">
      <a href="#home" className="header__logo"></a>

      <nav className="nav">
        <ul className="nav__list">
          <li className="nav__item"><a className="nav__link nav__link--is-active is-active" href="#1">монітори</a></li>
          <li className="nav__item"><a className="nav__link" href="#2">смартфони і телефони</a></li>
          <li className="nav__item"><a className="nav__link" href="#3" data-qa="nav-hover">ноутбуки і комп'ютери</a>
          </li>
          <li className="nav__item"><a className="nav__link" href="#4">гаджети</a></li>
          <li className="nav__item"><a className="nav__link" href="#5">планшети</a></li>
          <li className="nav__item"><a className="nav__link" href="#6">фото</a></li>
          <li className="nav__item"><a className="nav__link" href="#7">відео</a></li>
        </ul>

      </nav>
    </header>
  );
}

export default Navbar;

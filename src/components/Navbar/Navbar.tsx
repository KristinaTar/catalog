import React from 'react';


function Navbar() {
  return (
    <header className="header">
      <a href="#home" className="header__logo"></a>

      <nav className="nav">
        {/*<ul className="nav__list">
          <li className="nav__item"><a className="nav__link nav__link--is-active is-active" href="#0">apple</a></li>
          <li className="nav__item"><a className="nav__link" href="#1">samsung</a></li>
          <li className="nav__item"><a className="nav__link" href="#2">смартфоны и телефоны</a></li>
          <li className="nav__item"><a className="nav__link" href="#3" data-qa="nav-hover">ноутбуки и компьютеры</a>
          </li>
          <li className="nav__item"><a className="nav__link" href="#4">гаджеты</a></li>
          <li className="nav__item"><a className="nav__link" href="#5">планшеты</a></li>
          <li className="nav__item"><a className="nav__link" href="#6">фото</a></li>
          <li className="nav__item"><a className="nav__link" href="#7">видео</a></li>
        </ul>*/}

      </nav>
    </header>
  );
}

export default Navbar;

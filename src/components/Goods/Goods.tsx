import React from 'react';

import "../../data/goods.json";

type Props = {
  goods: Good[];
}

const Goods:React.FC<Props> = ({ goods }) => {
  return (
    <div>
      <main className="container">
        {goods.map(good =>
        <div className="card" key = {good.id+good.title}>
          <img className="card__img" src={good.image} alt="Monitor photo"/>
            <h2 className="card__title">{good.title}</h2>
            <div className="card__id">Код товару {good.id}</div>
            <div className="stars card__stars">
              <ul className={`stars__list--${Math.round(good.comments_mark)}`}>
                <li className="stars__item"></li>
                <li className="stars__item"></li>
                <li className="stars__item"></li>
                <li className="stars__item"></li>
                <li className="stars__item"></li>
                <div className="stars__review">Відгуків: {good.comments}</div>
              </ul>
            </div>
            <div className="card__price">
              <div className="card__price_text">Цiна:</div>
              <div className="card__price_number">{good.price} грн</div>
            </div>
            <a className="card__link" href="https://rozetka.com.ua/">
              <div className="card__button"> купити</div>
            </a>
        </div>
        )}

      </main>
    </div>
);
}

export default Goods;

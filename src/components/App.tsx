import React, {useState} from 'react';

import './App.scss';
import Navbar from "./Navbar/Navbar";
import "./main.scss";
import Goods from "./Goods/Goods";
import goodsData from "../data/goods.json";

import Filters from "./Filters/Filters";
import {getFirstNumber} from "../helpers/parsers";

const DEFAULT_PAGE_SIZE = 12;


const App: React.FC = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

  const [filteredGoods, setFilteredGoods] = useState<Good[]>(() => {
    const goods: Good[] = [...goodsData];
    return goods.slice(startIndex, startIndex + pageSize);
  });

  const showMore = () => {
    setPageSize(pageSize + DEFAULT_PAGE_SIZE);
  }

  const updateFilteredGoods = (filter: Filter) => {
    const goods = goodsData
      .filter((good: Good) =>
        // price
        (good.price <= filter.priceMax && good.price >= filter.priceMin)
        // diagonal
        && (getFirstNumber(good.description.diagonal) <= filter.diagonalMax
          && getFirstNumber(good.description.diagonal) >= filter.diagonalMin)
        // brightness
        && (getFirstNumber(good.description.brightness) <= filter.brightnessMax
          && getFirstNumber(good.description.brightness) >= filter.brightnessMin)
        // resolution
        && (filter.resolution.length === 0
          || filter.resolution.includes(good.description.resolution))
        // matrixType
        && (filter.matrixType.length === 0
          || filter.matrixType.includes(good.description.matrixType))
        // brand
        && (filter.brand.length === 0
          || filter.brand.includes(good.brand))
      );
    setFilteredGoods(goods);
    setStartIndex(0);
    setPageSize(DEFAULT_PAGE_SIZE);
  }

  return (
    <div>
      <Navbar/>
      <div className="main-content">
        <Filters updateFilteredGoods={updateFilteredGoods} />
        <Goods
          goods={filteredGoods.slice(startIndex, startIndex + pageSize)}
          showMore={filteredGoods.length - startIndex > pageSize ? showMore : null}
        />
      </div>
    </div>
  );
}

export default App;

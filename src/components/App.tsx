import React, {useState} from 'react';

import './App.scss';
import Navbar from "./Navbar/Navbar";
import "./main.scss";
import Goods from "./Goods/Goods";
import goodsData from "../data/goods.json";

import Filters from "./Filters/Filters";


const App: React.FC = () => {
  const [filteredGoods, setFilteredGoods] = useState<Good[]>(() => {
    const goods: Good[] = [...goodsData];
    return goods.slice(0, 12);
  });



  return (
    <div>
      <Navbar/>

      <Filters />
      <Goods goods={filteredGoods}/>
    </div>
  );
}

export default App;

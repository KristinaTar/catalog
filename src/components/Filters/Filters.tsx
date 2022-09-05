import React, {useMemo} from 'react';
import filtersData from "../../data/filters.json";
import MultiRangeSlider from "../multiRangeSlider/MultiRangeSlider";

import goodsData from "../../data/goods.json";
import {getFirstNumber} from "../../helpers/parsers";

const Filters: React.FC = () => {

  const limits = useMemo(() => {
    let minPrice = goodsData[0].price;
    let maxPrice = goodsData[0].price;
    let minDiagonal = 500;
    let maxDiagonal = 0;
    let minBrightness = 500;
    let maxBrightness = 0;

    for (let i = 0; i < goodsData.length; i++) {
      const good: Good = goodsData[i];

      if (good.price > maxPrice) {
        maxPrice = good.price;
      }
      if (good.price < minPrice) {
        minPrice = good.price;
      }

      if (good.description.diagonal) {
        const diagonal = getFirstNumber(good.description.diagonal);
        if (minDiagonal > diagonal) {
          minDiagonal = diagonal;
        }
        if (maxDiagonal < diagonal) {
          maxDiagonal = diagonal;
        }
      }

      if (good.description.brightness) {
        const brightness = getFirstNumber(good.description.brightness);
        if (minBrightness > brightness) {
          minBrightness = brightness;
        }
        if (maxBrightness < brightness) {
          maxBrightness = brightness;
        }
      }

    }

    return {
      minPrice,
      maxPrice,
      minDiagonal,
      maxDiagonal,
      minBrightness,
      maxBrightness,
    };
  }, []);

  console.log(filtersData)
  console.log(filtersData.brand)
  return (
    <div className="filters__container">
      <div className="filters">
        Brands
        <div className="checkbox__area">
          {filtersData.brand.map(brand => (
            <label key={brand} className="checkbox__container">{brand}
              <input type="checkbox"/>
              <span className="checkbox__checkmark"></span>
            </label>
          ))}
        </div>
      </div>
      <div className="filters"> Price <br/>
        <MultiRangeSlider
          min={limits.minPrice}
          max={limits.maxPrice}
          step={1}
          onChange={({min, max}) => console.log(`min = ${min}, max = ${max}`)}
        />
      </div>
      <div className="filters">Diagonal

        <MultiRangeSlider
          min={limits.minDiagonal}
          max={limits.maxDiagonal}
          step={0.1}
          onChange={({min, max}) => console.log(`min = ${min}, max = ${max}`)}
        />
      </div>
      <div className="filters">Resolution

        <div className="checkbox__area">
          {filtersData.resolution.map(brand => (
            <label key={brand} className="checkbox__container">{brand}
              <input type="checkbox"/>
              <span className="checkbox__checkmark"></span>
            </label>
          ))}
        </div>
      </div>
      <div className="filters">Brightness

        <MultiRangeSlider
          min={limits.minBrightness}
          max={limits.maxBrightness}
          step={1}
          onChange={({min, max}) => console.log(`min = ${min}, max = ${max}`)}
        />
      </div>
      <div className="filters">Matrix Type

        <div className="checkbox__area">
          {filtersData.matrixType.map(brand => (
            <label key={brand} className="checkbox__container">{brand}
              <input type="checkbox"/>
              <span className="checkbox__checkmark"></span>
            </label>
          ))}
        </div>
      </div>

    </div>
  )
}

export default Filters;

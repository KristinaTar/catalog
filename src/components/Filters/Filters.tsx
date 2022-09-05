import React, {useCallback, useEffect, useMemo, useState} from 'react';
import filtersData from "../../data/filters.json";
import MultiRangeSlider from "../multiRangeSlider/MultiRangeSlider";

import goodsData from "../../data/goods.json";
import {getFirstNumber} from "../../helpers/parsers";

type Props = {
  updateFilteredGoods: (filter: Filter) => void;
}

const Filters: React.FC<Props> = ({ updateFilteredGoods }) => {
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

  const [filters, setFilters] = useState<Filter>({
    priceMin: limits.minPrice,
    priceMax: limits.maxPrice,
    diagonalMin: limits.minDiagonal,
    diagonalMax: limits.maxDiagonal,
    brightnessMin: limits.minBrightness,
    brightnessMax: limits.maxBrightness,
    resolution: [],
    matrixType: [],
    brand: [],
  });

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      updateFilteredGoods(filters);
    }, 1000)

    return () => clearTimeout(delayDebounceFn);
  }, [filters]);

  const setBrightnessFilter = useCallback(({min, max}: {min: number, max: number}) => {
    setFilters({
      ...filters,
      brightnessMin: min,
      brightnessMax: max,
    });
  },[]);

  const setPriceFilter = useCallback(({min, max}: {min: number, max: number}) => {
    setFilters({
      ...filters,
      priceMin: min,
      priceMax: max,
    });
  },[]);

  const setDiagonalFilter = useCallback(({min, max}: {min: number, max: number}) => {
    setFilters({
      ...filters,
      diagonalMin: min,
      diagonalMax: max,
    });
  },[]);

  return (
    <div className="filters__container">
      <div className="filters">
        <span className="filters__caption">Brands</span>
        <div className="checkbox__area">
          {filtersData.brand.map(brand => (
            <label key={brand} className="checkbox__container">
              {brand}
              <input
                type="checkbox"
                value={brand}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (e.target.checked) {
                    setFilters({
                      ...filters,
                      brand: [...filters.brand, e.target.value],
                    });
                  } else {
                    setFilters({
                      ...filters,
                      brand: filters.brand.filter((el) => el !== e.target.value),
                    });
                  }
                }}
              />
              <span className="checkbox__checkmark"></span>
            </label>
          ))}
        </div>
      </div>
      <div className="filters">
        <span className="filters__caption">Price</span>
        <MultiRangeSlider
          min={limits.minPrice}
          max={limits.maxPrice}
          step={1}
          onChange={setPriceFilter}
        />
      </div>
      <div className="filters">
        <span className="filters__caption">Diagonal</span>
        <MultiRangeSlider
          min={limits.minDiagonal}
          max={limits.maxDiagonal}
          step={0.1}
          onChange={setDiagonalFilter}
        />
      </div>
      <div className="filters">
        <span className="filters__caption">Resolution</span>
        <div className="checkbox__area">
          {filtersData.resolution.map(brand => (
            <label key={brand} className="checkbox__container">{brand}
              <input
                type="checkbox"
                value={brand}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (e.target.checked) {
                    setFilters({
                      ...filters,
                      resolution: [...filters.resolution, e.target.value],
                    });
                  } else {
                    setFilters({
                      ...filters,
                      resolution: filters.resolution.filter((el) => el !== e.target.value),
                    });
                  }
                }}
              />
              <span className="checkbox__checkmark"></span>
            </label>
          ))}
        </div>
      </div>
      <div className="filters">
        <span className="filters__caption">Brightness</span>
        <MultiRangeSlider
          min={limits.minBrightness}
          max={limits.maxBrightness}
          step={1}
          onChange={setBrightnessFilter}
        />
      </div>
      <div className="filters">
        <span className="filters__caption">Matrix type</span>

        <div className="checkbox__area">
          {filtersData.matrixType.map(brand => (
            <label key={brand} className="checkbox__container">{brand}
              <input
                type="checkbox"
                value={brand}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (e.target.checked) {
                    setFilters({
                      ...filters,
                      matrixType: [...filters.matrixType, e.target.value],
                    });
                  } else {
                    setFilters({
                      ...filters,
                      matrixType: filters.matrixType.filter((el) => el !== e.target.value),
                    });
                  }
                }}
              />
              <span className="checkbox__checkmark"></span>
            </label>
          ))}
        </div>
      </div>

    </div>
  );
}

export default Filters;

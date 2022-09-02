import React from 'react';
import filtersData from "../../data/filters.json";

const Filters: React.FC = () => {
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
      <div className="filters"> Price</div>
      <div className="filters">Diagonal</div>
      <div className="filters">Resolution</div>
      <div className="filters">Brightness</div>
      <div className="filters">Matrix Type</div>
      <div className="filters">Comments Mark</div>

    </div>
  )
}

export default Filters;

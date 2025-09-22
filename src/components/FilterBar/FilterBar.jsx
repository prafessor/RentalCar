import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBrands } from '../../redux/cars/operations';
import {
  selectBrands,
  selectFilters,
  selectLoadingBrands,
} from '../../redux/cars/selectors';
import { priceToOption, selectStyles } from './filterData';
import { thousandSeparator } from '../../utils/thousandSeparator';
import Button from '../Button/Button';
import Select, { components } from 'react-select';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { setFilters } from '../../redux/cars/slice';
import { isEqualFilters } from '../../utils/isEqualFilters';
import css from './FilterBar.module.css';

const DropdownIndicator = props => {
  return (
    <components.DropdownIndicator {...props}>
      <svg width="16" height="16px">
        <use href="/sprite.svg#icon-arrow-down"></use>
      </svg>
    </components.DropdownIndicator>
  );
};

export default function FilterBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [filter, setFilter] = useState({
    brand: '',
    price: '',
    minMileage: '',
    maxMileage: '',
  });
  const brands = useSelector(selectBrands);
  const isLoading = useSelector(selectLoadingBrands);
  const settedFilters = useSelector(selectFilters);
  const [searchParams] = useSearchParams();
  const firstRenderRef = useRef(true);

  const { brand, price, minMileage, maxMileage } = filter;

  useEffect(() => {
    dispatch(fetchBrands());
  }, [dispatch]);

  useEffect(() => {
    if (brands.length === 0) return;

    const rawBrand = searchParams.get('brand');
    const rawPrice = searchParams.get('price');
    const rawMinMileage = searchParams.get('minMileage');
    const rawMaxMileage = searchParams.get('maxMileage');

    const validatedBrand = brands.some(car => car.value === rawBrand)
      ? rawBrand
      : '';
    const validatedPrice = priceToOption.some(opt => opt.value === rawPrice)
      ? rawPrice
      : '';
    const validatedMinMileage = (rawMinMileage || '').replace(/\D/g, '');
    const validatedMaxMileage = (rawMaxMileage || '').replace(/\D/g, '');

    const newFilters = {
      brand: validatedBrand,
      price: validatedPrice,
      minMileage: validatedMinMileage,
      maxMileage: validatedMaxMileage,
    };

    if (
      firstRenderRef.current ? false : isEqualFilters(settedFilters, newFilters)
    )
      return;

    firstRenderRef.current = false;
    setFilter(newFilters);

    dispatch(setFilters(newFilters));
  }, [settedFilters, brands, searchParams, dispatch]);

  const handleSubmit = evt => {
    evt.preventDefault();

    const params = new URLSearchParams();
    if (brand) params.append('brand', brand);
    if (price) params.append('price', price);
    if (minMileage) params.append('minMileage', minMileage);
    if (maxMileage) params.append('maxMileage', maxMileage);

    navigate({ pathname: '/catalog', search: params.toString() });
  };

  // It dynamically updates input values based on the input's name
  const handleInputChange = evt => {
    const value = evt.target.value.replace(/\D/g, '');
    setFilter(prevFilter => {
      return {
        ...prevFilter,
        [evt.target.name]: value,
      };
    });
  };

  const handleSelectChange = (select, action) => {
    setFilter(prevFilter => {
      return {
        ...prevFilter,
        [action.name]: select ? select.value : '',
      };
    });
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <div className={css.filterContainerBrand}>
        <p className={css.title}>Car brand</p>
        <Select
          styles={selectStyles}
          components={{ DropdownIndicator }}
          className="react-select-container"
          classNamePrefix="react-select"
          name="brand"
          options={brands}
          value={brand ? { value: brand, label: brand } : null}
          onChange={handleSelectChange}
          isLoading={isLoading}
          isClearable
          placeholder="Choose a brand"
        />
      </div>
      <div className={css.filterContainerPrice}>
        <p className={css.title}>Price/ 1 hour</p>
        <Select
          styles={selectStyles}
          components={{ DropdownIndicator }}
          name="price"
          options={priceToOption}
          value={price ? { value: price, label: price } : null}
          onChange={handleSelectChange}
          formatOptionLabel={(option, { context }) => {
            if (context === 'value') {
              return `To $${option.label}`;
            }
            return option.label;
          }}
          isClearable
          placeholder="Choose a price"
        />
      </div>
      <div>
        <p className={css.title}>Сar mileage / km</p>
        <div className={css.distanceInputContainer}>
          <div className={css.distanceInputField}>
            <input
              className={css.distanceInput}
              name="minMileage"
              value={thousandSeparator(minMileage, ',')}
              onChange={handleInputChange}
              type="text"
            />
            <span className={css.distanceInputPrefix}>From</span>
          </div>
          <div className={css.distanceInputField}>
            <input
              className={`${css.distanceInput} ${css.right}`}
              name="maxMileage"
              value={thousandSeparator(maxMileage, ',')}
              onChange={handleInputChange}
              type="text"
            />
            <span className={css.distanceInputPrefix}>To</span>
          </div>
        </div>
      </div>
      <Button className="button_submit" type="submit">
        Search
      </Button>
    </form>
  );
}

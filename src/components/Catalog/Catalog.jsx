import { useSelector } from 'react-redux';
import CarCard from '../CarCard/CarCard';
import css from './Catalog.module.css';
import { selectCars, selectLoading } from '../../redux/cars/selectors';

export default function Catalog() {
  const cars = useSelector(selectCars);
  const isLoading = useSelector(selectLoading);
  console.log(cars);

  return (
    <div className={css.wrapper}>
      {isLoading ? (
        <p>Loading</p>
      ) : (
        <ul className={css.list}>
          {cars.map(car => {
            return (
              <li className={css.item} key={car.id}>
                <CarCard car={car} />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

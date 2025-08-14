import { useSelector } from 'react-redux';
import { selectCars, selectLoading } from '../../redux/cars/selectors';
import Loader from '../Loader/Loader';
import CarCard from '../CarCard/CarCard';
import css from './Catalog.module.css';

export default function Catalog() {
  const cars = useSelector(selectCars);
  const isLoading = useSelector(selectLoading);

  return (
    <div className={css.wrapper}>
      {cars.length > 0 && (
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
      {isLoading && (
        <Loader />
      )}
    </div>
  );
}

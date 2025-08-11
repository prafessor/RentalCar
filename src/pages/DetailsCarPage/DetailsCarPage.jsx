import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCarById } from '../../redux/cars/operations';
import { selectCar, selectLoading } from '../../redux/cars/selectors';
import { thousandSeparator } from '../../utils/thousandSeparator';
import css from './DetailsCarPage.module.css';
import BookingForm from '../../components/BookingForm/BookingForm';

export default function DetailsCarPage() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const car = useSelector(selectCar);
  const isLoading = useSelector(selectLoading);

  useEffect(() => {
    if (id) {
      dispatch(fetchCarById(id));
    }
  }, [dispatch, id]);

  if (isLoading || !car) {
    return <p>Loading...</p>;
  }

  const addressArr = car.address.split(',');
  const accessoriesAndFunctionalities = [
    ...car.accessories,
    ...car.functionalities,
  ];

  return (
    <section className={`section ${css.section}`}>
      <div className={`container ${css.wrapper}`}>
        <div className={css.img_wrapper}>
          <img className={css.img} src={car.img} alt={car.description} />
          <BookingForm />
        </div>

        <div className={css.text_wrapper}>
          <div className={css.main_text_wrapper}>
            <div className={css.title_wrapper}>
              <h1 className={css.title}>
                {car.brand} {car.model}, {car.year}
              </h1>
              <p className={css.title_id}>
                Id: {car.img.split('/').pop().split('-')[0]}
              </p>
            </div>
            <div className={css.location_wrapper}>
              <div className={css.location}>
                <svg width="16" height="16">
                  <use href="/sprite.svg#icon-location"></use>
                </svg>
                <p className={css.text}>
                  {addressArr[1]}, {addressArr[2]}
                </p>
              </div>
              <p className={css.text}>
                Mileage: {thousandSeparator(car.mileage)} km
              </p>
            </div>
            <p className={css.price}>${car.rentalPrice}</p>
            <p className={css.text}>{car.description}</p>
          </div>

          <div className={css.info}>
            <div className={css.info_wrapper}>
              <h2 className={css.info_title}>Rental Conditions: </h2>
              <ul className={css.info_list}>
                {car.rentalConditions.map((el, idx) => {
                  return (
                    <li className={css.info_item} key={idx}>
                      <svg width="16" height="16">
                        <use href="/sprite.svg#icon-check-circle"></use>
                      </svg>
                      {el}
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className={css.info_wrapper}>
              <h2 className={css.info_title}>Car Specifications:</h2>
              <ul className={css.info_list}>
                <li className={css.info_item}>
                  <svg width="16" height="16">
                    <use href="/sprite.svg#icon-calendar"></use>
                  </svg>
                  Year: {car.year}
                </li>
                <li className={css.info_item}>
                  <svg width="16" height="16">
                    <use href="/sprite.svg#icon-car"></use>
                  </svg>
                  Type: {car.type}
                </li>
                <li className={css.info_item}>
                  <svg width="16" height="16">
                    <use href="/sprite.svg#icon-fuel"></use>
                  </svg>
                  Fuel Consumption: {car.fuelConsumption}
                </li>
                <li className={css.info_item}>
                  <svg width="16" height="16">
                    <use href="/sprite.svg#icon-gear"></use>
                  </svg>
                  Engine Size: {car.engineSize}
                </li>
              </ul>
            </div>

            <div className={css.info_wrapper}>
              <h2 className={css.info_title}>
                Accessories and functionalities:
              </h2>
              <ul className={css.info_list}>
                {accessoriesAndFunctionalities.map((el, idx) => {
                  return (
                    <li className={css.info_item} key={idx}>
                      <svg width="16" height="16">
                        <use href="/sprite.svg#icon-check-circle"></use>
                      </svg>
                      {el}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

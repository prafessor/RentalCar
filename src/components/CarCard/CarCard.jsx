import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toggleFavorite } from '../../redux/cars/slice';
import Button from '../Button/Button';
import css from './CarCard.module.css';
import { thousandSeparator } from '../../utils/thousandSeparator';

export default function CarCard({ car }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    id,
    img,
    description,
    brand,
    model,
    year,
    rentalPrice,
    address,
    rentalCompany,
    type,
    mileage,
  } = car;

  const addressArr = address.split(',');
  const carTags1 = [addressArr[1], addressArr[2], rentalCompany];
  const carTags2 = [type, `${thousandSeparator(mileage)} km`];

  const handleButtonClick = () => {
    navigate(`/catalog/${id}`, { replace: true });
  };

  const handleButtonFavoriteClick = () => {
    dispatch(toggleFavorite(id));
  };

  return (
    <>
      <div className={css.img_container}>
        <img className={css.img} src={img} alt={description} />
        <button
          className={`${css.btn_favorite} ${car.favorite && css.active}`}
          type="button"
          onClick={handleButtonFavoriteClick}
        >
          <svg width="16" height="16">
            <use
              href={
                car.favorite
                  ? '/sprite.svg#icon-like-active'
                  : '/sprite.svg#icon-like'
              }
            ></use>
          </svg>
        </button>
      </div>
      <div>
        <div className={css.title_wrapper}>
          <h2 className={css.title}>
            {brand} <span className={css.accent}>{model}</span>, {year}
          </h2>
          <p className={css.price}>{`$${rentalPrice}`}</p>
        </div>
        <ul className={`${css.tags_list} ${css.tags_list_first}`}>
          {carTags1.map((el, idx) => {
            return (
              <li className={css.tag_item} key={idx}>
                {el}
              </li>
            );
          })}
        </ul>
        <ul className={`${css.tags_list} ${css.tags_list_second}`}>
          {carTags2.map((el, idx) => {
            return (
              <li className={css.tag_item} key={idx}>
                {el}
              </li>
            );
          })}
        </ul>
      </div>
      <Button onClick={handleButtonClick}>ReadMore</Button>
    </>
  );
}

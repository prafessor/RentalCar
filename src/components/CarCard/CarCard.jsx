import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button';
import css from './CarCard.module.css';
import { thousandSeparator } from '../../utils/thousandSeparator';

export default function CarCard({ car }) {
  const navigate = useNavigate();

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

  return (
    <>
      <div className={css.img_container}>
        <img className={css.img} src={img} alt={description} />
        <button className={css.btn_favorite} type="button">
          <svg width="16" height="16">
            <use href="/sprite.svg#icon-like"></use>
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

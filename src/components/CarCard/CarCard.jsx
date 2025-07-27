import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button';
import css from './CarCard.module.css';

// add spaces as thousand separators
const formatMileage = num => {
  const numArr = num.toString().split('');
  const formatedNum = numArr.reduceRight((acc, el, idx) => {
    const positionFromEnd = numArr.length - idx;
    const isDivider = positionFromEnd % 3 === 0 && idx !== 0;
    return (isDivider ? ' ' : '') + el + acc;
  }, '');

  return formatedNum;
};

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
  const carTags = [
    addressArr[1],
    addressArr[2],
    rentalCompany,
    type,
    `${formatMileage(mileage)} km`
  ];

  const handleButtonClick = () => {
    navigate(`/catalog/${id}`, { replace: true });
  }

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
          <h2 className={css.title}>{brand} <span className={css.accent}>{model}</span>, {year}</h2>
          <p className={css.price}>{`$${rentalPrice}`}</p>
        </div>
        <ul className={css.tags_list}>
          {carTags.map((el, idx) => {
            return <li className={css.tag_item} key={idx}>{el}</li>;
          })}
        </ul>
      </div>
      <Button onClick={handleButtonClick}>ReadMore</Button>
    </>
  );
}

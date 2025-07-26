import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import css from './HomePage.module.css';

export default function HomePage() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/catalog', { replace: true });
  };

  return (
    <section className={css.section}>
      <div className={`container ${css.wrapper}`}>
        <h1 className={css.title}>Find your perfect rental car</h1>
        <p className={css.text}>
          Reliable and budget-friendly rentals for any journey
        </p>
        <Button onClick={handleButtonClick}>View Catalog</Button>
      </div>
    </section>
  );
}

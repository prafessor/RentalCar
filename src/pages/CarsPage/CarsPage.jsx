import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCars, fetchMoreCars } from '../../redux/cars/operations';
import {
  selectFilters,
  selectLoading,
  selectTotalPages,
} from '../../redux/cars/selectors';
import Button from '../../components/Button/Button';
import Catalog from '../../components/Catalog/Catalog';
import FilterBar from '../../components/FilterBar/FilterBar';
import css from './CarsPage.module.css';

export default function CarsPage() {
  const dispatch = useDispatch();

  const totalPages = useSelector(selectTotalPages);
  const filters = useSelector(selectFilters);
  const [page, setPage] = useState(1);
  const isLoading = useSelector(selectLoading);
  const firstRenderRef = useRef(true);

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }

    setPage(1);
    dispatch(fetchCars(filters));
  }, [dispatch, filters]);

  const hadleButtonClick = () => {
    const nextPage = page + 1;
    dispatch(fetchMoreCars({ page: nextPage, filters }));
    setPage(nextPage);
  };

  return (
    <section className={`section ${css.section}`}>
      <div className={`container ${css.wrapper}`}>
        <FilterBar />
        <Catalog />
        {page < totalPages && !isLoading && (
          <Button className="button_more" onClick={hadleButtonClick}>
            Load more
          </Button>
        )}
      </div>
    </section>
  );
}

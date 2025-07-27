import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCars, fetchMoreCars } from '../../redux/cars/operations';
import Button from "../../components/Button/Button";
import Catalog from "../../components/Catalog/Catalog";
import FilterBar from "../../components/FilterBar/FilterBar";
import css from "./CarsPage.module.css";
import { selectTotalPages } from '../../redux/cars/selectors';

export default function CarsPage() {
    const dispatch = useDispatch();
    const totaPages = useSelector(selectTotalPages);
    const [page, setPage] = useState(1);

    useEffect(() => {
        dispatch(fetchCars());
    }, [dispatch])

    const hadleButtonClick = () => {
        dispatch(fetchMoreCars(page + 1));
        setPage(page + 1)
    }; 

    return (
        <section className={`section ${css.section}`}>
            <div className={`container ${css.wrapper}`}>
                <FilterBar/>
                <Catalog/>
                {page < totaPages && <Button className='button_more' onClick={hadleButtonClick}>Load more</Button>}
            </div>
        </section>
    );
}
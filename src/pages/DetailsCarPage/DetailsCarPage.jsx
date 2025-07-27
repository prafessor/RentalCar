import { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchCarById } from '../../redux/cars/operations';
import { selectCar, selectLoading } from '../../redux/cars/selectors';

export default function DetailsCarPage() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const car = useSelector(selectCar);
    const isLoading = useSelector(selectLoading);

    console.log(car);

    useEffect(() => {
        if (id) {
            dispatch(fetchCarById(id));
        }
    }, [dispatch, id]);

    if (isLoading || !car) {
        return <p>Loading...</p>;
    }

    return (
        <section>
            <div>
                <img src={car.img} alt={car.description} />
            </div>
            <div>
                <div>
                    <h1>{car.brand} {car.model}, {car.year}</h1>
                    <p>Id: {car.id}</p>
                </div>
            </div>
        </section>
    );
}
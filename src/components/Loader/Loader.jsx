import { PulseLoader } from "react-spinners";
import css from "./Loader.module.css";

export default function Loader() {
    return (
        <PulseLoader className={css.loader} color="#8e929a"/>
    )
}
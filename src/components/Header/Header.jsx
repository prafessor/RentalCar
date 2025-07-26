import { Link, NavLink } from 'react-router-dom';
import css from './Header.module.css';
import clsx from 'clsx';

const getLinkStyles = ({ isActive }) => {
  return clsx(css.nav_link, isActive && css.active);
};

export default function Header() {
  return (
    <header className={css.header}>
      <div className={`container ${css.wrapper}`}>
        <Link to="/">
          <svg width="104" height="16">
            <use href="/sprite.svg#icon-logo"></use>
          </svg>
        </Link>

        <ul className={css.nav_list}>
          <li>
            <NavLink className={getLinkStyles} to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink className={getLinkStyles} to="/catalog">
              Catalog
            </NavLink>
          </li>
        </ul>
      </div>
    </header>
  );
}

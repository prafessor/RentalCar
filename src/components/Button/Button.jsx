import css from './Button.module.css';

export default function Button({
  children,
  onClick,
  type = 'button',
  className = 'button_redirect',
}) {
  return (
    <button
      className={`${css.button} ${css[className]}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
}

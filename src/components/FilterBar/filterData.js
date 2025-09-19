export const priceToOption = [
  { value: '30', label: '30' },
  { value: '40', label: '40' },
  { value: '50', label: '50' },
  { value: '60', label: '60' },
  { value: '70', label: '70' },
  { value: '80', label: '80' },
];

export const selectStyles = {
  control: (base, state) => ({
    ...base,
    border: 'none',
    borderRadius: 12,
    padding: '2px',
    backgroundColor: 'var(--color-neutral-grey)',
    ...(state.isFocused && {
      border: 'none',
      boxShadow: 'none',
    }),
  }),
  placeholder: base => ({
    ...base,
    margin: 0,
    color: 'currentColor',
  }),
  valueContainer: base => ({
    ...base,

    fontWeight: 500,
    lineHeight: 1.25,
    padding: '2px 14px',
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  dropdownIndicator: (base, state) => ({
    ...base,
    padding: '12px 14px',
    transition: 'transform 0.2s ease-in-out',
    transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
  }),
  menu: base => ({
    ...base,
    borderRadius: '12px',
    border: '1px solid var(--color-neutral-grey)',
    padding: '10px 7px 10px 0',
    background: 'var(--color-white)',
    boxShadow: '0 4px 36px 0 rgba(0, 0, 0, 0.02)',
  }),
  menuList: base => ({
    ...base,
    padding: '0',
    scrollbarColor: 'red',
  }),
  option: (base, state) => ({
    ...base,
    padding: '4px 18px',
    backgroundColor: 'transparent',
    color:
      state.isSelected || state.isFocused ? 'inherit' : 'var(--color-grey)',
    fontWeight: 500,
    lineHeight: '1.25',
    ':active': {
      backgroundColor: 'transparent',
    },
  }),
};

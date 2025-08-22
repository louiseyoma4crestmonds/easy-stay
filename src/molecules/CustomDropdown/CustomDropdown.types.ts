// CustomDropdown.types.ts
export interface DropdownOption {
  name?: string; // Optional label
  code?: string; // Optional code (like +234)
  flag?: string; // Optional flag/image URL
  label?: string; // Optional general fallback label
  value?: string; // Optional value
  link?: string;
}

export interface CustomDropdownProps {
  options: DropdownOption[];
  value?: DropdownOption;
  onChange?: (value: DropdownOption) => void;
  placeholder?: string;
  dropdownClassName?: string; // optional class for dropdown container
  buttonClassName?: string;
  toggleIcon?: string;
  leftIcon?: string;
  spanClassName?: string;
  ImgClass?: string;
}

// CustomDropdown.types.ts
export interface DropdownOption {
  name?: string; // Optional label
  code?: string; // Optional code (like +234)
  flag?: string; // Optional flag/image URL
  label?: string; // Optional general fallback label
  value?: string; // Optional value
}

export interface CustomDropdownProps {
  options: DropdownOption[];
  value?: DropdownOption;
  onChange?: (value: DropdownOption) => void;
  showCounter?: boolean;
  counterValue?: number;
  min?: number;
  max?: number;
  onCounterChange?: (value: number) => void;
  onApply?: () => void;
  placeholder?: string;
}

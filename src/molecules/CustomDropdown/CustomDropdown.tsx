import React, { useEffect, useRef, useState } from "react";
import { CustomDropdownProps, DropdownOption } from "./CustomDropdown.types";
import styles from "./CustomDropdown.module.css";

function CustomDropdown(props: CustomDropdownProps) {
  const { options, value, onChange, placeholder } = props;

  const [open, setOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option: DropdownOption) => {
    onChange?.(option);
    setOpen(false);
  };

  // Helper to render option with optional image
  const renderOption = (option: DropdownOption) => {
    const showFlag = option.flag;
    // const showName = option.name;
    const showCode = option.code;
    const showLabel = option.label;

    return (
      <span className="flex items-center gap-2">
        {showFlag && (
          <img src={option.flag} alt="" className="w-4 h-3  object-cover " />
        )}
        {/* {showName && <span>{option.name}</span>} */}
        {showCode && <span className="text-gray-500">{option.code}</span>}
        {showLabel && <span>{option.label}</span>}
      </span>
    );
  };

  return (
    <div className="relative " ref={dropdownRef}>
      <button
        type="button"
        className={styles.btndiv}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className="flex items-center gap-3">
          {value?.flag && (
            <img
              src={value.flag}
              alt=""
              className="w-4 h-3 rounded-sm object-cover"
            />
          )}
          {value?.code && (
            <span className="text-gray-900 text-base font-semibold">
              {value.code}
            </span>
          )}
          {!value?.flag && !value?.code && (
            <span>{value?.label ?? value?.name ?? placeholder}</span>
          )}
        </span>
        <img
          src="/images/chevron-down-outline.png"
          alt="Toggle dropdown"
          className={`w-4 h-4 ml-6 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className={styles.dropdowndiv}>
          <ul>
            {options.map((option: any) => (
              <li
                key={typeof option === "string" ? option : option.value}
                className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                  value === option ||
                  (typeof value === "object" &&
                    value !== null &&
                    "value" in value &&
                    typeof option === "object" &&
                    option !== null &&
                    "value" in option &&
                    (value as any).value === (option as any).value)
                    ? "bg-gray-100 font-semibold"
                    : ""
                }`}
                onClick={() => handleSelect(option)}
              >
                {renderOption(option)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default CustomDropdown;

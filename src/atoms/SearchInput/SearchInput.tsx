import Image from "next/image";
import styles from "./SearchInput.module.css";

type SearchInputProps = {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
};

function SearchInput({ value, placeholder, onChange }: SearchInputProps) {
  return (
    <div className="relative w-full md:w-[35%] ">
      <div className={styles.imgdiv}>
        <Image
          src="/images/search-outline2.png"
          width={16}
          height={16}
          alt="search icon"
        />
      </div>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={styles.inputdiv}
      />
    </div>
  );
}

export default SearchInput;

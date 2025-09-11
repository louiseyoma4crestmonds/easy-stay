import Image from "next/image";
import styles from "./CityCard.module.css";
import Router from "next/router";

type CityCardProps = {
  primaryText: string;
  secondaryText: string;
  image: string;
  id: number;
  clickable?: boolean;
};

function CityCard({
  primaryText,
  secondaryText,
  image,
  id,
  clickable = true,
}: CityCardProps) {
  const handleClick = () => {
    if (!clickable) return;
    Router.push({ pathname: "/guest/properties", query: { location: id } });
  };

  return (
    <div
      role={clickable ? "button" : undefined}
      tabIndex={clickable ? 0 : -1}
      onKeyDown={clickable ? handleClick : undefined}
      onClick={clickable ? handleClick : undefined}
      className={`relative ${styles.cityCard} ${
        clickable ? "group cursor-pointer" : "cursor-default"
      }`}
      // role="button"
      // onKeyDown={() => {
      //   Router.push({ pathname: "/guest/properties", query: { location: id } });
      // }}
      // onClick={() => {
      //   Router.push({ pathname: "/guest/properties", query: { location: id } });
      // }}
      // className={`group relative ${styles.cityCard}`}
    >
      <div
        className={`absolute inset-0 border-8 border-transparent z-20 transition-colors duration-300 pointer-events-none ${
          clickable ? " md:group-hover:border-white" : ""
        }`}
      />

      {/* Background image */}
      <Image src={image} alt={primaryText} layout="fill" />

      {/* Black overlay */}
      <div
        className={`absolute inset-0 bg-black z-10 transition-all duration-300 ${
          clickable
            ? "bg-opacity-60 md:group-hover:bg-opacity-20"
            : "bg-opacity-60"
        }`}
      />

      {/* Centered text */}
      <div className={styles.cityCardTextDiv}>
        <p className="text-white text-xl md:text-3xl font-bold">
          {primaryText}
        </p>
        <p className="text-gray-50 text-sm md:text-xl font-normal mt-1">
          {secondaryText}
        </p>
      </div>
    </div>
  );
}

export default CityCard;

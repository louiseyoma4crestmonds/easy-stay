import Image from "next/image";
import styles from "./CityCard.module.css";
import Router from "next/router";

type CityCardProps = {
  primaryText: string;
  secondaryText: string;
  image: string;
  id: number;
};

function CityCard({ primaryText, secondaryText, image, id }: CityCardProps) {
  return (
    <div
      role="button"
      onKeyDown={() => {
        Router.push({ pathname: "/guest/properties", query: { location: id } });
      }}
      onClick={() => {
        Router.push({ pathname: "/guest/properties", query: { location: id } });
      }}
      className={`group relative ${styles.cityCard}`}
    >
      <div className="absolute inset-0 border-8 border-transparent z-20 group-hover:border-white transition-colors duration-300 pointer-events-none" />

      {/* Background image */}
      <Image src={image} alt={primaryText} layout="fill" />

      {/* Black overlay */}
      <div className="absolute inset-0 bg-black z-10 bg-opacity-60 group-hover:bg-opacity-20 transition-all duration-300" />

      {/* Centered text */}
      <div className={styles.cityCardTextDiv}>
        <p className="text-white text-3xl font-bold">{primaryText}</p>
        <p className="text-gray-50 text-xl font-normal mt-1">{secondaryText}</p>
      </div>
    </div>
  );
}

export default CityCard;

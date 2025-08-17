import styles from "./CityCard.module.css";

type CityCardProps = {
  primaryText: string;
  secondaryText: string;
  image: string;
};

function CityCard({ primaryText, secondaryText, image }: CityCardProps) {
  return (
    <div className={`group ${styles.cityCard}`}>
      {/* Background image */}

      <img
        src={image}
        alt={primaryText}
        className="w-full h-full object-cover "
      />

      {/* Black overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 group-hover:bg-opacity-0 transition-all duration-300" />

      {/* Centered text */}
      <div className={styles.cityCardTextDiv}>
        <p className="text-white text-3xl font-bold">{primaryText}</p>
        <p className="text-gray-50 text-xl font-normal mt-1">{secondaryText}</p>
      </div>
    </div>
  );
}

export default CityCard;

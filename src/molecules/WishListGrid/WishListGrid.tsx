import PropertyCard from "../PropertyCard";
import styles from "./WishListGrid.module.css";

type WishlistGridProps = {
  savedApartments: any[];
  onRemove: (id: string | number) => void;
};

function WishListGrid({ savedApartments, onRemove }: WishlistGridProps) {
  return (
    <div className={styles.maindiv}>
      {savedApartments.map((apt) => (
        <PropertyCard
          key={apt.id}
          {...apt}
          onSave={(id, isSaved) => {
            if (!isSaved) {
              onRemove(id); // delegate removal to parent
            }
          }}
          isSaved={true}
          isWishlist
        />
      ))}
    </div>
  );
}

export default WishListGrid;

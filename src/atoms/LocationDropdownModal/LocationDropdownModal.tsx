import styles from "./LocationDropdownModal.module.css";

type LocationDropdownModalProps = {
  locations: string[];
  onSelectLocation: (location: string) => void;
};

function LocationDropdownModal({
  locations,
  onSelectLocation,
}: LocationDropdownModalProps) {
  const handleSelect = (location: string) => {
    onSelectLocation(location);
  };

  // Your component logic here
  return (
    <div className={styles.modaldiv}>
      <p className={styles.modalP1}>Recent</p>
      {/* First 4 locations */}
      <div className="space-y-2">
        {locations.slice(0, 4).map((loc) => (
          <div
            className={styles.modaldiv2}
            key={loc}
            onClick={() => handleSelect(loc)}
          >
            <div className="flex items-center gap-2">
              <img
                src="/images/location-icon.png"
                alt="location icon"
                className="w-3 h-3"
              />
              <p key={loc} className={styles.modalText}>
                {loc}
              </p>
            </div>
            {/* Forward icon */}
            <img
              src="/images/forward.png"
              alt="forward icon"
              className="w-3 h-3"
            />
          </div>
        ))}
      </div>

      {/* Top Searches Label */}
      <p className={styles.modalP1}>Top Searches</p>
      {/* Last 2 locations */}
      <div className="space-y-2">
        {locations.slice(4).map((loc) => (
          <div
            className={styles.modaldiv2}
            key={loc}
            onClick={() => handleSelect(loc)}
          >
            <div className="flex items-center gap-2">
              <img
                src="/images/location-icon.png"
                alt="location icon"
                className="w-3 h-3"
              />
              <p key={loc} className={styles.modalText}>
                {loc}
              </p>
            </div>
            {/* Forward icon */}
            <img
              src="/images/forward.png"
              alt="forward icon"
              className="w-3 h-3"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default LocationDropdownModal;

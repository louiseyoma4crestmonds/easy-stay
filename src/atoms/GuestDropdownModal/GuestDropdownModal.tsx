import { useState } from "react";
import styles from "./GuestDropdownModal.module.css";
import Button from "../Button";

// types.ts or top of your component file
type GuestCounts = {
  adults: number;
  children: number;
  infants: number;
  pets: number;
};

type GuestDropdownModalProps = {
  onConfirm: (guests: GuestCounts) => void;
  initialGuests?: GuestCounts;
};

// const guestTypes = [
//   { label: "Adults", helper: "Age 13+", key: "adults", default: 0 },
//   { label: "Children", helper: "Ages 2-12", key: "children", default: 0 },
//   { label: "Infants", helper: "Under 2", key: "infants", default: 0 },
//   { label: "Pets", helper: "", key: "pets", default: 0 },
// ];

const guestTypes: {
  label: string;
  helper: string;
  key: keyof GuestCounts;
  default: number;
}[] = [
  { label: "Adults", helper: "Age 13+", key: "adults", default: 0 },
  { label: "Children", helper: "Ages 2-12", key: "children", default: 0 },
  { label: "Infants", helper: "Under 2", key: "infants", default: 0 },
  { label: "Pets", helper: "", key: "pets", default: 0 },
];

function GuestDropdownModal({
  onConfirm,
  initialGuests,
}: GuestDropdownModalProps) {
  //   const [guestCounts, setGuestCounts] = useState(() => {
  //     const initial: Record<string, number> = {};
  //     guestTypes.forEach(({ key, default: def }) => {
  //       initial[key] = initialGuests?.[key] ?? def;
  //     });
  //     return initial;
  //   });

  const [guestCounts, setGuestCounts] = useState<GuestCounts>(() => {
    return {
      adults: initialGuests?.adults ?? 0,
      children: initialGuests?.children ?? 0,
      infants: initialGuests?.infants ?? 0,
      pets: initialGuests?.pets ?? 0,
    };
  });

  //   const handleChange = (key: string, delta: number) => {
  //     setGuestCounts((prev) => ({
  //       ...prev,
  //       [key]: Math.max(0, prev[key] + delta),
  //     }));
  //   };

  const handleChange = (key: keyof GuestCounts, delta: number) => {
    setGuestCounts((prev) => ({
      ...prev,
      [key]: Math.max(0, prev[key] + delta),
    }));
  };

  return (
    <div className={styles.modaldiv}>
      {/* Modal content */}
      {guestTypes.map(({ label, helper, key }, index) => (
        <div
          key={key}
          className="flex justify-between items-center p-4 border-b border-gray-300 "
        >
          <div className={styles.guestTypeHeader}>
            <p className={styles.guestTypeLabel}>{label}</p>
            <p className={styles.guestTypeHelper}>{helper}</p>
          </div>
          <div className={styles.guestCountControls}>
            <button
              className={styles.decrementButton}
              onClick={() => handleChange(key, -1)}
            >
              -
            </button>
            <span className={styles.guestCount}>{guestCounts[key]}</span>
            <button
              className={styles.incrementButton}
              onClick={() => handleChange(key, 1)}
            >
              +
            </button>
          </div>
        </div>
      ))}

      {/* Action buttons */}
      <div className="flex justify-center p-4">
        <Button
          variant="primary"
          width="full"
          onClick={() => onConfirm(guestCounts)}
        >
          OK
        </Button>
      </div>
    </div>
  );
}

export default GuestDropdownModal;

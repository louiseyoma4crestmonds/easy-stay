export type PointsModalProps = {
  onClose: () => void;
  onProceed: () => void;
  selected: string | null;
  setSelected: (arg: "apartment" | "ride" | null) => void;
};

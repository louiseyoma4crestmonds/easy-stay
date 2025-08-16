export type ButtonVariant =
  | "primary"
  | "secondary"
  | "muted"
  | "accentWithImg"
  | "black"
  | "none"
  | "pink";

export type ButtonWidth = "normal" | "full";

export type ButtonProps = {
  variant?: ButtonVariant;
  width?: ButtonWidth;
  disabled?: boolean;
  onClick?: () => void;
  image?: any;
  imageWidth?: number;
  height?: number;
  children?: React.ReactNode;
};

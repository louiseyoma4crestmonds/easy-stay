export type ButtonVariant =
  | "primary"
  | "primaryWithImg"
  | "secondary"
  | "muted"
  | "accentWithImg"
  | "black"
  | "none"
  | "explore"
  | "pink"
  | "explore2"
  | "profile"
  | "delete";

export type ButtonWidth = "normal" | "full";

export type ButtonProps = {
  variant?: ButtonVariant;
  width?: ButtonWidth;
  disabled?: boolean;
  onClick?: () => void;
  image?: any;
  imageWidth?: number;
  height?: number;
  type?: "button" | "submit" | "reset" | undefined;
  children?: React.ReactNode;
};

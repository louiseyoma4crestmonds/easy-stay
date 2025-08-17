export type HeroBannerProps = {
  backgroundImg?: string;
  primaryText?: string;
  secondaryText?: string;
  buttons?: {
    label?: string;
    link?: string;
    variant?: string;
    onClick?: () => void;
  }[];
  isLoggedIn?: boolean;
};

export type CustomerNavAreaProps = {
  isOnImage?: boolean;
  leftIcon?: string;
  defaultTextColor?: string;
  isLoggedIn?: boolean;
  firstName?: string;
  lastName?: string;
  points?: number;
  userAuthenticated?: boolean;
  userDetails?: { firstName: string; lastName: string };
};

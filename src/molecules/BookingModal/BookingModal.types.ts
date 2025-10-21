export type BookingModalProps = {
  showBookingSummary: boolean;
  apartment: any;
  checkinDate: any;
  checkoutDate: any;
  setShowBookingSummary: (arg: boolean) => void;
  setBookingSuccessModal: (arg: boolean) => void;
  isMobile?: boolean;
};

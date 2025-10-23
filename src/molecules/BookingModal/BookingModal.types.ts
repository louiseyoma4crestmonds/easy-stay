export type BookingModalProps = {
  showBookingSummary: boolean;
  apartment: any;
  checkinDate: any;
  checkoutDate: any;
  setAmountToPay: (amount: any) => void;
  setShowBookingSummary: (arg: boolean) => void;
  setShowChoosePaymentMethod: (arg: boolean) => void;
  setBookingSuccessModal: (arg: boolean) => void;
  isMobile?: boolean;
};

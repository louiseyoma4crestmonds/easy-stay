import { HostBooking } from "src/helpers/dataTypes";

export type HostBookingListProps = {
  bookings: HostBooking[];
  onOpen: (booking: HostBooking) => void;
  handleCancel: (booking: HostBooking) => void;
};

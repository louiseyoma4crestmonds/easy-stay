import Image from "next/image";

import styles from "./HostBookingCard.module.css";
import CustomDropdown from "@/molecules/CustomDropdown";
import { HostBooking } from "src/helpers/dataTypes";
import { useState } from "react";
import { DropdownOption } from "@/molecules/CustomDropdown/CustomDropdown.types";

type HostBookingCardProps = {
  booking: HostBooking;
  onOpen: (booking: HostBooking) => void;
  handleCancel: (booking: HostBooking) => void;
};

function HostBookingCard({
  booking,
  handleCancel,
  onOpen,
}: HostBookingCardProps) {
  const [selectedOption, setSelectedOption] = useState<DropdownOption>();

  const showEllipsis = true;

  const options: DropdownOption[] =
    booking.status === "upcoming"
      ? [
          { value: "view", label: "View", action: () => onOpen(booking) },
          {
            value: "cancel",
            label: "Cancel Booking",
            action: () => handleCancel(booking),
          },
        ]
      : [
          { value: "view", label: "View", action: () => onOpen(booking) },
          { value: "download", label: "Download Invoice" },
        ];

  return (
    <tr className="border-b font-sm font-normal ">
      <td className="px-4 py-2 underline md:no-underline ">
        <div className="block md:hidden cursor-pointer">
          {showEllipsis ? (
            <CustomDropdown
              options={options}
              value={selectedOption}
              onChange={setSelectedOption}
              buttonClassName={styles.btndiv}
              dropdownClassName={styles.dropdowndiv}
              toggleLabel={booking.id}
              hideButtonLabel
            />
          ) : (
            <span onClick={() => onOpen(booking)}>{booking.id}</span>
          )}
        </div>

        <span className="hidden md:block text-gray-800 ">{booking.id}</span>
      </td>
      <td className=" py-2 text-gray-800  ">{booking.guestName}</td>
      <td className=" py-2 text-gray-500 ">{booking.title}</td>
      <td className=" py-2  text-gray-500 truncate ">{booking.dateBooked}</td>
      <td className=" py-2  text-gray-500 truncate ">{booking.ratePerNight}</td>
      <td className=" py-2  text-gray-500 truncate ">{booking.bookingDates}</td>
      <td className="hidden md:table-cell  text-gray-500 py-2">
        {booking.numberOfDays}
      </td>

      <td className="hidden md:table-cell py-2  relative">
        <div className="relative  ">
          <CustomDropdown
            options={options}
            value={selectedOption}
            onChange={setSelectedOption}
            buttonClassName={styles.btndiv}
            dropdownClassName={styles.dropdowndiv}
            toggleIcon="/images/ellipsis.png"
            hideButtonLabel
          />
        </div>
      </td>
    </tr>
  );
}

export default HostBookingCard;

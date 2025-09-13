import Image from "next/image";
import { Booking } from "src/helpers/dataTypes";
import CustomDropdown from "../CustomDropdown";
import styles from "./BookingCard.module.css";
import { useState, VoidFunctionComponent } from "react";
import { DropdownOption } from "../CustomDropdown/CustomDropdown.types";

type BookingCardProps = {
  booking: Booking;
  onOpen: (booking: Booking) => void;
  handleCancel: (booking: Booking) => void;
};

function BookingCard({ booking, onOpen, handleCancel }: BookingCardProps) {
  const statusStyles: Record<string, string> = {
    active: "bg-primary-100 text-primary-800",
    upcoming: "bg-purple-100 text-purple-800",
    past: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };

  const options = [
    {
      value: "open",
      label: "Open",
      action: () => onOpen(booking),
    },
    {
      value: "cancel",
      label: "Cancel Bookings",
      action: () => handleCancel(booking),
    },
  ];
  const [selectedOption, setSelectedOption] = useState<DropdownOption>();

  const showEllipsis =
    booking.status === "active" || booking.status === "upcoming";

  return (
    <tr className="border-b text-gray-500 font-sm font-normal ">
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

        <span className="hidden md:block">{booking.id}</span>
      </td>
      <td className=" py-2 ">{booking.apartmentType}</td>
      <td className=" py-2 truncate ">{booking.location}</td>
      <td className="hidden md:table-cell  py-2">{booking.amount}</td>
      <td className="hidden md:table-cell py-2">{booking.date}</td>
      <td className="hidden md:table-cell py-2">
        <span
          className={`px-2.5 py-0.5 rounded-md  text-xs font-normal uppercase ${
            statusStyles[booking.status] || "bg-gray-100 text-gray-500"
          }`}
        >
          {booking.status}
        </span>
      </td>
      <td className="hidden md:table-cell py-2  relative">
        {showEllipsis ? (
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
        ) : (
          <div
            className="flex items-center justify-center cursor-pointer "
            onClick={() => onOpen(booking)}
          >
            <Image
              src="/images/eye-outline.png"
              width={20}
              height={20}
              alt="View"
            />{" "}
          </div>
        )}
      </td>
    </tr>
  );
}

export default BookingCard;

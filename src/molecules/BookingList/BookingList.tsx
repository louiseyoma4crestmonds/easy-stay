import { Booking } from "src/helpers/dataTypes";
import BookingCard from "../BookingCard";

type BookingListProps = {
  bookings: Booking[];
  searchTerm?: string;
  onOpen: (booking: Booking) => void;
  handleCancel: (booking: Booking) => void;
};

function BookingList({
  bookings,
  searchTerm,
  onOpen,
  handleCancel,
}: BookingListProps) {
  return (
    <div className="">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b h-12 text-left text-gray-500 text-xs font-semibold bg-gray-50">
            <th className="  px-4">ID</th>
            <th className=" ">APARTMENT TYPE</th>
            <th className="w-[35%] ">LOCATION</th>
            <th className="hidden md:table-cell ">AMOUNT</th>
            <th className="hidden md:table-cell ">DATE</th>
            <th className="hidden md:table-cell w-[8%] ">STATUS</th>
            <th className="hidden md:table-cell px-4 w-[6%] ">ACTION</th>
          </tr>
        </thead>

        <tbody>
          {searchTerm && bookings.length === 0 ? (
            <tr>
              <td colSpan={8} className="text-center py-4">
                No search result found
              </td>
            </tr>
          ) : (
            bookings.map((booking) => (
              <BookingCard
                key={booking.transaction_reference}
                booking={booking}
                onOpen={onOpen}
                handleCancel={handleCancel}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default BookingList;

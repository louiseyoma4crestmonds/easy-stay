import StatsCategory, {
  CategoriesProp,
} from "@/atoms/StatsCategory/StatsCategory";
import { useEffect, useState } from "react";
import { Booking, BookingStatus, MOCK_BOOKINGS } from "src/helpers/dataTypes";
import styles from "./BookingComp.module.css";
import SearchInput from "@/atoms/SearchInput";
import Tabs from "@/atoms/Tabs";
import BookingCard from "../BookingCard";
import BookingList from "../BookingList";
import BookingDrawer from "../BookingDrawer";
import Modal from "../Modal";
import Button from "@/atoms/Button";
import StarRating from "@/atoms/StarRating";
import NoBooking from "@/atoms/NoBooking";

const statusLabel: Record<BookingStatus, string> = {
  active: "Active",
  upcoming: "Upcoming",
  past: "Past",
  cancelled: "Cancelled",
};

const Reasons = [
  "Personal Emergency",
  "Health Concerns",
  "Work-Related Changes",
  "External Factors",
];

type BookingCompProps = {
  isMobile?: boolean;
};

function BookingComp({ isMobile }: BookingCompProps) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [cancelStep, setCancelStep] = useState<
    "none" | "reason" | "confirm" | "success"
  >("none");
  const [selectedReason, setSelectedReason] = useState("");
  const [additionalReason, setAdditionalReason] = useState("");
  const [reviewStep, setReviewStep] = useState<"none" | "form" | "success">(
    "none"
  );
  const [ratings, setRatings] = useState({
    Cleanliness: 0,
    checkin: 0,
    Location: 0,
    Value: 0,
    Communication: 0,
  });
  const [reviewComment, setReviewComment] = useState("");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [activeTab, setActiveTab] = useState<BookingStatus>("active");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const tabs: BookingStatus[] = ["active", "upcoming", "past", "cancelled"];

  const counts = {
    active: bookings.filter((b) => b.status === "active").length,
    upcoming: bookings.filter((b) => b.status === "upcoming").length,
    past: bookings.filter((b) => b.status === "past").length,
    cancelled: bookings.filter((b) => b.status === "cancelled").length,
  };

  const categories: CategoriesProp[] = [
    {
      label: "Active Bookings",
      count: counts.active,
      bg: "bg-primary-100",
      image: "/images/active-img.png",
    },
    {
      label: "Upcoming Bookings",
      count: counts.upcoming,
      bg: "bg-purple-100",
      image: "/images/upcoming-booking.png",
    },
    {
      label: "Past Bookings",
      count: counts.past,
      bg: "bg-green-100",
      image: "/images/past.png",
    },
    {
      label: "Cancelled Bookings",
      count: counts.cancelled,
      bg: "bg-red-100",
      image: "/images/cancelled.png",
    },
  ];

  useEffect(() => {
    // Simulated API response
    setBookings(MOCK_BOOKINGS);
  }, []);

  // Filtered bookings based on searchTerm
  // WILL CONSUME API FOR THIS
  // Filter bookings by active tab and search term
  const filteredBookings = bookings.filter(
    (b) =>
      b.status === activeTab &&
      b.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const onOpen = (b: Booking) => {
    setSelectedBooking(b);
    setDrawerOpen(true);
    console.log("booking", b);
  };

  const handleCancel = (booking: Booking) => {
    setSelectedBooking(booking);
    setCancelStep("reason"); // open first modal
  };

  const SaveCancellationReason = async () => {
    setErrorMsg("");
    if (!selectedReason && !additionalReason) {
      setErrorMsg("Please select a reason or add a comment");
      return;
    }

    const finalReason = additionalReason
      ? `${selectedReason || "Other"} - ${additionalReason}`
      : selectedReason;

    console.log("Reason to save:", finalReason);

    // API call
    // await api.saveCancellation({ bookingId: selectedBooking.id, reason: finalReason });

    setCancelStep("confirm");
    resetReasons();
  };

  const proceedCancellation = async () => {
    try {
      // Example API call
      // await api.cancelBooking({ bookingId: selectedBooking?.id });

      console.log("Booking cancelled successfully!");

      setCancelStep("success"); // show success modal
    } catch (error) {
      console.error("Error cancelling booking:", error);
      // optionally show toast or error modal
    }
  };

  const resetReasons = () => {
    setSelectedReason("");
    setAdditionalReason("");
    setErrorMsg("");
  };

  const SendReview = () => {
    //API CALL

    setReviewStep("success");
  };

  const showReviewModal = () => {
    setReviewStep("form");
  };

  return (
    <div className="w-full">
      <StatsCategory categories={categories} isMobile={isMobile} />

      <div className={styles.bookingdiv}>
        <div className=" flex flex-col w-full md:flex-row space-y-4 md:space-y-0 items-center justify-between px-4 ">
          <SearchInput
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search..."
          />

          {/* Tabs */}
          <Tabs
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            labels={statusLabel}
            type="guest"
          />
        </div>

        <div className="mt-6 ">
          {filteredBookings.length > 0 ? (
            <BookingList
              bookings={filteredBookings}
              searchTerm={searchTerm}
              onOpen={onOpen}
              handleCancel={handleCancel}
            />
          ) : (
            <NoBooking isMobile={isMobile} type="guest" />
          )}
        </div>
      </div>

      {selectedBooking && (
        <BookingDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          booking={selectedBooking}
          handleCancel={handleCancel}
          showReviewModal={showReviewModal}
        />
      )}

      {cancelStep === "reason" && (
        <Modal
          isOpen
          onClose={() => setCancelStep("none")}
          title="Reason for Cancellation"
          modalcontent={styles.modalContent3}
        >
          <div>
            <p className="text-gray-500 text-base font-normal p-5 ">
              Select Reason
            </p>
            <div className=" pb-2 px-5 -mt-5 ">
              {Reasons.map((reason) => {
                const isChecked = selectedReason === reason;
                return (
                  <div key={reason} className="flex items-center gap-3 my-3">
                    {/* Hidden input for accessibility */}
                    <input
                      type="radio"
                      name="cancelReason"
                      value={reason}
                      checked={isChecked}
                      onChange={() => setSelectedReason(reason)}
                      className="hidden"
                    />

                    {/* Custom radio UI */}
                    <span
                      onClick={() => {
                        setSelectedReason(reason);
                        setErrorMsg("");
                      }}
                      className={`w-4 h-4 rounded-full border flex items-center justify-center cursor-pointer transition
          ${isChecked ? "border-blue-600" : "border-gray-400 bg-gray-50 "}`}
                    >
                      {isChecked && (
                        <span className="w-3 h-3 bg-blue-600 rounded-full"></span>
                      )}
                    </span>

                    {/* Label */}
                    <span className="text-gray-800 font-normal text-sm">
                      {reason}
                    </span>
                  </div>
                );
              })}

              <hr className="mt-5 " />
            </div>

            <div className="my-4 px-5 ">
              <label className="text-gray-900 font-medium text-sm ">
                Aditional comments (Optional){" "}
              </label>
              <textarea
                rows={4}
                cols={50}
                className={styles.textarea}
                placeholder="Additional details (optional)"
                value={additionalReason}
                onChange={(e) => {
                  setAdditionalReason(e.target.value);
                  setErrorMsg("");
                }}
              />
            </div>
            <p className="text-red-400 text-center mb-2 ">{errorMsg} </p>
            <div className="flex justify-end p-5 gap-3 border-t ">
              <Button
                variant="profile"
                onClick={() => {
                  resetReasons();
                  setCancelStep("none");
                }}
              >
                Cancel
              </Button>
              <Button variant="primary" onClick={SaveCancellationReason}>
                Save
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {cancelStep === "confirm" && (
        <Modal
          isOpen
          onClose={() => setCancelStep("none")}
          imageUrl="/images/delete-icon.png"
          width={48}
          height={48}
          modalcontent={styles.modalContent2}
        >
          <div>
            <p className="text-gray-900 font-semibold text-lg text-center pt-5 pb-2 ">
              {" "}
              Cancel Booking
            </p>

            <p className="text-gray-500 text-center text-sm px-2 md:px-8 pb-4">
              Are you sure you want to cancel? This will result in a partial
              refund based on refund host's refund policy, and this action
              cannot be undone.
            </p>
            <div className="flex justify-center items-center py-4 gap-5 ">
              <Button variant="profile" onClick={() => setCancelStep("none")}>
                Cancel
              </Button>
              <Button variant="delete" onClick={proceedCancellation}>
                Proceed
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {cancelStep === "success" && (
        <Modal
          isOpen
          onClose={() => setCancelStep("none")}
          imageUrl="/images/success-icon.png"
          width={48}
          height={48}
          modalcontent={styles.modalContent2}
        >
          <div className="pt-3 pb-5 text-gray-900 text-lg font-semibold ">
            {" "}
            Cancelled Successfully
          </div>
        </Modal>
      )}

      {reviewStep === "form" && (
        <Modal
          isOpen
          onClose={() => setReviewStep("none")}
          title="Review Apartment"
          modalcontent={styles.modalContent3}
        >
          <div className=" py-4 ">
            <div className="">
              {Object.keys(ratings).map((key) => (
                <div
                  key={key}
                  className="flex items-center space-x-4 py-2 px-5 "
                >
                  <p className="capitalize text-gray-500 text-sm md:text-base font-normal w-[60%] md:w-[30%] ">
                    {key}
                  </p>
                  <StarRating
                    value={ratings[key as keyof typeof ratings]}
                    onChange={(val) =>
                      setRatings((prev) => ({ ...prev, [key]: val }))
                    }
                  />
                </div>
              ))}
            </div>

            <div className="my-4 px-5 ">
              <label className="text-gray-900 font-medium text-sm ">
                Aditional comments (Optional){" "}
              </label>
              <textarea
                rows={4}
                cols={50}
                className={styles.textarea}
                placeholder="Additional details (optional)"
                value={reviewComment}
                onChange={(e) => {
                  setReviewComment(e.target.value);
                  setErrorMsg("");
                }}
              />
            </div>

            <div className="flex justify-end gap-3 p-3 md:p-5 border-t">
              <Button variant="profile" onClick={() => setReviewStep("none")}>
                Cancel
              </Button>
              <Button variant="primary" onClick={SendReview}>
                Submit
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {reviewStep === "success" && (
        <Modal
          isOpen
          onClose={() => setReviewStep("none")}
          imageUrl="/images/success-icon.png"
          width={48}
          height={48}
          modalcontent={styles.modalContent2}
        >
          <div className="pt-3 pb-5 text-gray-900 text-lg font-semibold">
            Submitted Successfully
          </div>
        </Modal>
      )}
    </div>
  );
}

export default BookingComp;

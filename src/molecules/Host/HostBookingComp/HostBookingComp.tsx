import Tabs from "@/atoms/Tabs";
import styles from "./HostBookingComp.module.css";
import {
  BookingStatus,
  HOST_MOCK_BOOKINGS,
  HostBooking,
} from "src/helpers/dataTypes";
import { useEffect, useState } from "react";
import NoBooking from "@/atoms/NoBooking";
import HostBookingList from "../HostBookingList";
import HostBookingDrawer from "../HostBookingDrawer";
import Modal from "@/molecules/Modal";
import Button from "@/atoms/Button";

type HostBookingCompProps = {
  isMobile?: boolean;
  activeTab: BookingStatus;
};

const Reasons = [
  "Emergency Repais",
  "Pest Infestation",
  "Breech of house rules",
  "Suspicious booking",
];

function HostBookingComp({ isMobile, activeTab }: HostBookingCompProps) {
  const [bookings, setBookings] = useState<HostBooking[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBooking, setSelectedBooking] = useState<HostBooking | null>(
    null
  );
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [cancelStep, setCancelStep] = useState<
    "none" | "reason" | "confirm" | "success"
  >("none");
  const [checkModal, setCheckModal] = useState<"none" | "in" | "out">("none");
  const [selectedReason, setSelectedReason] = useState("");
  const [additionalReason, setAdditionalReason] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [actionType, setActionType] = useState<
    "cancel" | "checkout" | "checkin" | null
  >(null);

  useEffect(() => {
    // Simulated API response
    setBookings(HOST_MOCK_BOOKINGS);
  }, []);

  // Filtered bookings based on searchTerm
  // WILL CONSUME API FOR THIS
  // Filter bookings by active tab and search term
  const filteredBookings = bookings.filter(
    (b) =>
      b.status === activeTab &&
      b.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const onOpen = (b: HostBooking) => {
    setSelectedBooking(b);
    setDrawerOpen(true);
    console.log("booking", b);
  };

  const handleCancel = (booking: HostBooking) => {
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
      setActionType("cancel");
      setCancelStep("success"); // show success modal
    } catch (error) {
      console.error("Error cancelling booking:", error);
      // optionally show toast or error modal
    }
  };

  const proceedCheckout = async () => {
    try {
      // Example API call
      // await api.cancelBooking({ bookingId: selectedBooking?.id });

      console.log("checkout successfully!");
      setActionType("checkout");
      setCheckModal("none");
      setCancelStep("success"); // show success modal
    } catch (error) {
      console.error("Error cancelling booking:", error);
      // optionally show toast or error modal
    }
  };

  const proceedCheckin = async () => {
    try {
      // Example API call
      // await api.cancelBooking({ bookingId: selectedBooking?.id });

      console.log("checkin successfully!");
      setActionType("checkin");
      setCheckModal("none");
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

  return (
    <div className={styles.bookingdiv}>
      {filteredBookings.length > 0 ? (
        <HostBookingList
          bookings={filteredBookings}
          onOpen={onOpen}
          handleCancel={handleCancel}
        />
      ) : (
        <div className="flex justify-center items-center h-full ">
          <NoBooking isMobile={isMobile} type="host" />{" "}
        </div>
      )}

      {selectedBooking && (
        <HostBookingDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          booking={selectedBooking}
          handleCancel={handleCancel}
          setCheckModal={setCheckModal}
          //   showReviewModal={showReviewModal}
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
              Are you sure you want to cancel? This will result in a refund for
              the guest, and this action cannot be undone.
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
            {actionType === "checkout"
              ? "Checkout Successfully"
              : actionType === "checkin"
                ? "Checkin Successfully"
                : "Cancelled Successfully"}
          </div>
        </Modal>
      )}

      {checkModal === "out" && (
        <Modal
          isOpen
          onClose={() => setCheckModal("none")}
          imageUrl="/images/delete-icon.png"
          width={48}
          height={48}
          modalcontent={styles.modalContent2}
        >
          <div>
            <p className="text-gray-900 font-semibold text-lg text-center pt-5 pb-2 ">
              {" "}
              Check Out
            </p>

            <p className="text-gray-500 text-center text-sm px-2 md:px-8 pb-4">
              Are you sure you want to checkout this guest?
            </p>
            <div className="flex justify-center items-center py-4 gap-5 ">
              <Button variant="profile" onClick={() => setCheckModal("none")}>
                Cancel
              </Button>
              <Button variant="primary" onClick={proceedCheckout}>
                Proceed
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {checkModal === "in" && (
        <Modal
          isOpen
          onClose={() => setCheckModal("none")}
          imageUrl="/images/delete-icon.png"
          width={48}
          height={48}
          modalcontent={styles.modalContent2}
        >
          <div>
            <p className="text-gray-900 font-semibold text-lg text-center pt-5 pb-2 ">
              {" "}
              Check In
            </p>

            <p className="text-gray-500 text-center text-sm px-2 md:px-8 pb-4">
              Are you sure you want to checkin this guest?
            </p>
            <div className="flex justify-center items-center py-4 gap-5 ">
              <Button variant="profile" onClick={() => setCheckModal("none")}>
                Cancel
              </Button>
              <Button variant="primary" onClick={proceedCheckin}>
                Proceed
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default HostBookingComp;

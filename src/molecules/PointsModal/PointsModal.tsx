import Button from "@/atoms/Button";
import styles from "./PointsModal.module.css";
import { useEffect, useRef } from "react";
import { PointsModalProps } from "./PointsModal.types";

function PointsModal({
  onClose,
  onProceed,
  selected,
  setSelected,
}: PointsModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  // const [selected, setSelected] = useState<null | "apartment" | "ride">(null);

  // Example points (this will come from props or API in real app)
  const userPoints = 12000;
  const apartmentCost = 10000;
  const rideCost = 10000;

  // Determine if user can afford at least one reward
  const canAffordApartment = userPoints >= apartmentCost;
  const canAffordRide = userPoints >= rideCost;
  const canAffordAny = canAffordApartment || canAffordRide;

  // Button enabled only if user can afford AND a selection is made
  const isButtonDisabled = !canAffordAny || selected === null;

  // Message logic
  let statusMessage = "";
  if (!canAffordAny) {
    statusMessage = "Insufficient Points";
  } else {
    statusMessage = ` ${userPoints.toLocaleString()} Points Available`;
  }

  // Close if click is outside modal content
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [onClose]);

  return (
    <div className={styles.background}>
      <div className={styles.frame} ref={modalRef}>
        <div className="h-[500px] max-w-xs md:max-w-3xl md:h-auto  overflow-y-auto ">
          <div className={styles.firstdiv}>
            <span className="text-gray-900 font-medium text-base md:text-xl ">
              Redeem Your Points
            </span>
            <img
              src="/images/x-outline.png"
              alt="x-icon"
              className="w-6 h-6 cursor-pointer "
              onClick={onClose}
            />
          </div>

          <div className=" relative w-full   ">
            <div className="relative py-2 mt-4  mx-4 md:mt-0 md:mx-8 md:py-0 border-b  ">
              <div className="absolute inset-0 ">
                <img
                  src="/images/profile-frame.png"
                  alt="Profile-grame"
                  className="w-full h-full rounded-lg object-cover "
                />{" "}
              </div>
              <div className={styles.seconddiv}>
                {/* <div className={styles.thirddiv}> */}
                <img
                  src="/images/gift-boxes.png"
                  alt="gift box"
                  className="w-16 h-16 md:w-20 md:h-20 "
                />
                <div className="flex flex-col my-5 ">
                  <p className="text-white text-base md:text-xl font-bold  ">
                    {userPoints} Points
                  </p>
                  <p className="text-gray-300 font-normal text-sm  ">
                    Book more and earn more points
                  </p>
                </div>
              </div>
            </div>
            {/* </div> */}
          </div>

          <p className="text-gray-500 font-normal text-sm mx-4 md:px-8 py-4 ">
            Choose how you’d like to use your reward points
          </p>

          {/*WIN A FREE APARTMENT BOOKING*/}
          <div
            className={` ${styles.apartmentBooking}  ${
              selected === "apartment" ? "border border-blue-700" : ""
            }`}
            onClick={() => setSelected("apartment")}
          >
            <div className="flex flex-col md:flex-row items-start  md:items-center gap-3 ">
              <div className={styles.giftoutline}>
                <img
                  src="/images/gift-outline.png"
                  alt="gift-icon"
                  className="w-4 h-4 md:w-6 md:h-6"
                />
              </div>
              <div className="flex flex-col ">
                <p className={styles.P1}>Free Apartment Booking </p>
                <p className="text-gray-500 font-normal text-sm md:pr-3 ">
                  Get a complimentary night stay at one of our partner
                  apartments
                </p>
                <p className="text-gray-500 font-normal text-sm ">
                  Worth up to{" "}
                  <span className="text-blue-600 text-base font-semibold ">
                    {" "}
                    ₦50,000
                  </span>{" "}
                </p>
              </div>{" "}
            </div>
            <div className={styles.pointsdiv1}>10,000 Points</div>
          </div>

          {/*WIN A FREE AIRPORT RIDE*/}
          <div
            className={` ${styles.airportRide} ${
              selected === "ride" ? "border border-purple-600" : ""
            }`}
            onClick={() => setSelected("ride")}
          >
            <div className="flex flex-col md:flex-row items-start md:items-center gap-3 ">
              <div className={styles.giftoutline}>
                <img
                  src="/images/purple-gift-outline.png"
                  alt="gift-icon"
                  className="w-4 h-4 md:w-6 md:h-6"
                />
              </div>
              <div className="flex flex-col ">
                <p className={styles.P1}>Free Airport Ride</p>
                <p className="text-gray-500 font-normal text-sm md:pr-3 ">
                  Complimentary airport transfer service to or from your
                  destination
                </p>
                <p className="text-gray-500 font-normal text-sm ">
                  Worth up to{" "}
                  <span className="text-blue-600 text-base font-semibold ">
                    {" "}
                    ₦50,000
                  </span>{" "}
                </p>
              </div>{" "}
            </div>
            <div className={styles.pointsdiv2}>10,000 Points</div>
          </div>
          <hr />
        </div>
        <div className={`${styles.buttondiv} w-full md:w-auto `}>
          <p
            className={` ${
              !canAffordAny
                ? "text-red-600 text-sm md:text-base font-normal "
                : "text-green-500 text-base md:text-xl font-bold "
            }`}
          >
            {statusMessage}{" "}
          </p>
          <Button
            variant="primary"
            width="widthaccent"
            disabled={isButtonDisabled}
            onClick={onProceed}
          >
            Proceed
          </Button>
        </div>
      </div>
    </div>
  );
}

export default PointsModal;

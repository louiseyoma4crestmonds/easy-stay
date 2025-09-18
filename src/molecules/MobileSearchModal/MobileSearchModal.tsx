import Button from "@/atoms/Button";
import styles from "./MobileSearchModal.module.css";
import GuestDropdownModal from "@/atoms/GuestDropdownModal";
import Calendar from "../Calendar";
import LocationDropdownModal from "@/atoms/LocationDropdownModal";
import { useEffect, useRef } from "react";
import { MobileSearchModalProps } from "./MobileSearchModal.types";

function MobileSearchModal(props: MobileSearchModalProps) {
  const {
    selectedLocation,
    setSelectedLocation,
    checkinDate,
    checkoutDate,
    guestCounts,
    onSearch,
    locationDropdownOpen,
    setLocationDropdownOpen,
    guestDropdownOpen,
    setGuestDropdownOpen,
    checkinOpen,
    setCheckinOpen,
    checkoutOpen,
    setCheckoutOpen,
    setCheckinDate,
    setCheckoutDate,
    setGuestCounts,
    filteredLocations,
  } = props;

  const guestRef = useRef<HTMLDivElement>(null);
  const checkinRef = useRef<HTMLDivElement>(null);
  const checkoutRef = useRef<HTMLDivElement>(null);

  const locationDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        locationDropdownOpen &&
        !locationDropdownRef.current?.contains(event.target as Node)
      ) {
        setLocationDropdownOpen(false);
      }

      if (
        guestRef.current &&
        !guestRef.current.contains(event.target as Node)
      ) {
        setGuestDropdownOpen(false);
      }

      if (
        checkinRef.current &&
        !checkinRef.current.contains(event.target as Node)
      ) {
        setCheckinOpen(false);
      }

      if (
        checkoutRef.current &&
        !checkoutRef.current.contains(event.target as Node)
      ) {
        setCheckoutOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [checkinOpen, checkoutOpen]);

  function closeAll() {
    setLocationDropdownOpen(false);
    setGuestDropdownOpen(false);
    setCheckinOpen(false);
    setCheckoutOpen(false);
  }

  return (
    <div className={styles.modaldiv}>
      {/* location segment */}

      {/* location segment */}
      <div className="relative w-full pb-3 border-b">
        {/* trigger */}
        <div
          className="flex flex-row items-center cursor-pointer"
          // prevent the document outside-click listener from seeing this press
          onMouseDown={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
          onClick={() => {
            if (!locationDropdownOpen) {
              closeAll();
              setLocationDropdownOpen(true);
            } else {
              setLocationDropdownOpen(false);
            }
          }}

          //   onClick={() => {
          //     setLocationDropdownOpen((prev) => !prev);
          //   }}
        >
          <img
            src="/images/location-icon.png"
            alt="location icon"
            className="w-6 h-6"
          />

          <div className="flex flex-col items-start w-full px-2 py-1 rounded-sm">
            <label className="font-medium text-sm text-gray-900">Where</label>

            <input
              type="text"
              value={selectedLocation}
              placeholder="Select location"
              onChange={(e) => setSelectedLocation(e.target.value)}
              onMouseDown={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
              className="bg-transparent text-sm text-gray-400 font-normal focus:outline-none w-full placeholder-gray-400"
              aria-label="Location"
            />
          </div>
        </div>

        {/* dropdown */}
        {locationDropdownOpen && (
          <div ref={locationDropdownRef} onClick={(e) => e.stopPropagation()}>
            <LocationDropdownModal
              locations={filteredLocations}
              onSelectLocation={(location) => {
                setSelectedLocation(location);
                setLocationDropdownOpen(false);
              }}
            />
          </div>
        )}
      </div>

      {/* check in */}
      <div className={styles.checkoutdiv}>
        <div
          className=""
          onMouseDown={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
          onClick={() => {
            if (!checkinOpen) {
              closeAll();
              setCheckinOpen(true);
            } else {
              setCheckinOpen(false);
            }
          }}
          //   onClick={() => {
          //     setCheckinOpen((prev) => !prev);
          //     // setCheckinOpen(true);
          //     setCheckoutOpen(false);
          //   }}
        >
          <p className={styles.text}>Check In</p>

          <div className={styles.seconddiv}>
            <img
              src="/images/calendar-month-outline.png"
              alt="calendar icon"
              className="w-4 h-4"
            />
            <span className="text-sm text-gray-400 font-normal">
              {checkinDate ? checkinDate.toLocaleDateString() : "Select Date"}
            </span>
          </div>
        </div>

        {checkinOpen && (
          <div ref={checkinRef} onMouseDown={(e) => e.stopPropagation()}>
            <Calendar
              initialDate={checkinDate}
              onConfirm={(date) => {
                if (date) setCheckinDate(date);
                setCheckinOpen(false);
              }}
            />{" "}
          </div>
        )}
      </div>

      {/* check out */}
      <div className={styles.checkoutdiv}>
        <div
          className=""
          onMouseDown={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
          onClick={() => {
            if (!checkoutOpen) {
              closeAll();
              setCheckoutOpen(true);
            } else {
              setCheckoutOpen(false);
            }
          }}

          //   onClick={() => {
          //     setCheckoutOpen((prev) => !prev);
          //     // setCheckinOpen(true);
          //     setCheckinOpen(false);
          //   }}
        >
          <p className={styles.text}>Check Out</p>

          <div className={styles.seconddiv}>
            <img
              src="/images/calendar-month-outline.png"
              alt="calendar icon"
              className="w-4 h-4"
            />

            <span className="text-sm text-gray-400 font-normal">
              {checkoutDate ? checkoutDate.toLocaleDateString() : "Select Date"}
            </span>
          </div>
        </div>

        {checkoutOpen && (
          <div ref={checkoutRef} onMouseDown={(e) => e.stopPropagation()}>
            <Calendar
              initialDate={checkoutDate}
              onConfirm={(date) => {
                if (date) setCheckoutDate(date);
                setCheckoutOpen(false);
              }}
            />{" "}
          </div>
        )}
      </div>

      {/* Guest */}
      <div className=" relative w-full cursor-pointer my-3 ">
        <div
          className="flex flex-col items-start "
          onMouseDown={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
          onClick={() => {
            if (!guestDropdownOpen) {
              closeAll();
              setGuestDropdownOpen(true);
            } else {
              setGuestDropdownOpen(false);
            }
          }}
          //   onClick={() => setGuestDropdownOpen((prev) => !prev)}
        >
          <p className={styles.text}>Guests</p>

          <div className={styles.seconddiv}>
            <img
              src="/images/users-group-outline.png"
              alt="guest icon"
              className="w-4 h-4"
            />

            <span className="text-sm text-gray-400 font-normal">
              {guestCounts.adults === 0 &&
              guestCounts.children === 0 &&
              guestCounts.infants === 0 &&
              guestCounts.pets === 0
                ? "Add Guests"
                : `${guestCounts.adults} Adult${guestCounts.adults > 1 ? "s" : ""}${
                    guestCounts.children > 0
                      ? `, ${guestCounts.children} Child${guestCounts.children > 1 ? "ren" : ""}`
                      : ""
                  }${guestCounts.infants > 0 ? `, ${guestCounts.infants} Infant${guestCounts.infants > 1 ? "s" : ""}` : ""}${
                    guestCounts.pets > 0
                      ? `, ${guestCounts.pets} Pet${guestCounts.pets > 1 ? "s" : ""}`
                      : ""
                  }`}
            </span>
          </div>
        </div>

        {guestDropdownOpen && (
          <div ref={guestRef} onMouseDown={(e) => e.stopPropagation()}>
            <GuestDropdownModal
              onConfirm={(guests) => {
                setGuestCounts(guests);
                setGuestDropdownOpen(false);
              }}
              initialGuests={guestCounts}
            />{" "}
          </div>
        )}
      </div>
      <div className="flex w-full">
        <Button
          variant="primaryWithImg"
          width="full"
          image="/images/search-outline.png"
          imageWidth={20}
          height={20}
          onClick={onSearch}
        >
          Search
        </Button>{" "}
      </div>
    </div>
  );
}

export default MobileSearchModal;

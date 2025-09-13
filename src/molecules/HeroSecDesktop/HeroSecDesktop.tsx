import Button from "@/atoms/Button";
import styles from "./HeroSecDesktop.module.css";
import LocationDropdownModal from "@/atoms/LocationDropdownModal";
import Calendar from "../Calendar";
import GuestDropdownModal from "@/atoms/GuestDropdownModal";
import { useEffect, useRef } from "react";
import { HeroSecDesktopProps } from "./HeroSecDesktop.types";

function HeroSecDesktop(props: HeroSecDesktopProps) {
  const {
    locationDropdownOpen,
    checkinDate,
    checkoutDate,
    guestCounts,
    setCheckinDate,
    setCheckoutDate,
    setGuestCounts,
    onSearch,
    filteredLocations,
    selectedLocation,
    setSelectedLocation,
    setLocationDropdownOpen,
    guestDropdownOpen,
    setGuestDropdownOpen,
    checkinOpen,
    setCheckinOpen,
    checkoutOpen,
    setCheckoutOpen,
  } = props;

  const guestRef = useRef<HTMLDivElement>(null);

  const locationRef = useRef<HTMLDivElement>(null);
  const checkinRef = useRef<HTMLDivElement>(null);
  const checkoutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        locationRef.current &&
        !locationRef.current.contains(event.target as Node)
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
  }, []);

  return (
    <div className={styles.heroSearchdiv}>
      {/* location segment */}
      <div
        className="relative w-[35%] border-r border-gray-300   cursor-pointer"
        ref={locationRef}
      >
        <div
          className="flex flex-row items-center cursor-text"
          onClick={() => {
            setLocationDropdownOpen((prev) => !prev);
          }}
          //   onClick={() => {
          //     setLocationDropdownOpen(true);
          //     const input = locationRef.current?.querySelector(
          //       "input"
          //     ) as HTMLInputElement | null;
          //     input?.focus();
          //   }}
        >
          {/* icon (kept) */}
          <img
            src="/images/location-icon.png"
            alt="location icon"
            className="w-6 h-6"
          />

          {/* label + input (kept label as requested) */}
          <div
            className={`flex flex-col items-start w-[85%] transition ${
              locationDropdownOpen
                ? "bg-white bg-opacity-10"
                : "hover:bg-white hover:bg-opacity-10"
            } px-2 py-1 rounded-sm`}
          >
            <label className="font-medium text-sm text-white">Where</label>

            <input
              type="text"
              value={selectedLocation}
              placeholder="Select location"
              onChange={(e) => {
                // when user types, hide dropdown as requested
                setSelectedLocation(e.target.value);
                setLocationDropdownOpen(false);
              }}
              onFocus={() => {
                // open dropdown on focus (user may focus without typing)
                setLocationDropdownOpen(true);
              }}
              className="bg-transparent text-sm text-gray-200 font-normal focus:outline-none w-full placeholder-gray-200"
              aria-label="Location"
            />
          </div>
        </div>

        {/* location modal */}
        {locationDropdownOpen && (
          <LocationDropdownModal
            locations={filteredLocations}
            onSelectLocation={(location) => {
              setSelectedLocation(location);
              setLocationDropdownOpen(false);
            }}
          />
        )}
      </div>

      {/* check in */}
      <div ref={checkinRef} className={styles.checkoutdiv}>
        <div
          className={` w-[90%]   transition ${
            checkinOpen
              ? "bg-white bg-opacity-10"
              : "hover:bg-white hover:bg-opacity-10"
          }`}
          onClick={() => {
            setCheckinOpen((prev) => !prev);
            // setCheckinOpen(true);
            setCheckoutOpen(false);
          }}
          //   onClick={() => {
          //     setCheckinOpen(true);
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
            <span className="text-sm text-gray-200 font-normal">
              {checkinDate ? checkinDate.toLocaleDateString() : "Select Date"}
            </span>
          </div>
        </div>

        {checkinOpen && (
          <Calendar
            initialDate={checkinDate}
            onConfirm={(date) => {
              if (date) setCheckinDate(date);
              setCheckinOpen(false);
            }}
          />
        )}
      </div>

      {/* check out */}
      <div ref={checkoutRef} className={styles.checkoutdiv}>
        <div
          className={` w-[90%] transition ${
            checkoutOpen
              ? "bg-white bg-opacity-10"
              : "hover:bg-white hover:bg-opacity-10"
          }`}
          onClick={() => {
            setCheckoutOpen((prev) => !prev);
            // setCheckinOpen(true);
            setCheckinOpen(false);
          }}
          //   onClick={() => {
          //     setCheckoutOpen(true);
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

            <span className="text-sm text-gray-200 font-normal">
              {checkoutDate ? checkoutDate.toLocaleDateString() : "Select Date"}
            </span>
          </div>
        </div>

        {checkoutOpen && (
          <Calendar
            initialDate={checkoutDate}
            onConfirm={(date) => {
              if (date) setCheckoutDate(date);
              setCheckoutOpen(false);
            }}
          />
        )}
      </div>

      {/* Guest */}
      <div ref={guestRef} className=" relative w-[26%] cursor-pointer ">
        <div
          className={`flex flex-col items-start w-[95%]   transition ${
            guestDropdownOpen
              ? "bg-white bg-opacity-10"
              : "hover:bg-white hover:bg-opacity-10"
          }`}
          onClick={() => setGuestDropdownOpen((prev) => !prev)}
        >
          <p className={styles.text}>Guests</p>

          <div className={styles.seconddiv}>
            <img
              src="/images/users-group-outline.png"
              alt="guest icon"
              className="w-4 h-4"
            />

            <span className="text-sm text-gray-200 font-normal">
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
          <GuestDropdownModal
            // onClose={() => setGuestDropdownOpen(false)}
            onConfirm={(guests) => {
              setGuestCounts(guests);
              setGuestDropdownOpen(false);
            }}
            initialGuests={guestCounts}
          />
        )}
      </div>
      <div className="flex w-auto">
        <Button
          variant="primaryWithImg"
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

export default HeroSecDesktop;

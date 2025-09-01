import { useState, useRef, useEffect } from "react";
import Image from "next/future/image";
import Button from "@/atoms/Button";
import { GuestCounts, HeroSecProps } from "./HeroSec.types";
import styles from "./HeroSec.module.css";
import logo from "public/images/hero-img.png";
import LocationDropdownModal from "@/atoms/LocationDropdownModal";
import GuestDropdownModal from "@/atoms/GuestDropdownModal";
import { useRouter } from "next/router";

import CustomerNavArea from "../CustomerNavArea";
import Calendar from "../Calendar";

function HeroSec(props: HeroSecProps) {
  const {
    isLoggedIn,
    firstName,
    lastName,
    points,
    initialLocation = "",
    initialCheckin = null,
    initialCheckout = null,
    initialGuests = { adults: 0, children: 0, infants: 0, pets: 0 },
  } = props;
  const router = useRouter();
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);
  // const [selectedLocation, setSelectedLocation] = useState("");
  const [guestDropdownOpen, setGuestDropdownOpen] = useState(false);
  // const [checkinDate, setCheckinDate] = useState<Date | null>(null);
  // const [checkoutDate, setCheckoutDate] = useState<Date | null>(null);
  const [checkinOpen, setCheckinOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  // const [guestCounts, setGuestCounts] = useState<GuestCounts>({
  //   adults: 0,
  //   children: 0,
  //   infants: 0,
  //   pets: 0,
  // });
  const [selectedLocation, setSelectedLocation] = useState(initialLocation);
  const [checkinDate, setCheckinDate] = useState<Date | null>(initialCheckin);
  const [checkoutDate, setCheckoutDate] = useState<Date | null>(
    initialCheckout
  );
  const [guestCounts, setGuestCounts] = useState<GuestCounts>(initialGuests);
  const guestRef = useRef<HTMLDivElement>(null);

  const locationRef = useRef<HTMLDivElement>(null);
  const checkinRef = useRef<HTMLDivElement>(null);
  const checkoutRef = useRef<HTMLDivElement>(null);

  const locations = [
    "Ikeja, Lagos",
    "Victoria Island, Lagos",
    "Rumuomasi",
    "Wuse II, Abuja",
    "Ikeja GRA, Lagos",
    "Maitama Abuja, Lagos",
  ];

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

  // 🔑 Handle search click
  const handleSearch = () => {
    const query: any = {};

    if (selectedLocation) query.location = selectedLocation;
    if (checkinDate) query.checkin = checkinDate.toISOString().split("T")[0];
    if (checkoutDate) query.checkout = checkoutDate.toISOString().split("T")[0];

    if (guestCounts.adults > 0) query.adults = guestCounts.adults;
    if (guestCounts.children > 0) query.children = guestCounts.children;
    if (guestCounts.infants > 0) query.infants = guestCounts.infants;
    if (guestCounts.pets > 0) query.pets = guestCounts.pets;

    router.push({
      pathname: "/guest/property-search",
      query,
    });
  };

  // filtered list for dropdown (only used when dropdown is open)
  const filteredLocations = selectedLocation
    ? locations.filter((l) =>
        l.toLowerCase().includes(selectedLocation.toLowerCase())
      )
    : locations;

  return (
    <div className={styles.heroSection}>
      <Image src={logo} alt="hero section img" priority />

      {/* top header section */}
      <CustomerNavArea
        firstName={firstName}
        lastName={lastName}
        points={points}
        isLoggedIn={isLoggedIn}
        isOnImage={true}
        leftIcon="/images/menu.png"
      />

      {/* top header section */}
      <div className={styles.heromodal}>
        <p className={styles.heroP1}>
          Find Your Perfect Shortlet, Anytime, Anywhere.
        </p>
        <div className={styles.heroSearchdiv}>
          {/* location segment */}
          <div
            className="relative  w-[35%] border-r border-gray-300   cursor-pointer"
            ref={locationRef}
          >
            <div
              className="flex flex-row gap-2 items-center cursor-text"
              // clicking the wrapper should focus input and open the dropdown
              onClick={() => {
                setLocationDropdownOpen(true);
                const input = locationRef.current?.querySelector(
                  "input"
                ) as HTMLInputElement | null;
                input?.focus();
              }}
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
                  className="bg-transparent text-sm text-gray-200 font-normal focus:outline-none w-full placeholder-gray-400"
                  aria-label="Location"
                />
              </div>
            </div>

            {/* <div
              className="flex  flex-row gap-2 "
              onClick={() => setLocationDropdownOpen((prev) => !prev)}
            >
              <img
                src="/images/location-icon.png"
                alt="location icon"
                className="w-6 h-6"
              />
              <div
                className={`flex flex-col items-start w-[85%]   transition ${
                  locationDropdownOpen
                    ? "bg-white bg-opacity-10"
                    : "hover:bg-white hover:bg-opacity-10"
                }`}
              >
                <p className="font-medium text-sm text-white">Where</p>
                <p className="text-sm text-gray-200 font-normal">
                  {selectedLocation || "Select Location"}
                </p>
              </div>
            </div> */}

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
                setCheckinOpen(true);
                setCheckoutOpen(false);
              }}
            >
              <p className={styles.text}>Check In</p>

              <div className={styles.seconddiv}>
                <img
                  src="/images/calendar-month-outline.png"
                  alt="calendar icon"
                  className="w-4 h-4"
                />
                <span className="text-sm text-gray-200 font-normal">
                  {checkinDate
                    ? checkinDate.toLocaleDateString()
                    : "Select Date"}
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
                setCheckoutOpen(true);
                setCheckinOpen(false);
              }}
            >
              <p className={styles.text}>Check Out</p>

              <div className={styles.seconddiv}>
                <img
                  src="/images/calendar-month-outline.png"
                  alt="calendar icon"
                  className="w-4 h-4"
                />

                <span className="text-sm text-gray-200 font-normal">
                  {checkoutDate
                    ? checkoutDate.toLocaleDateString()
                    : "Select Date"}
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
          <div ref={guestRef} className="relative w-[26%] cursor-pointer ">
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
              onClick={handleSearch}
            >
              Search
            </Button>{" "}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSec;

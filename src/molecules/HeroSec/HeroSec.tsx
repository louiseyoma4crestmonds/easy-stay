import { useState, useRef, useEffect } from "react";
import { GuestCounts, HeroSecProps } from "./HeroSec.types";
import styles from "./HeroSec.module.css";
import { useRouter } from "next/router";
import CustomerNavArea from "../CustomerNavArea";
import HeroSecDesktop from "../HeroSecDesktop";
import MobileSearchModal from "../MobileSearchModal";

function HeroSec(props: HeroSecProps) {
  const {
    isLoggedIn,
    firstName,
    lastName,
    points,
    isMobile,
    initialLocation = "",
    initialCheckin = null,
    initialCheckout = null,
    initialGuests = { adults: 0, children: 0, infants: 0, pets: 0 },
  } = props;
  const router = useRouter();
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);

  const [mobileModal, setMobileModal] = useState(false);

  const [guestDropdownOpen, setGuestDropdownOpen] = useState(false);

  const [checkinOpen, setCheckinOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const [selectedLocation, setSelectedLocation] = useState(initialLocation);
  const [checkinDate, setCheckinDate] = useState<Date | null>(initialCheckin);
  const [checkoutDate, setCheckoutDate] = useState<Date | null>(
    initialCheckout
  );
  const [guestCounts, setGuestCounts] = useState<GuestCounts>(initialGuests);

  const mobileModalRef = useRef<HTMLDivElement>(null);

  const locations = [
    "Ikeja, Lagos",
    "Victoria Island, Lagos",
    "Rumuomasi",
    "Wuse II, Abuja",
    "Ikeja GRA, Lagos",
    "Maitama Abuja, Lagos",
  ];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        mobileModalRef.current &&
        !mobileModalRef.current.contains(e.target as Node)
      ) {
        setMobileModal(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileModalRef, setMobileModal]);

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
      <div className="absolute inset-0">
        <img
          src="/images/Header.png"
          alt="section background"
          className="w-full h-full object-cover"
        />
        {/* <img
          src="/images/hero-img.png"
          alt="section background"
          className="w-full h-full object-cover"
        /> */}
      </div>

      {/* top header section */}
      <div className="relative pb-16  mt-3 md:mt-0 md:pb-40 ">
        <CustomerNavArea
          firstName={firstName}
          lastName={lastName}
          points={points}
          isLoggedIn={isLoggedIn}
          isOnImage={true}
          isOtherPages={false}
          isMobile={isMobile}
          leftIcon="/images/menu.png"
        />{" "}
      </div>

      {/* top header section */}
      <div className={styles.heromodal}>
        <p className={styles.heroP1}>
          Find Your Perfect Shortlet, Anytime, Anywhere.
        </p>
        <div className="hidden md:block mt-2 ">
          <HeroSecDesktop
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
            guestCounts={guestCounts}
            setGuestCounts={setGuestCounts}
            checkinDate={checkinDate}
            setCheckinDate={setCheckinDate}
            checkoutDate={checkoutDate}
            setCheckoutDate={setCheckoutDate}
            setCheckinOpen={setCheckinOpen}
            setCheckoutOpen={setCheckoutOpen}
            onSearch={handleSearch}
            filteredLocations={filteredLocations}
            locationDropdownOpen={locationDropdownOpen}
            setLocationDropdownOpen={setLocationDropdownOpen}
            guestDropdownOpen={guestDropdownOpen}
            setGuestDropdownOpen={setGuestDropdownOpen}
            checkinOpen={checkinOpen}
            checkoutOpen={checkoutOpen}
          />
        </div>

        <div className={styles.heroSearchdiv}>
          <div className="relative w-full cursor-pointer" ref={mobileModalRef}>
            <div
              className="flex flex-row items-center cursor-text"
              // clicking the wrapper should focus input and open the dropdown
              onClick={() => setMobileModal((prev) => !prev)}
            >
              {/* icon (kept) */}
              <img
                src="/images/location-icon.png"
                alt="location icon"
                className="w-6 h-6"
              />

              {/* label + input (kept label as requested) */}
              <div className="flex flex-col items-start px-2 py-1 rounded-sm">
                <label className="font-medium text-sm text-white">Where</label>

                <input
                  type="text"
                  value={selectedLocation}
                  placeholder="Select location"
                  onChange={(e) => {
                    // when user types, hide dropdown as requested
                    setSelectedLocation(e.target.value);
                    setMobileModal(false);
                  }}
                  onFocus={() => {
                    // open dropdown on focus (user may focus without typing)
                    setMobileModal(true);
                  }}
                  className="bg-transparent text-sm text-gray-200 font-normal focus:outline-none w-full placeholder-gray-200"
                />
              </div>
            </div>

            {/* location modal */}
            {mobileModal && (
              <MobileSearchModal
                selectedLocation={selectedLocation}
                setSelectedLocation={setSelectedLocation}
                guestCounts={guestCounts}
                setGuestCounts={setGuestCounts}
                checkinDate={checkinDate}
                setCheckinDate={setCheckinDate}
                checkoutDate={checkoutDate}
                setCheckoutDate={setCheckoutDate}
                setCheckinOpen={setCheckinOpen}
                setCheckoutOpen={setCheckoutOpen}
                onSearch={handleSearch}
                filteredLocations={filteredLocations}
                locationDropdownOpen={locationDropdownOpen}
                setLocationDropdownOpen={setLocationDropdownOpen}
                guestDropdownOpen={guestDropdownOpen}
                setGuestDropdownOpen={setGuestDropdownOpen}
                checkinOpen={checkinOpen}
                checkoutOpen={checkoutOpen}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSec;

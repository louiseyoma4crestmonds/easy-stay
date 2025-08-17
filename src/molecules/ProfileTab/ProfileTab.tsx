import { useEffect, useState } from "react";
import styles from "./ProfileTab.module.css";
import CustomDropdown from "../CustomDropdown";
import Button from "@/atoms/Button";
import PointsModal from "../PointsModal";

interface DropdownOption {
  label?: string;
  value?: string;
  name?: string;
  code?: string;
  flag?: string;
  image?: string;
}

const countries = [
  { name: "USA", code: "+1", flag: "/images/US.png" },
  { name: "UK", code: "+44", flag: "/images/GB.png" },
  { name: "Nigeria", code: "+234", flag: "/images/NG.png" },
];

function ProfileTab() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState<DropdownOption>(countries[0]);
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [showPointsModal, setShowPointsModal] = useState(false);

  // Fetch user data from backend
  //   useEffect(() => {
  //     async function fetchProfile() {
  //       const res = await fetch("/api/profile");
  //       const data = await res.json();
  //       setFirstName(data.firstName);
  //       setLastName(data.lastName);
  //       setEmail(data.email);
  //       setPhone(data.phone);
  //       setImageUrl(data.profileImage || null); // will be URL string if exists
  //     }
  //     fetchProfile();
  //   }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setImage(file);
      setImageUrl(URL.createObjectURL(file)); // immediately display picked image
    }
  };

  const getInitials = () => {
    return `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase();
  };

  return (
    <div className={styles.maindiv}>
      <p className={styles.title}>My Profile</p>

      <div className="px-8 py-5 border-b ">
        <div className=" relative w-full">
          <img
            src="/images/profile-frame.png"
            alt="Profile-grame"
            className="w-full h-full "
          />
          <div
            className={styles.seconddiv}
            onClick={() => setShowPointsModal(true)}
          >
            <div className={styles.thirddiv}>
              <img
                src="/images/gift-boxes.png"
                alt="gift box"
                className="w-20 h-20 "
              />
              <div className="flex flex-col ">
                <p className="text-white text-xl font-bold ">100 Points</p>
                <p className="text-gray-300 font-normal text-sm ">
                  Book more and earn more points
                </p>
              </div>
            </div>
            <Button variant="primary">Redeem Points</Button>
          </div>
        </div>
        <div className="flex flex-row gap-6 items-center py-6 ">
          <div className={styles.imgdiv}>
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <span>{getInitials()}</span>
            )}
          </div>
          <label htmlFor="fileInput" className={styles.labeldiv}>
            <img
              src="/images/camera.png"
              alt="upload photo"
              width={20}
              height={20}
            />
            Upload Photo
          </label>
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-4 mb-4 pt-5 border-t ">
          <div className="w-full md:w-1/2">
            <label htmlFor="firstName" className={styles.formLabel}>
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              placeholder="Input first name"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              className={styles.formInput}
            />
          </div>
          <div className="w-full md:w-1/2">
            <label htmlFor="lastName" className={styles.formLabel}>
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              placeholder="Input last name"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              className={styles.formInput}
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="w-full md:w-1/2">
            <label className={styles.formLabel}>Email Address</label>

            <input
              type="email"
              name="no-autofill-email"
              value={email}
              autoComplete="new-email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Input email"
              className={styles.formInput}
            />
          </div>
          <div className="w-full md:w-1/2">
            <label className={styles.formLabel}>Phone Number</label>
            <div className="flex">
              <CustomDropdown
                options={countries}
                value={country}
                onChange={(val) => setCountry(val)}
                buttonClassName={styles.btndiv}
                dropdownClassName={styles.dropdowndiv}
                toggleIcon="/images/chevron-down-outline.png"
                spanClassName="flex items-center gap-3"
              />{" "}
              <input
                type="tel"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                placeholder="123 4567 890"
                className={styles.phoneinput}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.btndiv2}>
        <Button variant="profile">Delete Account</Button>
        <Button variant="primary">Save Changes</Button>
      </div>

      {/**POINTS MODAL*/}
      {showPointsModal && (
        <PointsModal onClose={() => setShowPointsModal(false)} />
      )}
    </div>
  );
}

export default ProfileTab;

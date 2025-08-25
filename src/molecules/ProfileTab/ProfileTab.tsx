import { useEffect, useRef, useState } from "react";
import styles from "./ProfileTab.module.css";
import CustomDropdown from "../CustomDropdown";
import Button from "@/atoms/Button";
import PointsModal from "../PointsModal";
import Modal from "../Modal";
import useSessionDetails from "@/hooks/useSessionDetails";

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
  // ✅ get session data
  const {
    firstName: sessionFirstName,
    lastName: sessionLastName,
    email: sessionEmail,
    token,
  } = useSessionDetails();
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState<DropdownOption>(countries[0]);
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [showPointsModal, setShowPointsModal] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [selected, setSelected] = useState<null | "apartment" | "ride">(null);

  const [activeModal, setActiveModal] = useState<
    null | "saved" | "final" | "delete" | "deleteFinal" | "delOtp" | "archive"
  >(null);

  // populate form fields once session loads
  useEffect(() => {
    if (sessionFirstName || sessionLastName || sessionEmail) {
      setFirstName(sessionFirstName);
      setLastName(sessionLastName);
      setEmail(sessionEmail);
    }
  }, [sessionFirstName, sessionLastName, sessionEmail]);

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

  //IMAGE UPLOAD
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setImage(file);
      setImageUrl(URL.createObjectURL(file)); // immediately display picked image
    }
  };

  //   const handleSave = async () => {
  //        const formData = new FormData();
  //     formData.append("firstName", firstName);
  //     formData.append("lastName", lastName);
  //     formData.append("email", email);
  //     formData.append("phone", phone);
  //     if (image) {
  //       formData.append("profileImage", image);
  //     }

  //     const res = await fetch("/api/profile/update", {
  //       method: "POST",
  //       body: formData,
  //     });

  //     if (res.ok) {
  //       alert("Profile updated successfully!");
  //     } else {
  //       alert("Failed to update profile");
  //     }
  //   }

  const handleSave = () => {
    // setShowSavedModal(true);
    setActiveModal("saved");
  };

  // PROCEED AFTER SELECTING FREE RIDE OR APARTMENT
  const onProceed = () => {
    setShowPointsModal(false);
    // setShowFinalModal(true);
    setActiveModal("final");
  };

  // GET INITIALS OF THE FIRSTNAME AND LAST NAME
  const getInitials = () => {
    return `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase();
  };

  //CLOSE MODALS
  const onClose = () => {
    if (showPointsModal) {
      setShowPointsModal(false);
      setSelected(null);
    }
    if (activeModal === "final") {
      setActiveModal(null);
      setSelected(null);
    }
    if (activeModal === "delOtp") {
      setActiveModal(null);
    }
  };

  const handleChange = (index: number, value: string) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 3) {
        inputsRef.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const isComplete = otp.every((val) => val !== "");

  // SUBMIT OPT TO DELETE ACCOUNT
  const handleSubmit = () => {
    if (isComplete) {
      // FUTURE API CALLS
      // Reset before triggering modal again
      setActiveModal("archive");
      setOtp(["", "", "", ""]);
    }
  };

  //RESEND OTP FUNCTION
  const handleResend = () => {
    // Future: call resend API here
    setOtp(["", "", "", ""]);
    inputsRef.current[0]?.focus();
  };

  const handleShowDeleteModal = () => {
    if (activeModal === "delete") {
      setActiveModal("delOtp");
    }
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
        <Button variant="profile" onClick={() => setActiveModal("delete")}>
          Delete Account
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </div>

      {/**POINTS MODAL*/}
      {showPointsModal && (
        <PointsModal
          onClose={onClose}
          onProceed={onProceed}
          selected={selected}
          setSelected={setSelected}
        />
      )}

      {activeModal === "final" && (
        <Modal
          isOpen
          onClose={onClose}
          imageUrl="/images/success-icon.png"
          width={48}
          height={48}
          modalcontent={styles.modalContent}
        >
          <div className="flex flex-col justify-center items-center mt-4">
            <p className="text-lg font-semibold text-gray-900 "> 🎉Success!</p>
            {selected === "ride" ? (
              <p className="font-normal text-gray-500 text-sm text-center pt-2 ">
                Your free airport ride has been redeemed. We'll contact you to
                arrange pickup.
              </p>
            ) : (
              <p className="font-normal text-gray-500 text-sm text-center pt-2 ">
                Your free apartment booking has been redeemed. Check your email
                for booking details.
              </p>
            )}
          </div>
        </Modal>
      )}

      {activeModal === "saved" && (
        <Modal
          isOpen
          onClose={() => setActiveModal(null)}
          imageUrl="/images/success-icon.png"
          width={48}
          height={48}
          modalcontent={styles.modalContent2}
        >
          <div className="pt-3 "> Saved Successfully</div>
        </Modal>
      )}

      {activeModal === "delete" && (
        <Modal
          isOpen
          onClose={() => setActiveModal(null)}
          imageUrl="/images/delete-icon.png"
          width={48}
          height={48}
          modalcontent={styles.modalContent3}
        >
          <div>
            <p className="text-gray-900 font-semibold text-lg text-center py-4 ">
              {" "}
              Delete Account
            </p>
            <ul className="text-gray-500 text-sm list-disc space-y-4 mx-5 ">
              <li>
                Your profile and all associated data will be permanently
                removed. This includes [mention specific data like your posts,
                photos, saved items, purchase history, etc., relevant to the
                platform].
              </li>
              <li>
                You will lose access to all features and services associated
                with this account.
              </li>
              <li>In most cases, this action cannot be undone.</li>
              <li>
                Your account will be archived for 30 days. After this period, it
                will be permanently deleted and cannot be recovered. You can log
                back in within these 30 days to reactivate your account.
              </li>
            </ul>
            <p className="text-gray-500 text-sm py-4">
              Are you absolutely sure you want to proceed with deleting your
              account?
            </p>
            <div className="flex justify-center items-center gap-2 ">
              <Button variant="profile" onClick={() => setActiveModal(null)}>
                Cancel
              </Button>
              <Button variant="delete" onClick={handleShowDeleteModal}>
                Delete
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {activeModal === "delOtp" && (
        <Modal
          isOpen
          onClose={onClose}
          modalcontent={styles.modalContent3}
          showCloseButton={false}
          imageUrl="/images/otp-icon.png"
          width={48}
          height={48}
        >
          <div>
            <p className={styles.P1}>Please check your email</p>
            <p className={styles.otpP2}>
              We've sent a code to{" "}
              <span className="text-gray-800">Lek**@gmail.com</span>
            </p>
            {/* OTP inputs with dash inside initially */}
            <div className={styles.otpDiv}>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  ref={(el) => (inputsRef.current[index] = el)}
                  className={styles.otpInput}
                  placeholder={digit === "" ? "-" : ""}
                />
              ))}
            </div>
            <p className={styles.otpText}>
              Didn’t get a code?{" "}
              <span
                className="text-primary-600  cursor-pointer"
                onClick={handleResend}
              >
                Click to resend
              </span>
            </p>
            <div className="flex justify-between gap-4">
              <Button
                variant="profile"
                width="full"
                onClick={() => setActiveModal(null)}
              >
                Cancel
              </Button>
              <Button variant="primary" width="full" onClick={handleSubmit}>
                Save
              </Button>{" "}
            </div>
          </div>
        </Modal>
      )}

      {activeModal === "archive" && (
        <Modal
          isOpen
          onClose={() => setActiveModal(null)}
          imageUrl="/images/success-icon.png"
          width={48}
          height={48}
          modalcontent={styles.modalContent4}
        >
          <p className="text-lg font-semibold text-gray-900 my-4 ">
            Account Archived Successfully{" "}
          </p>
          <p className="text-gray-500 text-sm font-normal text-center ">
            {" "}
            We will archive your account for 30 days. If you don't log in within
            this time, your account will be permanently unretrievable. You can
            continue using your account by logging in during the 30-day archive
            period.
          </p>
        </Modal>
      )}
    </div>
  );
}

export default ProfileTab;

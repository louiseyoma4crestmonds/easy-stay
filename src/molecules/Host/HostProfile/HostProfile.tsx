import Modal from "@/molecules/Modal";
import styles from "./HostProfile.module.css";
import Button from "@/atoms/Button";
import { useEffect, useRef, useState } from "react";
import { DropdownOption } from "@/molecules/CustomDropdown/CustomDropdown.types";
import { createPortal } from "react-dom";

const countries = [
  { name: "USA", code: "+1", flag: "/images/US.png" },
  { name: "UK", code: "+44", flag: "/images/GB.png" },
  { name: "Nigeria", code: "+234", flag: "/images/NG.png" },
];

function HostProfile() {
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState<DropdownOption>(countries[0]);
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [activeModal, setActiveModal] = useState<
    null | "saved" | "final" | "delete" | "deleteFinal" | "delOtp" | "archive"
  >(null);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(countries[0]);
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  const firstName = "Lekan";
  const lastName = "Okeowo";
  const email = "lekan.okeowo@gmail.com";

  //IMAGE UPLOAD
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setImage(file);
      setImageUrl(URL.createObjectURL(file)); // immediately display picked image
    }
  };

  const handleSave = () => {
    // setShowSavedModal(true);
    setActiveModal("saved");
  };

  // GET INITIALS OF THE FIRSTNAME AND LAST NAME
  const getInitials = () => {
    return `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase();
  };

  //CLOSE MODALS
  const onClose = () => {
    if (activeModal === "final") {
      setActiveModal(null);
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

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (buttonRef.current && !buttonRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("pointerdown", handleClickOutside);
    return () =>
      document.removeEventListener("pointerdown", handleClickOutside);
  }, []);

  const toggleDropdown = () => {
    if (!open && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setCoords({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
    setOpen((prev) => !prev);
  };

  const handleSelect = (country: (typeof countries)[0]) => {
    setSelected(country);
    setOpen(false);
  };

  return (
    <div className={styles.maindiv}>
      <p className={styles.title}>My Profile</p>

      <div className="px-4 md:px-8 py-5 border-b h-full min-h-0 flex flex-1 flex-col overflow-y-auto  ">
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
              value={firstName}
              disabled
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
              value={lastName}
              disabled
              className={styles.formInput}
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row border-b gap-4 pb-5 mb-4">
          <div className="w-full md:w-1/2">
            <label className={styles.formLabel}>Email Address</label>

            <input
              type="email"
              name="no-autofill-email"
              value={email}
              autoComplete="new-email"
              disabled
              className={styles.formInput}
            />
          </div>
          <div className="w-full md:w-1/2">
            <label className={styles.formLabel}>Phone Number</label>
            <div className="flex">
              <div className="relative">
                <button
                  ref={buttonRef}
                  onClick={toggleDropdown}
                  className={styles.btndiv}
                >
                  <span className="flex items-center gap-2">
                    <img src={selected.flag} alt="" className="w-4 h-3" />
                    {selected.code}
                  </span>
                  <span className="flex shrink-0 ml-6 ">
                    <img
                      src="/images/chevron-down-outline.png"
                      alt="toggle"
                      className={`w-4 h-4 ${open ? "rotate-180" : ""} `}
                    />
                  </span>
                </button>

                {open &&
                  createPortal(
                    <div
                      className="absolute bg-white border shadow-md rounded mt-1 z-50"
                      onPointerDown={(e) => e.stopPropagation()}
                      style={{
                        top: coords.top,
                        left: coords.left,
                        width: coords.width,
                      }}
                    >
                      <ul>
                        {countries.map((country) => (
                          <li
                            key={country.code}
                            onClick={() => handleSelect(country)}
                            // className={styles.dropdowndiv}
                            className={`px-4 py-2 cursor-pointer flex items-center gap-2 hover:bg-gray-100 ${
                              selected.code === country.code
                                ? "bg-gray-100"
                                : ""
                            }`}
                          >
                            <img
                              src={country.flag}
                              alt=""
                              className="w-5 h-4"
                            />
                            <span className="text-gray-500">
                              {country.code}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>,
                    document.body
                  )}
              </div>

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

        <div>
          <p className={styles.formLabel}>Government‑Issued ID</p>
          <div className="flex mt-3 justify-between border border-gray-200 rounded-lg p-4 items-center ">
            {/* File name + size */}
            <div className="flex items-start gap-3">
              <img
                src="/images/file_upload_icon.png"
                alt="file"
                className="w-7 h-7 mt-0.5"
              />
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-700 truncate">
                  International Passport
                </span>
                <span className="text-sm font-normal text-gray-500">1 MB</span>
              </div>
            </div>

            <img src="/images/Button-tick.png" alt="tick" className="w-5 h-5" />
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
          <p className="text-gray-500 px-4 text-sm font-normal text-center ">
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

export default HostProfile;

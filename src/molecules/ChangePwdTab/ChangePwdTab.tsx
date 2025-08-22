import { useRef, useState } from "react";
import styles from "./ChangePwdTab.module.css";
import Button from "@/atoms/Button";
import Modal from "../Modal";

function ChangePwdTab() {
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

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

  //RESEND OTP FUNCTION
  const handleResend = () => {
    // Future: call resend API here
    setOtp(["", "", "", ""]);
    inputsRef.current[0]?.focus();
  };

  const isComplete = otp.every((val) => val !== "");

  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrors("Passwords do not match");
      return;
    }
    if (!password || !oldPassword || !confirmPassword) {
      setErrors("All fields are required");
      return;
    }

    const isValidPassword = password.length >= 8 && /[\d\W]/.test(password); // contains number or symbol

    if (!isValidPassword) {
      setErrors(
        "Password must be at least 8 characters and contain a number or symbol"
      );
      return;
    }

    setErrors("");

    // Step 1: Call API to request OTP
    // await api.sendOtp(email)
    setShowOtpModal(true);
  };

  // SUBMIT OPT TO DELETE ACCOUNT
  const handleVerifyOtp = () => {
    if (isComplete) {
      // Step 2: Verify OTP with backend
      // FUTURE API CALLS
      // Reset before triggering modal again
      setShowOtpModal(false);
      setShowSuccessModal(true);
    }
  };

  return (
    <div className={styles.maindiv}>
      <p className={styles.title}>Change Password</p>

      <form onSubmit={handleSaveChanges}>
        <div className="my-5 w-[50%] px-8  ">
          <label className={styles.formLabel}>Old Password</label>
          <div className="relative">
            <img
              src="/images/lock-outline.png"
              alt="lock"
              style={{ width: 20, height: 20 }}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 "
            />
            <input
              type={showOldPassword ? "text" : "password"}
              value={oldPassword}
              onChange={(e) => {
                setOldPassword(e.target.value);
                if (errors) setErrors("");
              }}
              placeholder="Password"
              className={styles.formInput}
            />
            <img
              src={
                showOldPassword
                  ? "/images/eye-outline.png"
                  : "/images/eye-slash-outline.png"
              }
              alt="toggle visibility"
              className={styles.eyeIcon}
              style={{ width: 12, height: 12 }}
              onClick={() => setShowOldPassword(!showOldPassword)}
            />
          </div>
        </div>
        <div className="mb-4 w-[50%] px-8 ">
          <label className={styles.formLabel}>New Password</label>
          <div className="relative">
            <img
              src="/images/lock-outline.png"
              alt="lock"
              style={{ width: 20, height: 20 }}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 "
            />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors) setErrors("");
              }}
              placeholder="Password"
              className={styles.formInput}
            />
            <img
              src={
                showPassword
                  ? "/images/eye-outline.png"
                  : "/images/eye-slash-outline.png"
              }
              alt="toggle visibility"
              className={styles.eyeIcon}
              style={{ width: 12, height: 12 }}
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Must contain number or symbol, at least 8 characters.
          </p>
        </div>
        <div className="mb-7 w-[50%] px-8  ">
          <label className={styles.formLabel}>Confirm Password</label>
          <div className="relative">
            <img
              src="/images/lock-outline.png"
              alt="lock"
              style={{ width: 20, height: 20 }}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 "
            />
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (errors) setErrors("");
              }}
              placeholder=" Password"
              className={styles.formInput}
            />
            <img
              src={
                showConfirmPassword
                  ? "/images/eye-outline.png"
                  : "/images/eye-slash-outline.png"
              }
              alt="toggle visibility"
              className={styles.eyeIcon}
              style={{ width: 12, height: 12 }}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            />
          </div>
        </div>
        <hr />
        {/* Error Message */}
        {errors && <p className="text-red-600 text-sm mt-4 px-8">{errors}</p>}
        <div className={styles.formButtonDiv}>
          <Button variant="primary">Save Changes</Button>
        </div>
      </form>

      {showOtpModal && (
        <Modal
          isOpen
          onClose={() => setShowOtpModal(false)}
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
                onClick={() => setShowOtpModal(false)}
              >
                Cancel
              </Button>
              <Button variant="primary" width="full" onClick={handleVerifyOtp}>
                Save
              </Button>{" "}
            </div>
          </div>
        </Modal>
      )}

      {showSuccessModal && (
        <Modal
          isOpen
          onClose={() => setShowSuccessModal(false)}
          imageUrl="/images/success-icon.png"
          width={48}
          height={48}
          modalcontent={styles.modalContent2}
        >
          <div className="pt-3 "> Password Changed Successfully</div>
        </Modal>
      )}
    </div>
  );
}

export default ChangePwdTab;

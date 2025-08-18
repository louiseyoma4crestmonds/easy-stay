import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Button from "@/atoms/Button";
import styles from "./RecoverpwdComp.module.css";
import { sendPasswordResetLink } from "src/pages/api/user";

function RecoverpwdComp() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState("");

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setErrors("Please enter your email.");
      return;
    }

    setErrors(""); // Clear previous errors

    try {
      // 🔒 Future: Replace this block with your real API call
      sendPasswordResetLink(email).then((response: any) => {
        console.log("tt", response);
      });
      setErrors("");
      setStep(2); // Proceed to new password inputs
    } catch (err: any) {
      // 🧯 Handle error and show it to user
      setErrors(err.message || "Failed to send reset link. Try again.");
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      setErrors("Please enter both password fields.");
      return;
    }

    if (password !== confirmPassword) {
      setErrors("Passwords do not match.");
      return;
    }

    const isValidPassword = password.length >= 8 && /[\d\W]/.test(password); // contains number or symbol

    if (!isValidPassword) {
      setErrors(
        "Password must be at least 8 characters and contain a number or symbol"
      );
      return;
    }

    setErrors(""); // Clear previous errors

    try {
      // 🔒 Future: Replace this block with your real API call
      // Reset before triggering modal again
      setShowModal(false);
      setModalVisible(false);

      // Allow the DOM to register the reset before setting again
      setTimeout(() => {
        setShowModal(true); // Mount
        setTimeout(() => {
          setModalVisible(true); // Slide in
        }, 50);
      }, 10); // Tiny delay to re-trigger effect
    } catch (err: any) {
      // 🧯 Handle error and show it to user
      setErrors(err.message || "Failed to reset password. Try again.");
    }
  };

  // Auto-close modal after 5s
  useEffect(() => {
    if (showModal) {
      const slideOutTimer = setTimeout(() => {
        setModalVisible(false); // start sliding out
      }, 4000);

      const redirectTimer = setTimeout(() => {
        setShowModal(false); // unmount
        router.push("/signin"); // go to signin page
      }, 5000);

      return () => {
        clearTimeout(slideOutTimer);
        clearTimeout(redirectTimer);
      };
    }
  }, [showModal, router]);

  return (
    <div className={styles.maindiv}>
      {/* Logo at top center */}
      <div className="mt-24">
        <img
          src="/images/text.png"
          alt="Easy Stay Logo"
          className="h-12  w-auto mx-auto"
        />
      </div>

      <form
        className={styles.formDiv}
        onSubmit={step === 1 ? handleSendEmail : handleResetPassword}
      >
        <p className={styles.loginP1}>Recover Password</p>
        <p className={styles.loginP2}>
          {step === 1
            ? "Please enter your registered email below. We'll send you a link to continue"
            : "Create your new password"}
        </p>

        {step === 1 && (
          <div className="mb-4">
            <label className={styles.formLabel}>Email Address</label>
            <div className="relative">
              <img
                src="/images/envelope-outline.png"
                alt="envelope"
                style={{ width: 20, height: 20 }}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="email"
                name="no-autofill-email"
                value={email}
                autoComplete="new-email"
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors) setErrors("");
                }}
                placeholder="Input email"
                className={styles.formInput}
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <>
            <div className="mb-4">
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
            <div className="mb-4">
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
          </>
        )}

        {/* Error Message */}
        {errors && <p className="text-red-600 text-sm mb-4">{errors}</p>}
        <div className={styles.formButtonDiv}>
          <Button variant="primary" width="full">
            Reset Password
          </Button>
        </div>
      </form>

      {/* Modal for OTP approval */}
      {showModal && (
        <div
          className={`${styles.otpModal} ${
            modalVisible ? "translate-x-0" : "translate-x-[700px] "
          }`}
        >
          <p className="text-sm font-normal text-gray-800">
            <img
              src="/images/tick.png"
              width="32"
              height="32"
              alt="OTP Approved"
              className="inline-block mr-2"
            />
            Password reset successfully
          </p>
        </div>
      )}
    </div>
  );
}

export default RecoverpwdComp;

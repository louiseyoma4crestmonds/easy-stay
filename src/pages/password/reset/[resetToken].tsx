import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { passwordValidation } from "src/services/utilities/passwordValidation";
import {
  createNewPassword,
  validatePasswordResetToken,
} from "src/pages/api/user";
import styles from "./resetToken.module.css";
import SignupLeftside from "@/molecules/SignupLeftside";
import Button from "@/atoms/Button";

function AccountRecovery(): JSX.Element {
  const router = useRouter();
  const resetToken = router.query.resetToken;
  const [tokenIsValid, setTokenIsValid] = useState<boolean>();

  const [confirmPassword, setConfirmPassword] = useState<string>();
  const [showModal, setShowModal] = useState<boolean>(false);

  const [passwordIsValid, setPasswordIsValid] = useState<boolean>();

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);

  const [errors, setErrors] = useState("");

  const handleSignupClick = () => {
    router.push("/signup");
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
      if (passwordIsValid) {
        createNewPassword(resetToken, password).then((response: any) => {
          if (response.data.password_is_reset) {
            setShowModal(true);
          } else {
            setShowModal(true);
          }
        });
      }

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

  // Verify validity of token
  useEffect(() => {
    if (resetToken !== undefined && tokenIsValid === undefined) {
      validatePasswordResetToken(resetToken).then((res) => {
        if (res.status === 200) {
          if (res.data.token_validity === "valid") {
            setTokenIsValid(true);
          } else {
            setTokenIsValid(false);
          }
        } else {
          setTokenIsValid(false);
        }
      });
    }
  });

  useEffect(() => {
    setPasswordIsValid(
      password !== undefined
        ? passwordValidation(password)
        : passwordValidation("")
    );
  }, [password]);

  return (
    <div>
      <div className="min-h-screen flex flex-col md:flex-row">
        {/* LEFT SIDE - IMAGE + MODAL */}
        <div className="hidden md:block w-full md:w-1/2 ">
          <SignupLeftside
            text="Create an Account"
            onClick={handleSignupClick}
          />
        </div>

        {/* RIGHT SIDE - FORM */}
        <div className="w-full md:w-1/2">
          {tokenIsValid ? (
            <form
              onSubmit={handleResetPassword}
              className="px-24 flex flex-col min-h-screen bg-white place-content-center"
            >
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
                    className="w-full pl-10 p-3 border bg-gray-50 rounded-lg focus:outline-none"
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
                    className="w-full pl-10 p-3 border bg-gray-50 rounded-lg focus:outline-none"
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
              {/* Error Message */}
              {errors && <p className="text-red-600 text-sm mb-4">{errors}</p>}
              <div className={styles.formButtonDiv}>
                <Button variant="primary" width="full">
                  Reset Password
                </Button>
              </div>
            </form>
          ) : tokenIsValid === false ? (
            <div className="flex flex-col text-center h-full place-content-center px-24">
              Invalid Password Reset Link
            </div>
          ) : (
            <div>Loading</div>
          )}
        </div>
      </div>
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
              alt="Password Reset"
              className="inline-block mr-2"
            />
            Account recovered successfully
          </p>
        </div>
      )}
    </div>
  );
}

export default AccountRecovery;

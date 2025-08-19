import { useEffect, useState } from "react";
import Image from "next/image";
import logoText from "public/images/Text.png";
// import { useRouter } from "next/router";
import Button from "@/atoms/Button";
import styles from "./RecoverpwdComp.module.css";
import { sendPasswordResetLink } from "src/pages/api/user";

function RecoverpwdComp() {
  const [email, setEmail] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

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
        setShowModal(true);
        console.log("tt", response.data);
        if (response?.data?.status === "OK") {
          setShowModal(true);
          setModalVisible(true);
        }
      });
      setErrors("");
    } catch (err: any) {
      // 🧯 Handle error and show it to user
      setErrors(err.message || "Failed to send reset link. Try again.");
    }
  };

  // Auto-close modal after 5s
  useEffect(() => {
    if (showModal) {
      const slideOutTimer = setTimeout(() => {
        setModalVisible(false); // start sliding out
      }, 4000);

      const closeTimer = setTimeout(() => {
        setShowModal(false); // unmount modal
      }, 5000);

      return () => {
        clearTimeout(slideOutTimer);
        clearTimeout(closeTimer);
      };
    }
  }, [showModal]);

  return (
    <div className={styles.maindiv}>
      {/* Logo at top center */}

      <div className=" flex mt-24 justify-center  ">
        {" "}
        <Image
          src={logoText}
          alt="Easy Stay Logo"
          width={167}
          height={70}
        />{" "}
      </div>

      <form className={styles.formDiv} onSubmit={handleSendEmail}>
        <p className={styles.loginP1}>Recover Password</p>
        <p className={styles.loginP2}>
          Please enter your registered email below. We'll send you a link to
          continue
        </p>

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

        {/* Error Message */}
        {errors && <p className="text-red-600 text-sm mb-4">{errors}</p>}
        <div className={styles.formButtonDiv}>
          <Button variant="primary" width="full">
            Reset Password
          </Button>
        </div>
      </form>

      {/* Modal for OTP approval */}
      {showModal ? (
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
            Password reset sent to your email
          </p>
        </div>
      ) : null}
    </div>
  );
}

export default RecoverpwdComp;

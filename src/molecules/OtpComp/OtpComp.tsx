import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import Button from "@/atoms/Button";
import styles from "./OtpComp.module.css";
import { resendVerificationCode, verifyCode } from "src/pages/api/user";

export type OtpCompProps = {
  email: string;
};

function OtpComp(props: OtpCompProps) {
  const router = useRouter();
  const { email } = props;

  const [otp, setOtp] = useState(["", "", "", ""]);
  const [showModal, setShowModal] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const handleSigninClick = () => {
    console.log("Redirect to signin");
    router.push("/signin");
  };

  // Focus first input on mount
  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  // Auto-close modal after 5s
  useEffect(() => {
    if (showModal) {
      const slideOutTimer = setTimeout(() => {
        setModalVisible(false); // start sliding out
      }, 4000);

      const redirectTimer = setTimeout(() => {
        setShowModal(false); // unmount
        router.push("/"); // go to homepage
      }, 5000);

      return () => {
        clearTimeout(slideOutTimer);
        clearTimeout(redirectTimer);
      };
    }
  }, [showModal, router]);

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

  const handleSubmit = () => {
    if (isComplete) {
      // FUTURE API CALLS
      verifyCode(`${otp[0]}${otp[1]}${otp[2]}${otp[3]}`, email);
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
    }
  };

  const handleResend = () => {
    // Future: call resend API here
    resendVerificationCode(email);
    setOtp(["", "", "", ""]);
    inputsRef.current[0]?.focus();
  };

  return (
    <div className={styles.maindiv}>
      {/* Logo at top center */}
      <div className="mt-28">
        <img
          src="/images/text.png"
          alt="Easy Stay Logo"
          className="h-12  w-auto mx-auto"
        />
      </div>
      <div className={styles.secondDiv}>
        <p className={styles.otpP1}>Two‑Factor Authentication</p>
        <p className={styles.otpP2}>
          OTP has been sent to <span className="text-gray-800">{email}</span>
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
        {/* Proceed button */}
        <Button variant="primary" width="full" onClick={handleSubmit}>
          Proceed
        </Button>
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
              alt="OTP Approved"
              className="inline-block mr-2"
            />
            OTP Approved
          </p>
        </div>
      )}

      <div className=" md:hidden text-center mt-auto mb-4 md:mb-0">
        <p className="font-sm font-normal text-gray-500 ">
          {" "}
          Already have an account?{" "}
          <span
            className="text-primary-600 cursor-pointer"
            onClick={handleSigninClick}
          >
            Sign in
          </span>{" "}
        </p>
      </div>
    </div>
  );
}

export default OtpComp;

import React, { useState } from "react";
import { useRouter } from "next/router";
import Button from "@/atoms/Button";
import CustomDropdown from "../CustomDropdown";
import styles from "./SignupComp.module.css";

interface DropdownOption {
  label?: string;
  value?: string;
  name?: string;
  code?: string;
  flag?: string;
  image?: string;
}

export type SignupCompProps = {
  setShowOtp: (show: boolean) => void;
};

function SignupComp({ setShowOtp }: SignupCompProps) {
  const router = useRouter();
  const countries = [
    { name: "USA", code: "+1", flag: "/images/US.png" },
    { name: "UK", code: "+44", flag: "/images/GB.png" },
    { name: "Nigeria", code: "+234", flag: "/images/NG.png" },
  ];

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [country, setCountry] = useState<DropdownOption>(countries[0]);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  interface Errors {
    [key: string]: string;
  }

  const handleSigninClick = () => {
    console.log("Redirect to signin");
    router.push("/signin");
  };

  const validateEmail = (value: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value);
  };

  interface PhoneLengthMap {
    [code: string]: number;
  }

  const validatePhone = (value: string, code: string): boolean => {
    const phoneLengthMap: PhoneLengthMap = {
      "+1": 10,
      "+44": 10,
      "+234": 10,
    };
    return value.length >= phoneLengthMap[code];
  };

  interface PasswordValidation {
    (value: string): boolean;
  }

  const validatePassword: PasswordValidation = (value) => {
    const regex = /^(?=.*[A-Za-z])(?=.*[\d\W]).{8,}$/;
    return regex.test(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Errors = {};

    if (!firstName) newErrors.firstName = "First name is required";
    if (!lastName) newErrors.lastName = "Last name is required";
    if (!validateEmail(email)) newErrors.email = "Enter a valid email address";
    if (!validatePhone(phone, country.code || ""))
      newErrors.phone = `Enter a valid phone number for ${country.name}`;
    if (!validatePassword(password))
      newErrors.password =
        "Password must include number or symbol and be at least 8 characters long";
    if (password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // All validations passed
      setShowOtp(true); // Show OTP component
    }
  };

  return (
    <div className={styles.maindiv}>
      {/* Logo at top center */}
      <div className="mt-20">
        <img
          src="/images/text.png"
          alt="Easy Stay Logo"
          className="h-12  w-auto mx-auto"
        />
      </div>

      <form className={styles.formDiv} onSubmit={handleSubmit}>
        <p className={styles.formP1}>Create an account</p>
        <p className={styles.formP2}>
          Lets get you started! Please enter your details.
        </p>

        {/* First Name and Last Name inputs in flex with labels */}
        <div className="flex flex-col md:flex-row gap-4 mb-4">
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
                if (errors.firstName) {
                  setErrors((prev) => {
                    const updated = { ...prev };
                    delete updated.firstName;
                    return updated;
                  });
                }
              }}
              className={styles.formInput}
            />
            {errors.firstName && (
              <p className={styles.errMsg}>{errors.firstName}</p>
            )}
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
                if (errors.lastName) {
                  setErrors((prev) => {
                    const updated = { ...prev };
                    delete updated.lastName;
                    return updated;
                  });
                }
              }}
              className={styles.formInput}
            />
            {errors.lastName && (
              <p className={styles.errMsg}>{errors.lastName}</p>
            )}
          </div>
        </div>

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
                if (errors.email) {
                  setErrors((prev) => {
                    const updated = { ...prev };
                    delete updated.email;
                    return updated;
                  });
                }
              }}
              placeholder="Input email"
              className="w-full pl-10 p-3 border bg-gray-50 rounded-lg focus:outline-none "
            />
          </div>
          {errors.email && <p className={styles.errMsg}>{errors.email}</p>}
        </div>

        <div className="mb-4">
          <label className={styles.formLabel}>Phone Number</label>
          <div className="flex">
            <CustomDropdown
              options={countries}
              value={country}
              onChange={(val) => setCountry(val)}
            />{" "}
            <input
              type="tel"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                if (errors.phone) {
                  setErrors((prev) => {
                    const updated = { ...prev };
                    delete updated.phone;
                    return updated;
                  });
                }
              }}
              placeholder="123 4567 890"
              className="w-full p-3 bg-gray-50 border-t border-b border-r rounded-r-lg focus:outline-none "
            />
          </div>
          {errors.phone && <p className={styles.errMsg}>{errors.phone}</p>}
        </div>

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
              name="no-autofill-password"
              autoComplete="new-password"
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) {
                  setErrors((prev) => {
                    const updated = { ...prev };
                    delete updated.password;
                    return updated;
                  });
                }
              }}
              placeholder="Enter new password"
              className="w-full pl-10 p-3 border bg-gray-50 rounded-lg focus:outline-none"
            />

            {showPassword ? (
              <>
                <img
                  onClick={() => setShowPassword(false)}
                  src="/images/eye-outline.png"
                  alt="show-password"
                  style={{ width: 12, height: 12 }}
                  className={styles.eyeIcon}
                />{" "}
              </>
            ) : (
              <>
                <img
                  onClick={() => setShowPassword(true)}
                  src="/images/eye-slash-outline.png"
                  alt="show-password"
                  style={{ width: 12, height: 12 }}
                  className={styles.eyeIcon}
                />{" "}
              </>
            )}
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Must contain number or symbol, at least 8 characters.
          </p>
          {errors.password && (
            <p className={styles.errMsg}>{errors.password}</p>
          )}
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
                if (errors.confirmPassword) {
                  setErrors((prev) => {
                    const updated = { ...prev };
                    delete updated.confirmPassword;
                    return updated;
                  });
                }
              }}
              placeholder="password"
              className="w-full pl-10 p-3 border bg-gray-50 rounded-lg focus:outline-none"
            />
            {showConfirmPassword ? (
              <>
                <img
                  onClick={() => setShowConfirmPassword(false)}
                  src="/images/eye-outline.png"
                  alt="show-password"
                  style={{ width: 12, height: 12 }}
                  className={styles.eyeIcon}
                />{" "}
              </>
            ) : (
              <>
                <img
                  onClick={() => setShowConfirmPassword(true)}
                  src="/images/eye-slash-outline.png"
                  alt="show-password"
                  style={{ width: 12, height: 12 }}
                  className={styles.eyeIcon}
                />{" "}
              </>
            )}
          </div>
          {errors.confirmPassword && (
            <p className={styles.errMsg}>{errors.confirmPassword}</p>
          )}
        </div>
        <div className={styles.formButtonDiv}>
          <Button variant="primary" width="full">
            Create Account
          </Button>
          <Button
            variant="accentWithImg"
            width="full"
            image="/images/Google.png"
            imageWidth={24}
            height={24}
          >
            Sign up with Google
          </Button>
        </div>
      </form>

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
export default SignupComp;

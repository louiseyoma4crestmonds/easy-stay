import Button from "@/atoms/Button";
import Modal from "../Modal";
import styles from "./ReportanIssue.module.css";
import CustomDropdown from "../CustomDropdown";
import { useState } from "react";

interface DropdownOption {
  label?: string;
  value?: string;
  name?: string;
  code?: string;
  flag?: string;
  image?: string;
}

type ReportanIssueProps = {
  reportAnIssue: boolean;
  setReportAnIssue: (arg: boolean) => void;
  setShowSuccessModal: (arg: boolean) => void;
};

function ReportanIssue(props: ReportanIssueProps) {
  const { reportAnIssue, setReportAnIssue, setShowSuccessModal } = props;

  interface Errors {
    [key: string]: string;
  }

  const countries = [
    { name: "USA", code: "+1", flag: "/images/US.png" },
    { name: "UK", code: "+44", flag: "/images/GB.png" },
    { name: "Nigeria", code: "+234", flag: "/images/NG.png" },
  ];

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [country, setCountry] = useState<DropdownOption>(countries[0]);
  const [errors, setErrors] = useState<Errors>({});

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Errors = {};

    if (!firstName) newErrors.firstName = "First name is required";
    if (!lastName) newErrors.lastName = "Last name is required";
    if (!validateEmail(email)) newErrors.email = "Enter a valid email address";
    if (!validatePhone(phone, country.code || ""))
      newErrors.phone = `Enter a valid phone number for ${country.name}`;

    if (!description.trim()) newErrors.description = "Description is required";
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // All validations passed
      // createNewUser(firstName, lastName, email, phone, password).then(
      //   (response: any) => {
      //     console.log("sign up response: ", response);
      //     if (response?.data?.code === 208) {
      //       // Show a mordal that says email already exists
      //       newErrors.notExist = "Email already exists";
      //     }
      //     if (response?.data?.code === 201) {
      //       // Show otp mordal
      //       setOtpEmail(email);
      //       setShowOtp(true);
      //     }
      //   }
      // );
      setReportAnIssue(false);
      setShowSuccessModal(true);
    }
  };

  return (
    <Modal
      isOpen={reportAnIssue}
      onClose={() => setReportAnIssue(false)}
      title="Report an Issue"
      modalcontent={styles.modalContent}
    >
      <form className={styles.formDiv} onSubmit={handleSubmit}>
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
          <label className={styles.formLabel}>Description</label>
          <div className="relative">
            <textarea
              rows={6}
              cols={50}
              className={styles.textarea}
              placeholder="Input message here"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                if (errors.description) {
                  setErrors((prev) => {
                    const updated = { ...prev };
                    delete updated.description;
                    return updated;
                  });
                }
              }}
            />
          </div>
          {errors.description && (
            <p className={styles.errMsg}>{errors.description}</p>
          )}
        </div>

        <div className={styles.formButtonDiv}>
          <Button variant="primary">Submit</Button>
        </div>
      </form>
    </Modal>
  );
}

export default ReportanIssue;

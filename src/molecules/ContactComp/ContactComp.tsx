import Image from "next/image";
import styles from "./ContactComp.module.css";
import { useState } from "react";
import { DropdownOption } from "../CustomDropdown/CustomDropdown.types";
import Button from "@/atoms/Button";
import CustomDropdown from "../CustomDropdown";
import Link from "next/link";

type ContactCompProps = {
  setShowSuccessModal: (arg: boolean) => void;
};

function ContactComp({ setShowSuccessModal }: ContactCompProps) {
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
  const [agreed, setAgreed] = useState(false);

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

    if (!description.trim()) newErrors.description = "Message is required";
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
      setShowSuccessModal(true);
    }
  };

  return (
    <div className="relative">
      {/* <img
        src="/images/contactImg.png"
        alt="Section img"
        className=" h-full w-full  "
      /> */}
      <div className="absolute inset-0">
        <Image
          src="/images/contactImg.png"
          alt="Section background"
          layout="fill"
          objectFit="cover"
          className="z-0"
        />
      </div>

      {/* <div className="absolute inset-0 bg-black bg-opacity-50" /> */}

      <div className="relative z-10 max-w-6xl mx-auto py-12 md:py-20 px-6 flex flex-col    ">
        <div className="flex flex-col pb-6">
          <p className="text-gray-100 text-sm md:text-base font-semibold ">
            Contact Us
          </p>
          <p className=" text-2xl md:text-4xl text-white font-semibold my-4 ">
            Visit our offices
          </p>
          <p className="text-gray-100 text-base md:text-xl font-normal ">
            We’d love to hear from you. Please fill out this form or shoot us an
            email.
          </p>
        </div>

        {/* Left Text */}
        <div className="flex flex-col md:flex-row  justify-center gap-12 mt-6 ">
          <div className="w-[60%] text-left text-white pt-2 ">
            <div className=" flex flex-col md:flex-row md:items-center  ">
              <div className=" flex flex-col md:w-[60%] ">
                <div>
                  {" "}
                  <Image
                    src="/images/envelope-outline.png"
                    width={24}
                    height={24}
                  />{" "}
                </div>
                <p className="text-lg md:text-xl font-semibold my-2 ">Email</p>
                <p className="text-gray-100 text-base font-normal mb-2 ">
                  Our friendly team is here to help you
                </p>
                <p className=" text-base font-semibold">support@easystay.com</p>
              </div>
              <div className=" flex flex-col mt-6 md:mt-0 ">
                <div>
                  {" "}
                  <Image src="/images/phone.png" width={24} height={24} />
                </div>
                <p className="text-lg md:text-xl font-semibold my-2 ">Phone</p>
                <p className="text-gray-100 text-base font-normal mb-2 ">
                  Mon-Fri from 8am to 5pm.
                </p>
                <p className=" text-base font-semibold">+1 (555) 000-0000</p>
              </div>{" "}
            </div>{" "}
            <div className=" flex flex-col mt-7">
              <div>
                {" "}
                <Image
                  src="/images/location-icon.png"
                  width={24}
                  height={24}
                />{" "}
              </div>
              <p className="text-lg md:text-xl font-semibold my-2 ">office</p>
              <p className="text-gray-100 text-base font-normal mb-2 ">
                Come say hello at our office HQ.
              </p>
              <p className=" text-base font-semibold">100 Smith Street</p>
              <p className=" text-base font-semibold">
                Collingwood VIC 3066 AU
              </p>
            </div>
          </div>

          {/* Right Contact Form */}
          <div className="bg-white rounded-2xl max-w-lg shadow-md  ">
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
                {errors.email && (
                  <p className={styles.errMsg}>{errors.email}</p>
                )}
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
                {errors.phone && (
                  <p className={styles.errMsg}>{errors.phone}</p>
                )}
              </div>

              <div className="mb-4">
                <label className={styles.formLabel}>Message</label>
                <div className="relative">
                  <textarea
                    rows={3}
                    cols={25}
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
              <div>
                <label className="flex items-center gap-2  text-base text-gray-500">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="w-4 h-4 accent-primary-600 cursor-pointer mr-2 "
                  />
                  <span>
                    You agree to our friendly{" "}
                    <Link href="/privacy-policy" target="_blank">
                      <a className=" underline">Privacy Policy</a>
                    </Link>
                    .
                  </span>
                </label>
              </div>
              <div className={styles.formButtonDiv}>
                <Button variant="primary" width="full" disabled={!agreed}>
                  Send Message
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactComp;

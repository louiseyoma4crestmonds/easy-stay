import { useState } from "react";
import styles from "./FooterComp.module.css";
import CustomDropdown from "../../molecules/CustomDropdown";
import { DropdownOption } from "../../molecules/CustomDropdown/CustomDropdown.types";

const languageOptions: DropdownOption[] = [
  { value: "en", label: "English" },
  { value: "fr", label: "French" },
];

const currencyOptions: DropdownOption[] = [
  { value: "ngn", label: "NGN - ₦" },
  { value: "usd", label: "USD - $" },
  { value: "eur", label: "EUR - €" },
  { value: "gbp", label: "GBP - £" },
];

function FooterComp() {
  const [selectedLanguage, setSelectedLanguage] = useState<
    DropdownOption | undefined
  >(languageOptions[0]);
  const [selectedCurrency, setSelectedCurrency] = useState<
    DropdownOption | undefined
  >(currencyOptions[0]);

  return (
    <section className={styles.maindiv}>
      <p className={styles.footerExploreText}>Explore more opportunities</p>

      {/* Brand / About */}
      <div className={styles.footerAboutDiv}>
        <div className={styles.footerborder}>
          <div className="flex items-center gap-3 ">
            <div className={styles.footerAbout}>
              <img
                src="/images/home-outline-2.png"
                alt="giftbox img"
                className="w-[20px] h-[20px] "
              />
            </div>
            <div className="flex flex-col">
              <p className={styles.footerP1}>Apartments in Lagos</p>
              <p className={styles.footerP2}>
                Over 10,000 apartments available
              </p>
            </div>
          </div>
          <img
            src="/images/angle-down.png"
            alt="Previous"
            width={24}
            height={24}
            className="transform -rotate-90 "
          />
        </div>
        <div className={styles.footerborder}>
          <div className="flex items-center gap-3 ">
            <div className={styles.footerAbout}>
              <img
                src="/images/home-outline-3.png"
                alt="giftbox img"
                className="w-[20px] h-[20px] "
              />
            </div>
            <div className="flex flex-col">
              <p className={styles.footerP1}>Apartments in Abuja</p>
              <p className={styles.footerP2}>Over 1,000 apartments available</p>
            </div>
          </div>
          <img
            src="/images/angle-down.png"
            alt="Previous"
            width={24}
            height={24}
            className="transform -rotate-90 "
          />
        </div>
        <div className={styles.footerborder}>
          <div className="flex items-center gap-3 ">
            <div className={styles.footerAbout}>
              <img
                src="/images/home-outline.png"
                alt="giftbox img"
                className="w-[20px] h-[20px] "
              />
            </div>
            <div className="flex flex-col">
              <p className={styles.footerP1}>Apartments in Port Harcourt</p>
              <p className={styles.footerP2}>Over 300 apartments available</p>
            </div>
          </div>
          <img
            src="/images/angle-down.png"
            alt="Previous"
            width={24}
            height={24}
            className="transform -rotate-90 "
          />
        </div>
      </div>
      <hr className="border-gray-700 my-14 " />

      {/* Quick Links */}
      <div className={styles.quicklinkdiv}>
        <div>
          <p className={styles.quicklinkP1}>Product</p>
          <ul className={styles.quicklinkUL}>
            <li>
              <a href="/customer/register-your-apartment" className="">
                Register your Apartment
              </a>
            </li>
            <li>
              <a href="#" className="">
                Find Apartments
              </a>
            </li>
            <li>
              <a href="/customer/how-it-works" className="">
                How it Works
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className={styles.quicklinkP1}>Support</p>
          <ul className={styles.quicklinkUL}>
            <li>
              <a href="/customer/faqs" className="">
                FAQs
              </a>
            </li>
            <li>
              <a href="#" className="">
                Refund & Cancellation Policy
              </a>
            </li>
            <li>
              <a href="#" className="">
                Trust & Safety
              </a>
            </li>
            <li>
              <a href="#" className="">
                Report an Issue
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className={styles.quicklinkP1}>Legal</p>
          <ul className={styles.quicklinkUL}>
            <li>
              <a href="#" className="">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="#" className="">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="">
                Cookie Policy
              </a>
            </li>
            <li>
              <a href="#" className="">
                Guest Refund Policy
              </a>
            </li>
            <li>
              <a href="#" className="">
                Host Terms
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className={styles.quicklinkP1}>Company</p>
          <ul className={styles.quicklinkUL}>
            <li>
              <a href="/about-us" className="">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="">
                Contact Us
              </a>
            </li>
          </ul>
        </div>
      </div>

      <hr className="border-gray-700 my-14 " />

      <div className="flex flex-row justify-between items-center mb-6">
        <p className="text-gray-300 text-base font-normal ">
          {" "}
          @ 2025 Easy Stay. Inc
        </p>
        <div className="flex justify-between gap-2 items-center ">
          <div className=" flex gap-3">
            <CustomDropdown
              options={languageOptions}
              value={selectedLanguage}
              onChange={setSelectedLanguage}
              buttonClassName={styles.btndiv}
              dropdownClassName={styles.dropdowndiv}
              toggleIcon="/images/angle-down.png"
              leftIcon="/images/globe-outline.png"
              spanClassName="flex items-center gap-1"
              ImgClass="w-4 h-4 object-contain"
            />
            <CustomDropdown
              options={currencyOptions}
              value={selectedCurrency}
              onChange={setSelectedCurrency}
              buttonClassName={styles.btndiv}
              dropdownClassName={styles.dropdowndiv}
              toggleIcon="/images/angle-down.png"
            />
          </div>

          <div className=" flex justify-center items-center gap-2">
            {/* Facebook */}
            <a
              href="https://www.facebook.com/yourpage"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <img
                src="/images/facebook.png"
                alt="Facebook"
                className="w-6 h-6"
              />
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <img
                src="/images/linkedin.png"
                alt="LinkedIn"
                className="w-6 h-6"
              />
            </a>

            {/* twitter */}
            <a
              href="https://www.instagram.com/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <img
                src="/images/twitter.png"
                alt="Instagram"
                className="w-6 h-6"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FooterComp;

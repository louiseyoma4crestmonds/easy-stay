import { useState } from "react";
import Image from "next/image";
import styles from "./FooterComp.module.css";
import CustomDropdown from "../../molecules/CustomDropdown";
import { DropdownOption } from "../../molecules/CustomDropdown/CustomDropdown.types";
import { Props } from "./FooterComp.types";
import Router from "next/router";

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

function FooterComp({ data }: Props) {
  const [selectedLanguage, setSelectedLanguage] = useState<
    DropdownOption | undefined
  >(languageOptions[0]);
  const [selectedCurrency, setSelectedCurrency] = useState<
    DropdownOption | undefined
  >(currencyOptions[0]);

  const features = [
    { id: 1, icon: "/images/home-outline-2.png" },
    { id: 2, icon: "/images/home-outline-3.png" },
    { id: 3, icon: "/images/home-outline.png" },
    // add more icons matching the ids from your endpoint
  ];

  return (
    <section className={styles.maindiv}>
      <p className={styles.footerExploreText}>Explore more apartments</p>

      {/* Brand / About */}

      <div className={styles.footerAboutDiv}>
        {data.map((item, index) => {
          // find icon for this id
          const featureIcon = features.find((f) => f.id === item.id)?.icon;

          return (
            <div
              key={item.id}
              className={`${styles.footerborder} flex items-center justify-between`}
              role="button"
              onKeyDown={() => {
                Router.push({
                  pathname: "/guest/properties",
                  query: { location: item.id },
                });
              }}
              onClick={() => {
                Router.push({
                  pathname: "/guest/properties",
                  query: { location: item.id },
                });
              }}
            >
              <div className="flex items-center gap-3 ">
                {featureIcon && (
                  <div className={styles.footerAbout}>
                    <Image
                      src={featureIcon}
                      alt={item.name}
                      width={24}
                      height={24}
                      className="object-contain"
                    />{" "}
                  </div>
                )}
                <div>
                  <p className={styles.footerP1}>
                    {" "}
                    {`Apartments in ${item.name}`}{" "}
                  </p>
                  <p className={styles.footerP2}>{item.cover_text}</p>
                </div>
              </div>
              <Image
                src="/images/angle-down.png"
                alt="Previous"
                width={24}
                height={24}
                className="transform -rotate-90 "
              />
            </div>
          );
        })}
      </div>

      <hr className="border-gray-700 my-14 " />

      {/* Quick Links */}
      <div className={styles.quicklinkdiv}>
        <div>
          <p className={styles.quicklinkP1}>Product</p>
          <ul className={styles.quicklinkUL}>
            <li>
              <a href="/guest/register-your-apartment" className="">
                Register your Apartment
              </a>
            </li>
            <li>
              <a href="#" className="">
                Find Apartments
              </a>
            </li>
            <li>
              <a href="/guest/how-it-works" className="">
                How it Works
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className={styles.quicklinkP1}>Support</p>
          <ul className={styles.quicklinkUL}>
            <li>
              <a href="/guest/faqs" className="">
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
              <a href="/guest/about-us" className="">
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
